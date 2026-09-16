#!/usr/bin/env bash
set -euo pipefail

FORCE=false
for arg in "$@"; do
  case "$arg" in
    --force|-f) FORCE=true ;;
  esac
done

resolve_path() {
  if command -v realpath &>/dev/null; then
    realpath "$1"
  elif command -v python3 &>/dev/null; then
    python3 -c "import os,sys; print(os.path.realpath(sys.argv[1]))" "$1"
  elif command -v perl &>/dev/null; then
    perl -MCwd -e 'print Cwd::realpath($ARGV[0])' "$1"
  else
    readlink "$1"
  fi
}

REPO="$(cd "$(dirname "$0")/.." && pwd)"
# Multi-harness destinations. All five harnesses converge on .agents/skills;
# Claude also reads ~/.claude/skills, OpenCode also reads ~/.config/opencode/skills,
# Codex also accepts ~/.codex/skills (deprecated alias), Antigravity also reads ~/.gemini/antigravity/skills.
DESTS=("$HOME/.claude/skills" "$HOME/.agents/skills" "$HOME/.config/opencode/skills" "$HOME/.codex/skills" "$HOME/.gemini/antigravity/skills")

names=()
srcs=()
while IFS= read -r -d '' skill_md; do
  src="$(dirname "$skill_md")"
  names+=("$(basename "$src")")
  srcs+=("$src")
done < <(find "$REPO/skills" -name SKILL.md -not -path '*/node_modules/*' -not -path '*/deprecated/*' -print0)

for DEST in "${DESTS[@]}"; do
  if [ -L "$DEST" ]; then
    resolved="$(resolve_path "$DEST")"
    case "$resolved" in
      "$REPO"|"$REPO"/*)
        echo "error: $DEST is a symlink into this repo ($resolved)." >&2
        echo "Remove it (rm \"$DEST\") and re-run; the script will recreate it as a real dir." >&2
        exit 1
        ;;
    esac
  fi

  mkdir -p "$DEST"

  for i in "${!names[@]}"; do
    name="${names[$i]}"
    src="${srcs[$i]}"
    target="$DEST/$name"

    if [ -e "$target" ] && [ ! -L "$target" ]; then
      if [ "$FORCE" = true ]; then
        backup="$target.bak.$(date +%s)"
        echo "backing up $target -> $backup"
        mv "$target" "$backup"
      else
        echo "warning: $target exists and is not a symlink - skipping (use --force to overwrite)" >&2
        continue
      fi
    fi

    ln -sfn "$src" "$target"
    echo "linked $name -> $src ($DEST)"
  done
done
