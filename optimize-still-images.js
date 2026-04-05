import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, 'public', 'fotografia');
const OUTPUT_WIDTHS = [700, 1400, 2200];
const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp']);

const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const isGeneratedFile = (fileName) => /-\d+w\.(webp|jpe?g)$/i.test(fileName);

const getImageFiles = (directory) =>
  fs
    .readdirSync(directory)
    .filter((fileName) => {
      const extension = path.extname(fileName).toLowerCase();
      return SOURCE_EXTENSIONS.has(extension) && !isGeneratedFile(fileName);
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const galleryDirectories = fs
  .readdirSync(ROOT_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const manifest = {};

for (const directoryName of galleryDirectories) {
  const galleryDir = path.join(ROOT_DIR, directoryName);
  const sourceFiles = getImageFiles(galleryDir);
  const folderSlug = slugify(directoryName);

  manifest[folderSlug] = [];

  for (const [index, fileName] of sourceFiles.entries()) {
    const sourcePath = path.join(galleryDir, fileName);
    const image = sharp(sourcePath, { failOn: 'none' }).rotate();
    const metadata = await image.metadata();
    const originalWidth = metadata.width ?? OUTPUT_WIDTHS[OUTPUT_WIDTHS.length - 1];
    const widths = [...new Set(OUTPUT_WIDTHS.filter((width) => width < originalWidth).concat(originalWidth))]
      .sort((a, b) => a - b);
    const outputBaseName = `${folderSlug}-${String(index + 1).padStart(2, '0')}`;

    manifest[folderSlug].push({
      originalFile: fileName,
      outputBaseName,
      width: metadata.width ?? null,
      height: metadata.height ?? null,
    });

    for (const width of widths) {
      const resized = sharp(sourcePath, { failOn: 'none' }).rotate().resize({
        width,
        withoutEnlargement: true,
      });

      await resized
        .clone()
        .webp({ quality: 76, effort: 6 })
        .toFile(path.join(galleryDir, `${outputBaseName}-${width}w.webp`));

      await resized
        .clone()
        .jpeg({ quality: 82, mozjpeg: true, progressive: true })
        .toFile(path.join(galleryDir, `${outputBaseName}-${width}w.jpg`));

      console.log(`✅ ${directoryName}: ${outputBaseName}-${width}w gerado`);
    }
  }
}

fs.writeFileSync(
  path.join(ROOT_DIR, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
);

console.log('✨ Otimização concluída. Manifest salvo em public/fotografia/manifest.json');
