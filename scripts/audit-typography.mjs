/**
 * Type scale consistency, measured from the rendered page.
 *
 * A design system is only real if the pages use it. This reports the distinct
 * computed font sizes per heading level and for body copy across every route,
 * so drift shows up as a count rather than as a feeling.
 */
import { chromium } from 'playwright';

const ORIGIN = process.argv[2] ?? 'http://localhost:5199';
const ROUTES = [
  '/', '/tjenester', '/tjenester/saksbehandlingsplattform', '/tjenester/tilskuddsportal',
  '/produkter', '/produkter/digilist', '/caser', '/caser/altinn', '/slik-vi-jobber',
  '/teknologi', '/om-oss', '/kontakt', '/karriere', '/blogg',
  '/blogg/tilskuddsportal-som-faktisk-brukes',
];

const browser = await chromium.launch();
const seen = new Map();

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'nb-NO' });
  const page = await ctx.newPage();
  await page.goto(ORIGIN + route, { waitUntil: 'networkidle' }).catch(() => {});
  await page.evaluate(async () => {
    const h = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < h(); y += 800) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  });
  await page.waitForTimeout(400);

  const rows = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('main h1, main h2, main h3, main p, main li')) {
      const text = (el.textContent || '').trim();
      if (!text || el.children.length > 0) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      out.push({
        tag: el.tagName.toLowerCase(),
        size: Math.round(parseFloat(cs.fontSize) * 10) / 10,
        weight: cs.fontWeight,
        lh: Math.round(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) * 100) / 100,
      });
    }
    return out;
  });

  for (const row of rows) {
    const key = row.tag;
    if (!seen.has(key)) seen.set(key, new Map());
    const bucket = seen.get(key);
    const sig = `${row.size}px/${row.weight}`;
    bucket.set(sig, (bucket.get(sig) ?? 0) + 1);
  }
  await ctx.close();
}
await browser.close();

console.log(`\n=== type scale: ${ROUTES.length} routes ===\n`);
let drift = 0;
for (const tag of ['h1', 'h2', 'h3', 'p', 'li']) {
  const bucket = seen.get(tag);
  if (!bucket) continue;
  const sorted = [...bucket.entries()].sort((a, b) => b[1] - a[1]);
  console.log(`${tag}: ${sorted.length} distinct size/weight combinations`);
  for (const [sig, n] of sorted) console.log(`     ${sig.padEnd(14)} x${n}`);
  // Below 16px for body copy is the one that matters for legibility.
  for (const [sig] of sorted) {
    const px = parseFloat(sig);
    if ((tag === 'p' || tag === 'li') && px < 14) drift += 1;
  }
  console.log();
}
console.log(drift ? `body copy below 14px in ${drift} variant(s)` : 'no body copy below 14px');
