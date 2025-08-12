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

// Initialize starfield
function createStarfield() {
    const starsContainer = document.getElementById('stars');
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = `star ${Math.random() > 0.7 ? 'large' : Math.random() > 0.5 ? 'medium' : 'small'}`;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }

    // Add shooting stars
    setInterval(() => {
        if (Math.random() > 0.8) {
            createShootingStar();
        }
    }, 2000);

    // Add electric particles
    setInterval(() => {
        if (Math.random() > 0.7) {
            createElectricParticle();
        }
    }, 1000);
}

function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';
    document.querySelector('.starfield').appendChild(shootingStar);

    setTimeout(() => {
        shootingStar.remove();
    }, 3000);
}

function createElectricParticle() {
    const particle = document.createElement('div');
    particle.className = 'electric-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
    document.querySelector('.thunder-container').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Enhanced application logic with thunder effects
let qrGenerator = new ThunderQRGenerator();
let isGenerating = false;

document.addEventListener('DOMContentLoaded', function () {
    console.log('⚡ Initializing Thunder QR Generator...');
    createStarfield();
    setupEventListeners();
    generateQRCode();
    addThunderEffects();
});

function setupEventListeners() {
    const downloadBtn = document.getElementById('downloadBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');

    downloadBtn.addEventListener('click', downloadQRCode);
    regenerateBtn.addEventListener('click', regenerateQRCode);

    // Add electric click effects
    [downloadBtn, regenerateBtn].forEach(btn => {
        btn.addEventListener('click', function (e) {
            createElectricRipple(e, this);
        });
    });
}

function addThunderEffects() {
    const container = document.querySelector('.container');

    container.addEventListener('mouseenter', () => {
        container.style.transform = 'translateY(-8px)';
        container.style.boxShadow = 'var(--shadow-thunder)';
    });

    container.addEventListener('mouseleave', () => {
        container.style.transform = 'translateY(0)';
        container.style.boxShadow = 'var(--shadow-primary)';
    });

    // Add thunder sound effect simulation
    document.addEventListener('mousemove', (e) => {
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Create electric field effect
        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
            const intensity = Math.min(Math.abs(x - 0.5) + Math.abs(y - 0.5), 1);
            container.style.filter = `drop-shadow(0 0 ${20 + intensity * 20}px rgba(0, 212, 255, 0.3))`;
        }
    });

    // Random lightning flashes
    setInterval(() => {
        if (Math.random() > 0.95) {
            triggerLightningFlash();
        }
    }, 3000);
}

function triggerLightningFlash() {
    const body = document.body;
    const originalFilter = body.style.filter;

    body.style.filter = 'brightness(1.5) saturate(1.2)';
    body.style.transition = 'filter 0.1s';

    setTimeout(() => {
        body.style.filter = originalFilter;
        body.style.transition = 'filter 0.3s';
    }, 100);
