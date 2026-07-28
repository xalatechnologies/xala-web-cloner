/**
 * Every head tag a search engine or a social crawler reads, on every route.
 *
 * index.html ships a static <head> for the crawler that fetches the shell, and
 * every route then adds its own via Helmet. Helmet only replaces tags it owns,
 * so a static tag with the same name survives alongside the real one — two
 * canonicals on a page means Google honours neither.
 *
 * It started as a duplicate-canonical check and reported "no problems" while
 * five routes shipped no og:locale, no og:image and no title-length discipline
 * at all: those routes manage their own <Helmet> and simply omitted them, and
 * nothing was looking. An audit that only checks what already works is a
 * comfort, not a measurement — so it now checks what a crawler actually needs,
 * and self-tests first so silence means "measured and clean" rather than
 * "stopped measuring".
 *
 *   node scripts/audit-head.mjs http://localhost:5210
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? process.env.BASE ?? 'http://localhost:5199';
const ROUTES = process.env.ROUTES?.split(',') ?? [
  '/', '/tjenester', '/tjenester/saksbehandlingssystem', '/produkter', '/produkter/digilist',
  '/caser', '/caser/altinn', '/slik-vi-jobber', '/teknologi', '/om-oss', '/kontakt', '/karriere',
  '/blogg', '/blogg/tilskuddsportal-som-faktisk-brukes', '/privacy', '/terms', '/cookies',
];

/**
 * Google truncates a title around 60 characters and a description around 155.
 * Longer is not an error — it is a snippet you did not choose, because Google
 * picks where to cut.
 */
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 155;

const read = () => {
  const all = (sel, attr) =>
    [...document.querySelectorAll(sel)].map((el) => el.getAttribute(attr));
  return {
    canonical: all('link[rel=canonical]', 'href'),
    ogUrl: all('meta[property="og:url"]', 'content'),
    ogTitle: all('meta[property="og:title"]', 'content'),
    ogDescription: all('meta[property="og:description"]', 'content'),
    ogImage: all('meta[property="og:image"]', 'content'),
    ogLocale: all('meta[property="og:locale"]', 'content'),
    ogType: all('meta[property="og:type"]', 'content'),
    twitterCard: all('meta[property="twitter:card"], meta[name="twitter:card"]', 'content'),
    description: all('meta[name=description]', 'content'),
    robots: all('meta[name=robots]', 'content'),
    hreflang: all('link[rel=alternate][hreflang]', 'hreflang'),
    htmlLang: document.documentElement.lang,
    title: document.title,
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].length,
    h1: [...document.querySelectorAll('h1')].map((el) => el.textContent.trim()),
  };
};

const browser = await chromium.launch();
const page = await browser.newPage();

// Self-test: the front page is known to carry a title, one canonical, a
// description and JSON-LD. If the reader comes back empty here, every "no
// problems" below would be a measurement failure wearing a pass.
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const probe = await page.evaluate(read);
const broken = [
  !probe.title && 'no title',
  probe.canonical.length !== 1 && 'no single canonical',
  probe.description.length !== 1 && 'no description',
  probe.jsonLd === 0 && 'no JSON-LD',
  !probe.htmlLang && 'no html lang',
].filter(Boolean);

if (broken.length) {
  await browser.close();
  console.error(`audit-head: self-test failed on ${BASE}/ (${broken.join(', ')}) — not reporting`);
  process.exit(2);
}

const rows = [];
for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  rows.push({ route, ...(await page.evaluate(read)) });
}
await browser.close();

const one = (route, values, label) =>
  values.length === 1 ? [] : [`${route}: ${values.length} ${label}${values.length ? ` → ${values.join(' | ')}` : ''}`];

const problems = rows.flatMap((r) => {
  const out = [];

  // One of each, or Google picks for you.
  out.push(...one(r.route, r.canonical, 'canonical'));
  out.push(...one(r.route, r.description, 'description'));
  out.push(...one(r.route, r.ogUrl, 'og:url'));
  out.push(...one(r.route, r.ogTitle, 'og:title'));
  out.push(...one(r.route, r.ogDescription, 'og:description'));
  out.push(...one(r.route, r.ogImage, 'og:image'));
  out.push(...one(r.route, r.ogLocale, 'og:locale'));
  out.push(...one(r.route, r.ogType, 'og:type'));
  out.push(...one(r.route, r.twitterCard, 'twitter:card'));

  if (r.canonical.length === 1 && !r.canonical[0].endsWith(r.route === '/' ? '' : r.route)) {
    out.push(`${r.route}: canonical points at ${r.canonical[0]}`);
  }

  // A relative og:image is dropped by every social crawler.
  if (r.ogImage.length === 1 && !/^https?:\/\//.test(r.ogImage[0])) {
    out.push(`${r.route}: og:image is not absolute → ${r.ogImage[0]}`);
  }

  // Language is what Google matches a Norwegian query against.
  if (r.htmlLang !== 'nb-NO') out.push(`${r.route}: html lang is "${r.htmlLang}", expected nb-NO`);
  if (r.ogLocale.length === 1 && r.ogLocale[0] !== 'nb_NO') {
    out.push(`${r.route}: og:locale is "${r.ogLocale[0]}", expected nb_NO`);
  }
  if (!r.hreflang.includes('nb-NO') || !r.hreflang.includes('x-default')) {
    out.push(`${r.route}: hreflang is [${r.hreflang.join(', ')}], expected nb-NO + x-default`);
  }

  // Exactly one h1, and it must say something.
  if (r.h1.length !== 1) out.push(`${r.route}: ${r.h1.length} h1`);
  else if (r.h1[0].length < 10) out.push(`${r.route}: h1 is only "${r.h1[0]}"`);

  if (!r.title) out.push(`${r.route}: no title`);
  else if (r.title.length > TITLE_MAX) out.push(`${r.route}: title is ${r.title.length} chars (>${TITLE_MAX}, Google truncates) → ${r.title}`);

  if (r.description.length === 1) {
    const len = r.description[0].length;
    if (len > DESC_MAX) out.push(`${r.route}: description is ${len} chars (>${DESC_MAX}, Google truncates)`);
    else if (len < DESC_MIN) out.push(`${r.route}: description is only ${len} chars (<${DESC_MIN}, wastes the snippet)`);
  }

  if (r.jsonLd === 0) out.push(`${r.route}: no JSON-LD`);

  return out;
});

console.log(`\n=== head audit: ${rows.length} routes ===\n`);
if (!problems.length) console.log('  every route carries a complete, single-valued head\n');
else problems.forEach((p) => console.log('  ' + p));
console.log('');
process.exitCode = problems.length ? 1 : 0;
