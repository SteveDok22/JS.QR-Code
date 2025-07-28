// Configuration for QR code generation
const config = {
    // The URL to encode in the QR code
    url: 'https://stevedok22.github.io/Project-CV-Code-0.2/',
    
    // Output filename
    filename: 'resume-qr-code.png',
    
    // QR code generation options
    options: {
        // Size of the QR code in pixels
        width: 300,
        
        // White border around the QR code (in units)
        margin: 2,
        
        // Colors for the QR code
        color: {
            dark: '#000000',    // Color of the QR code squares (black)
            light: '#FFFFFF'   // Background color (white)
        },
        
        // Error correction level
        // L = Low, M = Medium, Q = Quartile, H = High
        errorCorrectionLevel: 'M'
    },
    
    // Alternative filenames for different formats
    filenames: {
        png: 'resume-qr-code.png',
        svg: 'resume-qr-code.svg',
        pdf: 'resume-qr-code.pdf'
    },
    
    // Display messages
    messages: {
        generating: '🎯 Generating QR code...',
        success: '✅ Success! QR code saved as:',
        error: '❌ Error:',
        urlInfo: 'URL:',
        settingsInfo: 'Settings:'
    }
};

// Export the configuration
module.exports = config;