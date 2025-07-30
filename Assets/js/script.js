// QR Code generation without external library
class QRCodeGenerator {
    constructor() {
        this.url = 'https://stevedok22.github.io/Project-CV-Code-0.2/';
        this.size = 300;
        this.canvas = null;
        this.dataURL = '';
    }

    // Generate QR code using Google Charts API as fallback
    async generateWithGoogleAPI() {
        try {
            const encodedURL = encodeURIComponent(this.url);
            const qrURL = `https://chart.googleapis.com/chart?cht=qr&chs=${this.size}x${this.size}&chl=${encodedURL}&choe=UTF-8`;

            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';

                img.onload = () => {
                    // Create canvas and draw image
                    const canvas = document.createElement('canvas');
                    canvas.width = this.size;
                    canvas.height = this.size;
                    const ctx = canvas.getContext('2d');

                    // Fill white background
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, this.size, this.size);

                    // Draw QR code image
                    ctx.drawImage(img, 0, 0, this.size, this.size);

                    this.canvas = canvas;
                    this.dataURL = canvas.toDataURL('image/png');

                    resolve(canvas);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load QR code from Google Charts API'));
                };

                img.src = qrURL;
            });
        } catch (error) {
            throw new Error('QR generation failed: ' + error.message);
        }
    }

    // Alternative: Generate QR using qr-server.com API
    async generateWithQRServer() {
        try {
            const encodedURL = encodeURIComponent(this.url);
            const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=${this.size}x${this.size}&data=${encodedURL}&format=png`;

            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = this.size;
                    canvas.height = this.size;
                    const ctx = canvas.getContext('2d');

                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, this.size, this.size);
                    ctx.drawImage(img, 0, 0, this.size, this.size);

                    this.canvas = canvas;
                    this.dataURL = canvas.toDataURL('image/png');

                    resolve(canvas);
                };

                img.onerror = () => {
                    reject(new Error('Failed to load QR code from QR Server API'));
                };

                img.src = qrURL;
            });
        } catch (error) {
            throw new Error('QR generation failed: ' + error.message);
        }
    }

    // Try multiple methods
    async generate() {
        try {
            // Try QR Server first (more reliable)
            return await this.generateWithQRServer();
        } catch (error1) {
            console.log('QR Server failed, trying Google Charts...', error1.message);
            try {
                // Fallback to Google Charts
                return await this.generateWithGoogleAPI();
            } catch (error2) {
                console.log('Google Charts failed, creating fallback...', error2.message);
                // Final fallback - create a simple placeholder
                return this.createFallback();
            }
        }
    }

    createFallback() {
        const canvas = document.createElement('canvas');
        canvas.width = this.size;
        canvas.height = this.size;
        const ctx = canvas.getContext('2d');

        // White background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, this.size, this.size);

        // Black border
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.size, 20);
        ctx.fillRect(0, 0, 20, this.size);
        ctx.fillRect(this.size - 20, 0, 20, this.size);
        ctx.fillRect(0, this.size - 20, this.size, 20);

        // Center text
        ctx.fillStyle = '#000000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR Code Placeholder', this.size / 2, this.size / 2 - 20);
        ctx.fillText('Use Node.js version', this.size / 2, this.size / 2);
        ctx.fillText('for actual QR code', this.size / 2, this.size / 2 + 20);

        this.canvas = canvas;
        this.dataURL = canvas.toDataURL('image/png');

        return canvas;
    }
}

// Application logic
let qrGenerator = new QRCodeGenerator();
let isGenerating = false;

document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded, initializing QR generator...');
    setupEventListeners();
    generateQRCode();
});

function setupEventListeners() {
    const downloadBtn = document.getElementById('downloadBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');

    downloadBtn.addEventListener('click', downloadQRCode);
    regenerateBtn.addEventListener('click', regenerateQRCode);
}

async function generateQRCode() {
    if (isGenerating) return;
    isGenerating = true;

    const qrContainer = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('downloadBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');

    // Show loading
    qrContainer.innerHTML = '<div class="loading">🔄 Generating QR code...</div>';
    downloadBtn.disabled = true;
    regenerateBtn.disabled = true;
    showStatus('🔄 Generating QR code...', 'loading');

    try {
        console.log('Starting QR generation...');
        const canvas = await qrGenerator.generate();

        // Clear container and add canvas
        qrContainer.innerHTML = '';
        canvas.style.borderRadius = '8px';
        canvas.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        qrContainer.appendChild(canvas);

        // Enable buttons
        downloadBtn.disabled = false;
        regenerateBtn.disabled = false;

        showStatus('✅ QR code generated successfully!', 'success');
        console.log('QR code generated successfully');

    } catch (error) {
        console.error('QR generation failed:', error);
        showError('Failed to generate QR code: ' + error.message);
        regenerateBtn.disabled = false;
    } finally {
        isGenerating = false;
    }
}

function regenerateQRCode() {
    console.log('Regenerating QR code...');
    generateQRCode();
}

function downloadQRCode() {
    if (!qrGenerator.dataURL) {
        showStatus('❌ QR code not ready. Please wait for generation to complete.', 'error');
        return;
    }

    try {
        // Create download link
        const link = document.createElement('a');
        link.download = 'resume-qr-code.png';
        link.href = qrGenerator.dataURL;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showStatus('📥 Download started!', 'success');
        console.log('Download initiated');

    } catch (error) {
        console.error('Download failed:', error);
        showStatus('❌ Download failed. Right-click the QR code and "Save image as..."', 'error');
    }
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = `<div class="${type}">${message}</div>`;

    if (type === 'success' || type === 'loading') {
        setTimeout(() => {
            statusDiv.innerHTML = '';
        }, 3000);
    }
}

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