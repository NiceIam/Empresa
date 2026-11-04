// Normaliza fotos fuente (máx. 2000 px, JPEG q85, sin metadatos) antes de agregarlas a src/assets/images.
// Uso: npm run images -- <carpeta-origen> [carpeta-destino]
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [, , src, dest = 'src/assets/images'] = process.argv;
if (!src) {
  console.error('Uso: npm run images -- <carpeta-origen> [carpeta-destino]');
  process.exit(1);
}
fs.mkdirSync(dest, { recursive: true });
for (const file of fs.readdirSync(src).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
  const out = path.join(dest, file.replace(/\.(png|webp|jpeg)$/i, '.jpg'));
  await sharp(path.join(src, file))
    .rotate()
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(out);
  console.log('✓', out);
}
