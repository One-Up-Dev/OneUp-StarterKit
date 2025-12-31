#!/bin/bash
# Manual cleanup of development processes
# Run this if you need to reset your dev environment

echo "🧹 Cleaning up development processes..."

# Kill Next.js dev server
pkill -f "next.*dev" 2>/dev/null && echo "✓ Killed Next.js dev server" || echo "  No Next.js dev server running"

# Kill any node processes running on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null && echo "✓ Killed processes on port 3000" || echo "  No processes on port 3000"

# Stop PostgreSQL container if using docker directly
docker stop starterkit-postgres 2>/dev/null && echo "✓ Stopped PostgreSQL container" || echo "  No starterkit-postgres container"

# Stop docker-compose services
if [ -f docker-compose.yml ]; then
    docker compose down 2>/dev/null || docker-compose down 2>/dev/null
    echo "✓ Stopped docker-compose services"
fi

echo ""
echo "✓ Cleanup complete"
echo ""
echo "To restart the development environment, run:"
echo "  ./init.sh"
