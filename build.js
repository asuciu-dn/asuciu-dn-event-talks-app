const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

const htmlTemplatePath = path.join(srcDir, 'index.html');
const cssPath = path.join(srcDir, 'style.css');
const jsPath = path.join(srcDir, 'script.js');
const outputPath = path.join(distDir, 'index.html');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Read assets
const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Inject content into the HTML template
const finalHtml = htmlTemplate
    .replace('<style id="event-styles"></style>', `<style>${cssContent}</style>`)
    .replace('<script id="event-script"></script>', `<script>${jsContent}</script>`);

// Write the final HTML file
fs.writeFileSync(outputPath, finalHtml, 'utf8');

console.log(`Successfully compiled the website to ${outputPath}`);
