const config = require('./config');
const { 
    generateQRCodeToFile, 
    generateQRCodeTerminal, 
    getQRCodeInfo 
} = require('./generate-qr');

/**
 * Main function to generate QR code
 */
async function main() {
    try {
        console.log(config.messages.generating);
        console.log(config.messages.urlInfo, config.url);
        console.log(config.messages.settingsInfo, JSON.stringify(config.options, null, 2));
        console.log(''); // Empty line for better formatting
        
        // Get QR code info
        const qrInfo = getQRCodeInfo(config.url);
        console.log('📊 QR Code Info:');
        console.log(`   URL Length: ${qrInfo.urlLength} characters`);
        console.log(`   Data Type: ${qrInfo.dataType}`);
        console.log(`   Generated: ${qrInfo.timestamp}`);
        console.log(''); // Empty line
        
        // Generate QR code for terminal display (optional preview)
        try {
            console.log('📱 Terminal Preview:');
            const terminalQR = await generateQRCodeTerminal(config.url, {
                small: true,
                ...config.options
            });
            console.log(terminalQR);
        } catch (previewError) {
            console.log('   (Terminal preview not available)');
        }
        
        console.log(''); // Empty line
        
        // Generate QR code to file
        console.log('💾 Saving to file...');
        const savedFilename = await generateQRCodeToFile(
            config.filename,
            config.url,
            config.options
        );
        
        // Success message
        console.log(''); // Empty line
        console.log('🎉 ' + config.messages.success, savedFilename);
        console.log(''); // Empty line
        
        // Instructions
        console.log('📋 Next steps:');
        console.log('   1. Open the generated PNG file');
        console.log('   2. Test it by scanning with your phone');
        console.log('   3. Use it in your resume, business cards, etc.');
        
    } catch (error) {
        console.error(''); // Empty line
        console.error(config.messages.error, error.message);
        console.error(''); // Empty line
        
        // Help message
        console.log('🆘 Troubleshooting:');
        console.log('   1. Make sure you ran: npm install qrcode');
        console.log('   2. Check that the URL is valid');
        console.log('   3. Ensure you have write permissions in this folder');
        
        // Exit with error code
        process.exit(1);
    }
}

/**
 * Alternative function for advanced generation with multiple formats
 */
async function generateMultipleFormats() {
    const { generateQRCodeSVG } = require('./generate-qr');
    const fs = require('fs');
    
    try {
        console.log('🎯 Generating multiple formats...');
        
        // Generate PNG
        await generateQRCodeToFile(
            config.filenames.png,
            config.url,
            config.options
        );
        console.log('✅ PNG saved:', config.filenames.png);
        
        // Generate SVG
        const svgString = await generateQRCodeSVG(config.url, config.options);
        fs.writeFileSync(config.filenames.svg, svgString);
        console.log('✅ SVG saved:', config.filenames.svg);
        
        console.log('🎉 All formats generated successfully!');
        
    } catch (error) {
        console.error('❌ Error generating multiple formats:', error.message);
    }
}

// Run the main function
if (require.main === module) {
    // Check command line arguments
    const args = process.argv.slice(2);
    
    if (args.includes('--multiple') || args.includes('-m')) {
        generateMultipleFormats();
    } else {
        main();
    }
}

// Export functions for use in other files
module.exports = {
    main,
    generateMultipleFormats
};