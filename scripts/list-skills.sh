#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"

echo "Skills in $REPO/skills:"
echo ""

while IFS= read -r -d '' skill_md; do
  dir="$(dirname "$skill_md")"
  name="$(basename "$dir")"
  bucket="$(basename "$(dirname "$dir")")"
  echo "  [$bucket] $name  ($dir)"
done < <(find "$REPO/skills" -name SKILL.md -not -path '*/node_modules/*' -print0 | sort -z)
