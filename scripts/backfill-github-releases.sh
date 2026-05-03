#!/usr/bin/env bash
set -euo pipefail

# Backfill GitHub Releases for existing backend/v* tags.
# Skips any tag that already has a release.
#
# Release notes source:
#   1. If website/content/blog/v<version>.mdx exists, use its body (after frontmatter).
#   2. Otherwise, fall back to gh's --generate-notes (commits since previous tag).
#
# Requirements: gh CLI authenticated (`gh auth status`).
# Usage: scripts/backfill-github-releases.sh [--dry-run]

DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "error: gh CLI not found" >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "error: gh CLI not authenticated. Run: gh auth login" >&2
  exit 1
fi

REPO_ROOT="$(git rev-parse --show-toplevel)"
BLOG_DIR="$REPO_ROOT/website/content/blog"

TAGS=()
while IFS= read -r line; do
  TAGS+=("$line")
done < <(git tag --list 'backend/v*' --sort=version:refname)

if [[ ${#TAGS[@]} -eq 0 ]]; then
  echo "no backend/v* tags found"
  exit 0
fi

# Strip YAML frontmatter from a blog post (everything after the second `---`).
extract_blog_body() {
  local file="$1"
  awk '
    BEGIN { state = 0 }
    /^---[[:space:]]*$/ {
      if (state == 0) { state = 1; next }
      if (state == 1) { state = 2; next }
    }
    state == 2 { print }
  ' "$file"
}

PREV_TAG=""
for TAG in "${TAGS[@]}"; do
  VERSION="${TAG#backend/v}"
  TITLE="Backend v${VERSION}"
  BLOG_FILE="$BLOG_DIR/v${VERSION}.mdx"

  if gh release view "$TAG" >/dev/null 2>&1; then
    echo "skip ${TAG} (release already exists)"
    PREV_TAG="$TAG"
    continue
  fi

  if [[ -f "$BLOG_FILE" ]]; then
    NOTES_SOURCE="blog: $(basename "$BLOG_FILE")"
  else
    NOTES_SOURCE="auto-generated (no blog post found)"
  fi

  echo "create ${TAG} -> '${TITLE}' [${NOTES_SOURCE}]"

  if [[ $DRY_RUN -eq 1 ]]; then
    PREV_TAG="$TAG"
    continue
  fi

  if [[ -f "$BLOG_FILE" ]]; then
    NOTES="$(extract_blog_body "$BLOG_FILE")"
    if [[ -z "${NOTES//[[:space:]]/}" ]]; then
      NOTES="$TITLE"
    fi
    gh release create "$TAG" --title "$TITLE" --notes "$NOTES"
  else
    ARGS=(release create "$TAG" --title "$TITLE" --generate-notes)
    if [[ -n "$PREV_TAG" ]]; then
      ARGS+=(--notes-start-tag "$PREV_TAG")
    fi
    gh "${ARGS[@]}"
  fi

  PREV_TAG="$TAG"
done

echo "done."
