// Enhanced QR Generator with thunder effects
function isValidHttpUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
}
class ThunderQRGenerator {
    constructor() {
        this.defaultUrl = 'https://stevedok22.github.io/Project-CV-Code-0.2/';
        this.url = this.defaultUrl;
        this.size = 300;
        this.canvas = null;
        this.dataURL = '';
        this.urlHistory = this.loadUrlHistory();
    }

    setUrl(url) {
        this.url = url;
        this.addToHistory(url);
    }

    loadUrlHistory() {
        try {
            const saved = localStorage.getItem('qr-url-history');
            if (saved) {
                return JSON.parse(saved).slice(0, 5);
            }
        } catch (e) {
            console.warn('Failed to load URL history:', e);
            // Try sessionStorage as fallback
            try {
                const sessionSaved = sessionStorage.getItem('qr-url-history');
                return sessionSaved ? JSON.parse(sessionSaved).slice(0, 5) : [];
            } catch (e2) {
                console.warn('Failed to load from sessionStorage:', e2);
            }
        }
        return [];
    }

    addToHistory(url) {
        if (!isValidHttpUrl(url)) return; // Add validation

        this.urlHistory = this.urlHistory.filter(item => item !== url);
        this.urlHistory.unshift(url);
        this.urlHistory = this.urlHistory.slice(0, 5);

        try {
            localStorage.setItem('qr-url-history', JSON.stringify(this.urlHistory));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
            // Fallback to sessionStorage
            try {
                sessionStorage.setItem('qr-url-history', JSON.stringify(this.urlHistory));
            } catch (e2) {
                console.warn('Failed to save to sessionStorage:', e2);
            }
        }
    }

