import sharp from 'sharp';
import { optimize } from 'svgo';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
const output = 'public/assets/optimized';
await mkdir(output, { recursive: true });
const files = ['hero-1920.png', 'vector2.png', 'tablet768-vector1.png', 'mobile480-vector1.png', 'mobile360-vector1.png', 'photo.png', ...Array.from({ length: 9 }, (_, i) => `photo${i + 1}.png`)];
const report = [];
for (const file of process.argv.includes('--svg-only') ? [] : files) {
  const path = `public/assets/figma/${file}`;
  const metadata = await sharp(path).metadata();
  const widths = file.startsWith('photo') && file !== 'photo.png' ? [250, 500] : [Math.round(metadata.width / 2), metadata.width];
  for (const width of widths) {
    for (const format of ['webp', 'avif']) {
      const target = `${output}/${file.replace('.png', '')}-${width}.${format}`;
      const image = sharp(path).resize({ width, withoutEnlargement: true });
      await (format === 'webp' ? image.webp({ quality: 84, effort: 5 }) : image.avif({ quality: 58, effort: 4 })).toFile(target);
      report.push({ source: file, width, format, originalBytes: (await stat(path)).size, bytes: (await stat(target)).size });
    }
  }
}
for (const file of ['logo.svg', 'logo1.svg']) {
  const source = await readFile(`public/assets/figma/${file}`, 'utf8');
  const result = optimize(source, { multipass: true, plugins: ['preset-default'] });
  let data = result.data;
  for (const attribute of ['width', 'height']) {
    const root = new RegExp(`<svg[^>]*\\b${attribute}="([^"]+)"`);
    const original = source.match(root)?.[1];
    if (original) data = data.replace(/<svg[^>]*>/, tag => tag.replace(new RegExp(`\\b${attribute}="[^"]+"`), `${attribute}="${original}"`));
  }
  await writeFile(`${output}/${file}`, data);
  report.push({ source: file, originalBytes: Buffer.byteLength(source), bytes: Buffer.byteLength(data) });
}
const previous = process.argv.includes('--svg-only') ? JSON.parse(await readFile('docs/asset-optimization.json', 'utf8')).filter(item => !item.source.endsWith('.svg')) : [];
await writeFile('docs/asset-optimization.json', JSON.stringify([...previous, ...report], null, 2));
console.log(JSON.stringify(report.filter(item => item.source === 'hero-1920.png' || item.source.startsWith('logo'))));
