#!/bin/bash
set -e

echo "🏗️ Building n8n-nodes-freshdesk..."

# Clean previous build
rm -rf dist/

# Install dependencies
npm install

# Run build
npm run build

echo "✅ Build complete!"
