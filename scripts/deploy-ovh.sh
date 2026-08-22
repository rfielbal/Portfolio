#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MANIFEST="$PROJECT_ROOT/deploy/ovh-allowlist.txt"
MODE="dry-run"
TEMP_ROOT=""

usage() {
  cat <<'EOF'
Usage : scripts/deploy-ovh.sh [--dry-run | --apply]

  --dry-run  Valide et affiche exactement les fichiers à publier (défaut).
  --apply    Publie la liste blanche en FTPS. Ne supprime rien sur le serveur.

Variables requises avec --apply :
  OVH_FTP_HOST
  OVH_FTP_USER
  OVH_FTP_PASSWORD

Variables facultatives :
  OVH_FTP_PORT    Port FTPS explicite (21 par défaut)
  OVH_REMOTE_DIR  Dossier distant (/www par défaut)
EOF
}

fail() {
  printf 'Erreur : %s\n' "$*" >&2
  exit 1
}

cleanup() {
  if [[ -n "${TEMP_ROOT:-}" && -d "$TEMP_ROOT" ]]; then
    case "$TEMP_ROOT" in
      "${TMPDIR:-/tmp}"/portfolio-ovh.*)
        rm -rf -- "$TEMP_ROOT"
        ;;
      *)
        printf 'Nettoyage ignoré pour un chemin temporaire inattendu : %s\n' "$TEMP_ROOT" >&2
        ;;
    esac
  fi
}

trim() {
  local value="$1"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "$value"
}

