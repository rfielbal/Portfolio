import hashlib
import json
import logging
import os
from pathlib import Path
import shutil
import socket
import stat
import subprocess
import tempfile
import threading
import time
import unittest
from unittest.mock import patch

import deploy


class DiskSFTP:
    """SFTP-shaped filesystem with injected failures; no OVH connection."""
    def __init__(self, root):
        self.root = root
        self.fail_target = None
        self.fail_after = False
        self.disconnected = False

    def path(self, value):
        if self.disconnected:
            raise OSError("local fixture disconnected")
        if not value.startswith("/home/test/"):
            raise OSError("outside fixture")
        return self.root / value[len("/home/test/"):]

    def normalize(self, value):
        return "/home/test"

    def lstat(self, value):
        return self.path(value).lstat()

    def mkdir(self, value, mode):
        self.path(value).mkdir(mode=mode)

    def chmod(self, value, mode):
        self.path(value).chmod(mode)

    def open(self, value, mode):
        return self.path(value).open("xb" if mode == "wx" else mode)

    def put(self, source, target, confirm=True):
        shutil.copyfile(source, self.path(target))

    def rename(self, source, target):
        if self.path(target).exists():
            raise FileExistsError(target)
        self.posix_rename(source, target)

    def posix_rename(self, source, target):
        if self.fail_target == target and not self.fail_after:
            self.fail_target = None
            raise OSError("injected rename failure")
        os.replace(self.path(source), self.path(target))
        if self.fail_target == target:
            self.fail_target = None
            raise OSError("injected lost rename reply")

    def remove(self, target):
        self.path(target).unlink()

    def close(self):
        pass


class DeploymentTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.remote = self.root / "remote"
        self.remote.mkdir()
        (self.remote / "rfielbal").mkdir()
        self.folder = self.root / "site"
        self.folder.mkdir()
        self.sftp = DiskSFTP(self.remote)
        self.conf = {"web": "rfielbal", "private": ".visionbuild-deployments/portfolio"}

    def file(self, name, value, remote=False):
        path = (self.remote / "rfielbal" if remote else self.folder) / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(value)
        return path

    def publication(self):
        return deploy.Publication(self.sftp, self.conf, self.folder, "123-1-abcdef")

    def test_public_filter(self):
        for name in (".env", ".github/workflows/deploy.yml", "scripts/password.py", "docs/notes.md", "notes.txt", "notes.xml", "images/profile/source/portrait.jpg", "documents/private.pdf", "uploads/client.json"):
            self.assertFalse(deploy.allowed(name), name)
        for name in ("index.html", ".htaccess", "images/profile/raphael.webp", "demos/aether-core/models/tasse.stl", "documents/cv-raphael-coursier.pdf", "robots.txt"):
            self.assertTrue(deploy.allowed(name), name)
        for name in ("../site", "a/../b", "/site", "a//b", "a\\b", "a\nsecret"):
            with self.assertRaises(deploy.DeploymentError):
                deploy.relative_path(name)

    def test_pack_excludes_private_and_untracked(self):
        source = self.root / "source"
        source.mkdir()
        subprocess.run(["git", "init", "-q", str(source)], check=True)
        for name in ("index.html", ".htaccess", "bootstrap.js", "style.css", "notes.txt", ".env", "images/profile/source/original.jpg"):
            path = source / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("public fixture")
        subprocess.run(["git", "add", "."], cwd=source, check=True)
        (source / "untracked.html").write_text("must not ship")
        manifest = deploy.pack(source, self.root / "package", "a" * 40, "")
        self.assertEqual(len(manifest["files"]), 4)
        self.assertFalse((self.root / "package/notes.txt").exists())
        self.assertFalse((self.root / "package/untracked.html").exists())
        (source / "style.css").unlink()
        (source / "style.css").symlink_to(source / "index.html")
        with self.assertRaises(deploy.DeploymentError):
            deploy.pack(source, self.root / "package-bad", "a" * 40, "")

    def test_backup_rights_and_unknown_files_preserved(self):
        original = self.file("index.html", "old", remote=True)
        original.chmod(0o604)
        self.file("unmanaged.txt", "keep", remote=True)
        self.file("index.html", "new")
        publication = self.publication()
        publication.write()
        self.assertEqual(original.read_text(), "new")
        self.assertEqual(stat.S_IMODE(original.stat().st_mode), 0o604)
        backup = self.remote / ".visionbuild-deployments/portfolio/123-1-abcdef/backup/index.html"
        self.assertEqual(backup.read_text(), "old")
        self.assertEqual(stat.S_IMODE(backup.stat().st_mode), 0o600)
        self.assertEqual(stat.S_IMODE(backup.parent.stat().st_mode), 0o700)
        self.assertEqual((self.remote / "rfielbal/unmanaged.txt").read_text(), "keep")

    def test_rollback_after_failure_and_lost_reply(self):
        for lost_reply in (False, True):
            with self.subTest(lost_reply=lost_reply):
                self.sftp = DiskSFTP(self.remote)
                self.file("index.html", "old", remote=True)
                self.file("index.html", "new")
                self.file("bootstrap.js", "new asset")
                publication = deploy.Publication(self.sftp, self.conf, self.folder, "run-" + str(lost_reply))
                self.sftp.fail_target = "/home/test/rfielbal/index.html"
                self.sftp.fail_after = lost_reply
                with self.assertRaises(OSError):
                    publication.write()
                publication.rollback()
                self.assertEqual((self.remote / "rfielbal/index.html").read_text(), "old")
                self.assertFalse((self.remote / "rfielbal/bootstrap.js").exists())

    def test_disconnected_rollback_reports_incomplete(self):
        self.file("index.html", "old", remote=True)
        self.file("index.html", "new")
        publication = self.publication()
        publication.write()
        self.sftp.disconnected = True
        with self.assertRaisesRegex(deploy.DeploymentError, "Restauration incomplète"):
            publication.rollback()

    def test_concurrent_change_is_never_erased_on_rollback(self):
        self.file("index.html", "old", remote=True)
        self.file("index.html", "new")
        publication = self.publication()
        publication.write()
        self.file("index.html", "another publisher", remote=True)
        with self.assertRaisesRegex(deploy.DeploymentError, "incomplète"):
            publication.rollback()
        self.assertEqual((self.remote / "rfielbal/index.html").read_text(), "another publisher")

    def test_remote_symlinks_refused(self):
        outside = self.remote / "outside.html"
        outside.write_text("keep")
        (self.remote / "rfielbal/index.html").symlink_to(outside)
        self.file("index.html", "new")
        publication = self.publication()
        with self.assertRaises(deploy.DeploymentError):
            publication.write()
        self.assertEqual(outside.read_text(), "keep")

    def test_private_folder_permissions_refused(self):
        (self.remote / ".visionbuild-deployments").mkdir(mode=0o755)
        with self.assertRaisesRegex(deploy.DeploymentError, "privé"):
            self.publication()

    def test_changed_web_root_symlink_is_refused(self):
        self.file("index.html", "new")
        publication = self.publication()
        (self.remote / "www").mkdir()
        (self.remote / "www/index.html").write_text("other site")
        (self.remote / "rfielbal").rmdir()
        (self.remote / "rfielbal").symlink_to(self.remote / "www", target_is_directory=True)
        with self.assertRaises(deploy.DeploymentError):
            publication.write()
        self.assertEqual((self.remote / "www/index.html").read_text(), "other site")

    def test_restoration_has_a_deadline(self):
        publication = unittest.mock.Mock()
        publication.rollback.side_effect = lambda: time.sleep(0.2)
        with self.assertRaisesRegex(deploy.DeploymentError, "Délai"):
            deploy.bounded_restore(publication, 0.01)

    def test_http_proof_requires_exact_manifest_and_files(self):
        body = b"new html"
        manifest = {"sha": "a" * 40, "files": [{"path": "index.html", "size": len(body), "sha256": hashlib.sha256(body).hexdigest()}]}
        encoded = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode()
        def read(site, path, nonce, maximum):
            return encoded if path == deploy.MANIFEST else body
        self.assertEqual(deploy.verify("https://rfielbal.fr", manifest, read), 1)
        with self.assertRaisesRegex(deploy.DeploymentError, "manifeste"):
            deploy.verify("https://rfielbal.fr", manifest, lambda *args: b"old manifest")
        with self.assertRaisesRegex(deploy.DeploymentError, "contenu"):
            deploy.verify("https://rfielbal.fr", manifest, lambda site, path, *args: encoded if path == deploy.MANIFEST else b"old html")

    def test_config_refuses_untrusted_scope(self):
        env = {"OVH_DEPLOY_ENABLED": "true", "GITHUB_REF": "refs/heads/main", "GITHUB_REPOSITORY": "rfielbal/Portfolio", "OVH_SFTP_HOST": "ftp.cluster100.hosting.ovh.net", "OVH_SFTP_PORT": "22", "OVH_SFTP_USER": "test", "OVH_WEB_ROOT": "rfielbal", "OVH_PRIVATE_ROOT": ".visionbuild-deployments/portfolio", "SITE_URL": "https://rfielbal.fr", "OVH_SFTP_PASSWORD": "fixture", "OVH_KNOWN_HOSTS": "fixture", "GH_TOKEN": "fixture"}
        self.assertEqual(deploy.config(env)["web"], "rfielbal")
        for key, value in (("GITHUB_REF", "refs/heads/feature"), ("OVH_WEB_ROOT", "www"), ("OVH_PRIVATE_ROOT", "rfielbal/backups"), ("SITE_URL", "https://user:pass@rfielbal.fr"), ("OVH_DEPLOY_ENABLED", "false")):
            with self.subTest(key=key), self.assertRaises(deploy.DeploymentError):
                deploy.config({**env, key: value})

    def test_success_notification_failure_does_not_rollback_verified_site(self):
        manifest = {"sha": "a" * 40}
        self.file(deploy.MANIFEST, json.dumps(manifest))
        env = {"GITHUB_SHA": "a" * 40, "GITHUB_RUN_ID": "123", "GITHUB_RUN_ATTEMPT": "1"}
        fake_publication = unittest.mock.Mock()
        def github(path, body, env):
            if path == "git/ref/heads/main":
                return {"object": {"sha": "a" * 40}}
            if path == "deployments":
                return {"id": 1}
            if body["state"] == "success":
                raise OSError("lost notification reply")
            return {}
        with patch.object(deploy, "config", return_value={"site": "https://rfielbal.fr"}), patch.object(deploy, "github", side_effect=github), patch.object(deploy, "connect", return_value=(unittest.mock.Mock(), unittest.mock.Mock())), patch.object(deploy, "Publication", return_value=fake_publication), patch.object(deploy, "verify", return_value=1):
            with self.assertRaisesRegex(deploy.DeploymentError, "notification GitHub incertaine"):
                deploy.deploy(self.folder, env)
        fake_publication.rollback.assert_not_called()

    def test_outdated_commit_cannot_publish(self):
        with patch.object(deploy, "github", return_value={"object": {"sha": "b" * 40}}):
            with self.assertRaisesRegex(deploy.DeploymentError, "dépassé"):
                deploy.require_current_main("a" * 40, {})
            deploy.require_current_main("b" * 40, {})

    def test_second_main_check_prevents_replacement_after_staging(self):
        self.file("index.html", "old", remote=True)
        self.file("index.html", "new")
        publication = self.publication()
        def reject_outdated():
            raise deploy.DeploymentError("main avancé pendant la préparation")
        with self.assertRaisesRegex(deploy.DeploymentError, "main avancé"):
            publication.write(before_commit=reject_outdated)
        self.assertEqual((self.remote / "rfielbal/index.html").read_text(), "old")
        self.assertEqual(publication.changed, [])

    def test_interruption_attempts_restoration_and_reports_failure(self):
        self.file(deploy.MANIFEST, json.dumps({"sha": "a" * 40}))
        env = {"GITHUB_SHA": "a" * 40, "GITHUB_RUN_ID": "123", "GITHUB_RUN_ATTEMPT": "1"}
        publication = unittest.mock.Mock()
        publication.write.side_effect = KeyboardInterrupt()
        statuses = []
        def github(path, body, env):
            if path == "git/ref/heads/main":
                return {"object": {"sha": "a" * 40}}
            if path == "deployments":
                return {"id": 1}
            statuses.append(body["state"])
            return {}
        with patch.object(deploy, "config", return_value={"site": "https://rfielbal.fr"}), patch.object(deploy, "github", side_effect=github), patch.object(deploy, "connect", return_value=(unittest.mock.Mock(), unittest.mock.Mock())), patch.object(deploy, "Publication", return_value=publication):
            with self.assertRaises(KeyboardInterrupt):
                deploy.deploy(self.folder, env)
        publication.rollback.assert_called_once()
        self.assertEqual(statuses, ["in_progress", "failure"])


