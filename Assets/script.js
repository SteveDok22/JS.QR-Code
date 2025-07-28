// Include qrcode.js library first
const QRCode = require('qrcode');

// Generate QR code
QRCode.toDataURL('https://stevedok22.github.io/Project-CV-Code-0.2/', {
    width: 300,
    margin: 2,
    color: {
        dark: '#000000',
        light: '#FFFFFF'
    }
}).then(url => {
    console.log(url); // Base64 string with image
});