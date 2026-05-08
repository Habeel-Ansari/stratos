/**
 * Generates og-image.png (1200×630) and apple-touch-icon.png (180×180)
 * into public/ using sharp (SVG → PNG).
 *
 * Run: node scripts/gen-images.mjs
 */

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public");

/* ── og-image  1200 × 630 ──────────────────────────────────── */
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630"
     xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="60%" cy="45%" r="55%">
      <stop offset="0%"   stop-color="#1a3a5c"/>
      <stop offset="100%" stop-color="#0c1e33"/>
    </radialGradient>
    <linearGradient id="bolt" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%"   stop-color="#ff7043"/>
      <stop offset="100%" stop-color="#e64a19"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="10" height="630" fill="#ff7043"/>

  <!-- Bottom cyan line -->
  <rect x="10" y="622" width="1190" height="8" fill="#00b89e"/>

  <!-- Large faint bolt watermark (right side) -->
  <g transform="translate(680, 60) scale(5.5)" opacity="0.07">
    <polygon points="58,4 22,54 46,54 42,96 78,46 54,46" fill="#ff7043"/>
  </g>

  <!-- Bold bolt icon (left) -->
  <g transform="translate(72, 175) scale(3.6)">
    <polygon points="58,4 22,54 46,54 42,96 78,46 54,46" fill="url(#bolt)"/>
  </g>

  <!-- Company name -->
  <text x="290" y="295"
        font-family="Arial Black, Arial, sans-serif"
        font-size="82" font-weight="900"
        fill="#ffffff" letter-spacing="-1">Stratos Energy</text>

  <!-- Divider line -->
  <rect x="290" y="318" width="560" height="3" fill="#ff7043" rx="2"/>

  <!-- Tagline -->
  <text x="290" y="375"
        font-family="Arial, sans-serif"
        font-size="34" font-weight="400"
        fill="rgba(255,255,255,0.72)">Electrical Products Supplier in Saudi Arabia</text>

  <!-- Categories strip -->
  <text x="290" y="430"
        font-family="Arial, sans-serif"
        font-size="22" fill="rgba(255,255,255,0.42)">
    Cable · Switchgear · Earthing · Enclosures · Lighting · Communications
  </text>

  <!-- Domain badge -->
  <rect x="290" y="468" width="238" height="44" rx="8" fill="rgba(0,184,158,0.15)"
        stroke="#00b89e" stroke-width="1.5"/>
  <text x="409" y="496"
        font-family="Arial, sans-serif"
        font-size="22" font-weight="600"
        fill="#00b89e" text-anchor="middle">stratosenergy.sa</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ quality: 95, compressionLevel: 8 })
  .toFile(join(publicDir, "og-image.png"));

console.log("✓  public/og-image.png  (1200 × 630)");

/* ── apple-touch-icon  180 × 180 ───────────────────────────── */
const iconSvg = `
<svg width="180" height="180" viewBox="0 0 180 180"
     xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bolt" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%"   stop-color="#ff7043"/>
      <stop offset="100%" stop-color="#d32f2f"/>
    </linearGradient>
  </defs>
  <!-- Rounded background -->
  <rect width="180" height="180" rx="32" fill="#0c1e33"/>
  <!-- Bolt centred -->
  <g transform="translate(90,90) scale(1.72) translate(-50,-50)">
    <polygon points="58,4 22,54 46,54 42,96 78,46 54,46" fill="url(#bolt)"/>
  </g>
</svg>`;

await sharp(Buffer.from(iconSvg))
  .png({ quality: 95 })
  .toFile(join(publicDir, "apple-touch-icon.png"));

console.log("✓  public/apple-touch-icon.png  (180 × 180)");
