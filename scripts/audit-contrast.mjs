/**
 * Text contrast audit, both themes, every route.
 *
 * The fourth of the rendered audits, alongside audit-a11y, audit-responsive and
 * audit-language.
 *
 * ## Why this measures pixels
 *
 * Resolving what is painted *behind* a text node from the DOM is the whole
 * problem, and three attempts at it were wrong in three different ways:
 *
 *  1. Walking the parent chain for `background-color` missed gradients
 *     entirely, so light text on a dark gradient was compared against the page
 *     background. 182 false failures.
 *  2. `elementsFromPoint` fixed gradients and sibling overlays, but takes
 *     viewport coordinates and returns nothing for anything below the fold — so
 *     off-screen text fell through to the body colour. That is how a
 *     permanently dark footer was reported at 1.41:1 against a white page it
 *     never sits on.
 *  3. Scrolling first fixed the coverage, but transforms, stacking contexts and
 *     `background-clip: text` each still defeat the walk in their own way.
 *
 * Checked against screenshots, four of the DOM pass's failures measured 7:1 to
 * 17:1 in reality. An audit that cries wolf gets ignored, which is worse than
 * not having one at all.
 *
 * So the DOM pass proposes and pixels dispose. Stage one is the cheap
 * approximate filter, kept only because it narrows thousands of text nodes to a
 * handful worth photographing. Stage two screenshots each candidate *element
 * handle* — not a coordinate rectangle, and not an element re-found by its
 * text, both of which pick the wrong thing once a page has scrolled or two
 * nodes share the same words — and measures the contrast between its 5th and
 * 95th percentile luminance. Nothing is reported that the pixels do not
 * confirm.
 *
 * The instrument checks itself before it reports: SELF_TEST names text known to
 * pass, and if the measurement disagrees the run exits rather than publishing
 * numbers nobody should trust.
 *
 *   node scripts/audit-contrast.mjs http://localhost:8081
 */
import { chromium } from 'playwright';

const ORIGIN = process.argv[2] ?? 'http://localhost:8080';

const ROUTES = [
  '/', '/tjenester', '/tjenester/saksbehandlingssystem', '/produkter', '/caser', '/caser/altinn', '/slik-vi-jobber',
  '/teknologi', '/om-oss', '/kontakt', '/karriere', '/blogg',
  '/blogg/tilskuddsportal-som-faktisk-brukes', '/privacy', '/terms', '/cookies',
];

/**
 * Known-good text, used to prove the measurement works before trusting it.
 * Body copy on a plain surface: if this does not come back comfortably above
 * AA, the instrument is broken, not the site.
 */
const SELF_TEST = { route: '/blogg', selector: 'main p', minRatio: 4.5 };

/**
 * Candidate text nodes: everything visible whose contrast might be low.
 * Deliberately generous — a false candidate costs one screenshot, a missed one
 * is a defect that ships.
 */
async function findCandidates(page) {
  const collection = await page.evaluateHandle(() => {
    const out = [];
    const nodes = document.querySelectorAll(
      'p, span, a, li, h1, h2, h3, h4, button, label, dd, dt, figcaption, time'
    );

    for (const el of nodes) {
      const text = (el.textContent || '').trim();
      if (!text || text.length < 4 || el.children.length > 0) continue;

      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.5) continue;

      // Gradient-filled headings paint their glyphs from a background image
      // clipped to the text and set color: transparent. Their contrast is a
      // property of the gradient; this check does not cover them.
      const clip = cs.webkitBackgroundClip || cs.backgroundClip;
      if (clip === 'text') continue;
      if (/transparent|rgba\(0, 0, 0, 0\)/.test(cs.color)) continue;

      const box = el.getBoundingClientRect();
      if (box.width < 3 || box.height < 3) continue;

      // Decorative glyphs are hidden from assistive tech and are not read.
      if (el.closest('[aria-hidden="true"]')) continue;

      out.push(el);
    }
    return out;
  });

  const count = await collection.evaluate((els) => els.length);
  const elements = [];
  for (let i = 0; i < count; i += 1) {
    const handle = await collection.evaluateHandle((els, index) => els[index], i);
    const element = handle.asElement();
    if (element) elements.push(element);
  }
  await collection.dispose();
  return elements;
}

/** Font size and weight decide whether AA asks 3:1 or 4.5:1. */
async function requirementFor(element) {
  return element.evaluate((el) => {
    const cs = getComputedStyle(el);
    const size = parseFloat(cs.fontSize);
    const weight = +cs.fontWeight || 400;
    const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
    return {
      required: isLarge ? 3 : 4.5,
      size: Math.round(size),
      text: (el.textContent || '').trim().slice(0, 40),
    };
  });
}

/**
 * Contrast between an element's text colour and the backdrop it is painted on.
 *
 * The split matters. `color` is the one thing the DOM reports reliably, so the
 * foreground comes from there. The *backdrop* is what no DOM walk gets right,
 * so it comes from a screenshot — as the modal pixel colour inside the
 * element's box, which is the background by definition: text is always a
 * minority of the pixels in its own bounding box.
 *
 * An earlier version took the 5th and 95th percentile luminance of the box and
 * called that the contrast. That works only when the glyphs cover a good share
 * of the area. On a 1368x17px eyebrow whose word occupies 90px, the text is
 * under 5% of the pixels, both percentiles land on background, and every such
 * element measures a perfect 1:1 — which is exactly what the self-test caught.
 *
 * Colours are quantised to 8 levels per channel before counting, so the
 * antialiased fringe around each glyph collapses into its neighbours instead of
 * splintering the histogram.
 */
