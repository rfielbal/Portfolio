#!/usr/bin/env python3
"""Build the isolated portfolio demo without modifying the CookingNinja checkout."""

import argparse
import io
import json
from pathlib import Path
import shutil
import subprocess
import tarfile
import tempfile

SOURCE_COMMIT = "11b22b57624766023717b35a30d1227599912546"
ROOT = Path(__file__).resolve().parent


def run(*command, cwd):
    subprocess.run(command, cwd=cwd, check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Local CookingNinja Git checkout")
    parser.add_argument("--output", type=Path, help="New, empty output directory (optional)")
    args = parser.parse_args()
    source = args.source.resolve()
    dependencies = source / "node_modules"
    if not (dependencies / ".bin/vite").exists():
        parser.error("The CookingNinja dependencies must already be installed.")
    if args.output and args.output.exists():
        parser.error("Output already exists; choose a new directory to preserve its contents.")

    # Export only the pinned public source. Never copy data, certificates, .env,
    # untracked files, screenshots, Git metadata or the 31 MB stand movie.
    paths = ["src", "shared", "server", "tests", "scripts", "public/audio",
             "public/favicon.svg", "package.json", "package-lock.json", "tsconfig.json",
             "vite.config.ts", "index.html", ".prettierrc.json", ".prettierignore"]
    archive = subprocess.check_output(["git", "archive", SOURCE_COMMIT, *paths], cwd=source)
    stage = Path(tempfile.mkdtemp(prefix="cooking-portfolio-demo-", dir="/tmp"))
    with tarfile.open(fileobj=io.BytesIO(archive)) as files:
        for member in files.getmembers():
            if member.issym() or member.islnk() or member.name.startswith("/") or ".." in Path(member.name).parts:
                raise RuntimeError("Unexpected archive entry")
        files.extractall(stage, filter="data")

    # Dependencies are read only. Vite's runner loader avoids writing temporary
    # bundled configuration into the original node_modules directory.
    (stage / "node_modules").symlink_to(dependencies, target_is_directory=True)
    lock = json.loads((stage / "package-lock.json").read_text())
    for package in ("vite", "typescript", "react", "react-dom", "three", "lucide-react"):
        actual = json.loads((dependencies / package / "package.json").read_text())["version"]
        expected = lock["packages"]["node_modules/" + package]["version"]
        if actual != expected:
            raise RuntimeError(f"Dependency {package}: installed {actual}, expected {expected}")

    run("git", "apply", "--check", str(ROOT / "portfolio-demo.patch"), cwd=stage)
    run("git", "apply", str(ROOT / "portfolio-demo.patch"), cwd=stage)
    run(str(stage / "node_modules/.bin/tsc"), "--noEmit", cwd=stage)
    run(str(stage / "node_modules/.bin/prettier"), "--check", "src", "server", "shared",
        "scripts", "tests", "vite.config.ts", "tsconfig.json", "package.json", cwd=stage)
    run(str(stage / "node_modules/.bin/vite"), "build", "--mode", "portfolio-demo",
        "--configLoader", "runner", cwd=stage)

    licenses = stage / "dist/licenses"
    licenses.mkdir()
    for package in ("react", "react-dom", "three", "lucide-react", "@fontsource/outfit", "@fontsource/dm-sans"):
        package_dir = dependencies / package
        candidates = [package_dir / "LICENSE", package_dir / "LICENSE.md"]
        license_file = next((item for item in candidates if item.is_file()), None)
        if license_file is None:
            raise RuntimeError(f"Missing license for {package}")
        shutil.copy2(license_file, licenses / (package.replace("/", "-").lstrip("@") + ".txt"))

    output = args.output.resolve() if args.output else stage / "dist"
    if args.output:
        shutil.copytree(stage / "dist", output)
    files = [item for item in output.rglob("*") if item.is_file()]
    print(json.dumps({"source_commit": SOURCE_COMMIT, "staging": str(stage),
                      "output": str(output), "files": len(files),
                      "bytes": sum(item.stat().st_size for item in files)}, indent=2))


if __name__ == "__main__":
    main()
