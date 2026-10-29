#!/usr/bin/env python3
"""Package the public Portfolio, publish over pinned SFTP, verify over HTTPS.

No remote shell, recursive delete, automatic host-key trust or in-place upload.
The only remote deletions restore files created by a failed deployment.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import errno
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import signal
import stat
import subprocess
import sys
import time
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ".well-known/visionbuild-release.json"
PUBLIC_ROOTS = ("rfielbal", "www", "ecommerce/public")
DOCUMENTS = {
    "documents/cv-raphael-coursier.pdf",
    "documents/bulletins-public/bts-sio-semestre-1.pdf",
    "documents/bulletins-public/bts-sio-semestre-2.pdf",
    "documents/projets/cyber-1-sauvegarde.pdf",
    "documents/projets/cyber-2-symfonytype.pdf",
    "documents/veille/Veille-Apple-2026-09-19.pdf",
    "documents/veille/Veille-Apple-2026-10-02.pdf",
    "documents/veille/Veille-Apple-2026-10-16.pdf",
}


class DeploymentError(Exception):
    pass


class DeploymentInterrupted(DeploymentError):
    pass


class RestorationTimeout(DeploymentError):
    pass


def relative_path(value: str) -> str:
    if (not isinstance(value, str) or not value or len(value) > 240
            or value.startswith("/") or "\\" in value
            or not re.fullmatch(r"[A-Za-z0-9._/-]+", value)
            or any(p in ("", ".", "..") for p in value.split("/"))):
        raise DeploymentError("Chemin relatif invalide.")
    return value


def allowed(path: str) -> bool:
    relative_path(path)
    parts = PurePosixPath(path).parts
    if path == ".htaccess":
        return True
    if any(p.startswith(".") for p in parts) or "source" in parts:
        return False
    extension = PurePosixPath(path).suffix.lower()
    if len(parts) == 1:
        return path in {"robots.txt", "sitemap.xml", "favicon.png", "favicon.ico", "manifest.webmanifest"} or extension in {".html", ".css", ".js"}
    if parts[0] == "documents":
        return path in DOCUMENTS
    if parts[0] == "images":
        return extension in {".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg", ".gif"}
    if parts[0] == "videos":
        return extension in {".mp4", ".webm"}
    if parts[0] == "demos":
        return extension in {".html", ".css", ".js", ".json", ".wasm", ".stl", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".wav", ".mp3", ".woff2"}
    return False


def digest_stream(stream) -> str:
    result = hashlib.sha256()
    for chunk in iter(lambda: stream.read(1024 * 1024), b""):
        result.update(chunk)
    return result.hexdigest()


def digest(path: Path) -> str:
    with path.open("rb") as handle:
        return digest_stream(handle)


def pack(source: Path, target: Path, sha: str, run_url: str) -> dict:
    if not re.fullmatch(r"[0-9a-f]{40}", sha):
        raise DeploymentError("Le commit doit être un SHA Git complet.")
    if target.exists():
        raise DeploymentError("Le répertoire de préparation doit être absent.")
    tracked = subprocess.check_output(["git", "ls-files", "-z"], cwd=source).decode().split("\0")
    selected = sorted(p for p in tracked if p and allowed(p))
    for required in ("index.html", ".htaccess", "bootstrap.js", "style.css"):
        if required not in selected:
            raise DeploymentError("Un fichier indispensable manque dans Git.")
    target.mkdir(parents=True)
    files = []
    for name in selected:
        path = source / name
        if any((source / PurePosixPath(*PurePosixPath(name).parts[:i])).is_symlink()
               for i in range(1, len(PurePosixPath(name).parts) + 1)):
            raise DeploymentError("Un lien symbolique est interdit dans les fichiers publiés.")
        if not path.is_file():
            raise DeploymentError("Un fichier suivi par Git est absent.")
        destination = target / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(path, destination)
        os.chmod(destination, 0o644)
        files.append({"path": name, "size": destination.stat().st_size, "sha256": digest(destination)})
    manifest = {
        "schema": 1, "repository": "rfielbal/Portfolio", "sha": sha,
        "createdAt": datetime.now(timezone.utc).isoformat(), "runUrl": run_url,
        "files": files,
    }
    (target / MANIFEST).parent.mkdir(parents=True, exist_ok=True)
    (target / MANIFEST).write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(f"Préparation : {len(files)} fichiers publics, commit {sha[:12]}.")
    return manifest


def config(env) -> dict:
    if env.get("OVH_DEPLOY_ENABLED") != "true":
        raise DeploymentError("La publication OVH n’est pas activée.")
    if env.get("GITHUB_REF") != "refs/heads/main" or env.get("GITHUB_REPOSITORY", "").lower() != "rfielbal/portfolio":
        raise DeploymentError("La publication est réservée à main du dépôt Portfolio.")
    required = ("OVH_SFTP_HOST", "OVH_SFTP_PORT", "OVH_SFTP_USER", "OVH_WEB_ROOT", "OVH_PRIVATE_ROOT", "SITE_URL", "OVH_SFTP_PASSWORD", "OVH_KNOWN_HOSTS", "GH_TOKEN")
    if any(not env.get(key) for key in required):
        raise DeploymentError("Configuration incomplète : compléter les variables et secrets de l’environnement production.")
    host = env["OVH_SFTP_HOST"]
    if not re.fullmatch(r"ftp\.cluster[0-9]+\.hosting\.ovh\.net", host):
        raise DeploymentError("Le serveur doit être un serveur SFTP OVH identifié.")
    try:
        port = int(env["OVH_SFTP_PORT"])
    except ValueError:
        raise DeploymentError("Port SFTP invalide.") from None
    if port != 22:
        raise DeploymentError("Ce déploiement du Portfolio utilise le port SFTP 22 vérifié dans OVH.")
    web = relative_path(env["OVH_WEB_ROOT"])
    private = relative_path(env["OVH_PRIVATE_ROOT"])
    if web != "rfielbal":
        raise DeploymentError("Le dossier public attendu pour ce Portfolio est rfielbal.")
    if not private.startswith(".visionbuild-deployments/"):
        raise DeploymentError("Utiliser un sous-dossier privé de .visionbuild-deployments.")
    for published in PUBLIC_ROOTS:
        if private == published or private.startswith(published + "/") or published.startswith(private + "/"):
            raise DeploymentError("Le dossier privé recoupe un dossier publié par OVH.")
    site = urllib.parse.urlsplit(env["SITE_URL"])
    if site.scheme != "https" or site.hostname != "rfielbal.fr" or site.port not in (None, 443) or site.username or site.password or site.path not in ("", "/") or site.query or site.fragment:
        raise DeploymentError("L’URL publique attendue est https://rfielbal.fr.")
    return {"host": host, "port": port, "user": env["OVH_SFTP_USER"], "web": web, "private": private, "site": "https://rfielbal.fr"}


def connect(conf, env):
    import paramiko
    client = paramiko.SSHClient()
    for line in env["OVH_KNOWN_HOSTS"].splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        try:
            entry = paramiko.hostkeys.HostKeyEntry.from_line(line.strip())
            if entry:
                for host in entry.hostnames:
                    client.get_host_keys().add(host, entry.key.get_name(), entry.key)
        except Exception:
            raise DeploymentError("Le secret OVH_KNOWN_HOSTS est invalide.") from None
    if not client.get_host_keys().lookup(conf["host"]):
        raise DeploymentError("Aucune clé de serveur vérifiée ne correspond au serveur OVH.")
    client.set_missing_host_key_policy(paramiko.RejectPolicy())
    try:
        client.connect(conf["host"], port=conf["port"], username=conf["user"],
                       password=env["OVH_SFTP_PASSWORD"], allow_agent=False,
                       look_for_keys=False, timeout=20, banner_timeout=20, auth_timeout=20)
        sftp = client.open_sftp()
        sftp.get_channel().settimeout(30)
        return client, sftp
    except Exception:
        client.close()
        raise DeploymentError("Connexion SFTP refusée : vérifier la clé du serveur, les identifiants et l’accès OVH.") from None


def existing(sftp, path):
    try:
        return sftp.lstat(path)
    except OSError as error:
        if error.errno == errno.ENOENT:
            return None
        raise


def directory(sftp, home: str, relative: str, *, create=False, private=False) -> str:
    relative_path(relative)
    current = home
    for part in relative.split("/"):
        current += "/" + part
        metadata = existing(sftp, current)
        if metadata is None and create:
            sftp.mkdir(current, 0o700 if private else 0o755)
            metadata = sftp.lstat(current)
        if metadata is None or not stat.S_ISDIR(metadata.st_mode):
            raise DeploymentError("Dossier distant absent, invalide ou symbolique.")
        if private and metadata.st_mode & 0o077:
            raise DeploymentError("Le dossier de préparation doit être privé (permissions 700).")
    return current


def remote_hash(sftp, path):
    metadata = existing(sftp, path)
    if metadata is None:
        return None
    if not stat.S_ISREG(metadata.st_mode):
        raise DeploymentError("Un fichier distant n’est pas un fichier ordinaire.")
    with sftp.open(path, "rb") as handle:
        return digest_stream(handle)


def copy_remote(sftp, source: str, target: str, mode: int):
    with sftp.open(source, "rb") as incoming, sftp.open(target, "wx") as outgoing:
        shutil.copyfileobj(incoming, outgoing, length=1024 * 1024)
    sftp.chmod(target, mode)


class Publication:
    def __init__(self, sftp, conf, folder: Path, run: str):
        self.sftp, self.conf, self.folder = sftp, conf, folder
        self.home = sftp.normalize(".").rstrip("/")
        if not self.home.startswith("/") or self.home in ("", "/"):
            raise DeploymentError("La racine du compte SFTP n’a pas pu être identifiée.")
        self.web = directory(sftp, self.home, conf["web"])
        self.private = directory(sftp, self.home, conf["private"], create=True, private=True)
        self.run = relative_path(run)
        if "/" in self.run:
            raise DeploymentError("Identifiant de publication invalide.")
        if existing(sftp, self.private + "/" + self.run):
            raise DeploymentError("Cette tentative possède déjà une sauvegarde : utiliser une nouvelle tentative GitHub.")
        self.base = directory(sftp, self.home, conf["private"] + "/" + self.run, create=True, private=True)
        self.changed = []

    def guard_roots(self):
        # Recheck from the account root, not from a cached path which could
        # have become a symlink during another maintenance operation.
        directory(self.sftp, self.home, self.conf["web"])
        directory(self.sftp, self.home, self.conf["private"] + "/" + self.run, private=True)

    def write(self, before_commit=None):
        self.guard_roots()
        files = [p for p in self.folder.rglob("*") if p.is_file()]
        # Assets first; HTML and server rules later; the release marker is last.
        files.sort(key=lambda p: (3 if p.relative_to(self.folder).as_posix() == MANIFEST else 2 if p.name == ".htaccess" else 1 if p.suffix == ".html" else 0, p.as_posix()))
        prepared = []
        for local in files:
            self.guard_roots()
            name = relative_path(local.relative_to(self.folder).as_posix())
            if name != MANIFEST and not allowed(name):
                raise DeploymentError("Le paquet contient un fichier non public.")
            parent = str(PurePosixPath(name).parent)
            if parent != ".":
                directory(self.sftp, self.web, parent, create=True)
            target = self.web + "/" + name
            old = existing(self.sftp, target)
            before = remote_hash(self.sftp, target)
            after = digest(local)
            if before == after:
                continue
            stage_parent = "staging" + ("/" + parent if parent != "." else "")
            backup_parent = "backup" + ("/" + parent if parent != "." else "")
            directory(self.sftp, self.base, stage_parent, create=True, private=True)
            stage = self.base + "/staging/" + name
            mode = stat.S_IMODE(old.st_mode) if old else 0o644
            if mode & 0o7000:
                raise DeploymentError("Permissions spéciales non prises en charge.")
            self.sftp.put(str(local), stage, confirm=True)
            self.sftp.chmod(stage, mode)
            if remote_hash(self.sftp, stage) != after:
                raise DeploymentError("Le fichier préparé n’a pas le contenu attendu.")
            backup = None
            if old:
                directory(self.sftp, self.base, backup_parent, create=True, private=True)
                backup = self.base + "/backup/" + name
                copy_remote(self.sftp, target, backup, 0o600)
                if remote_hash(self.sftp, backup) != before:
                    raise DeploymentError("Le fichier distant a changé pendant sa sauvegarde.")
            prepared.append((name, target, stage, backup, mode, before, after))
        if before_commit:
            before_commit()
        for item in prepared:
            self.guard_roots()
            name, target, stage, backup, mode, before, after = item
            parent = str(PurePosixPath(name).parent)
            if parent != ".":
                directory(self.sftp, self.web, parent)
            if remote_hash(self.sftp, target) != before:
                raise DeploymentError("Un fichier a été modifié pendant la publication. Publication interrompue.")
            # Record intent before the server acts: a lost reply does not prove
            # that the atomic replacement did not happen.
            self.changed.append(item)
            if before is None:
                self.sftp.rename(stage, target)
            else:
                # Fail safely when the server has no atomic replacement extension.
                self.sftp.posix_rename(stage, target)
        print(f"Transfert : {len(prepared)} fichiers remplacés ou ajoutés ; autres fichiers conservés.")

    def rollback(self):
        failed = 0
        for name, target, stage, backup, mode, before, after in reversed(self.changed):
            try:
                self.guard_roots()
                parent = str(PurePosixPath(name).parent)
                if parent != ".":
                    directory(self.sftp, self.web, parent)
                current = remote_hash(self.sftp, target)
                if current == before:
                    continue
                if current != after:
                    raise DeploymentError("Une modification concurrente empêche la restauration.")
                if backup:
                    restore = self.base + "/restore-" + hashlib.sha256(name.encode()).hexdigest()
                    copy_remote(self.sftp, backup, restore, mode)
                    self.sftp.posix_rename(restore, target)
                else:
                    self.sftp.remove(target)
            except (RestorationTimeout, DeploymentInterrupted):
                raise
            except Exception:
                failed += 1
        if failed:
            raise DeploymentError(f"Restauration incomplète ({failed} fichier(s)). Sauvegardes privées conservées ; intervention nécessaire.")
        print("Restauration terminée : fichiers précédents rétablis, sauvegardes privées conservées.")


def bounded_restore(publication, seconds=30):
    """A failed connection must not leave the runner stuck during restoration."""
    def expired(signum, frame):
        raise RestorationTimeout("Délai de restauration dépassé ; sauvegardes privées conservées, état distant à vérifier.")
    previous_handler = signal.getsignal(signal.SIGALRM)
    previous_timer = signal.setitimer(signal.ITIMER_REAL, 0)
    signal.signal(signal.SIGALRM, expired)
    signal.setitimer(signal.ITIMER_REAL, seconds)
    try:
        publication.rollback()
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, previous_handler)
        signal.setitimer(signal.ITIMER_REAL, *previous_timer)


class SameOriginRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if urllib.parse.urlsplit(req.full_url)[:2] != urllib.parse.urlsplit(newurl)[:2]:
            raise DeploymentError("La vérification HTTP refuse une redirection vers un autre site.")
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def http_file(site: str, path: str, nonce: str, maximum: int) -> bytes:
    url = site + "/" + urllib.parse.quote(path, safe="/.-") + "?visionbuild=" + urllib.parse.quote(nonce)
    request = urllib.request.Request(url, headers={"Cache-Control": "no-cache", "Accept-Encoding": "identity", "User-Agent": "VisionBuild-deployment/1"})
    with urllib.request.build_opener(SameOriginRedirect()).open(request, timeout=30) as response:
        content = response.read(maximum + 1)
        if response.status != 200 or len(content) > maximum:
            raise DeploymentError("Réponse HTTP inattendue pendant la vérification.")
        return content


def verify(site: str, manifest: dict, read=http_file) -> int:
    nonce = manifest["sha"] + "-" + str(time.time_ns())
    expected_manifest = json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
    raw = read(site, MANIFEST, nonce, len(expected_manifest.encode()))
    if raw != expected_manifest.encode():
        raise DeploymentError("Le manifeste public ne correspond pas au commit publié.")
    critical = [f for f in manifest["files"] if f["path"].endswith(".html") or ("/" not in f["path"] and f["path"] != ".htaccess")]
    if not any(f["path"] == "index.html" for f in critical):
        raise DeploymentError("L’accueil manque dans la vérification HTTP.")
    for file in critical:
        raw = read(site, file["path"], nonce, file["size"])
        if hashlib.sha256(raw).hexdigest() != file["sha256"]:
            raise DeploymentError("Le contenu public ne correspond pas aux fichiers préparés.")
    return len(critical)


def github(path: str, body: dict | None, env) -> dict:
    # Only this fixed repository is contacted; the token never reaches a site URL.
    request = urllib.request.Request("https://api.github.com/repos/rfielbal/Portfolio/" + path,
        data=json.dumps(body).encode() if body is not None else None, method="POST" if body is not None else "GET",
        headers={"Authorization": "Bearer " + env["GH_TOKEN"], "Accept": "application/vnd.github+json", "Content-Type": "application/json", "X-GitHub-Api-Version": "2026-03-10"})
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *args, **kwargs):
            raise DeploymentError("Redirection GitHub refusée.")
    with urllib.request.build_opener(NoRedirect()).open(request, timeout=30) as response:
        return json.load(response)


def require_current_main(sha: str, env):
    current = github("git/ref/heads/main", None, env)
    if current.get("object", {}).get("sha") != sha:
        raise DeploymentError("Ce workflow est dépassé : main contient un commit plus récent. Lancer la publication du dernier commit de main.")


def deploy(folder: Path, env):
    conf = config(env)
    manifest = json.loads((folder / MANIFEST).read_text())
    if manifest["sha"] != env["GITHUB_SHA"]:
        raise DeploymentError("Le paquet ne correspond pas au commit du workflow.")
    require_current_main(manifest["sha"], env)
    run_id = env.get("GITHUB_RUN_ID", "")
    attempt = env.get("GITHUB_RUN_ATTEMPT", "")
    if not run_id.isdigit() or not attempt.isdigit():
        raise DeploymentError("Tentative GitHub non identifiée.")
    run_url = f"https://github.com/rfielbal/Portfolio/actions/runs/{run_id}"
    deployment = github("deployments", {"ref": manifest["sha"], "auto_merge": False, "required_contexts": [], "environment": "production", "production_environment": True, "description": "Portfolio sur OVH", "payload": {"verification": "visionbuild-http-v1"}}, env)
    deployment_id = deployment.get("id")
    if not isinstance(deployment_id, int) or deployment_id < 1:
        raise DeploymentError("Le suivi GitHub du déploiement n’a pas pu être créé.")
    def report(state, description):
        github(f"deployments/{deployment_id}/statuses", {"state": state, "description": description, "environment": "production", "environment_url": conf["site"], "log_url": run_url, "auto_inactive": False}, env)
    client = sftp = publication = None
    verified = False
    try:
        report("in_progress", "Transfert SFTP puis contrôle du contenu HTTPS")
        client, sftp = connect(conf, env)
        publication = Publication(sftp, conf, folder, f"{run_id}-{attempt}-{manifest['sha'][:12]}")
        publication.write(before_commit=lambda: require_current_main(manifest["sha"], env))
        checked = verify(conf["site"], manifest)
        verified = True
        report("success", f"Commit vérifié en HTTPS : manifeste et {checked} fichiers essentiels")
        print(f"Publication confirmée en HTTPS : {manifest['sha'][:12]}.")
    except (Exception, KeyboardInterrupt) as error:
        if verified:
            raise DeploymentError("Site publié et vérifié en HTTPS, mais notification GitHub incertaine. Aucun retour arrière automatique ; vérifier le manifeste public et le statut GitHub.") from None
        rollback_error = None
        if publication:
            try:
                bounded_restore(publication, 8 if isinstance(error, (KeyboardInterrupt, DeploymentInterrupted)) else 30)
            except Exception as error:
                rollback_error = error
        try:
            report("failure", "Publication non validée" + (" ; restauration à vérifier" if rollback_error else " ; version précédente conservée ou restaurée"))
        except Exception:
            print("Le statut GitHub n’a pas pu être actualisé ; consulter ce journal.", file=sys.stderr)
        if rollback_error:
            raise rollback_error
        raise
    finally:
        if sftp:
            sftp.close()
        if client:
            client.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=("pack", "deploy"))
    args = parser.parse_args()
    target = ROOT / "output/ovh-site"
    def interrupted(signum, frame):
        raise DeploymentInterrupted("Publication interrompue : vérifier la restauration et le statut GitHub.")
    for signum in (signal.SIGINT, signal.SIGTERM):
        signal.signal(signum, interrupted)
    try:
        if args.command == "pack":
            sha = os.environ.get("GITHUB_SHA") or subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip()
            run_id = os.environ.get("GITHUB_RUN_ID", "")
            run_url = f"https://github.com/rfielbal/Portfolio/actions/runs/{run_id}" if run_id.isdigit() else ""
            pack(ROOT, target, sha, run_url)
        else:
            deploy(target, os.environ)
    except DeploymentError as error:
        print(str(error), file=sys.stderr)
        return 1
    except Exception as error:
        # Do not echo request objects, credentials, headers or response bodies.
        print(f"La publication a échoué ({type(error).__name__}). Aucun succès ne sera annoncé.", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
