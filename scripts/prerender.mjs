import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  const content = render();
  if (!content.includes('product-card')) throw new Error('Prerendered catalog missing');
  await writeFile('dist/index.html', template.replace('<div id="root"></div>', `<div id="root">${content}</div>`));
  console.log('Prerendered complete landing page into dist/index.html');
} finally { await server.close(); }
