#!/bin/bash

echo "🚀 Building Email Signature Generator..."

# Build the project
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Deployment Options:"
    echo ""
    echo "1. Vercel (Recommended - Free):"
    echo "   npm install -g vercel"
    echo "   vercel"
    echo ""
    echo "2. Netlify (Free):"
    echo "   - Drag and drop the 'dist' folder to https://netlify.com"
    echo "   - Or connect your GitHub repo for auto-deploy"
    echo ""
    echo "3. GitHub Pages:"
    echo "   - Upload contents of 'dist' folder to GitHub Pages"
    echo ""
    echo "4. Cloudflare Pages:"
    echo "   npm install -g wrangler"
    echo "   wrangler pages deploy dist"
    echo ""
    echo "📁 Your built files are in the 'dist' folder"
    echo "🌍 Open dist/index.html in your browser to preview locally"
else
    echo "❌ Build failed!"
    exit 1
fi
