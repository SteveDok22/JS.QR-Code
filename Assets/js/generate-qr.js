const QRCode = require('qrcode');

/**
 * Generate QR code as Base64 data URL string
 * @param {string} url - The URL to encode
 * @param {object} options - QR code options
 * @returns {Promise<string>} - Base64 data URL string
 */
function generateQRCode(url, options) {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(url, options, (err, dataUrl) => {
            if (err) {
                reject(new Error(`Failed to generate QR code: ${err.message}`));
            } else {
                resolve(dataUrl);
            }
        });
    });
}

/**
 * Generate QR code directly to file
 * @param {string} filename - Output filename
 * @param {string} url - The URL to encode
 * @param {object} options - QR code options
 * @returns {Promise<string>} - The filename of the saved file
 */
function generateQRCodeToFile(filename, url, options) {
    return new Promise((resolve, reject) => {
        QRCode.toFile(filename, url, options, (err) => {
            if (err) {
                reject(new Error(`Failed to save QR code to file: ${err.message}`));
            } else {
                resolve(filename);
            }
        });
    });
}

/**
 * Generate QR code as SVG string
 * @param {string} url - The URL to encode
 * @param {object} options - QR code options
 * @returns {Promise<string>} - SVG string
 */
function generateQRCodeSVG(url, options) {
    return new Promise((resolve, reject) => {
        QRCode.toString(url, { type: 'svg', ...options }, (err, svgString) => {
            if (err) {
                reject(new Error(`Failed to generate SVG QR code: ${err.message}`));
            } else {
                resolve(svgString);
            }
        });
    });
}

/**
 * Generate QR code as terminal string (for console display)
 * @param {string} url - The URL to encode
 * @param {object} options - QR code options
 * @returns {Promise<string>} - Terminal string
 */
function generateQRCodeTerminal(url, options) {
    return new Promise((resolve, reject) => {
        QRCode.toString(url, { type: 'terminal', ...options }, (err, terminalString) => {
            if (err) {
                reject(new Error(`Failed to generate terminal QR code: ${err.message}`));
            } else {
                resolve(terminalString);
            }
        });
    });
}

/**
 * Get QR code info without generating
 * @param {string} url - The URL to analyze
 * @returns {object} - Information about the QR code that would be generated
 */
function getQRCodeInfo(url) {
    return {
        url: url,
        urlLength: url.length,
        estimatedSize: Math.ceil(url.length / 10) + 'x' + Math.ceil(url.length / 10),
        dataType: 'URL',
        timestamp: new Date().toISOString()
    };
}

// Export all functions
module.exports = {
    generateQRCode,
    generateQRCodeToFile,
    generateQRCodeSVG,
    generateQRCodeTerminal,
    getQRCodeInfo
};