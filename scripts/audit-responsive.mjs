/**
 * Renders every route at phone and desktop widths and reports the things that
 * actually break on small screens.
 *
 * Written because Chrome's resize_window does not change the rendered viewport
 * in the agent environment, so "verified" had meant desktop-only for all the
 * visual work. Run against a dev server:
 *
 *   pnpm dev &
 *   node scripts/audit-responsive.mjs http://localhost:8081
 */
import { chromium } from 'playwright';

const ORIGIN = process.argv[2] ?? 'http://localhost:8080';

const ROUTES = [
  '/', '/tjenester', '/produkter', '/caser', '/caser/altinn', '/slik-vi-jobber',
  '/teknologi', '/om-oss', '/kontakt', '/karriere', '/blogg', '/blogg/tilskuddsportal-som-faktisk-brukes', '/privacy',
  '/terms', '/cookies', '/finnes-ikke-404',
];

const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

/**
 * Two thresholds, because they are two different success criteria.
 *
 * WCAG 2.5.8 Target Size (Minimum) is level AA and asks for 24x24 CSS px. It
 * exempts targets that are inline in a block of text — a link inside a sentence
 * cannot be enlarged without breaking the line box, and the spec says so.
 *
 * WCAG 2.5.5 Target Size (Enhanced) is level AAA and asks for 44x44. The site
 * targets AA, so falling short of 44 is worth knowing about but is not a
 * failure. Reporting both under one 44px rule produced ~47 "findings" per run,
 * nearly all of them inline text links that are conformant — noise that trains
 * you to skip the report.
 */
const MIN_TOUCH_AA = 24;
const MIN_TOUCH_AAA = 44;

async function auditPage(page, route, viewport) {
  return page.evaluate(
    ({ route, viewport, MIN_TOUCH_AA, MIN_TOUCH_AAA }) => {
      const out = [];
      function add(kind, detail) { out.push({ route, viewport, kind, detail }); }

      // Horizontal overflow: the single most common phone defect, and always a bug.
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      if (docWidth > winWidth + 1) {
        add('overflow-x', `page scrolls ${docWidth - winWidth}px horizontally (${docWidth} > ${winWidth})`);

        // Name the widest offenders so the report is actionable.
        const offenders = [];
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > winWidth + 1 && offenders.length < 6) {
            const cls = (el.className || '').toString().slice(0, 60);
            offenders.push(`<${el.tagName.toLowerCase()} class="${cls}"> right=${Math.round(r.right)}`);
          }
        });
        offenders.forEach((o) => add('overflow-source', o));
      }

      // Touch targets on anything interactive and visible.
      if (viewport === 'phone') {
        const seen = new Set();

        /**
         * Is this link inline in a run of text?
         *
         * The 2.5.8 exception. True when the parent holds text of its own
         * beyond this link — i.e. the link sits in a sentence rather than
         * standing alone as a control.
         */
        const isInlineInText = (el) => {
          if (el.tagName !== 'A') return false;
          if (getComputedStyle(el).display !== 'inline') return false;
          const parent = el.parentElement;
          if (!parent) return false;
          const own = (parent.textContent || '').replace(el.textContent || '', '').trim();
          return own.length > 0;
        };

        document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (getComputedStyle(el).visibility === 'hidden') return;

          const short = Math.min(r.width, r.height);
          if (short + 0.5 >= MIN_TOUCH_AAA) return;
          if (isInlineInText(el)) return;

          const label = (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 32);
          const key = `${label}|${Math.round(r.width)}x${Math.round(r.height)}`;
          if (seen.has(key)) return;
          seen.add(key);

          const size = `${Math.round(r.width)}x${Math.round(r.height)}px "${label}"`;
          // Below AA is a conformance failure; between AA and AAA is advice.
          add(short + 0.5 < MIN_TOUCH_AA ? 'touch-target' : 'touch-target-aaa', size);
        });
      }

      // Text that would be unreadably small on a phone.
      if (viewport === 'phone') {
        const smalls = new Set();
        document.querySelectorAll('p, span, a, li, div').forEach((el) => {
          if (!el.textContent?.trim() || el.children.length > 0) return;
          // Decorative glyphs (bullets, separators) are legitimately small and
          // are already hidden from assistive tech. They are not text anyone
          // reads, so a legibility rule does not apply to them.
          if (el.closest('[aria-hidden="true"], [aria-hidden]')) return;
          const size = parseFloat(getComputedStyle(el).fontSize);
          if (size > 0 && size < 11) {
            smalls.add(`${size}px "${el.textContent.trim().slice(0, 28)}"`);
          }
        });
        [...smalls].slice(0, 5).forEach((s) => add('tiny-text', s));
      }

      return out;
    },
    { route, viewport, MIN_TOUCH_AA, MIN_TOUCH_AAA },
  );
}

(async () => {
  const browser = await chromium.launch();
  const findings = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle' }).catch(() => {});
      // Let the reveal transitions settle so measurements are of the final layout.
      await page.waitForTimeout(1200);
      findings.push(...(await auditPage(page, route, vp.name)));
    }
    await context.close();
  }

  await browser.close();

  const byKind = findings.reduce((acc, f) => {
    (acc[f.kind] ??= []).push(f);
    return acc;
  }, {});

  console.log(`\n=== responsive audit: ${ROUTES.length} routes x ${VIEWPORTS.length} viewports ===\n`);
  if (!findings.length) {
    console.log('  no findings');
  }
  for (const [kind, items] of Object.entries(byKind)) {
    console.log(`${kind} (${items.length}):`);
    for (const f of items) console.log(`  ${f.viewport.padEnd(8)} ${f.route.padEnd(20)} ${f.detail}`);
    console.log();
  }
  process.exit(0);
})();
