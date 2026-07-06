#!/usr/bin/env bash
set -euo pipefail
required=(package.json app/layout.tsx app/admin/page.tsx prisma/schema.prisma prisma/seed.ts README.md)
for f in "${required[@]}"; do
  test -f "$f" || { echo "Missing $f"; exit 1; }
done
echo "Aurora starter project structure looks OK."
