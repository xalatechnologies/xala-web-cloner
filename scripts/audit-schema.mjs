/**
 * Structured data, checked against what consumers actually require.
 *
 * The site emits Organization, Article, FAQPage, Service, OfferCatalog,
 * SoftwareApplication and BreadcrumbList. Emitting them is easy; emitting them
 * correctly is where it goes wrong, and nothing in a build fails when a schema
 * references an @id that does not exist or omits a required property. The page
 * just quietly stops earning the rich result it was written for.
 */
import { chromium } from 'playwright';

const ORIGIN = process.argv[2] ?? 'https://xala.no';
const ROUTES = [
  '/', '/tjenester', '/tjenester/saksbehandlingsplattform', '/tjenester/tilskuddsportal',
  '/produkter', '/produkter/digilist', '/caser', '/caser/altinn',
  '/slik-vi-jobber', '/om-oss', '/karriere', '/blogg',
  '/blogg/agentiske-arbeidsflyter-i-saksbehandling',
];

/** Properties Google documents as required for the rich result to be eligible. */
const REQUIRED = {
  Article: ['headline', 'datePublished'],
  FAQPage: ['mainEntity'],
  Service: ['name'],
  SoftwareApplication: ['name', 'applicationCategory'],
  Organization: ['name', 'url'],
  BreadcrumbList: ['itemListElement'],
  OfferCatalog: ['name', 'itemListElement'],
};

const browser = await chromium.launch();
const problems = [];
const seenIds = new Set();
const referencedIds = new Set();
let blocks = 0;

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'nb-NO' });
  const page = await ctx.newPage();
  await page.goto(ORIGIN + route, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(250);

  const parsed = await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try { return { ok: true, json: JSON.parse(s.textContent) }; }
      catch (e) { return { ok: false, error: String(e), raw: s.textContent.slice(0, 80) }; }
    })
  );

  for (const entry of parsed) {
    if (!entry.ok) { problems.push(`${route}: unparseable JSON-LD — ${entry.error}`); continue; }
    const nodes = entry.json['@graph'] ?? [entry.json];
    for (const node of nodes) {
      blocks++;
      const type = node['@type'];
      if (!type) { problems.push(`${route}: a node has no @type`); continue; }
      // Recursively, because an @id can be defined on a nested node: the
      // OfferCatalog defines each service inside itemListElement[].itemOffered.
      // Collecting only top-level ids reported every one of them as dangling.
      (function collect(value) {
        if (Array.isArray(value)) return value.forEach(collect);
        if (value && typeof value === 'object') {
          if (typeof value['@id'] === 'string' && Object.keys(value).length > 1) {
            seenIds.add(value['@id']);
          }
          Object.values(value).forEach(collect);
        }
      })(node);

      const required = REQUIRED[type];
      if (required) {
        for (const prop of required) {
          if (node[prop] === undefined || node[prop] === null || node[prop] === '') {
            problems.push(`${route}: ${type} missing required "${prop}"`);
          }
        }
      }
      // Collect @id references so dangling ones can be reported.
      JSON.stringify(node).replace(/"@id":"([^"]+)"/g, (_, id) => { referencedIds.add(id); return ''; });

      if (type === 'FAQPage' && Array.isArray(node.mainEntity)) {
        for (const q of node.mainEntity) {
          if (!q.name) problems.push(`${route}: FAQPage Question with no name`);
          const text = q.acceptedAnswer?.text;
          if (!text) problems.push(`${route}: "${(q.name ?? '').slice(0, 30)}" has no acceptedAnswer.text`);
          else if (text.length < 40) problems.push(`${route}: answer too short to be useful (${text.length} chars)`);
        }
      }
      if (type === 'Article') {
        if (!node.author) problems.push(`${route}: Article with no author`);
        if (!node.image) problems.push(`${route}: Article with no image — the rich result needs one`);
      }
    }
  }
  await ctx.close();
}
await browser.close();

// References that point at an @id nothing defines.
//
// Only counted for pages this run actually visited. A blog index legitimately
// references every post by @id, and each is defined on its own page — calling
// those dangling would mean the check reports more the less it crawls, which is
// exactly backwards.
const visited = new Set(ROUTES.map((r) => (r === '/' ? '' : r)));
const dangling = [...referencedIds].filter((id) => {
  if (seenIds.has(id) || !id.startsWith('http')) return false;
  const path = new URL(id).pathname.replace(/\/$/, '');
  return visited.has(path);
});
for (const id of dangling) problems.push(`reference to an @id never defined anywhere: ${id}`);

console.log(`\n=== structured data: ${ROUTES.length} routes, ${blocks} nodes ===\n`);
if (!problems.length) {
  console.log('  every node has its required properties and every @id reference resolves');
  process.exit(0);
}
for (const p of [...new Set(problems)]) console.log(`  ${p}`);
process.exitCode = 1;