validate_relative_path() {
  local relative_path="$1"

  [[ -n "$relative_path" ]] || fail "entrée vide dans la liste blanche"
  [[ "$relative_path" != /* ]] || fail "chemin absolu interdit : $relative_path"
  [[ "$relative_path" =~ ^[A-Za-z0-9._/-]+$ ]] || fail "caractère non sûr dans : $relative_path"

  case "/$relative_path/" in
    *"/../"*|*"/./"*)
      fail "traversée de chemin interdite : $relative_path"
      ;;
    *"/.git/"*|*"/.playwright-cli/"*|*"/.vscode/"*|*"/output/"*|*"/tmp/"*|*"/source/"*)
      fail "répertoire non publiable : $relative_path"
      ;;
  esac
}

copy_allowlisted_entry() {
  local relative_path="$1"
  local source_path="$PROJECT_ROOT/$relative_path"
  local destination_path="$STAGING_DIR/$relative_path"
  local discovered_path=""
  local relative_child=""
  local destination_child=""

  [[ -e "$source_path" ]] || fail "fichier absent : $relative_path"
  [[ ! -L "$source_path" ]] || fail "lien symbolique interdit : $relative_path"

  if [[ -d "$source_path" ]]; then
    mkdir -p "$destination_path"
    while IFS= read -r discovered_path; do
      relative_child="${discovered_path#"$source_path/"}"
      destination_child="$destination_path/$relative_child"

      [[ ! -L "$discovered_path" ]] || fail "lien symbolique interdit : ${discovered_path#"$PROJECT_ROOT/"}"
      if [[ -d "$discovered_path" ]]; then
        mkdir -p "$destination_child"
      elif [[ -f "$discovered_path" ]]; then
        mkdir -p "$(dirname "$destination_child")"
        cp -p "$discovered_path" "$destination_child"
      else
        fail "type de fichier non pris en charge : ${discovered_path#"$PROJECT_ROOT/"}"
      fi
    done < <(
      find "$source_path" -mindepth 1 \
        \( -type d \( \
          -name .git -o \
          -name .playwright-cli -o \
          -name .vscode -o \
          -name output -o \
          -name tmp -o \
          -name source \
        \) -prune \) -o -print
    )
  elif [[ -f "$source_path" ]]; then
    mkdir -p "$(dirname "$destination_path")"
    cp -p "$source_path" "$destination_path"
  else
    fail "type de fichier non pris en charge : $relative_path"
  fi
}

netrc_quote() {
  local value="$1"
  value="${value//\\/\\\\}"
  value="${value//\"/\\\"}"
  printf '"%s"' "$value"
}

for argument in "$@"; do
  case "$argument" in
    --dry-run)
      MODE="dry-run"
      ;;
    --apply)
      MODE="apply"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage >&2
      fail "option inconnue : $argument"
      ;;
  esac
done

[[ -f "$MANIFEST" ]] || fail "liste blanche introuvable : $MANIFEST"
command -v git >/dev/null 2>&1 || fail "git est requis pour vérifier les fichiers publiés"
command -v node >/dev/null 2>&1 || fail "node est requis pour vérifier la CSP"
git -C "$PROJECT_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1 \
  || fail "le script doit être exécuté depuis un clone Git valide"
node "$PROJECT_ROOT/scripts/verify-csp.mjs"

if [[ "$MODE" == "apply" && -n "$(git -C "$PROJECT_ROOT" status --porcelain --untracked-files=all)" ]]; then
  fail "publication refusée : le worktree Git contient des changements non commités"
fi

TEMP_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/portfolio-ovh.XXXXXX")"
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
STAGING_DIR="$TEMP_ROOT/site"
FILE_LIST="$TEMP_ROOT/files.txt"
UPLOAD_LIST="$TEMP_ROOT/upload-order.txt"
mkdir -p "$STAGING_DIR"

while IFS= read -r raw_line || [[ -n "$raw_line" ]]; do
  manifest_entry="${raw_line%%#*}"
  manifest_entry="$(trim "$manifest_entry")"
  [[ -n "$manifest_entry" ]] || continue
  manifest_entry="${manifest_entry%/}"
  validate_relative_path "$manifest_entry"
  copy_allowlisted_entry "$manifest_entry"
done < "$MANIFEST"

# Les métadonnées Finder ne sont jamais utiles en production.
find "$STAGING_DIR" -type f -name '.DS_Store' -delete

for forbidden_name in .git .playwright-cli .vscode output tmp source; do
  forbidden_path="$(find "$STAGING_DIR" -type d -name "$forbidden_name" -print -quit)"
  [[ -z "$forbidden_path" ]] || fail "contenu interdit dans le paquet : ${forbidden_path#"$STAGING_DIR/"}"
done

find "$STAGING_DIR" -type f -print | LC_ALL=C sort > "$FILE_LIST"
[[ -s "$FILE_LIST" ]] || fail "la liste blanche ne produit aucun fichier"

file_count=0
total_bytes=0
while IFS= read -r staged_file; do
  relative_file="${staged_file#"$STAGING_DIR/"}"
  validate_relative_path "$relative_file"
  git -C "$PROJECT_ROOT" ls-files --error-unmatch -- "$relative_file" >/dev/null 2>&1 \
    || fail "fichier non suivi par Git interdit dans le paquet : $relative_file"
  file_size="$(wc -c < "$staged_file" | tr -d '[:space:]')"
  file_count=$((file_count + 1))
  total_bytes=$((total_bytes + file_size))
  printf '%s\n' "$relative_file"
done < "$FILE_LIST"

printf '\nPaquet validé : %d fichiers, %d octets.\n' "$file_count" "$total_bytes"

if [[ "$MODE" == "dry-run" ]]; then
  printf 'Simulation terminée : aucun fichier n’a été envoyé.\n'
  exit 0
fi

for required_variable in OVH_FTP_HOST OVH_FTP_USER OVH_FTP_PASSWORD; do
  [[ -n "${!required_variable:-}" ]] || fail "$required_variable est requis avec --apply"
done

OVH_FTP_PORT="${OVH_FTP_PORT:-21}"
OVH_REMOTE_DIR="${OVH_REMOTE_DIR:-/www}"

[[ "$OVH_FTP_HOST" =~ ^[A-Za-z0-9.-]+$ ]] || fail "OVH_FTP_HOST invalide"
[[ "$OVH_FTP_PORT" =~ ^[0-9]+$ ]] || fail "OVH_FTP_PORT invalide"
[[ "$OVH_REMOTE_DIR" =~ ^/[A-Za-z0-9._/-]+$ ]] || fail "OVH_REMOTE_DIR invalide"
[[ "$OVH_REMOTE_DIR" != "/" ]] || fail "le déploiement à la racine FTP est interdit"
case "/${OVH_REMOTE_DIR#/}/" in
  *"/../"*|*"/./"*) fail "OVH_REMOTE_DIR contient un segment interdit" ;;
esac

command -v curl >/dev/null 2>&1 || fail "curl est requis pour publier"

# Publish assets first, then entry pages, and activate the final Apache policy
# last. All executable boot code lives in external files, so a CSP hash change
# can at most affect non-executable JSON-LD during this short final transition.
: > "$UPLOAD_LIST"
while IFS= read -r staged_file; do
  relative_file="${staged_file#"$STAGING_DIR/"}"
  case "$relative_file" in
    .htaccess|index.html|veille.html) ;;
    *) printf '%s\n' "$staged_file" >> "$UPLOAD_LIST" ;;
  esac
done < "$FILE_LIST"

for entry_file in index.html veille.html .htaccess; do
  [[ -f "$STAGING_DIR/$entry_file" ]] && printf '%s\n' "$STAGING_DIR/$entry_file" >> "$UPLOAD_LIST"
done

NETRC_FILE="$TEMP_ROOT/credentials.netrc"
umask 077
{
  printf 'machine %s\n' "$OVH_FTP_HOST"
  printf 'login %s\n' "$(netrc_quote "$OVH_FTP_USER")"
  printf 'password %s\n' "$(netrc_quote "$OVH_FTP_PASSWORD")"
} > "$NETRC_FILE"

remote_root="${OVH_REMOTE_DIR#/}"
remote_root="${remote_root%/}"

printf 'Publication FTPS vers %s/%s (sans suppression distante)…\n' "$OVH_FTP_HOST" "$remote_root"
while IFS= read -r staged_file; do
  relative_file="${staged_file#"$STAGING_DIR/"}"
  printf 'Envoi : %s\n' "$relative_file"
  curl \
    --fail \
    --show-error \
    --silent \
    --ssl-reqd \
    --ftp-create-dirs \
    --retry 2 \
    --connect-timeout 20 \
    --netrc-file "$NETRC_FILE" \
    --upload-file "$staged_file" \
    "ftp://${OVH_FTP_HOST}:${OVH_FTP_PORT}/${remote_root}/${relative_file}"
done < "$UPLOAD_LIST"

printf 'Publication terminée : %d fichiers envoyés, aucune suppression distante.\n' "$file_count"
