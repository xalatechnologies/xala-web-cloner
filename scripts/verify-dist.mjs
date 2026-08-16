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
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const SITEMAP = join(DIST, 'sitemap.xml');
const ROUTE_RULES = resolve(process.cwd(), 'src/components/seo/routeRules.ts');

/** Keys of `export const CANONICAL_ALIASES = { ... }` in routeRules.ts. */
function canonicalAliasPaths(source) {
  const block = source.match(/export const CANONICAL_ALIASES[\s\S]*?=\s*\{([^}]*)\}/);
  if (!block) return null;
  return [...block[1].matchAll(/['"](\/[^'"]+)['"]\s*:/g)].map((m) => m[1]);
}

if (!existsSync(SITEMAP)) {
  console.error('verify-dist: dist/sitemap.xml missing — the prerender did not run.');
  process.exit(1);
}

const origin = 'https://xala.no';
const locs = [...readFileSync(SITEMAP, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (locs.length < 15) {
  console.error(`verify-dist: sitemap lists only ${locs.length} URLs — it looks truncated.`);
  process.exit(1);
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
  console.error('verify-dist: src/components/seo/routeRules.ts missing — cannot check aliases.');
  process.exit(1);
}

const aliases = canonicalAliasPaths(readFileSync(ROUTE_RULES, 'utf8'));
if (!aliases) {
  console.error('verify-dist: CANONICAL_ALIASES not found in routeRules.ts');
  process.exit(1);
}
if (!aliases.length) {
  console.error('verify-dist: CANONICAL_ALIASES has no keys — the parser missed them.');
  process.exit(1);
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

console.log(`verify-dist: ${locs.length} sitemap URLs, all served by a file in dist/`);
console.log(`verify-dist: ${aliases.length} canonical alias(es), all served by a file in dist/`);
