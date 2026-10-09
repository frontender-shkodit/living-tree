import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage();
let base = process.env.AUDIT_URL || 'http://127.0.0.1:4173';
try { await fetch(base); } catch { base = 'http://127.0.0.1:5173'; }
const results = [];
for (const width of [1920, 360]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
  const inspect = async state => {
    const audit = await page.evaluate(async () => {
      const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice'] } });
      return { violations: result.violations.map(item => ({ id: item.id, impact: item.impact, description: item.description, helpUrl: item.helpUrl, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), passes: result.passes.length, incomplete: result.incomplete.map(item => ({ id: item.id, nodes: item.nodes.length })) };
    });
    results.push({ width, state, ...audit });
  };
  await inspect('page');
  await page.locator('.hero button').click();
  await inspect('dialog');
  await page.getByRole('dialog').getByRole('button', { name: 'Заказать дерево', exact: true }).click();
  await inspect('validation-errors');
  await page.keyboard.press('Escape');
}
await page.goto(base, { waitUntil: 'networkidle' });
const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(item => ({ url: item.name.split('/').pop(), bytes: item.decodedBodySize, duration: item.duration })));
const seo = await page.evaluate(() => ({ title: document.title, description: document.querySelector('meta[name="description"]')?.content ?? null, canonical: document.querySelector('link[rel="canonical"]')?.href ?? null, og: document.querySelector('meta[property="og:title"]')?.content ?? null, headings: [...document.querySelectorAll('h1,h2,h3')].map(element => ({ tag: element.tagName, text: element.textContent })), literalEscape: document.body.textContent.includes('`n') }));
await writeFile('docs/automated-audit.json', JSON.stringify({ base, results, resources, seo }, null, 2));
console.log(JSON.stringify({ base, results: results.map(result => ({ width: result.width, state: result.state, violations: result.violations.map(item => ({ id: item.id, nodes: item.nodes.length })), passes: result.passes, incomplete: result.incomplete })), resources, seo }));
await browser.close();
