import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('http://127.0.0.1:4175/living-tree/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await Promise.all([...document.images].map(image => {
      image.loading = 'eager';
      return image.decode();
    }));
  });
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => ({
    cards: document.querySelectorAll('.product-card').length,
    icons: document.querySelectorAll('.svg-icon svg').length,
    brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
    wrongPaths: [...document.querySelectorAll('[src], [srcset]')]
      .flatMap(element => [element.getAttribute('src'), element.getAttribute('srcset')])
      .filter(value => value && /(^|[ ,])\/assets\//.test(value)),
  }));
  console.log(JSON.stringify({ ...result, errors }, null, 2));
  if (result.cards !== 9 || !result.icons || result.brokenImages.length || result.wrongPaths.length || errors.length) {
    throw new Error('GitHub Pages preview check failed');
  }
} finally {
  await browser.close();
}
