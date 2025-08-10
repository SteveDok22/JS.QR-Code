// Enhanced QR Generator with thunder effects
class ThunderQRGenerator {
    constructor() {
        this.url = 'https://stevedok22.github.io/Project-CV-Code-0.2/';
        this.size = 300;
        this.canvas = null;
        this.dataURL = '';
    }

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

    async generateWithGoogleAPI() {
        try {
            const encodedURL = encodeURIComponent(this.url);
            const qrURL = `https://chart.googleapis.com/chart?cht=qr&chs=${this.size}x${this.size}&chl=${encodedURL}&choe=UTF-8`;

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
                    reject(new Error('Failed to load QR code from Google Charts API'));
                };

                img.src = qrURL;
            });
        } catch (error) {
            throw new Error('QR generation failed: ' + error.message);
        }
    }
