// Include qrcode.js library first
const QRCode = require('qrcode');

// Generate QR code
QRCode.toDataURL('resume=qr-code.png', 'https://stevedok22.github.io/Project-CV-Code-0.2/', {
    width: 300,
    margin: 2,
    color: {
        dark: '#000000',
        light: '#FFFFFF'
    }
}, (err) => {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('QR code saved successfully!');
    }
});