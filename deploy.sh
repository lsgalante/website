#!/bin/sh
# Deploy lucas.co to Cloudflare Pages (direct upload, project "lucas-co").
# Deploys the committed tree (HEAD), not the working directory.
set -e

BASE=$(dirname "$(readlink -f "$0")")
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT

git -C "$BASE" archive HEAD | tar -x -C "$STAGE"
npx wrangler pages deploy "$STAGE" --project-name=lucas-co --branch=main --commit-dirty=true
