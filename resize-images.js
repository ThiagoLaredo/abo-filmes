import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public/movies');
const sizes = [500, 1000];

// Cria a pasta se não existir
if (!fs.existsSync(inputDir)) {
  fs.mkdirSync(inputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  // Processa apenas arquivos .webp que NÃO têm sufixo de tamanho
  if (file.endsWith('.webp') && !file.includes('-500w') && !file.includes('-1000w')) {
    const inputPath = path.join(inputDir, file);
    const baseName = file.replace('.webp', '');

    sizes.forEach(size => {
      const outputWebp = path.join(inputDir, `${baseName}-${size}w.webp`);
      const outputJpg = path.join(inputDir, `${baseName}-${size}w.jpg`);

      // Gerar WebP redimensionado
      sharp(inputPath)
        .resize(size)
        .webp({ quality: 85 })
        .toFile(outputWebp)
        .then(() => console.log(`✅ Gerado: ${baseName}-${size}w.webp`))
        .catch(err => console.error(`❌ Erro ao gerar ${baseName}-${size}w.webp:`, err));

      // Gerar JPEG redimensionado
      sharp(inputPath)
        .resize(size)
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(outputJpg)
        .then(() => console.log(`✅ Gerado: ${baseName}-${size}w.jpg`))
        .catch(err => console.error(`❌ Erro ao gerar ${baseName}-${size}w.jpg:`, err));
    });
  }
});