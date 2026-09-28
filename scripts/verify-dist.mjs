/**
 * Every URL the sitemap advertises must have a file behind it.
 *
 * nginx serves `$uri/index.html` and answers anything else with a real 404.
 * That is the right configuration, but it means a route the prerender forgets
 * is a route the site returns 404 for — while still listing it in the sitemap
 * and rendering it perfectly in a browser once React takes over. All 17 case
 * studies shipped that way: fine to click, 404 to every crawler that followed
 * the sitemap it was handed.
 *
 * Canonical aliases (/pris → /priser) are deliberately absent from the
 * sitemap, so the loc check cannot see them. They still need a file: without
 * one, a cold hit is a 404 even though the client Navigate would have worked.
 *
 * Run after the build, before the upload. Cheap, and it fails the deploy
 * instead of the indexing.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseKeywords } from './verify-parse.mjs';
import servicePages from '../src/data/service-pages.json' with { type: 'json' };
import productsData from '../src/data/products.json' with { type: 'json' };
import no from '../src/i18n/locales/no.json' with { type: 'json' };

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(process.cwd(), 'dist');
const SITEMAP = join(DIST, 'sitemap.xml');
const ROUTE_RULES = resolve(process.cwd(), 'src/components/seo/routeRules.ts');
const CONTENT_DIR = join(ROOT, 'src', 'content', 'blog');

const GEBYR_HREF = '/blogg/skjenkebevilling-gebyr-og-omsetningsoppgave';
const GEBYR_QUERY = 'gebyr';

/** Keys of `export const CANONICAL_ALIASES = { ... }` in routeRules.ts. */
export function canonicalAliasPaths(source) {
  const block = source.match(/export const CANONICAL_ALIASES[\s\S]*?=\s*\{([^}]*)\}/);
  if (!block) return null;
  return [...block[1].matchAll(/['"](\/[^'"]+)['"]\s*:/g)].map((m) => m[1]);
}

/**
 * A listing card is related to `q` when the needle appears in title,
 * keywords, or body — not only the slug. `/blogg?q=gebyr` includes
 * visma-fakturagrunnlag-fra-fagsystem because the title and keywords say
 * gebyr; the path does not.
 */
export function postRelatedToQuery(post, query) {
  const needle = (query ?? '').trim().toLowerCase();
  if (!needle) return false;
  const haystack = [post.title, ...(post.keywords ?? []), post.body]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(needle);
}

/** Published posts with the fields the q= relatedness check reads. */
export function publishedPostsForQuery() {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((file) => /\.mdx?$/.test(file) && !/^_/.test(file) && file.toLowerCase() !== 'readme.md')
    .map((file) => {
      const raw = readFileSync(join(CONTENT_DIR, file), 'utf8');
      const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n([\s\S]*))?$/.exec(raw);
      if (!match) return null;
      const block = match[1];
      const field = (name) => {
        const found = new RegExp(`^${name}:\\s*(.*)$`, 'm').exec(block);
        return found ? found[1].trim().replace(/^["']|["']$/g, '') : undefined;
      };
      if (field('draft') === 'true') return null;
      const slug = field('slug') || file.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      return {
        href: `/blogg/${slug}`,
        slug,
        title: field('title'),
        keywords: parseKeywords(block),
        body: match[2] ?? '',
      };
    })
    .filter(Boolean);
}

/** Cards in a filtered listing that do not match `query` in title, keywords, or body. */
export function leakedListingCards(hrefs, posts, query) {
  const byHref = new Map(posts.map((post) => [post.href, post]));
  return hrefs.filter((href) => {
    const post = byHref.get(href);
    return !post || !postRelatedToQuery(post, query);
  });
}

export function listingCardHrefs(html) {
  return [...html.matchAll(/<h2><a href="(\/blogg\/[^"]+)"/g)].map((m) => m[1]);
}

/**
 * Inner HTML of #root, or null when the marker is missing.
 *
 * A non-greedy `[\s\S]*?</div>` stops at the first closing tag and breaks on
 * nested divs inside prerendered markup, so we walk div open/close depth instead.
 */
export function rootInnerHtml(html) {
  const marker = /<div id="root">/i.exec(html);
  if (!marker) return null;

  let depth = 1;
  let index = marker.index + marker[0].length;
  const start = index;

  while (index < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', index);
    const nextClose = html.indexOf('</div>', index);
    if (nextClose === -1) return null;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + 4;
      continue;
    }

    depth -= 1;
    if (depth === 0) return html.slice(start, nextClose);
    index = nextClose + 6;
  }

  return null;
}

