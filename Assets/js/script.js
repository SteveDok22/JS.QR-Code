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
    createFallback() {
        const canvas = document.createElement('canvas');
        canvas.width = this.size;
        canvas.height = this.size;
        const ctx = canvas.getContext('2d');

        // Black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.size, this.size);

        // Electric border
        const gradient = ctx.createLinearGradient(0, 0, this.size, this.size);
        gradient.addColorStop(0, '#00d4ff');
        gradient.addColorStop(0.5, '#ffd700');
        gradient.addColorStop(1, '#8338ec');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.size, 20);
        ctx.fillRect(0, 0, 20, this.size);
        ctx.fillRect(this.size - 20, 0, 20, this.size);
        ctx.fillRect(0, this.size - 20, this.size, 20);

        // Center text
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 16px Orbitron, Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ QR PLACEHOLDER ⚡', this.size / 2, this.size / 2 - 30);
        ctx.fillText('Use Node.js version', this.size / 2, this.size / 2);
        ctx.fillText('for actual QR code', this.size / 2, this.size / 2 + 30);

        this.canvas = canvas;
        this.dataURL = canvas.toDataURL('image/png');

        return canvas;
    }

    async generate() {
        try {
            return await this.generateWithQRServer();
        } catch (error1) {
            console.log('QR Server failed, trying Google Charts...', error1.message);
            try {
                return await this.generateWithGoogleAPI();
            } catch (error2) {
                console.log('Google Charts failed, creating fallback...', error2.message);
                return this.createFallback();
            }
        }
    }
}