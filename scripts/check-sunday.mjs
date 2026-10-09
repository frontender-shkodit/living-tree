import { chromium } from '@playwright/test';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4175/living-tree/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const session = await page.context().newCDPSession(page);
  await session.send('DOM.enable');
  await session.send('CSS.enable');
  const { root } = await session.send('DOM.getDocument');
  const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector: '.hero-slogan' });
  const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId });
  console.log(fonts);
  if (!fonts.length || fonts.some(font => !font.isCustomFont || !/sunday/i.test(font.familyName))) throw new Error('Sunday is not rendering the Russian heading');
} finally { await browser.close(); }
