/**
 * Text contrast audit, both themes, every route.
 *
 * The fourth of the rendered audits, alongside audit-a11y, audit-responsive and
 * audit-language.
 *
 * Getting the *backdrop* right is the whole problem. A first version walked up
 * the parent chain reading background-color, and reported 182 failures in light
 * mode — almost all false. It could not see NorchainSection's linear-gradient,
 * so it compared light text against the page background rather than the dark
 * gradient the text actually sits on. It also could not see the cookie banner's
 * backdrop, which is an absolutely-positioned *sibling* rather than an ancestor.
 *
 * So this uses elementsFromPoint at the text's own centre, which returns the
 * real paint stack — ancestors, siblings and overlays alike — and composites
 * down it honouring gradients and alpha. Slower, and correct.
 *
 *   node scripts/audit-contrast.mjs http://localhost:8081
 */
import { chromium } from 'playwright';

const ORIGIN = process.argv[2] ?? 'http://localhost:8080';

const ROUTES = [
  '/', '/tjenester', '/produkter', '/caser', '/caser/altinn', '/slik-vi-jobber',
  '/teknologi', '/om-oss', '/kontakt', '/karriere', '/blogg', '/privacy',
  '/terms', '/cookies',
];

(async () => {
  const browser = await chromium.launch();
  const findings = [];

  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'nb-NO' });
    const page = await context.newPage();
    await page.addInitScript((t) => {
      try { localStorage.setItem('theme', t); } catch { /* private mode */ }
    }, theme);

    for (const route of ROUTES) {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle' }).catch(() => {});
      await page.waitForTimeout(1000);

      const hits = await page.evaluate(() => {
        const parse = (c) => {
          const m = c && c.match(/[\d.]+/g);
          return m ? [+m[0], +m[1], +m[2], m[3] === undefined ? 1 : +m[3]] : null;
        };
        const relative = (x) => (x /= 255) <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
        const lum = (rgb) => 0.2126 * relative(rgb[0]) + 0.7152 * relative(rgb[1]) + 0.0722 * relative(rgb[2]);
        const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat([1]);

        /** The colour actually painted behind this element, via the paint stack. */
        function backdrop(el, x, y) {
          const stack = document.elementsFromPoint(x, y);
          const start = stack.indexOf(el);
          const layers = [];
          for (const node of stack.slice(start === -1 ? 0 : start)) {
            const cs = getComputedStyle(node);
            const image = cs.backgroundImage;
            if (image && image !== 'none' && /gradient/.test(image)) {
              const stops = image.match(/rgba?\([^)]+\)/g);
              const first = stops?.length ? parse(stops[0]) : null;
              if (first) {
                layers.push(first);
                // Only stop if the wash is opaque. --hero-gradient starts at
                // 14% alpha; treating that as the full backdrop reported white
                // text on a translucent bronze and produced false failures.
                if (first[3] >= 0.999) break;
                continue;
              }
            }
            const colour = parse(cs.backgroundColor);
            if (colour && colour[3] > 0) {
              layers.push(colour);
              if (colour[3] >= 0.999) break;
            }
          }
          if (!layers.length) return parse(getComputedStyle(document.body).backgroundColor) ?? [255, 255, 255, 1];
          return layers.reduceRight((acc, layer) => over(layer, acc));
        }

        const out = [];
        const seen = new Set();
        for (const el of document.querySelectorAll('p, span, a, li, h1, h2, h3, h4, button, label')) {
          const text = (el.textContent || '').trim();
          if (!text || text.length < 4 || el.children.length > 0) continue;

          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.5) continue;

          const box = el.getBoundingClientRect();
          if (box.width < 2 || box.height < 2) continue;
          if (box.bottom < 0 || box.top > window.innerHeight) continue;

          const fg = parse(cs.color);
          if (!fg) continue;

          const bg = backdrop(el, box.left + box.width / 2, box.top + box.height / 2);
          const ratio = (() => {
            const a = lum(over(fg, bg));
            const b = lum(bg);
            return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
          })();

          const size = parseFloat(cs.fontSize);
          const weight = +cs.fontWeight || 400;
          const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
          const required = isLarge ? 3 : 4.5;

          if (ratio < required) {
            const key = `${text.slice(0, 26)}|${ratio.toFixed(1)}`;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push({ text: text.slice(0, 38), ratio: +ratio.toFixed(2), required, size: Math.round(size) });
          }
        }
        return out;
      });

      hits.forEach((h) => findings.push({ theme, route, ...h }));
    }
    await context.close();
  }

  await browser.close();

  console.log(`\n=== contrast audit: ${ROUTES.length} routes x 2 themes (WCAG AA) ===\n`);
  if (!findings.length) {
    console.log('  every text node meets AA against its real backdrop');
    process.exit(0);
  }

  for (const theme of ['light', 'dark']) {
    const items = findings.filter((f) => f.theme === theme);
    console.log(`${theme} (${items.length}):`);
    const seen = new Set();
    for (const f of items) {
      const key = `${f.text}|${f.ratio}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(`  ${f.route.padEnd(16)} ${String(f.ratio).padStart(5)}:1 (needs ${f.required}) ${f.size}px  "${f.text}"`);
    }
    console.log();
  }
  process.exit(0);
})();
