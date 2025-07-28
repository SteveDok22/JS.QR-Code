// Configuration - matches your Node.js config
const QR_CONFIG = {
    url: 'https://stevedok22.github.io/Project-CV-Code-0.2/',
    options: {
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }
};

// Global variable to store QR code data
let qrCodeDataURL = '';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing QR generator...');
    initializeQRGenerator();
    setupEventListeners();
});

// Setup event listeners for buttons
function setupEventListeners() {
    const downloadBtn = document.getElementById('downloadBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadQRCode);
    }
    
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', regenerateQRCode);
    }
}

// Initialize QR code generator
function initializeQRGenerator() {
    // Wait a bit for the library to load
    setTimeout(() => {
        if (typeof QRCode !== 'undefined') {
            console.log('QRCode library loaded successfully');
            generateQRCode();
        } else {
            console.error('QRCode library not available');
            showFallbackMessage();
        }
    }, 1000);
}

// Generate QR code
function generateQRCode() {
    const qrContainer = document.getElementById('qrcode');
    
    // Show loading message
    qrContainer.innerHTML = '<p class="loading">🔄 Generating QR code...</p>';
    
    try {
        QRCode.toCanvas(qrContainer, QR_CONFIG.url, QR_CONFIG.options, function(error) {
            if (error) {
                console.error('QR generation error:', error);
                showError('Error generating QR code: ' + error.message);
            } else {
                console.log('QR code generated successfully!');
                
                // Store the canvas data for download
                const canvas = qrContainer.querySelector('canvas');
                if (canvas) {
                    qrCodeDataURL = canvas.toDataURL('image/png');
                    console.log('QR code data stored for download');
                }
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        showError('Unexpected error: ' + error.message);
    }
}

// Regenerate QR code
function regenerateQRCode() {
    console.log('Regenerating QR code...');
    generateQRCode();
}

// Download QR code as PNG
function downloadQRCode() {
    if (!qrCodeDataURL) {
        alert('QR code is not ready yet. Please wait a moment and try again.');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.download = 'resume-qr-code.png';
        link.href = qrCodeDataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('QR code download initiated');
    } catch (error) {
        console.error('Download error:', error);
        alert('Error downloading QR code: ' + error.message);
    }
}

// Show error message
function showError(message) {
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = `
        <div class="error">
            <strong>❌ Error:</strong><br>
            ${message}
            <br><br>
            <button onclick="regenerateQRCode()" style="background: #d32f2f; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                Try Again
            </button>
        </div>
    `;
}

// Show fallback message when library fails to load
function showFallbackMessage() {
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = `
        <div style="border: 2px solid #333; padding: 20px; background: #f0f0f0; border-radius: 8px;">
            <p><strong>📱 QR Code Preview Not Available</strong></p>
            <p>But your Node.js code will generate this QR code perfectly!</p>
            <br>
            <p><strong>URL:</strong> ${QR_CONFIG.url}</p>
            <p><strong>Size:</strong> 300x300px, Black on White</p>
            <br>
            <p style="font-size: 12px; color: #666;">
                When you run your Node.js code with:<br>
                <code>node index.js</code><br>
                It will create a proper QR code PNG file!
            </p>
        </div>
    `;
}