/**
 * Rendered accessibility and document-structure audit.
 *
 * Companion to audit-responsive.mjs (layout) and audit-language.mjs (copy).
 * This one checks the things that are only true once the DOM exists: heading
 * order, image alternatives, form labelling, link text, and landmarks.
 *
 *   node scripts/audit-a11y.mjs http://localhost:8081
 */
import { chromium } from 'playwright';

const ORIGIN = process.argv[2] ?? 'http://localhost:8080';

const ROUTES = [
  '/', '/tjenester', '/produkter', '/caser', '/caser/altinn', '/slik-vi-jobber',
  '/teknologi', '/om-oss', '/kontakt', '/karriere', '/blogg', '/privacy',
  '/terms', '/cookies', '/finnes-ikke-404',
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'nb-NO' });
  const page = await context.newPage();
  const findings = [];

  for (const route of ROUTES) {
    await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(1000);

    const hits = await page.evaluate(() => {
      const out = [];
      const add = (kind, detail) => out.push({ kind, detail });

      // Heading order. Skipping a level (h2 -> h4) breaks the outline screen
      // reader users navigate by.
      const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
      let previous = 0;
      for (const h of headings) {
        const level = Number(h.tagName[1]);
        const label = (h.textContent || '').trim().slice(0, 34);
        if (previous && level > previous + 1) {
          add('heading-skip', `h${previous} -> h${level} at "${label}"`);
        }
        if (!(h.textContent || '').trim()) add('heading-empty', `empty <${h.tagName.toLowerCase()}>`);
        previous = level;
      }

      // Images. alt="" is legitimate for decoration; a missing attribute is not,
      // because a screen reader then falls back to reading the file name.
      for (const img of document.querySelectorAll('img')) {
        if (!img.hasAttribute('alt')) {
          add('img-no-alt', (img.getAttribute('src') || '').slice(-46));
        }
      }

      // Controls with no accessible name.
      for (const el of document.querySelectorAll('a, button, [role="button"]')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        const name = (
          el.getAttribute('aria-label') ||
          el.getAttribute('title') ||
          el.textContent ||
          ''
        ).trim();
        if (!name) add('control-unnamed', `<${el.tagName.toLowerCase()}> ${(el.className || '').toString().slice(0, 40)}`);
      }

      // Inputs need a programmatic label, not just a placeholder.
      for (const input of document.querySelectorAll('input, textarea, select')) {
        if (input.type === 'hidden') continue;
        const id = input.getAttribute('id');
        const labelled =
          input.getAttribute('aria-label') ||
          input.getAttribute('aria-labelledby') ||
          (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) ||
          input.closest('label');
        if (!labelled) {
          add('input-unlabelled', `${input.tagName.toLowerCase()} placeholder="${(input.getAttribute('placeholder') || '').slice(0, 30)}"`);
        }
      }

      // Landmarks: one main per document is what "skip to content" relies on.
      const mains = document.querySelectorAll('main, [role="main"]').length;
      if (mains !== 1) add('landmark-main', `${mains} <main> elements`);

      return out;
    });

    hits.forEach((h) => findings.push({ route, ...h }));
  }

  await browser.close();

  const byKind = findings.reduce((acc, f) => {
    (acc[f.kind] ??= []).push(f);
    return acc;
  }, {});

  console.log(`\n=== a11y audit: ${ROUTES.length} routes ===\n`);
  if (!findings.length) console.log('  no findings');
  for (const [kind, items] of Object.entries(byKind)) {
    console.log(`${kind} (${items.length}):`);
    // Collapse repeats: the same footer control on every page is one problem.
    const seen = new Set();
    for (const f of items) {
      const key = `${f.kind}|${f.detail}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(`  ${f.route.padEnd(18)} ${f.detail}`);
    }
    console.log();
  }
  process.exit(0);
})();
