/**
 * Duplicate head tags across routes.
 *
 * index.html ships a static <head> for the crawler that fetches the shell, and
 * every route then adds its own via Helmet. Helmet only replaces tags it owns,
 * so a static tag with the same name survives alongside the real one — two
 * canonicals on a page means Google honours neither.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:5199';
const ROUTES = process.env.ROUTES?.split(',') ?? [
  '/', '/tjenester', '/tjenester/saksbehandlingssystem', '/produkter', '/caser', '/caser/altinn',
  '/slik-vi-jobber', '/teknologi', '/om-oss', '/kontakt', '/karriere',
  '/blogg', '/blogg/tilskuddsportal-som-faktisk-brukes', '/privacy', '/terms', '/cookies',
];

const browser = await chromium.launch();
const page = await browser.newPage();
const rows = [];

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  rows.push({
    route,
    ...(await page.evaluate(() => {
      const all = (sel, attr) =>
        [...document.querySelectorAll(sel)].map((el) => el.getAttribute(attr));
      return {
        canonical: all('link[rel=canonical]', 'href'),
        ogUrl: all('meta[property="og:url"]', 'content'),
        ogTitle: all('meta[property="og:title"]', 'content').length,
        description: all('meta[name=description]', 'content').length,
        title: document.title,
        robots: all('meta[name=robots]', 'content'),
      };
    })),
  });
}

await browser.close();

const problems = rows.flatMap((r) => {
  const out = [];
  if (r.canonical.length !== 1) out.push(`${r.route}: ${r.canonical.length} canonical → ${r.canonical.join(' | ')}`);
  else if (!r.canonical[0].endsWith(r.route === '/' ? '' : r.route)) out.push(`${r.route}: canonical points at ${r.canonical[0]}`);
  if (r.ogUrl.length !== 1) out.push(`${r.route}: ${r.ogUrl.length} og:url → ${r.ogUrl.join(' | ')}`);
  if (r.ogTitle !== 1) out.push(`${r.route}: ${r.ogTitle} og:title`);
  if (r.description !== 1) out.push(`${r.route}: ${r.description} description`);
  return out;
});

console.log(JSON.stringify({ checked: rows.length, problems }, null, 2));
process.exitCode = problems.length ? 1 : 0;
