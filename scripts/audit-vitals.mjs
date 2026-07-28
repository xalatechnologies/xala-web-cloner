/**
 * Layout stability and paint timing, measured on real pages.
 *
 * CLS is the metric a site full of images gets wrong without noticing: an image
 * with no intrinsic size reserves no space, so everything below it jumps when it
 * loads. It is invisible on a fast connection and infuriating on a slow one,
 * which is exactly the combination that keeps it unfixed.
 */
import { chromium } from 'playwright';

const ORIGIN = process.argv[2] ?? 'https://xala.no';
const ROUTES = ['/', '/tjenester', '/caser', '/blogg', '/blogg/agentiske-arbeidsflyter-i-saksbehandling', '/produkter'];

const browser = await chromium.launch();
const rows = [];

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'nb-NO' });
  const page = await ctx.newPage();

  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      window.__lcp = list.getEntries().at(-1)?.startTime ?? null;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  await page.goto(ORIGIN + route, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    const h = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < h(); y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);

  rows.push(
    await page.evaluate((route) => {
      const nav = performance.getEntriesByType('navigation')[0];
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      const imgs = [...document.querySelectorAll('img')];
      return {
        route,
        cls: +(window.__cls ?? 0).toFixed(4),
        lcpMs: window.__lcp ? Math.round(window.__lcp) : null,
        fcpMs: fcp ? Math.round(fcp.startTime) : null,
        ttfbMs: Math.round(nav.responseStart),
        imgs: imgs.length,
        // An image with neither attribute nor an aspect-ratio style reserves no
        // space until it downloads.
        imgsNoSize: imgs.filter((i) => {
          if (i.getAttribute('width') && i.getAttribute('height')) return false;
          const s = getComputedStyle(i);
          return s.aspectRatio === 'auto' && !s.height.endsWith('px');
        }).length,
      };
    }, route)
  );
  await ctx.close();
}
await browser.close();

console.log(`\n=== vitals: ${ROUTES.length} routes (${ORIGIN}) ===\n`);
for (const r of rows) {
  const clsFlag = r.cls > 0.1 ? '  ← CLS above 0.1' : '';
  console.log(
    `${r.route.padEnd(46)} CLS ${String(r.cls).padEnd(7)} LCP ${String(r.lcpMs ?? '-').padStart(5)}ms  FCP ${String(r.fcpMs).padStart(4)}ms  TTFB ${String(r.ttfbMs).padStart(4)}ms  imgs ${r.imgs} (${r.imgsNoSize} unsized)${clsFlag}`
  );
}
const worst = rows.reduce((a, b) => (b.cls > a.cls ? b : a));
console.log(`\nworst CLS: ${worst.cls} on ${worst.route}`);
console.log(`images with no reserved space: ${rows.reduce((n, r) => n + r.imgsNoSize, 0)}`);
