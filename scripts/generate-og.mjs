// Genera la imagen Open Graph por defecto (1200x630) en public/og/maven-films.jpg
import fs from 'node:fs';
import sharp from 'sharp';

const W = 1200, H = 630;
const bg = await sharp('src/assets/images/fachada-azul-wide.jpg').resize(W, H, { fit: 'cover' }).modulate({ brightness: 0.55, saturation: 0.7 }).toBuffer();
const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#091e26" stop-opacity="0.97"/><stop offset="0.65" stop-color="#0f2e3a" stop-opacity="0.8"/><stop offset="1" stop-color="#0f2e3a" stop-opacity="0.35"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="80" y="420" width="64" height="5" rx="2.5" fill="#E39B2D"/>
  <text x="80" y="480" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="#F7F7F5">Películas para vidrio</text>
  <text x="80" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#C5CBD0">Control solar · Seguridad · Decorativas · Sandblasting</text>
</svg>`);
const logo = await sharp(fs.readFileSync('public/brand/maven-films-horizontal-reverso.svg')).resize({ width: 560 }).png().toBuffer();
await sharp(bg).composite([{ input: overlay }, { input: logo, left: 80, top: 150 }]).jpeg({ quality: 86, mozjpeg: true }).toFile('public/og/maven-films.jpg');
console.log('✓ public/og/maven-films.jpg');
