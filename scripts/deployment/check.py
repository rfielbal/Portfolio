#!/usr/bin/env python3
"""Syntax checks for JavaScript actually selected for the public site."""
import subprocess
from deploy import ROOT, allowed

paths = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0")
scripts = [name for name in paths if name and allowed(name) and name.endswith(".js")]
for script in scripts:
    subprocess.run(["node", "--check", str(ROOT / script)], check=True)
print(f"Syntaxe JavaScript valide : {len(scripts)} scripts publics.")
