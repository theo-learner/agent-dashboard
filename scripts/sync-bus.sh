#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/home/theo/agent-dashboard"
BUS_SRC="/home/theo/.openclaw/workspace-attendant/bus/agent-bus.jsonl"
BUS_DST="$REPO_DIR/public/data/bus-sample.jsonl"

cp "$BUS_SRC" "$BUS_DST"

cd "$REPO_DIR"
git add public/data/bus-sample.jsonl
git diff --cached --quiet && echo "No changes" && exit 0

git commit -m "sync: update bus-sample.jsonl $(date +%Y-%m-%dT%H:%M)"
git push
~/.npm-global/bin/vercel deploy --prod --token="${VERCEL_TOKEN:?Set VERCEL_TOKEN env var}"
