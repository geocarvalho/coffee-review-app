#!/bin/bash

echo "🛑 Stopping Coffee App servers..."

# Kill any processes on our ports
lsof -ti:3000,3001,3002,4000 | xargs kill -9 2>/dev/null || true

# Also kill any node processes that might be our servers
pkill -f "node index.js" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

echo "✅ All servers stopped!"
echo "Ports 3000, 3001, 3002, and 4000 are now free." 