/** True when #root has no visible text — the SPA-only shell the prerender must not ship. */
export function hasEmptyRoot(html) {
  const inner = rootInnerHtml(html);
  if (inner === null) return true;
  const visible = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return visible.length === 0;
}

/** First <h1> text inside #root, with inner tags stripped, or null when absent. */
export function firstH1(html) {
  const root = rootInnerHtml(html);
  if (!root) return null;
  const match = root.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return null;
  return match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Service detail pages that must ship real first HTML, not an empty #root. */
export function servicePageSlugs() {
  return Object.keys(servicePages);
}

/** Routable /caser/:slug paths from products.json (Norwegian catalog). */
export function productSlugs() {
  return productsData.no.filter((product) => product.slug).map((product) => product.slug);
}

/** Detail slugs under a top-level path, e.g. /caser/altinn → altinn. */
export function detailSlugsFromLocs(locs, origin, prefix) {
  const base = `${prefix}/`;
  return locs
    .map((loc) => loc.replace(origin, '').replace(/\/$/, ''))
    .filter((path) => path.startsWith(base) && path !== prefix.replace(/\/$/, ''))
    .map((path) => path.slice(base.length))
    .filter(Boolean);
}

/** First paragraph after the page H1 inside #root — the hub lede from no.json. */
export function tjenesterHubLede(html) {
  const root = rootInnerHtml(html);
  if (!root) return null;
  const match = root.match(/<h1[^>]*>[\s\S]*?<\/h1>\s*<p>([\s\S]*?)<\/p>/i);
  if (!match) return null;
  return match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function main() {
  if (!existsSync(SITEMAP)) {
    fail('verify-dist: dist/sitemap.xml missing — the prerender did not run.');
  }

  const origin = 'https://xala.no';
  const locs = [...readFileSync(SITEMAP, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (locs.length < 15) {
    fail(`verify-dist: sitemap lists only ${locs.length} URLs — it looks truncated.`);
  }

  const missing = locs.filter((loc) => {
    const path = loc.replace(origin, '').replace(/\/$/, '');
    if (!path) return !existsSync(join(DIST, 'index.html'));
    // A file (rss.xml) or a directory with an index.html both count as served.
    return !existsSync(join(DIST, path)) && !existsSync(join(DIST, path, 'index.html'));
  });

  if (missing.length) {
    console.error(`verify-dist: ${missing.length} sitemap URL(s) have no file in dist/:`);
    for (const loc of missing) console.error(`  ${loc}`);
    process.exit(1);
  }

  if (!existsSync(ROUTE_RULES)) {
    fail('verify-dist: src/components/seo/routeRules.ts missing — cannot check aliases.');
  }

  const aliases = canonicalAliasPaths(readFileSync(ROUTE_RULES, 'utf8'));
  if (!aliases) {
    fail('verify-dist: CANONICAL_ALIASES not found in routeRules.ts');
  }
  if (!aliases.length) {
    fail('verify-dist: CANONICAL_ALIASES has no keys — the parser missed them.');
  }

  const missingAliases = aliases.filter((alias) => {
    const rel = alias.replace(/^\//, '');
    return !existsSync(join(DIST, rel, 'index.html'));
  });

  if (missingAliases.length) {
    console.error(`verify-dist: ${missingAliases.length} canonical alias(es) have no file in dist/:`);
    for (const alias of missingAliases) console.error(`  ${alias}`);
    process.exit(1);
  }

  const gebyrListing = join(DIST, 'blogg', 'q', 'gebyr', 'index.html');
  if (!existsSync(gebyrListing)) {
    fail('verify-dist: dist/blogg/q/gebyr/index.html missing — /blogg?q= was not prerendered.');
  }

  const gebyrCards = listingCardHrefs(readFileSync(gebyrListing, 'utf8'));
  if (!gebyrCards.includes(GEBYR_HREF)) {
    fail('verify-dist: /blogg?q=gebyr listing is missing the gebyr post.');
  }

  const leaked = leakedListingCards(gebyrCards, publishedPostsForQuery(), GEBYR_QUERY);
  if (leaked.length) {
    fail(`verify-dist: /blogg?q=gebyr still prerenders unrelated cards:\n  ${leaked.join('\n  ')}`);
  }

  const unfiltered = join(DIST, 'blogg', 'index.html');
  if (!existsSync(unfiltered)) {
    fail('verify-dist: dist/blogg/index.html missing — the unfiltered listing was not prerendered.');
  }
  const unfilteredCards = listingCardHrefs(readFileSync(unfiltered, 'utf8'));
  if (unfilteredCards.length < 2) {
    fail('verify-dist: /blogg with no q no longer prerenders the full listing.');
  }

  const serviceSlugs = servicePageSlugs();
  const hollowServices = serviceSlugs.filter((slug) => {
    const file = join(DIST, 'tjenester', slug, 'index.html');
    if (!existsSync(file)) return true;
    const html = readFileSync(file, 'utf8');
    return hasEmptyRoot(html) || !firstH1(html);
  });

  if (hollowServices.length) {
    console.error(`verify-dist: ${hollowServices.length} /tjenester/* page(s) have an empty #root or no <h1>:`);
    for (const slug of hollowServices) console.error(`  /tjenester/${slug}`);
    process.exit(1);
  }

  const hubFile = join(DIST, 'tjenester', 'index.html');
  if (!existsSync(hubFile)) {
    fail('verify-dist: dist/tjenester/index.html missing — the services hub was not prerendered.');
  }
  const hubHtml = readFileSync(hubFile, 'utf8');
  if (hasEmptyRoot(hubHtml) || !firstH1(hubHtml)) {
    fail('verify-dist: /tjenester hub has an empty #root or no <h1>.');
  }
  const hubLede = tjenesterHubLede(hubHtml);
  const expectedLede = no.servicesPage.description;
  if (hubLede !== expectedLede) {
    fail(
      `verify-dist: /tjenester hub lede does not match no.json servicesPage.description.\n  expected: ${expectedLede}\n  got: ${hubLede}`,
    );
  }

  const caseSlugs = detailSlugsFromLocs(locs, origin, '/caser');
  const hollowCases = caseSlugs.filter((slug) => {
    const file = join(DIST, 'caser', slug, 'index.html');
    if (!existsSync(file)) return true;
    const html = readFileSync(file, 'utf8');
    return hasEmptyRoot(html) || !firstH1(html);
  });
  if (hollowCases.length) {
    console.error(`verify-dist: ${hollowCases.length} /caser/* page(s) have an empty #root or no <h1>:`);
    for (const slug of hollowCases) console.error(`  /caser/${slug}`);
    process.exit(1);
  }

  const productSlugList = productSlugs();
  const hollowProducts = productSlugList.filter((slug) => {
    const file = join(DIST, 'produkter', slug, 'index.html');
    if (!existsSync(file)) return true;
    const html = readFileSync(file, 'utf8');
    return hasEmptyRoot(html) || !firstH1(html);
  });
  if (hollowProducts.length) {
    console.error(`verify-dist: ${hollowProducts.length} /produkter/* page(s) have an empty #root or no <h1>:`);
    for (const slug of hollowProducts) console.error(`  /produkter/${slug}`);
    process.exit(1);
  }

  console.log(`verify-dist: ${locs.length} sitemap URLs, all served by a file in dist/`);
  console.log(`verify-dist: ${aliases.length} canonical alias(es), all served by a file in dist/`);
  console.log(`verify-dist: ${serviceSlugs.length} /tjenester/* page(s) with real first HTML`);
  console.log(`verify-dist: /tjenester hub lede matches no.json (${caseSlugs.length} cases, ${productSlugList.length} products)`);
  console.log('verify-dist: /blogg?q=gebyr is a filtered listing, /blogg is not');
}

const isDirectRun =
  Boolean(process.argv[1]) && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main();
}