    getUrlHistory() {
        return this.urlHistory;
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

    // Store interval references for cleanup
    animationIntervals.push(setInterval(() => {
        if (Math.random() > 0.8) {
            createShootingStar();
        }
    }, 2000));

    animationIntervals.push(setInterval(() => {
        if (Math.random() > 0.7) {
            createElectricParticle();
        }
    }, 1000));

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
    let animationIntervals = [];

    const UI_ELEMENTS = {
        downloadBtn: null,
        regenerateBtn: null,
        generateBtn: null,
        urlInput: null,
        qrcode: null,
        currentUrl: null,
        status: null,
        progressBar: null,
        urlSuggestions: null
    };

    function cacheUIElements() {
        UI_ELEMENTS.downloadBtn = document.getElementById('downloadBtn');
        UI_ELEMENTS.regenerateBtn = document.getElementById('regenerateBtn');
        UI_ELEMENTS.generateBtn = document.getElementById('generateBtn');
        UI_ELEMENTS.urlInput = document.getElementById('urlInput');
        UI_ELEMENTS.qrcode = document.getElementById('qrcode');
        UI_ELEMENTS.currentUrl = document.getElementById('currentUrl');
        UI_ELEMENTS.status = document.getElementById('status');
        UI_ELEMENTS.progressBar = document.getElementById('progressBar');
        UI_ELEMENTS.urlSuggestions = document.getElementById('urlSuggestions');
    }

    document.addEventListener('DOMContentLoaded', function () {
        console.log('⚡ Initializing Thunder QR Generator...');

        // Cache elements first
        cacheUIElements();

        createStarfield();
        setupEventListeners();

        // Initialize with default URL
        qrGenerator.setUrl(UI_ELEMENTS.urlInput.value);
        UI_ELEMENTS.currentUrl.textContent = UI_ELEMENTS.urlInput.value;

        generateQRCode();
        addThunderEffects();

        // Make selectSuggestion globally available
        window.selectSuggestion = selectSuggestion;
    });

    function setupEventListeners() {
        const downloadBtn = document.getElementById('downloadBtn');
        const regenerateBtn = document.getElementById('regenerateBtn');
        const generateBtn = document.getElementById('generateBtn');
        const urlInput = document.getElementById('urlInput');

        downloadBtn.addEventListener('click', downloadQRCode);
        regenerateBtn.addEventListener('click', regenerateQRCode);
        generateBtn.addEventListener('click', handleGenerateClick);

        // Handle Enter key in input
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleGenerateClick();
            }
        });

        // Real-time URL validation
        urlInput.addEventListener('input', validateUrl);

        // Add electric click effects
        [downloadBtn, regenerateBtn, generateBtn].forEach(btn => {
            btn.addEventListener('click', function (e) {
                createElectricRipple(e, this);
            });
        });

        // Setup URL suggestions
        setupUrlSuggestions();
    } S

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
        // Create screen flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(255, 255, 255, 0.1);
        z-index: 9999;
        pointer-events: none;
        animation: flash 0.2s ease-out;
    `;

        const style = document.createElement('style');
        style.textContent = `
        @keyframes flash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
        document.head.appendChild(style);
        document.body.appendChild(flash);

        setTimeout(() => {
            flash.remove();
            style.remove();
        }, 200);
    }

    function createElectricRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(0, 212, 255, 0.4) 50%, transparent 70%);
        transform: scale(0);
        animation: electricRipple 0.8s ease-out;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
    `;

        const style = document.createElement('style');
        style.textContent = `
        @keyframes electricRipple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(2);
                opacity: 0.7;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
        document.head.appendChild(style);

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 800);
    }

    async function generateQRCode() {
        if (isGenerating) return;
        isGenerating = true;

        const qrContainer = document.getElementById('qrcode');
        const downloadBtn = document.getElementById('downloadBtn');
        const regenerateBtn = document.getElementById('regenerateBtn');
        const progressBar = document.getElementById('progressBar');

        // Show loading with electric effect
        qrContainer.innerHTML = '<div class="loading">⚡ Generating QR code</div>';
        downloadBtn.disabled = true;
        regenerateBtn.disabled = true;

        // Animate progress bar with electric glow
        progressBar.style.width = '30%';
        progressBar.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
        showStatus('⚡ Charging up the generator...', 'loading');

        try {
            console.log('⚡ Starting Thunder QR generation...');
            progressBar.style.width = '60%';

            const canvas = await qrGenerator.generate();
            progressBar.style.width = '90%';

            // Electric transition effect
            qrContainer.style.opacity = '0';
            qrContainer.style.filter = 'brightness(2) saturate(0)';

            setTimeout(() => {
                qrContainer.innerHTML = '';
                canvas.style.borderRadius = '12px';
                canvas.style.boxShadow = '0 8px 25px rgba(0,0,0,0.5), 0 0 20px rgba(0, 212, 255, 0.3)';
                qrContainer.appendChild(canvas);
                qrContainer.style.opacity = '1';
                qrContainer.style.filter = 'brightness(1) saturate(1)';
                qrContainer.style.transition = 'all 0.5s ease';

                // Complete progress with thunder effect
                progressBar.style.width = '100%';
                progressBar.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.8)';

                setTimeout(() => {
                    progressBar.style.width = '0%';
                    progressBar.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.8)';
                }, 500);
            }, 300);

            // Enable buttons with electric animation
            setTimeout(() => {
                downloadBtn.disabled = false;
                regenerateBtn.disabled = false;

                downloadBtn.style.animation = 'fadeIn 0.5s ease-out, electricPulse 1s ease-out';
                regenerateBtn.style.animation = 'fadeIn 0.5s ease-out 0.1s both, electricPulse 1s ease-out 0.1s';

                // Add electric pulse animation
                const style = document.createElement('style');
                style.textContent = `
                @keyframes electricPulse {
                    0%, 100% { box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3); }
                    50% { box-shadow: 0 8px 30px rgba(255, 215, 0, 0.6); }
                }
            `;
                document.head.appendChild(style);
            }, 500);

            showStatus('⚡ QR code generated with lightning speed!', 'success');
            console.log('⚡ Thunder QR code generated successfully');

        } catch (error) {
            console.error('⚡ Thunder generation failed:', error);
            progressBar.style.width = '0%';
            progressBar.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.8)';
            showError('⚡ Generation failed: ' + error.message);
            regenerateBtn.disabled = false;
        } finally {
            isGenerating = false;
        }
    }

    function regenerateQRCode() {
        console.log('⚡ Regenerating with thunder power...');

        const regenerateBtn = document.getElementById('regenerateBtn');
        regenerateBtn.style.transform = 'scale(0.95)';
        regenerateBtn.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';

        // Create electric burst effect
        createElectricBurst(regenerateBtn);

        setTimeout(() => {
            regenerateBtn.style.transform = '';
            regenerateBtn.style.boxShadow = '';
            generateQRCode();
        }, 200);
    }

    function createElectricBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            const angle = (i / 8) * 2 * Math.PI;
            const distance = 50;

            spark.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: #ffd700;
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            z-index: 9999;
            box-shadow: 0 0 10px #ffd700;
            animation: sparkBurst 0.6s ease-out forwards;
            --end-x: ${Math.cos(angle) * distance}px;
            --end-y: ${Math.sin(angle) * distance}px;
        `;

            const style = document.createElement('style');
            style.textContent = `
            @keyframes sparkBurst {
                to {
                    transform: translate(var(--end-x), var(--end-y));
                    opacity: 0;
                }
            }
        `;
            document.head.appendChild(style);
            document.body.appendChild(spark);

            setTimeout(() => {
                spark.remove();
                style.remove();
            }, 600);
        }
    }

    function downloadQRCode() {
        if (!qrGenerator.dataURL) {
            showStatus('⚡ QR code not ready. Please wait for generation to complete.', 'error');
            return;
        }

        try {
            const link = document.createElement('a');
            // Create filename from URL
            const url = qrGenerator.url;
            let filename = 'thunder-qr-code.png';

            try {
                const urlObj = new URL(url);
                const domain = urlObj.hostname.replace(/[^a-zA-Z0-9]/g, '-');
                filename = `qr-${domain}.png`;
            } catch (e) {
                // Use default filename if URL parsing fails
            }

            link.download = filename;
            link.href = qrGenerator.dataURL;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showStatus('⚡ Download struck like lightning!', 'success');
            console.log('⚡ Thunder download initiated');
            // Electric download effect
            const downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.style.background = 'var(--success-gradient)';
            downloadBtn.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.8)';

            createElectricBurst(downloadBtn);

            setTimeout(() => {
                downloadBtn.style.background = '';
                downloadBtn.style.boxShadow = '';
            }, 2000);

        } catch (error) {
            console.error('⚡ Thunder download failed:', error);
            showStatus('⚡ Download failed. Right-click the QR code and "Save image as..."', 'error');
        }
    }

    function showStatus(message, type) {
        const statusDiv = document.getElementById('status');
        statusDiv.innerHTML = `<div class="status ${type}">${message}</div>`;

        const statusElement = statusDiv.querySelector('.status');
        setTimeout(() => {
            statusElement.classList.add('show');
        }, 10);

        if (type === 'success' || type === 'loading') {
            setTimeout(() => {
                statusElement.classList.remove('show');
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 300);
            }, 3000);
        }
    }

    function showError(message) {
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = `
        <div class="error">
            <strong>⚡ System Error:</strong><br>
            ${message}
            <br><br>
            <button onclick="regenerateQRCode()" style="background: var(--secondary-gradient); color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; font-family: Orbitron; text-transform: uppercase; border: 1px solid rgba(255, 0, 110, 0.3);">
                ⚡ Retry
            </button>
        </div>
    `;
        showStatus(`⚡ ${message}`, 'error');

        // Electric error effect
        triggerLightningFlash();
    }

    // Initialize everything
    function validateUrl() {
        const urlInput = document.getElementById('urlInput');
        const generateBtn = document.getElementById('generateBtn');
        const url = urlInput.value.trim();

        try {
            if (url === '') {
                urlInput.style.borderColor = 'var(--card-border)';
                generateBtn.disabled = true;
                return false;
            }

            new URL(url);
            urlInput.style.borderColor = 'var(--text-accent)';
            urlInput.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.3)';
            generateBtn.disabled = false;
            return true;
        } catch (e) {
            urlInput.style.borderColor = '#ff006e';
            urlInput.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.3)';
            generateBtn.disabled = true;
            return false;
        }
    }

    function handleGenerateClick() {
        const urlInput = document.getElementById('urlInput');
        const url = urlInput.value.trim();

        if (!validateUrl()) {
            showStatus('⚡ Please enter a valid URL', 'error');
            return;
        }

        // Update generator URL
        qrGenerator.setUrl(url);

        // Update current URL display
        document.getElementById('currentUrl').textContent = url;

        // Update suggestions
        setupUrlSuggestions();

        // Generate new QR code
        generateQRCode();
    }

    function setupUrlSuggestions() {
        const suggestionsContainer = document.getElementById('urlSuggestions');
        const history = qrGenerator.getUrlHistory();

        // Popular suggestions
        const popularSuggestions = [
            'https://github.com/username',
            'https://linkedin.com/in/username',
            'https://your-portfolio.com',
            'https://your-resume.pdf'
        ];

        let suggestionsHTML = '';

        // Add recent URLs
        if (history.length > 0) {
            history.forEach(url => {
                const shortUrl = url.length > 30 ? url.substring(0, 30) + '...' : url;
                suggestionsHTML += `<div class="url-suggestion recent" onclick="selectSuggestion('${url.replace(/'/g, "\\'")}')" title="${url}">📍 ${shortUrl}</div>`;
            });
        }

        // Add popular suggestions (only if not in history)
        popularSuggestions.forEach(url => {
            if (!history.includes(url)) {
                suggestionsHTML += `<div class="url-suggestion" onclick="selectSuggestion('${url}')" title="${url}">💡 ${url}</div>`;
            }
        });

        suggestionsContainer.innerHTML = suggestionsHTML;
    }

    function selectSuggestion(url) {
        const urlInput = document.getElementById('urlInput');
        urlInput.value = url;
        validateUrl();

        // Add electric effect to input
        urlInput.style.background = 'rgba(0, 212, 255, 0.1)';
        setTimeout(() => {
            urlInput.style.background = '';
        }, 500);
    }
    console.log('⚡ Thunder QR Generator loaded successfully!');
}