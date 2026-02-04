// Usage: npm install sharp && node scripts/generate-icons.js
// This script generates common icon PNGs (iOS/Android) and iOS splash images from `images/icon-512.svg`.
const sharp = require('sharp');
const fs = require('fs');

const inSvg = 'images/icon-512.svg';
const inPng = 'images/icon-512.png';
const inPath = fs.existsSync(inSvg) ? inSvg : inPng;
if (!inPath) { console.error('Source icon not found (images/icon-512.svg or images/icon-512.png)'); process.exit(1); }

const outIconsDir = 'images/icons';
const outSplashDir = 'images/splash';
if (!fs.existsSync(outIconsDir)) fs.mkdirSync(outIconsDir, { recursive: true });
if (!fs.existsSync(outSplashDir)) fs.mkdirSync(outSplashDir, { recursive: true });

const iconSizes = [512, 384, 256, 192, 180, 167, 152, 144, 120, 96, 72, 48];
const splashSizes = [
  {w:640,h:1136}, {w:750,h:1334}, {w:828,h:1792}, {w:1125,h:2436},
  {w:1170,h:2532}, {w:1242,h:2688}, {w:1284,h:2778},
  {w:1536,h:2048}, {w:1668,h:2224}, {w:1668,h:2388}, {w:2048,h:2732}
];

(async () => {
  // Generate icons
  for (const s of iconSizes) {
    const out = `${outIconsDir}/icon-${s}.png`;
    await sharp(inPath).resize(s, s).png().toFile(out);
    console.log('Generated icon', out);
  }

  // Generate splash images: background filled with theme color and centered app icon
  const background = '#2c3e50';
  for (const sz of splashSizes) {
    const out = `${outSplashDir}/splash-${sz.w}x${sz.h}.png`;
    const iconSize = Math.round(Math.min(sz.w, sz.h) * 0.45);
    const iconBuffer = await sharp(inPath).resize(iconSize, iconSize).png().toBuffer();
    await sharp({ create: { width: sz.w, height: sz.h, channels: 4, background: background } })
      .composite([{ input: iconBuffer, gravity: 'centre' }])
      .png().toFile(out);
    console.log('Generated splash', out);
  }

  console.log('All icons and splash images generated.');
})().catch(err => { console.error(err); process.exit(1); });