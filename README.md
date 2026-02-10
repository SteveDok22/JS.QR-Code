# ⚡ Thunder QR Code Generator

A visually immersive QR code generator featuring a thunder-themed interface with animated starfields, lightning effects, and real-time URL validation. Built with vanilla JavaScript to demonstrate DOM manipulation, CSS animations, and API integration skills.

<div align="center">

![Am I Responsive](Assets\videos\QRvideo.gif)

*Thunder QR Code Generator — responsive across all devices*

</div>

<div align="center">

[![Live Site](https://img.shields.io/badge/🚀_LIVE_SITE-GitHub_Pages-blue?style=for-the-badge)](https://stevedok22.github.io/JS.QR-Code/)
[![GitHub repo](https://img.shields.io/badge/📂_REPOSITORY-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/SteveDok22/JS.QR-Code)

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/SteveDok22/JS.QR-Code)](https://github.com/SteveDok22/JS.QR-Code/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/SteveDok22/JS.QR-Code)](https://github.com/SteveDok22/JS.QR-Code/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/SteveDok22/JS.QR-Code)](https://github.com/SteveDok22/JS.QR-Code)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📌 Table of Contents

- [Introduction](#introduction)
- [Project Goals](#project-goals)
- [User Stories](#user-stories)
- [UX & Design](#ux--design)
- [Features](#features)
  - [Core Functionality](#core-functionality)
  - [Visual Effects System](#visual-effects-system)
  - [Smart URL Management](#smart-url-management)
  - [Future Features](#future-features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [API Architecture](#api-architecture)
- [Testing](#testing)
  - [Manual Testing](#manual-testing)
  - [Browser Compatibility](#browser-compatibility)
  - [Validator Testing](#validator-testing)
  - [Bugs](#bugs)
- [Deployment](#deployment)
  - [GitHub Pages](#github-pages)
  - [Local Development](#local-development)
- [Credits & Acknowledgements](#credits--acknowledgements)

---

## Introduction

**Thunder QR Code Generator** is a front-end web application that allows users to generate downloadable QR codes for any valid URL. The project was built to showcase proficiency in vanilla JavaScript (ES6+), advanced CSS animations, and third-party API integration — all without relying on external frameworks.

The thunder-themed interface transforms a simple utility tool into an engaging visual experience, featuring 200+ animated stars, dynamic lightning bolts, floating electric particles, and interactive mouse-tracking effects.

**Key technical demonstrations:**
- Object-Oriented JavaScript with the `ThunderQRGenerator` class
- Multi-API fallback architecture for reliability
- `localStorage` for persistent URL history
- CSS keyframe animations and `requestAnimationFrame` for performant effects
- Real-time input validation with visual feedback
- Responsive design optimized for mobile, tablet, and desktop

---

## Project Goals

| Goal | Description |
|------|-------------|
| **Technical Skill** | Demonstrate advanced vanilla JavaScript and CSS animation capabilities |
| **Practical Utility** | Provide a functional tool for generating high-quality, downloadable QR codes |
| **Visual Impact** | Create a memorable, portfolio-worthy interface with immersive visual effects |
| **Reliability** | Implement multi-API fallback to ensure QR generation works consistently |
| **User Experience** | Deliver intuitive URL input with validation, history, and smart suggestions |

---

## User Stories

| # | As a... | I want to... | So that I can... |
|---|---------|-------------|-----------------|
| 1 | User | Enter any URL and generate a QR code | Quickly create QR codes for sharing links |
| 2 | User | Download the generated QR code as PNG | Use it in documents, business cards, or print materials |
| 3 | User | See my recently used URLs | Regenerate codes without retyping URLs |
| 4 | User | Get real-time validation feedback | Know immediately if my URL is correctly formatted |
| 5 | User | Select from suggested URL templates | Get started quickly with common link types |
| 6 | Recruiter / Visitor | Experience a visually engaging interface | Appreciate the developer's front-end capabilities |

---

## UX & Design

### Colour Scheme

The thunder theme uses a dark-mode palette designed for visual impact and readability:

| Element | Colour | Hex Code |
|---------|--------|----------|
| Background | Deep Space Blue | `#020024` → `#090979` → `#00d4ff` |
| Primary Accent | Electric Cyan | `#00d4ff` |
| Thunder Accent | Gold to Purple | `#ffd700` → `#ff6b35` → `#8338ec` |
| Text | White | `#ffffff` |
| Valid Input | Electric Green | `#00ff88` |
| Invalid Input | Neon Red | `#ff4444` |
| Card Background | Semi-transparent | `rgba(255, 255, 255, 0.05)` |

### Typography

The application uses the system font stack for optimal performance and native feel across all platforms, with fallback to `Arial, sans-serif`.

### Wireframes

<details>
<summary>Click to expand wireframes</summary>

| View | Wireframe |
|------|-----------|
| Desktop | ![Desktop Wireframe](docs/wireframes/desktop.png) |
| Mobile | ![Mobile Wireframe](docs/wireframes/mobile.png) |

</details>

---

## Features

### Core Functionality

**QR Code Generation**
- High-quality 300×300px PNG output optimized for scanning
- Support for any valid URL (websites, LinkedIn, GitHub, Google Docs, PDFs, etc.)
- Smart filename generation based on domain name (e.g., `qr-github-com.png`)
- One-click download with proper file naming

![QR Generation Demo](docs/images/qr-generation.png)

**Real-Time URL Validation**
- Instant visual feedback with colour-coded input border
- Green glow for valid URLs, red for invalid
- Validation runs on every keystroke for immediate response

![URL Validation](docs/images/url-validation.png)

### Visual Effects System

The interface features a layered animation system built entirely with CSS and JavaScript:

| Effect | Implementation | Details |
|--------|---------------|---------|
| **Animated Starfield** | CSS + JS | 200+ twinkling stars with randomized size, position, and animation delay |
| **Lightning Strikes** | CSS keyframes | 4 lightning bolt elements with staggered 8-second animation cycles |
| **Shooting Stars** | CSS animation | Periodic meteor effects crossing the viewport |
| **Electric Particles** | CSS + JS | Floating energy particles with 6-second float animations |
| **Mouse Tracking** | JS `mousemove` | Electric field intensity simulation based on cursor position |
| **Spark Bursts** | JS event-driven | Button interactions trigger directional spark particle effects |
| **Progress Bar** | CSS + JS | Animated generation progress with electric glow effect |

### Smart URL Management

**URL History System**
- Automatically saves the last 5 unique URLs to `localStorage`
- Persistent across browser sessions
- Quick-select from history dropdown
- Smart duplicate prevention

**URL Suggestions**  
- Pre-configured templates for common URL types:
  - Portfolio / Personal Website
  - LinkedIn Profile
  - GitHub Repository
  - Google Docs / Resume PDF

### Future Features

- [ ] Custom QR code colours (foreground / background)
- [ ] QR code size selector (S / M / L / XL)
- [ ] Logo/image overlay on QR codes
- [ ] Batch generation for multiple URLs
- [ ] vCard QR codes for contact information
- [ ] Dark/Light theme toggle
- [ ] Share QR code directly via Web Share API

---

## Technologies Used

### Languages
| Technology | Usage |
|-----------|-------|
| **HTML5** | Semantic structure, accessibility attributes |
| **CSS3** | Animations, gradients, transitions, responsive layout (Flexbox) |
| **JavaScript (ES6+)** | OOP class structure, DOM manipulation, API calls, localStorage |

### APIs
| API | Role |
|-----|------|
| [QR Server API](https://goqr.me/api/) | Primary QR code generation |
| [Google Charts QR API](https://developers.google.com/chart/infographics/docs/qr_codes) | Fallback QR generation |

### Tools & Platforms
| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **GitHub** | Repository hosting |
| **GitHub Pages** | Deployment & hosting |
| **VS Code** | Development IDE |
| **Chrome DevTools** | Debugging, performance, responsive testing |

---

## File Structure

```
JS.QR-Code/
│
├── Assets/
│   ├── css/
│   │   └── styles.css          # All styling, animations, and responsive rules
│   └── js/
│       └── script.js           # ThunderQRGenerator class & effect system
│
├── docs/                        # Documentation assets
│   ├── images/                  # Screenshots & mockups
│   ├── wireframes/              # Wireframe files
│   └── testing/                 # Testing evidence screenshots
│
├── index.html                   # Main application entry point
├── README.md                    # Project documentation (this file)
└── LICENSE                      # MIT License
```

---

## API Architecture

The application uses a multi-API fallback pattern to ensure reliability:

```
User enters URL
       │
       ▼
┌──────────────────┐
│  URL Validation   │──── Invalid → Show error with visual feedback
│  (regex + format) │
└────────┬─────────┘
         │ Valid
         ▼
┌──────────────────┐
│  QR Server API   │──── Success → Display QR code
│  (Primary)       │
└────────┬─────────┘
         │ Failure
         ▼
┌──────────────────┐
│  Google Charts   │──── Success → Display QR code
│  API (Backup)    │
└────────┬─────────┘
         │ Failure
         ▼
┌──────────────────┐
│  Local Fallback  │──── Display placeholder with instructions
│  (Error State)   │
└──────────────────┘
```

### ThunderQRGenerator Class — Key Methods

| Method | Description |
|--------|-------------|
| `setUrl(url)` | Sets the target URL, validates it, and adds it to history |
| `generate()` | Generates the QR code using the fallback API chain |
| `getUrlHistory()` | Returns the array of saved URLs from localStorage |
| `loadUrlHistory()` | Loads persisted URL history on page initialization |
| `createElectricEffect()` | Triggers particle burst animation at cursor position |

---

## Testing

### Manual Testing

<details>
<summary>Click to expand manual test cases</summary>

| # | Test Case | Steps | Expected Result | Pass |
|---|-----------|-------|-----------------|------|
| 1 | Generate QR for valid URL | Enter `https://github.com` → Click Generate | QR code displays, download button appears | ✅ |
| 2 | Invalid URL validation | Enter `not-a-url` | Input border turns red, generate is disabled | ✅ |
| 3 | Empty input handling | Click Generate with empty field | Error message with visual feedback | ✅ |
| 4 | Download functionality | Generate QR → Click Download | PNG file downloads with domain-based filename | ✅ |
| 5 | URL history persistence | Generate 3 URLs → Refresh page | History dropdown shows all 3 URLs | ✅ |
| 6 | URL suggestion selection | Click a suggested URL template | URL populates input and validates | ✅ |
| 7 | Keyboard shortcut | Type URL → Press Enter | QR code generates without clicking button | ✅ |
| 8 | API fallback | Block primary API → Generate QR | Backup API generates the code | ✅ |
| 9 | Responsive layout | Resize browser from 320px to 1920px | Layout adapts without horizontal scroll | ✅ |
| 10 | Visual effects render | Load page on modern browser | Stars, lightning, particles all animate | ✅ |

</details>

### Browser Compatibility

| Browser | Version | Result |
|---------|---------|--------|
| Chrome | 120+ | ✅ Full support |
| Firefox | 121+ | ✅ Full support |
| Safari | 17+ | ✅ Full support |
| Edge | 120+ | ✅ Full support |
| Mobile Chrome (Android) | Latest | ✅ Full support |
| Mobile Safari (iOS) | Latest | ✅ Full support |

### Validator Testing

| Validator | File | Result | Evidence |
|-----------|------|--------|----------|
| [W3C HTML](https://validator.w3.org/) | `index.html` | Pass — No errors | ![HTML Validation](docs/testing/html-validation.png) |
| [W3C CSS (Jigsaw)](https://jigsaw.w3.org/css-validator/) | `styles.css` | Pass — No errors | ![CSS Validation](docs/testing/css-validation.png) |
| [JSHint](https://jshint.com/) | `script.js` | Pass — No significant issues | ![JS Validation](docs/testing/js-validation.png) |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/) | Full site | Performance: 90+ | ![Lighthouse](docs/testing/lighthouse.png) |

### Bugs

#### Resolved Bugs

| # | Bug | Cause | Fix |
|---|-----|-------|-----|
| 1 | QR code not displaying on slow connections | API timeout too short | Added longer timeout + loading indicator |
| 2 | URL history duplicates | No deduplication check | Added `Set`-based filtering before saving |
| 3 | Lightning effects causing layout shift | Absolute positioning overflow | Added `overflow: hidden` to container |

#### Known Bugs

*No known bugs at this time.*

---

## Deployment

### GitHub Pages

The site is deployed on **GitHub Pages** directly from the `main` branch.

**Steps to deploy:**
1. Navigate to **Settings** → **Pages** in the GitHub repository
2. Under **Source**, select `Deploy from a branch`
3. Choose `main` branch and `/ (root)` folder
4. Click **Save**
5. The site will be live at: `https://stevedok22.github.io/JS.QR-Code/`

### Local Development

**Clone and run locally:**

```bash
# Clone the repository
git clone https://github.com/SteveDok22/JS.QR-Code.git

# Navigate to the project folder
cd JS.QR-Code

# Open in browser (macOS)
open index.html

# Or use VS Code Live Server
code . && # Install Live Server extension → Right-click index.html → Open with Live Server
```

No build tools, dependencies, or environment variables required — the project runs entirely in the browser.

---

## Credits & Acknowledgements

### APIs & Services
- [QR Server API (goqr.me)](https://goqr.me/api/) — Primary QR code generation service
- [Google Charts QR API](https://developers.google.com/chart/infographics/docs/qr_codes) — Fallback QR generation
- [Shields.io](https://shields.io/) — README badges

### Resources & References
- [MDN Web Docs](https://developer.mozilla.org/) — JavaScript, CSS animations, and Web API references
- [CSS-Tricks](https://css-tricks.com/) — CSS animation techniques and best practices
- [Can I Use](https://caniuse.com/) — Browser compatibility checking

### Tools
- [Am I Responsive](https://ui.dev/amiresponsive) — Multi-device mockup generation
- [W3C Markup Validator](https://validator.w3.org/) — HTML validation
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) — CSS validation
- [JSHint](https://jshint.com/) — JavaScript code quality

---

<div align="center">

**Developed by Stiven Dokic** | [GitHub](https://github.com/SteveDok22) | [LinkedIn](https://www.linkedin.com/in/stiven-ntoktorov/)

⚡ *From Michelin Stars to Code* ⭐ → 💻

[![Made with JavaScript](https://img.shields.io/badge/Made_with-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>