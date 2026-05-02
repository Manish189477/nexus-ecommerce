#!/bin/bash
echo "⬡ Starting NEXUS E-Commerce..."
echo ""

# Start backend
echo "🔧 Installing backend dependencies..."
cd backend && npm install --silent
echo "✅ Starting backend on port 5000..."
node server.js &
BACKEND_PID=$!

cd ../frontend
echo "🎨 Installing frontend dependencies..."
npm install --silent
echo "✅ Starting frontend on port 3000..."
npm start

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
