import { chromium, expect } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
const html = await readFile('dist/index.html', 'utf8');
if (!html.includes('product-card') || !html.includes('цетрарии')) throw new Error('Static HTML missing content');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const failures = [];
const noJS = await browser.newPage({ javaScriptEnabled: false });
await noJS.goto('http://127.0.0.1:4173');
await expect(noJS.locator('.product-card')).toHaveCount(9);
await expect(noJS.locator('h1')).toContainText('цетрарии');
const page = await browser.newPage();
page.on('pageerror', error => failures.push(error.message));
page.on('console', message => { if (message.type() === 'error') failures.push(message.text()); });
await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
await page.locator('.hero button').click();
await expect(page.getByRole('dialog')).toBeVisible();
await page.keyboard.press('Escape');
await page.locator('.skip-link').focus();
await page.keyboard.press('Enter');
await expect(page.locator('main')).toBeFocused();
const chosenImage = await page.locator('.hero-art img').evaluate(image => image.currentSrc);
if (!chosenImage.endsWith('.avif')) failures.push('Modern image source not selected');
const before = await page.locator('.header-inner').boundingBox();
await page.locator('.hero button').click();
const after = await page.locator('.header-inner').boundingBox();
if (before.x !== after.x) failures.push('Modal shifts layout');
await page.keyboard.press('Escape');
for (const file of ['logo.svg','logo1.svg']) {
  const source = await readFile(`public/assets/figma/${file}`, 'utf8');
  const optimized = await readFile(`public/assets/optimized/${file}`, 'utf8');
  for (const attribute of ['width','height']) {
    const match = new RegExp(`<svg[^>]*\\b${attribute}="([^"]+)"`);
    if (source.match(match)?.[1] !== optimized.match(match)?.[1]) failures.push(`SVG ${attribute} changed: ${file}`);
  }
}
await writeFile('docs/prerender-check.json', JSON.stringify({ staticHtmlBytes: Buffer.byteLength(html), productsWithoutJavaScript: 9, chosenImage, failures }, null, 2));
await browser.close();
console.log(JSON.stringify({ failures }));
if (failures.length) process.exitCode = 1;
