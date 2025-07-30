// Configuration - matches your Node.js config
const QR_CONFIG = {
    url: 'https://stevedok22.github.io/Project-CV-Code-0.2/',
    options: {
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
    }
};

// Global variables
let qrCodeDataURL = '';
let qrCanvas = null;

// Wait for both DOM and QR library to load
let domReady = false;
let qrLibReady = false;

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded');
    domReady = true;
    checkIfReady();
});

// Check if QR library is loaded
function checkQRLibrary() {
    if (typeof QRCode !== 'undefined') {
        console.log('QRCode library loaded');
        qrLibReady = true;
        checkIfReady();
    } else {
        console.log('QRCode library not ready, checking again...');
        setTimeout(checkQRLibrary, 100);
    }
}

// Start checking for QR library
setTimeout(checkQRLibrary, 500);

function checkIfReady() {
    if (domReady && qrLibReady) {
        console.log('Everything ready, initializing...');
        initializeQRGenerator();
    }
}

// Initialize QR code generator
function initializeQRGenerator() {
    setupEventListeners();
    generateQRCode();
}

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

// Generate QR code
function generateQRCode() {
    const qrContainer = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('downloadBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');

    // Show loading message
    qrContainer.innerHTML = '<div class="loading">🔄 Generating QR code...</div>';

    // Disable buttons
    downloadBtn.disabled = true;
    regenerateBtn.disabled = true;

    try {
        // Clear container
        qrContainer.innerHTML = '';

        // Generate QR code to canvas
        QRCode.toCanvas(QR_CONFIG.url, QR_CONFIG.options)
            .then(canvas => {
                console.log('QR code generated successfully!');

                // Store canvas reference
                qrCanvas = canvas;

                // Style the canvas
                canvas.style.borderRadius = '8px';
                canvas.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

                // Add canvas to container
                qrContainer.appendChild(canvas);

                // Convert to data URL for download
                try {
                    qrCodeDataURL = canvas.toDataURL('image/png', 1.0);
                    console.log('QR code data URL created');

                    // Enable buttons
                    downloadBtn.disabled = false;
                    regenerateBtn.disabled = false;

                    showStatus('✅ QR code generated successfully!', 'success');

                } catch (dataError) {
                    console.error('Error creating data URL:', dataError);
                    showStatus('⚠️ QR code generated but download may not work', 'error');
                    regenerateBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('QR generation error:', error);
                showError('Error generating QR code: ' + error.message);
                regenerateBtn.disabled = false;
            });

    } catch (error) {
        console.error('Unexpected error:', error);
        showError('Unexpected error: ' + error.message);
        regenerateBtn.disabled = false;
    }
}

// Regenerate QR code
function regenerateQRCode() {
    console.log('Regenerating QR code...');
    showStatus('🔄 Regenerating...', 'loading');
    setTimeout(generateQRCode, 500);
}

// Download QR code as PNG
function downloadQRCode() {
    if (!qrCodeDataURL) {
        showStatus('❌ QR code data not available. Try regenerating.', 'error');
        return;
    }

    try {
        // Method 1: Direct download link
        const link = document.createElement('a');
        link.download = 'resume-qr-code.png';
        link.href = qrCodeDataURL;

        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('Download initiated successfully');
        showStatus('📥 Download started!', 'success');

    } catch (error) {
        console.error('Download method 1 failed:', error);

        // Method 2: Alternative download approach
        try {
            const blob = dataURLToBlob(qrCodeDataURL);
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.download = 'resume-qr-code.png';
            link.href = url;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            setTimeout(() => URL.revokeObjectURL(url), 1000);

            console.log('Alternative download method succeeded');
            showStatus('📥 Download started!', 'success');

        } catch (altError) {
            console.error('All download methods failed:', altError);
            showStatus('❌ Download failed. Right-click the QR code and "Save image as..."', 'error');
        }
    }
}

// Convert data URL to blob
function dataURLToBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

// Show status message
function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = `<div class="${type}">${message}</div>`;

    // Clear success/loading messages after delay
    if (type === 'success' || type === 'loading') {
        setTimeout(() => {
            statusDiv.innerHTML = '';
        }, 3000);
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

    showStatus(`❌ ${message}`, 'error');
}

// Handle library loading failure
setTimeout(() => {
    if (!qrLibReady) {
        console.error('QR library failed to load within timeout');
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = `
            <div class="error">
                <strong>📱 QR Code Preview Not Available</strong><br>
                The QR library failed to load, but your Node.js code will work!<br><br>
                <strong>URL:</strong> ${QR_CONFIG.url}<br>
                <strong>Size:</strong> 300x300px, Black on White<br><br>
                <small>Run your Node.js code with: <code>node index.js</code></small>
            </div>
        `;
    }
}, 10000);