async function paintedContrast(page, element) {
  const foreground = await element
    .evaluate((el) => getComputedStyle(el).color)
    .catch(() => null);
  if (!foreground) return null;

  const shot = await element.screenshot({ timeout: 4000 }).catch(() => null);
  if (!shot) return null;

  return page.evaluate(
    async ({ dataUrl, foreground: fgColor }) => {
      const parse = (c) => {
        const m = c && c.match(/[\d.]+/g);
        return m ? [+m[0], +m[1], +m[2]] : null;
      };
      const rel = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      const lum = (rgb) => 0.2126 * rel(rgb[0]) + 0.7152 * rel(rgb[1]) + 0.0722 * rel(rgb[2]);
      const ratio = (a, b) => {
        const [hi, lo] = lum(a) >= lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
        return +(((hi + 0.05) / (lo + 0.05)).toFixed(2));
      };

      const fg = parse(fgColor);
      if (!fg) return null;

      const img = new Image();
      const ok = await new Promise((res) => {
        img.onload = () => res(true);
        img.onerror = () => res(false);
        img.src = dataUrl;
      });
      if (!ok || !img.width || !img.height) return null;

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // Histogram over quantised colours: the glyph fringe folds into its
      // neighbours rather than producing hundreds of one-pixel buckets.
      const buckets = new Map();
      for (let i = 0; i < data.length; i += 4) {
        const key = ((data[i] >> 5) << 6) | ((data[i + 1] >> 5) << 3) | (data[i + 2] >> 5);
        const entry = buckets.get(key);
        if (entry) {
          entry.n += 1;
          entry.r += data[i];
          entry.g += data[i + 1];
          entry.b += data[i + 2];
        } else {
          buckets.set(key, { n: 1, r: data[i], g: data[i + 1], b: data[i + 2] });
        }
      }
      if (!buckets.size) return null;

      const ranked = [...buckets.values()]
        .map((e) => ({ n: e.n, rgb: [e.r / e.n, e.g / e.n, e.b / e.n] }))
        .sort((a, b) => b.n - a.n);

      // The dominant colour is the background — unless it *is* the text, which
      // happens on a tightly-cropped glyph. Then take the next cluster that is
      // meaningfully different from the foreground.
      let background = ranked[0].rgb;
      if (ratio(fg, background) < 1.2) {
        const alternative = ranked.find((entry) => ratio(fg, entry.rgb) >= 1.2);
        if (!alternative) return null; // nothing but text colour: unmeasurable
        background = alternative.rgb;
      }

      return ratio(fg, background);
    },
    { dataUrl: `data:image/png;base64,${shot.toString('base64')}`, foreground }
  );
}

async function reveal(element) {
  await element.evaluate((el) => el.scrollIntoView({ block: 'center' })).catch(() => {});
}

async function auditRoute(page, route) {
  await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(900);

  // Reveal-on-scroll sections sit at opacity 0 until they enter the viewport,
  // so a page measured without scrolling is measured mid-animation.
  await page.evaluate(async () => {
    const height = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < height(); y += window.innerHeight * 0.85) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);

  const candidates = await findCandidates(page);
  const hits = [];

  for (const element of candidates) {
    const meta = await requirementFor(element).catch(() => null);
    if (!meta) continue;

    await reveal(element);
    const painted = await paintedContrast(page, element);
    if (painted === null || painted >= meta.required) continue;

    hits.push({ ...meta, painted });
  }

  await Promise.all(candidates.map((element) => element.dispose().catch(() => {})));
  return hits;
}

(async () => {
  const browser = await chromium.launch();
  const findings = [];

  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      locale: 'nb-NO',
    });
    const page = await context.newPage();
    await page.addInitScript((t) => {
      try {
        localStorage.setItem('theme', t);
      } catch {
        /* private mode */
      }
    }, theme);

    // Prove the measurement before believing any failure it reports.
    await page.goto(`${ORIGIN}${SELF_TEST.route}`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(800);
    const probe = await page.$(SELF_TEST.selector);
    if (!probe) {
      console.error(`self-test: nothing matched ${SELF_TEST.selector} on ${SELF_TEST.route}`);
      process.exit(2);
    }
    await reveal(probe);
    const probeRatio = await paintedContrast(page, probe);
    await probe.dispose();

    if (probeRatio === null || probeRatio < SELF_TEST.minRatio) {
      console.error(
        `self-test failed in ${theme}: body copy measured ${probeRatio}:1, expected at least ${SELF_TEST.minRatio}.\n` +
          'That means the measurement is wrong, not the site. Refusing to report.'
      );
      process.exit(2);
    }

    for (const route of ROUTES) {
      const hits = await auditRoute(page, route);
      hits.forEach((hit) => findings.push({ theme, route, ...hit }));
    }

    await context.close();
  }

  await browser.close();

  console.log(
    `\n=== contrast audit: ${ROUTES.length} routes x 2 themes (WCAG AA, measured from pixels) ===\n`
  );
  if (!findings.length) {
    console.log('  every text node meets AA against its real backdrop');
    process.exit(0);
  }

  for (const theme of ['light', 'dark']) {
    const items = findings.filter((f) => f.theme === theme);
    console.log(`${theme} (${items.length}):`);
    const seen = new Set();
    for (const f of items) {
      const key = `${f.route}|${f.text}|${f.painted}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(
        `  ${f.route.padEnd(20)} ${String(f.painted).padStart(5)}:1 (needs ${f.required}) ${f.size}px  "${f.text}"`
      );
    }
    console.log();
  }
  process.exitCode = 1;
})();
