// Wait for the library to load
window.addEventListener('load', function () {
    setTimeout(function () {
        // Check if QRCode is available
        if (typeof QRCode !== 'undefined') {
            console.log('QRCode library loaded successfully');
            // Generate QR code with the exact same settings as your Node.js code
            QRCode.toCanvas(document.getElementById('qrcode'), 'https://stevedok22.github.io/Project-CV-Code-0.2/', {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            }, function (error) {
                if (error) {
                    console.error(error);
                    document.getElementById('qrcode').innerHTML = '<p style="color: red;">Error generating QR code: ' + error.message + '</p>';
                } else {
                    console.log('QR code generated successfully!');
                }
            });
        } else {
            console.log('QRCode still not available, trying manual creation...');
            // Fallback: create a simple text representation
            document.getElementById('qrcode').innerHTML = `
                        <div style="border: 2px solid #333; padding: 20px; background: #f0f0f0;">
                            <p><strong>QR Code Preview Not Available</strong></p>
                            <p>But your Node.js code will generate this QR code:</p>
                            <p>URL: https://stevedok22.github.io/Project-CV-Code-0.2/</p>
                            <p>Size: 300x300px, Black on White</p>
                            <p style="font-size: 12px; color: #666;">
                                When you run your Node.js code, it will create<br>
                                a proper QR code PNG file that works perfectly!
                            </p>
                        </div>
                    `;
        }
    }, 1000); // Wait 1 second for library to load
});