# Real SSH host-key negotiation and SFTP operations on a loopback-only fixture.
try:
    import paramiko
except ImportError:
    paramiko = None


@unittest.skipIf(paramiko is None, "Install locked requirements to test real SFTP")
class SFTPIntegrationTests(unittest.TestCase):
    def test_real_sftp_and_unknown_host_key(self):
        logger = logging.getLogger("paramiko.transport")
        previous_level = logger.level
        logger.setLevel(logging.CRITICAL)
        self.addCleanup(logger.setLevel, previous_level)
        host_key = paramiko.RSAKey.generate(2048)
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / "rfielbal").mkdir()
            (root / "rfielbal/index.html").write_text("old")
            folder = root / "local"
            folder.mkdir()
            (folder / "index.html").write_text("new")

            class Server(paramiko.ServerInterface):
                def check_auth_password(self, username, password):
                    return paramiko.AUTH_SUCCESSFUL if (username, password) == ("fixture", "local-test-password") else paramiko.AUTH_FAILED
                def get_allowed_auths(self, username):
                    return "password"
                def check_channel_request(self, kind, chanid):
                    return paramiko.OPEN_SUCCEEDED if kind == "session" else paramiko.OPEN_FAILED_ADMINISTRATIVELY_PROHIBITED

            class Files(paramiko.SFTPServerInterface):
                def path(self, path):
                    if path == ".":
                        return root
                    if not path.startswith("/home/test/") or ".." in path.split("/"):
                        raise PermissionError("fixture scope")
                    return root / path[len("/home/test/"):]
                def canonicalize(self, path):
                    return "/home/test" if path == "." else path
                def lstat(self, path):
                    try:
                        return paramiko.SFTPAttributes.from_stat(self.path(path).lstat())
                    except OSError as error:
                        return paramiko.SFTPServer.convert_errno(error.errno)
                stat = lstat
                def mkdir(self, path, attr):
                    try:
                        self.path(path).mkdir(mode=attr.st_mode or 0o755)
                        return paramiko.SFTP_OK
                    except OSError as error:
                        return paramiko.SFTPServer.convert_errno(error.errno)
                def chattr(self, path, attr):
                    self.path(path).chmod(attr.st_mode)
                    return paramiko.SFTP_OK
                def open(self, path, flags, attr):
                    try:
                        fd = os.open(self.path(path), flags, 0o600)
                        file = os.fdopen(fd, "r+b" if flags & os.O_RDWR else "wb" if flags & os.O_WRONLY else "rb")
                        handle = paramiko.SFTPHandle(flags)
                        handle.readfile = file
                        handle.writefile = file
                        handle.stat = lambda: paramiko.SFTPAttributes.from_stat(os.fstat(fd))
                        return handle
                    except OSError as error:
                        return paramiko.SFTPServer.convert_errno(error.errno)
                def posix_rename(self, old, new):
                    os.replace(self.path(old), self.path(new))
                    return paramiko.SFTP_OK
                def rename(self, old, new):
                    if self.path(new).exists():
                        return paramiko.SFTP_FAILURE
                    return self.posix_rename(old, new)
                def remove(self, path):
                    self.path(path).unlink()
                    return paramiko.SFTP_OK

            listener = socket.socket()
            listener.bind(("127.0.0.1", 0))
            listener.listen(2)
            listener.settimeout(10)
            port = listener.getsockname()[1]
            transports = []
            def serve():
                for _ in range(2):
                    try:
                        connection, _ = listener.accept()
                        transport = paramiko.Transport(connection)
                        transports.append(transport)
                        transport.add_server_key(host_key)
                        transport.set_subsystem_handler("sftp", paramiko.SFTPServer, Files)
                        transport.start_server(server=Server())
                    except (OSError, EOFError, paramiko.SSHException):
                        break
            thread = threading.Thread(target=serve, daemon=True)
            thread.start()
            try:
                conf = {"host": "127.0.0.1", "port": port, "user": "fixture", "web": "rfielbal", "private": ".visionbuild-deployments/portfolio"}
                hosts = f"127.0.0.1,[127.0.0.1]:{port} {host_key.get_name()} {host_key.get_base64()}"
                client, sftp = deploy.connect(conf, {"OVH_SFTP_PASSWORD": "local-test-password", "OVH_KNOWN_HOSTS": hosts})
                publication = deploy.Publication(sftp, conf, folder, "fixture")
                publication.write()
                self.assertEqual((root / "rfielbal/index.html").read_text(), "new")
                publication.rollback()
                self.assertEqual((root / "rfielbal/index.html").read_text(), "old")
                sftp.close()
                client.close()
                wrong = paramiko.RSAKey.generate(2048)
                bad_hosts = f"127.0.0.1,[127.0.0.1]:{port} {wrong.get_name()} {wrong.get_base64()}"
                with self.assertRaises(deploy.DeploymentError):
                    deploy.connect(conf, {"OVH_SFTP_PASSWORD": "local-test-password", "OVH_KNOWN_HOSTS": bad_hosts})
            finally:
                listener.close()
                for transport in transports:
                    transport.close()
                thread.join(2)


if __name__ == "__main__":
    unittest.main()
