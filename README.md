# 📱 Resume QR Code Generator

A simple and elegant QR code generator for your online resume. Create professional QR codes that link directly to your resume website - perfect for business cards, printed resumes, and networking events.

## 🌟 Features

- **Dual Interface**: Web browser preview + Node.js command line
- **High Quality**: 300x300px PNG output with customizable settings
- **Multiple Formats**: PNG, SVG, and terminal preview
- **Professional Design**: Clean, scannable QR codes with proper margins
- **Easy Configuration**: Simple config file for quick customization
- **Error Handling**: Comprehensive error messages and troubleshooting
- **Mobile Friendly**: Web interface works on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download** this project
2. **Navigate** to the project folder
3. **Install dependencies**:
   ```bash
   npm init -y
   npm install qrcode
   ```

### Generate Your QR Code

**Method 1: Command Line (Recommended)**
```bash
node index.js
```

**Method 2: Multiple Formats**
```bash
node index.js --multiple
```

**Method 3: Web Interface**
- Open `index.html` in your browser
- View, download, and test your QR code

## 📁 File Structure

```
qr-generator/
├── 📄 index.html          # Web interface for preview
├── 🎨 styles.css          # Styling for web interface
├── ⚡ script.js           # JavaScript for web interface
├── ⚙️  config.js          # Configuration settings
├── 🔧 generate-qr.js      # QR generation functions
├── 🚀 index.js            # Main Node.js entry point
├── 📋 README.md           # This file
└── 📦 package.json        # Project dependencies
```

## ⚙️ Configuration

Edit `config.js` to customize your QR code:

```javascript
const config = {
    // Your resume URL
    url: 'https://your-resume-website.com',
    
    // Output filename
    filename: 'resume-qr-code.png',
    
    // QR code settings
    options: {
        width: 300,           // Size in pixels
        margin: 2,            // Border size
        color: {
            dark: '#000000',  // QR code color
            light: '#FFFFFF'  // Background color
        }
    }
};
```

## 🎯 Usage Examples

### Basic Generation
```bash
# Generate QR code with default settings
node index.js
```

**Output:**
```
🎯 Generating QR code...
URL: https://stevedok22.github.io/Project-CV-Code-0.2/
Settings: {
  "width": 300,
  "margin": 2,
  "color": {
    "dark": "#000000",
    "light": "#FFFFFF"
  }
}

📱 Terminal Preview:
█████████████████████████████
█████████████████████████████
███ ▄▄▄▄▄ █▀█ █▄▄█ ▄▄▄▄▄ ███
[... QR code preview ...]

💾 Saving to file...

🎉 ✅ Success! QR code saved as: resume-qr-code.png

📋 Next steps:
   1. Open the generated PNG file
   2. Test it by scanning with your phone
   3. Use it in your resume, business cards, etc.
```

### Multiple Formats
```bash
# Generate PNG and SVG versions
node index.js --multiple
```

### Web Interface
1. Open `index.html` in your browser
2. View the QR code preview
3. Click "📥 Download PNG" to save
4. Click "🔄 Regenerate" to refresh

## 📱 How to Use Your QR Code

### For Printed Materials
- **Business Cards**: Add to corner or back
- **Resume**: Include at top or bottom
- **Portfolio**: Add to cover page
- **Networking Events**: Print on stickers

### For Digital Use
- **Email Signature**: Embed as image
- **Social Media**: Share in posts/stories
- **LinkedIn**: Add to profile summary
- **Virtual Meetings**: Display on screen

### Testing Your QR Code
1. **iPhone**: Open Camera app, point at QR code
2. **Android**: Open Camera or Google Lens
3. **Verify**: Should open your resume URL
4. **Test on multiple devices** before printing

## 🛠️ Customization

### Change Colors
```javascript
// In config.js
color: {
    dark: '#1976d2',    // Blue QR code
    light: '#ffffff'    // White background
}
```

### Different Sizes
```javascript
// In config.js
width: 500,  // Larger QR code
margin: 4    // More white space
```

### Error Correction
```javascript
// In config.js
errorCorrectionLevel: 'H'  // High error correction (more robust)
```

## 🔧 API Reference

### `generateQRCodeToFile(filename, url, options)`
Generate QR code directly to PNG file.

### `generateQRCode(url, options)`
Generate QR code as Base64 data URL.

### `generateQRCodeSVG(url, options)`
Generate QR code as SVG string.

### `generateQRCodeTerminal(url, options)`
Generate QR code for terminal display.

## 🐛 Troubleshooting

### "QRCode is not defined" (Web Interface)
- Check internet connection
- Try refreshing the page
- Use Node.js version instead

### "Cannot find module 'qrcode'"
```bash
npm install qrcode
```

### "Permission denied" when saving
- Check folder write permissions
- Try running with administrator/sudo

### QR Code doesn't scan properly
- Increase margin in config
- Use higher error correction level
- Test with different QR readers

### File not generated
- Check if folder exists
- Verify Node.js is installed
- Look for error messages in console

## 🎨 Styling Options

### Professional Look
```javascript
// Black on white (recommended)
color: { dark: '#000000', light: '#ffffff' }
```

### Brand Colors
```javascript
// Match your brand
color: { dark: '#1976d2', light: '#ffffff' }
```

### High Contrast
```javascript
// Maximum readability
color: { dark: '#000000', light: '#ffffff' }
margin: 4
```

## 📋 Best Practices

### For Print
- **Minimum size**: 2cm x 2cm (0.8" x 0.8")
- **High resolution**: Use 300px+ width
- **Test before printing**: Scan the digital version first
- **White border**: Keep margin at least 2 units

### For Digital
- **Clear display**: Ensure good contrast with background
- **Mobile-friendly**: Test on different screen sizes
- **Context**: Explain what the QR code does
- **Alternative**: Always provide the URL as text too

### For Business Cards
- **Corner placement**: Top-right or bottom-right
- **Size**: About 15-20% of card space
- **Call to action**: "Scan for my resume"

## 🔗 Integration Ideas

### With Your Resume Website
Add a "Generate QR Code" button that creates a code for the current page.

### With Your Portfolio
Include QR codes for individual projects.

### With Your Business Cards
Design templates that include the QR code automatically.

## 📄 License

MIT License - feel free to use this for personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your Node.js installation
3. Test with the default configuration first
4. Create an issue with detailed error messages

## 🎉 Success Stories

**Perfect for:**
- ✅ Job applications
- ✅ Networking events
- ✅ Business cards
- ✅ Portfolio sharing
- ✅ Quick resume access

---

**Made with ❤️ for developers who want to make their resume easily accessible**

*Happy job hunting! 🚀*