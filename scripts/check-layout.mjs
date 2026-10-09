import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('docs/screenshots', { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const failures = [];
page.on('pageerror', error => failures.push(error.message));
const results = [];
for (const width of [1920, 1440, 1439, 1200, 1000, 999, 768, 767, 600, 480, 479, 360, 320]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
  await page.evaluate(async () => { await document.fonts.ready; document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; }); await Promise.all([...document.images].map(image => image.decode().catch(() => {}))); });
  const result = await page.evaluate(() => ({
    width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
    brokenImages: [...document.images].filter(image => !image.naturalWidth).map(image => image.src),
    cards: document.querySelectorAll('.product-card').length,
    clippedText: [...document.querySelectorAll('h1,h2,h3,p,a,button')].filter(element => !element.closest('.sr-only') && element.textContent.trim() && element.clientWidth && element.scrollWidth > element.clientWidth + 1).map(element => element.textContent.trim()),
    columns: getComputedStyle(document.querySelector('.product-grid')).gridTemplateColumns.split(' ').length,
    background: getComputedStyle(document.querySelector('.catalog')).backgroundImage,
    sections: [...document.querySelectorAll('main > section')].map(section => ({ name: section.className, y: section.getBoundingClientRect().top + scrollY, height: section.getBoundingClientRect().height })),
    images: [...document.images].map(image => ({ file: image.currentSrc.split('/').pop(), width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height })),
  }));
  results.push(result);
  const expectedColumns = width >= 1000 ? 4 : width >= 768 ? 3 : width >= 480 ? 2 : 1;
  if (result.scrollWidth > width || result.brokenImages.length || result.cards !== 9 || result.clippedText.length || result.columns !== expectedColumns) failures.push(`Layout failed at ${width}`);
  if ([1920, 1000, 768, 480, 360].includes(width)) await page.screenshot({ path: `docs/screenshots/landing-${width}.png`, fullPage: true });
}
await page.setViewportSize({ width: 360, height: 900 });
await page.goto('http://127.0.0.1:5173');
const toggle = page.getByRole('button', { name: 'Открыть меню' });
await toggle.click();
await page.keyboard.press('Escape');
if (await toggle.getAttribute('aria-expanded') !== 'false') failures.push('Escape did not close menu');
if (!(await toggle.evaluate(element => element === document.activeElement))) failures.push('Escape did not restore focus');
await toggle.click();
await page.mouse.click(10, 500);
if (await toggle.getAttribute('aria-expanded') !== 'false') failures.push('Outside click did not close menu');
await toggle.click();
await page.setViewportSize({ width: 1000, height: 900 });
await page.waitForFunction(() => !document.querySelector('#mobile-menu'));
await page.setViewportSize({ width: 360, height: 900 });
await toggle.click();
await page.locator('#mobile-menu').getByRole('link', { name: 'Наши работы' }).click();
if (await toggle.getAttribute('aria-expanded') !== 'false') failures.push('Navigation did not close menu');
await page.locator('.product-card button').first().click();
const orderDialog = page.getByRole('dialog');
await orderDialog.getByPlaceholder('Имя*').fill('Проверка');
await orderDialog.getByPlaceholder('Телефон*').fill('+79895226779');
await orderDialog.getByRole('button', { name: 'Заказать дерево', exact: true }).click();
await page.getByRole('alert').waitFor();
if (!(await page.getByRole('alert').textContent()).includes('не подключена')) failures.push('Form must disclose missing integration');
await page.keyboard.press('Escape');
await writeFile('docs/layout-check.json', JSON.stringify({ results, failures }, null, 2));
await browser.close();
console.log(JSON.stringify({ widths: results.map(result => result.width), failures }));
if (failures.length) process.exitCode = 1;
