# Deployment Guide

This guide will help you deploy your Email Signature Generator to various free hosting platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Choose your team/account
   - Confirm settings
   - Wait for deployment

4. **Your site will be live at:** `https://your-project.vercel.app`

### Option 2: Netlify (Drag & Drop)

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Go to [Netlify](https://netlify.com)**

3. **Drag and drop the `dist` folder** to the deploy area

4. **Your site will be live immediately!**

### Option 3: GitHub Pages

1. **Create a GitHub repository**

2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

3. **Go to repository Settings > Pages**

4. **Set source to "Deploy from a branch"**

5. **Choose main branch and `/ (root)` folder**

6. **Click Save**

### Option 4: Cloudflare Pages

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

## 📁 What Gets Deployed

The `dist` folder contains:
- `index.html` - Main HTML file
- `assets/` - CSS, JavaScript, and other assets
- All necessary files for the website to run

## 🔧 Environment Variables

No environment variables are required for basic functionality.

## 🌐 Custom Domain (Optional)

All platforms above support custom domains:
- **Vercel:** Add domain in project settings
- **Netlify:** Add domain in site settings
- **GitHub Pages:** Add CNAME file to repository
- **Cloudflare:** Add domain in Pages settings

## 📱 Performance

Your deployed site will be:
- ✅ Fast loading (optimized build)
- ✅ Mobile responsive
- ✅ SEO friendly
- ✅ Accessible
- ✅ Progressive Web App ready

## 🆘 Troubleshooting

### Build Errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues
- Check that `dist` folder exists after build
- Ensure all files are committed to git
- Verify platform-specific requirements

### Performance Issues
- Images are optimized automatically
- CSS and JS are minified
- Assets are compressed with gzip

## 🎯 Next Steps

After deployment:
1. Test all features work correctly
2. Share your live URL
3. Consider adding analytics
4. Set up monitoring
5. Plan for future updates

## 📞 Support

- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **Netlify:** [netlify.com/support](https://netlify.com/support)
- **GitHub:** [github.com/support](https://github.com/support)
- **Cloudflare:** [cloudflare.com/support](https://cloudflare.com/support)
