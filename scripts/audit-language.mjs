/**
 * Finds English copy leaking onto the Norwegian site.
 *
 * Written because none of the static checks can see this. A key can exist in
 * every locale file, resolve cleanly, and still hold English text — which is
 * exactly what ten caseStudy.sections.*.accent labels were doing while parity
 * checks, the orphan-key guard and 160 tests all passed. The only way to catch
 * it is to render the page and read it.
 *
 * It used to run twice, once labelled Norwegian and once Arabic, but it only
 * ever set the *browser* locale — it never switched the app's language. Both
 * passes rendered the same Norwegian page, and the second one reported a clean
 * Arabic site that was never loaded. The site is Norwegian only now, so there
 * is one pass and it says so.
 *
 *   node scripts/audit-language.mjs http://localhost:5210
 */
import { chromium } from 'playwright';

const ORIGIN = process.argv[2] ?? 'http://localhost:8080';

const ROUTES = [
  '/', '/tjenester', '/tjenester/saksbehandlingssystem', '/tjenester/integrasjoner',
  '/tjenester/automatisering-og-ai', '/produkter', '/produkter/digilist', '/produkter/xaheen',
  '/produkter/norchain', '/produkter/digiskjema', '/caser', '/caser/altinn', '/slik-vi-jobber',
  '/teknologi', '/om-oss', '/kontakt', '/karriere', '/blogg', '/privacy',
  '/terms', '/cookies',
];

const LOCALES = [{ code: 'no', locale: 'nb-NO', label: 'Norwegian' }];

/**
 * Function words that are distinctly English. Deliberately excludes words
 * Norwegian shares or nearly shares — "for", "i", "til", "om", "vi" — so a
 * Norwegian sentence cannot trip the detector on its own.
 */
const ENGLISH_MARKERS = [
  'the', 'and', 'with', 'your', 'our', 'from', 'this', 'that', 'these', 'are',
  'was', 'were', 'have', 'has', 'been', 'what', 'when', 'where', 'which',
  'their', 'they', 'more', 'about', 'into', 'through', 'across', 'built',
  'delivered', 'business', 'overview', 'challenge', 'solution', 'results',
];

/** Names and terms that are English on purpose and must not be flagged. */
const ALLOWED = [
  'Microsoft Partner', 'Cloud', 'AI', 'Azure', 'AWS', 'React', 'TypeScript',
  'Node.js', 'Python', 'Kubernetes', 'Docker', 'PostgreSQL', 'GDPR', 'ISO',
  'Xala Technologies', 'Digilist', 'Digiskjema', 'Xaheen', 'Norchain',
  'Google Cloud', 'Next.js', 'TensorFlow', 'PyTorch', 'Altinn', 'Studio',
];

(async () => {
  const browser = await chromium.launch();
  const findings = [];

  for (const { code, locale, label } of LOCALES) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle' }).catch(() => {});
      await page.waitForTimeout(1000);

      const hits = await page.evaluate(
        ({ markers, allowed }) => {
          const out = [];
          const seen = new Set();
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) {
            const text = (node.textContent || '').trim();
            if (text.length < 12) continue;
            const parent = node.parentElement;
            if (!parent || parent.closest('script, style, noscript')) continue;
            if (allowed.some((a) => text.includes(a) && text.length < a.length + 14)) continue;

            const words = text.toLowerCase().match(/[a-z']+/g) || [];
            const score = words.filter((w) => markers.includes(w)).length;
            // Two markers in one string is prose, not a stray loanword.
            if (score >= 2 && !seen.has(text)) {
              seen.add(text);
              out.push({ text: text.slice(0, 80), score, tag: parent.tagName.toLowerCase() });
            }
          }
          return out;
        },
        { markers: ENGLISH_MARKERS, allowed: ALLOWED },
      );

      hits.forEach((h) => findings.push({ label, code, route, ...h }));
    }
    await context.close();
  }

  await browser.close();

  console.log(`\n=== language audit: ${ROUTES.length} routes  ===\n`);
  if (!findings.length) {
    console.log('  no English prose found on the Norwegian pages');
    process.exit(0);
  }

  const byLocale = findings.reduce((acc, f) => {
    (acc[f.label] ??= []).push(f);
    return acc;
  }, {});
  for (const [label, items] of Object.entries(byLocale)) {
    console.log(`${label} (${items.length}):`);
    for (const f of items) console.log(`  ${f.route.padEnd(18)} <${f.tag}> ${f.text}`);
    console.log();
  }
  process.exit(0);
})();
