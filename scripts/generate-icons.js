// Usage: npm install sharp && node scripts/generate-icons.js
// This script generates common icon PNGs (iOS/Android) from `images/icon-512.svg`.
const sharp = require('sharp');
const fs = require('fs');
const inPath = 'images/icon-512.svg';
const outDir = 'images/icons';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const sizes = [512, 384, 256, 192, 180, 167, 152, 144, 120, 96, 72, 48];
(async () => {
  for (const s of sizes) {
    const out = `${outDir}/icon-${s}.png`;
    await sharp(inPath).resize(s, s).png().toFile(out);
    console.log('Generated', out);
  }
})().catch(err => { console.error(err); process.exit(1); });