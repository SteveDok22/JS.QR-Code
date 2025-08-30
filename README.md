# ⚡ Thunder QR Code Generator

A powerful and visually stunning QR code generator with lightning-fast performance and electrifying effects. Create professional QR codes for any URL with an immersive thunder-themed interface featuring animated starfields, lightning effects, and electric interactions.

## Project Overview

**Live Website:** [See deployed website](https://stevedok22.github.io/JS.QR-Code/)

## 🌟 Features

### ⚡ Enhanced Web Interface
- **Thunder Theme**: Dark interface with animated starfield background
- **Lightning Effects**: Dynamic lightning bolts and electric particles
- **URL Input**: Generate QR codes for any URL with real-time validation
- **URL History**: Automatic saving of recently used URLs (up to 5)
- **Smart Suggestions**: Quick access to popular URL templates
- **Electric Animations**: Button ripple effects and spark bursts
- **Progress Tracking**: Animated progress bar with electric glow

### 🚀 Core Functionality
- **High Quality**: 300x300px PNG output with customizable settings
- **Multiple APIs**: Fallback system using QR Server and Google Charts APIs
- **Smart Filename**: Automatic filename generation based on domain
- **Error Handling**: Comprehensive error messages with electric effects
- **Mobile Responsive**: Fully optimized for all devices
- **Real-time Validation**: Instant URL validation with visual feedback

## 🎮 Interactive Elements

- **Animated Starfield**: 200+ twinkling stars with parallax effects
- **Lightning Strikes**: Random lightning flashes across the screen
- **Shooting Stars**: Periodic meteor effects
- **Electric Particles**: Floating energy particles
- **Thunder Hover Effects**: Electric field simulation on mouse movement
- **Spark Animations**: Button interactions create electric bursts

## 🚀 Quick Start

### Web Interface (Recommended)
1. Open `index.html` in your browser
2. Enter any URL in the input field
3. Click "⚡ Generate" or press Enter
4. Download your custom QR code
5. Choose from URL suggestions or history

### Command Line Interface
```bash
# Install dependencies
npm init -y
npm install qrcode

# Generate QR code
node index.js
```

## 📁 File Structure

```
thunder-qr-generator/
├── 📄 index.html          # Thunder-themed web interface
├── ⚡ Assets/css/styles.css   # Thunder styling and animations
├── ⚡ Assets/js/script.js     # Enhanced JavaScript with effects
├── ⚙️  config.js          # Configuration settings (Node.js)
├── 🔧 generate-qr.js      # QR generation functions (Node.js)
├── 🚀 index.js            # Main Node.js entry point
├── 📋 README.md           # This documentation
└── 📦 package.json        # Project dependencies
```

## 🔗 URL Input Features

### Supported URL Types
- **Personal websites**: `https://your-portfolio.com`
- **Social profiles**: `https://linkedin.com/in/username`
- **GitHub repositories**: `https://github.com/username/repo`
- **Google Drive documents**: `https://docs.google.com/document/...`
- **Resume PDFs**: `https://your-resume.pdf`
- **Any valid URL**: The generator accepts any properly formatted URL

### Smart Features
- **Real-time validation**: Instant feedback on URL correctness
- **Visual indicators**: Color-coded input field (green=valid, red=invalid)
- **URL history**: Last 5 URLs automatically saved and suggested
- **Quick suggestions**: Popular URL templates for common use cases
- **Smart filenames**: Downloads named after domain (e.g., `qr-github-com.png`)

## ⚡ Usage Examples

### Web Interface Usage
1. **Enter URL**: Type or paste any URL into the input field
2. **Validation**: Watch the field change color (green = valid)
3. **Generate**: Click "⚡ Generate" button or press Enter
4. **Effects**: Enjoy the lightning and electric animations
5. **Download**: Click "⬇ Download" to save your QR code
6. **History**: Previous URLs appear as suggestions

### Example URLs to Try
```
https://github.com/yourusername
https://linkedin.com/in/yourprofile  
https://your-portfolio-site.com
https://docs.google.com/document/your-resume
https://stevedok22.github.io/Project-CV-Code-0.2/
```

### Command Line Usage
```bash
# Generate with default URL
node index.js

# Generate multiple formats
node index.js --multiple
```

## 🎨 Thunder Theme Customization

### CSS Variables
```css
:root {
    --primary-gradient: linear-gradient(135deg, #00d4ff 0%, #090979 50%, #020024 100%);
    --thunder-gradient: linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #8338ec 100%);
    --text-accent: #00d4ff;
    --shadow-thunder: 0 0 30px rgba(255, 215, 0, 0.5);
}
```

### Animation Settings
- **Stars**: 200 animated stars with random twinkling
- **Lightning**: 4 lightning bolts with 8-second cycles
- **Particles**: Electric particles with 6-second float animations
- **Transitions**: Smooth 0.3s transitions on interactive elements

## 🛠️ Configuration

### Web Interface Settings
- **Default URL**: Set in the input field value
- **QR Size**: 300x300 pixels (optimized for scanning)
- **File Format**: PNG with transparent background support
- **Color Scheme**: Black QR code on white background (best contrast)

### Node.js Configuration (`config.js`)
```javascript
const config = {
    url: 'https://your-website.com',
    filename: 'qr-code.png',
    options: {
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }
};
```

## 🔧 API Reference

### ThunderQRGenerator Class
```javascript
const generator = new ThunderQRGenerator();

// Set URL for QR generation
generator.setUrl('https://example.com');

// Generate QR code
await generator.generate();

// Access URL history
const history = generator.getUrlHistory();
```

### Key Methods
- `setUrl(url)`: Set URL and add to history
- `generate()`: Generate QR code with fallback APIs
- `getUrlHistory()`: Retrieve saved URL history
- `loadUrlHistory()`: Load history from localStorage

## 📱 How to Use Your QR Codes

### Professional Applications
- **Business Cards**: Add QR codes linking to your portfolio
- **Resume Headers**: Include QR code for online resume access
- **Networking Events**: Quick sharing of contact information
- **Portfolio Prints**: Link physical work to digital versions
- **Email Signatures**: Professional QR code integration

### Testing Your QR Codes
1. **Mobile Camera**: Most smartphones automatically detect QR codes
2. **QR Reader Apps**: Use dedicated scanning applications
3. **Multiple Devices**: Test across different phone models
4. **Print Quality**: Ensure sufficient size and contrast when printing

## 🐛 Troubleshooting

### Common Issues

**QR Code Not Generating:**
- Check internet connection (requires API access)
- Verify URL format is correct
- Try refreshing the page

**URL Validation Errors:**
- Ensure URL includes `https://` or `http://`
- Check for typos in domain name
- Verify URL is accessible

**Visual Effects Not Working:**
- Enable JavaScript in browser
- Try a modern browser (Chrome, Firefox, Safari, Edge)
- Check for browser console errors

**Download Issues:**
- Allow downloads in browser settings
- Try right-click "Save image as..." on QR code
- Check available disk space

## 🎯 Best Practices

### For Maximum Scannability
- **Size**: Minimum 2cm x 2cm when printed
- **Contrast**: Black on white provides best results
- **Testing**: Always test QR codes before final use
- **Backup**: Include URL as text alongside QR code

### For Professional Use
- **Placement**: Corner or dedicated section of documents
- **Context**: Add "Scan for [purpose]" instruction
- **Quality**: Use high-resolution PNG files
- **Updates**: Regenerate if URLs change

## 🌟 Advanced Features

### URL History System
- Automatically saves last 5 unique URLs
- Persistent storage across browser sessions
- Quick selection from suggestions
- Smart duplicate prevention

### Multi-API Fallback
1. **QR Server API** (Primary)
2. **Google Charts API** (Backup)
3. **Local Fallback** (Placeholder with instructions)

### Electric Effect System
- **Mouse Tracking**: Electric field intensity based on cursor position
- **Random Events**: Lightning strikes every 3-8 seconds
- **Interactive Animations**: Button clicks trigger spark effects
- **Progress Feedback**: Animated progress bar during generation

## 📄 License

MIT License - Free for personal and commercial use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

**Having Issues?**
1. Check the troubleshooting section above
2. Verify all files are in correct locations
3. Test with default settings first
4. Open an issue with detailed error information

## 🎉 Perfect For

- Web developers showcasing projects
- Job seekers sharing resume links
- Business professionals networking
- Students presenting portfolios
- Anyone needing quick URL sharing

---

**Experience the power of lightning-fast QR generation with stunning visual effects!**

*Made with ⚡ and lots of creative energy*