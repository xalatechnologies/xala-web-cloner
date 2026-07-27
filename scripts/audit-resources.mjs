/**
 * Every request a page makes, and whether it succeeded.
 *
 * Broken assets are invisible in this codebase: several components hide a
 * failed <img> with an onError handler, so a missing file shows up as nothing
 * at all on screen and a 404 in the network log. This is the network log.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'https://xala.no';
const ROUTES = [
  '/', '/tjenester', '/tjenester/saksbehandlingssystem', '/produkter', '/caser', '/caser/altinn', '/slik-vi-jobber',
  '/teknologi', '/om-oss', '/kontakt', '/karriere', '/blogg',
  '/blogg/tilskuddsportal-som-faktisk-brukes', '/privacy', '/terms', '/cookies',
];

const browser = await chromium.launch();
const failures = new Map();
const consoleErrors = [];

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'nb-NO' });
  const page = await ctx.newPage();
  page.on('response', (r) => {
    if (r.status() < 400) return;
    const key = `${r.status()} ${r.url()}`;
    if (!failures.has(key)) failures.set(key, new Set());
    failures.get(key).add(route);
  });
  page.on('pageerror', (e) => consoleErrors.push(`${route}: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) {
      consoleErrors.push(`${route}: ${m.text().slice(0, 160)}`);
    }
  });
  await page.goto(BASE + route, { waitUntil: 'networkidle' }).catch(() => {});
  // Scroll so lazy-loaded images actually get requested.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.9;
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
  });
  await page.waitForTimeout(700);
  await ctx.close();
}

await browser.close();

console.log(`\n=== resource audit: ${ROUTES.length} routes (${BASE}) ===\n`);
if (!failures.size && !consoleErrors.length) {
  console.log('  every request succeeded, no console errors');
  process.exit(0);
}
for (const [key, routes] of failures) console.log(`  ${key}\n      on: ${[...routes].join(', ')}`);
for (const err of [...new Set(consoleErrors)]) console.log(`  console: ${err}`);
process.exitCode = 1;
