# Email Signature Generator

A modern, standalone website for creating professional email signatures with a beautiful MonkeyType-inspired UI. Built with React, TypeScript, and Vite.

## ✨ Features

- ✨ **Live Preview**: See your signature update in real-time as you type
- 🎨 **Customizable Design**: Choose colors, fonts, layout, and spacing
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 🖼️ **Logo Support**: Upload and customize your company logo
- 📱 **QR Code Generation**: Include QR codes for easy contact sharing
- 💾 **Multiple Export Formats**: Export as HTML or high-quality PNG image
- 🌙 **Dark Theme**: Beautiful dark theme with glassmorphism effects
- 🚀 **Fast & Lightweight**: Built with modern web technologies
- 🔒 **Privacy-First**: All processing happens locally in your browser

## 🛡️ Security & Privacy

- **No Backend Required**: Everything runs in your browser
- **No Data Storage**: Your information never leaves your device
- **No API Keys**: No external services or credentials needed
- **Client-Side Only**: Secure by design with no server vulnerabilities

## 🎨 **MonkeyType-Inspired Design**
- **Dark Theme**: Beautiful dark background with subtle gradients
- **Yellow Accents**: Striking yellow highlights and buttons
- **Glassmorphism**: Modern glass-like effects and transparency
- **Google Fonts**: Professional typography including Inter, Roboto, Poppins, and more
- **Smooth Animations**: Hover effects and transitions

## 🚀 **Free Hosting Ready**
The project is configured for multiple free hosting platforms:
- **Vercel** (recommended) - Just run `vercel`
- **Netlify** - Drag & drop the `dist` folder
- **GitHub Pages** - Connect your repository
- **Cloudflare Pages** - Use `wrangler pages deploy`

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables and Glassmorphism
- **Fonts**: Google Fonts (Inter, Roboto, Poppins, JetBrains Mono, etc.)
- **QR Codes**: qrcode library
- **Image Export**: html2canvas
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd email-signature-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to `http://localhost:3000`**

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 🌐 Deployment

### Quick Deploy Options

#### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### 2. Netlify
- Drag and drop the `dist` folder to [Netlify](https://netlify.com)
- Or connect your GitHub repository for automatic deployments

#### 3. GitHub Pages
```bash
npm run build
# Upload dist folder contents to GitHub Pages
```

#### 4. Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy dist
```

## 📖 Usage

1. **Fill in your details**: Enter your name, title, company, contact information
2. **Customize the design**: Choose colors, layout, spacing, and typography
3. **Select fonts**: Choose from 16+ Google Fonts including Inter, Roboto, Poppins, and more
4. **Add your logo**: Upload a company logo and adjust its size
5. **Preview**: See your signature update in real-time
6. **Export**: Download as HTML for email clients or PNG for sharing

## 🎨 Customization

### Fonts
- **Sans-serif**: Inter (default), Roboto, Open Sans, Lato, Poppins, Montserrat
- **Serif**: Merriweather, Playfair Display, Lora
- **Monospace**: JetBrains Mono, Fira Code, Source Code Pro
- **Display**: Oswald, Bebas Neue

### Colors
- Background color
- Text color  
- Accent color for highlights and icons

### Layout
- Horizontal or vertical arrangement
- Adjustable spacing between elements
- Icon size and padding controls

### Features
- Show/hide email, phone, website
- QR code generation
- Logo rotation effects
- Additional custom text

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # App header with title
│   ├── SignatureForm.tsx   # Form controls for customization
│   └── SignaturePreview.tsx # Live preview and export
├── config/
│   └── fonts.ts            # Google Fonts configuration
├── data/
│   └── demoSignatures.ts   # Example signature templates
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and variables
```

## 🔒 Security

This project is designed with security in mind:
- **No backend required** - everything runs locally
- **No data collection** - your information stays on your device
- **No external APIs** - no risk of credential exposure
- **Client-side processing** - secure by design

See [SECURITY.md](./SECURITY.md) for detailed security information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain the MonkeyType aesthetic
- Test on multiple devices
- Keep dependencies updated
- Run security audits regularly

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Build and deploy to Cloudflare Pages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by MonkeyType's beautiful dark theme and typography
- Built with modern web technologies for optimal performance
- Designed for accessibility and user experience
- Google Fonts for professional typography

## 🆘 Support

If you have any questions or need help:
- **Issues**: Open a GitHub issue
- **Security**: See [SECURITY.md](./SECURITY.md)
- **Documentation**: Check the deployment guides
- **Community**: Join our discussions

## 🔄 Updates

Stay updated with the latest features:
- Watch the repository for releases
- Check the changelog for updates
- Follow security advisories
- Keep dependencies current
