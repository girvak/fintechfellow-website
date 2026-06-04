#!/usr/bin/env bash
# Stop running Docker stack (or local dev), rebuild Astro site, start again.
#
# Usage:
#   ./scripts/redeploy.sh              # docker compose: down → build → up
#   ./scripts/redeploy.sh --no-cache   # full image rebuild (no Docker layer cache)
#   ./scripts/redeploy.sh --dev        # local: stop dev server → npm run build → npm run preview
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$SITE_DIR"

NO_CACHE=false
MODE="docker"

for arg in "$@"; do
  case "$arg" in
    --no-cache) NO_CACHE=true ;;
    --dev) MODE="dev" ;;
    -h | --help)
      sed -n '3,8p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Unknown option: $arg (try --help)" >&2
      exit 1
      ;;
  esac
done

stop_port() {
  local port="$1"
  local label="$2"
  if ! command -v lsof >/dev/null 2>&1; then
    return 0
  fi
  local pids
  pids="$(lsof -ti ":$port" 2>/dev/null || true)"
  if [[ -n "$pids" ]]; then
    echo "→ Stopping $label on port $port..."
    # shellcheck disable=SC2086
    kill $pids 2>/dev/null || true
    sleep 1
  fi
}

if [[ "$MODE" == "dev" ]]; then
  echo "→ Local preview redeploy"
  stop_port 4321 "Astro dev"
  stop_port 4322 "Astro preview"
  npm run build
  echo "→ Starting preview server..."
  exec npm run preview -- --host
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed or not in PATH." >&2
  exit 1
fi

COMPOSE="docker compose"
if ! $COMPOSE version >/dev/null 2>&1; then
  echo "docker compose (v2) is required." >&2
  exit 1
fi

echo "→ Stopping Docker stack..."
$COMPOSE down --remove-orphans 2>/dev/null || true

# Astro dev sometimes runs alongside Docker during development
stop_port 4321 "Astro dev"

BUILD_ARGS=()
if [[ "$NO_CACHE" == true ]]; then
  BUILD_ARGS+=(--no-cache)
  echo "→ Building image (no cache)..."
else
  echo "→ Building image..."
fi

$COMPOSE build "${BUILD_ARGS[@]}"

echo "→ Starting containers..."
$COMPOSE up -d

echo ""
$COMPOSE ps
echo ""
echo "✓ Site ready at http://localhost:8080"
