/**
 * What Google actually did with the site: indexed or not, and what it ranks for.
 *
 * This is the only source that answers the question the sitemap cannot. A valid
 * sitemap listing 61 URLs and 61 indexed URLs are different claims, and this
 * codebase has already shipped seventeen case studies that rendered perfectly
 * in a browser and returned 404 to every crawler. Nothing on this machine could
 * have told you that. Search Console could.
 *
 * It also reports real queries — the ones people typed and saw you for — which
 * is the honest version of a keyword list. The keywords in
 * scripts/seo/keywords.json are a guess about what matters; this is evidence.
 *
 *   node scripts/audit-search-console.mjs              # last 28 days
 *   node scripts/audit-search-console.mjs --days 90
 *   node scripts/audit-search-console.mjs --inspect    # per-URL index status
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { requireEnv } from './seo/env.mjs';
import { searchConsole } from './seo/providers.mjs';

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};

const days = Number(flag('days') ?? 28);
const doInspect = args.includes('--inspect');

requireEnv(
  searchConsole.keys,
  searchConsole.name,
  [
    'Setup, once:',
    '  1. console.cloud.google.com → create a project',
    '  2. Enable "Google Search Console API"',
    '  3. IAM → Service Accounts → create one → Keys → add JSON key',
    '  4. From the JSON: client_email → GSC_CLIENT_EMAIL, private_key → GSC_PRIVATE_KEY',
    '  5. search.google.com/search-console → Settings → Users and permissions →',
    '     add that client_email as a Full user',
    '',
    'GSC_SITE_URL must match the property exactly:',
    '  domain property   → sc-domain:xala.no',
    '  URL prefix        → https://xala.no/',
  ].join('\n')
);

const iso = (d) => d.toISOString().slice(0, 10);
const endDate = iso(new Date(Date.now() - 2 * 864e5)); // GSC lags ~2 days
const startDate = iso(new Date(Date.now() - (days + 2) * 864e5));

console.log(`\n=== Search Console: ${startDate} → ${endDate} ===\n`);

const fmt = (n) => (typeof n === 'number' ? n.toFixed(1) : '—');

const queries = await searchConsole.searchAnalytics({ startDate, endDate, dimensions: ['query'], rowLimit: 250 });

if (!queries.length) {
  console.log('  No query data. Either the property is new, the site has no impressions yet,');
  console.log('  or GSC_SITE_URL does not match the verified property.\n');
} else {
  const impressions = queries.reduce((a, r) => a + r.impressions, 0);
  const clicks = queries.reduce((a, r) => a + r.clicks, 0);
  console.log(`  ${queries.length} queries · ${impressions} impressions · ${clicks} clicks · CTR ${((clicks / impressions) * 100).toFixed(1)}%\n`);

  console.log('  Top queries by impressions:');
  console.log('     pos   impr  clicks  query');
  for (const row of [...queries].sort((a, b) => b.impressions - a.impressions).slice(0, 20)) {
    console.log(`    ${fmt(row.position).padStart(5)} ${String(row.impressions).padStart(6)} ${String(row.clicks).padStart(7)}  ${row.keys[0]}`);
  }

  /**
   * Positions 4–20 with impressions are the highest-value work available: the
   * page already ranks and already gets seen, so a better title, a stronger
   * intro or an internal link moves it into the range that gets clicked. A
   * query at position 40 needs a new page; this needs an edit.
   */
  const striking = queries
    .filter((r) => r.position > 3.5 && r.position <= 20 && r.impressions >= 5)
    .sort((a, b) => b.impressions - a.impressions);

  if (striking.length) {
    console.log(`\n  Close to the first page (${striking.length}) — edits here move faster than new pages:`);
    console.log('     pos   impr  clicks  query');
    for (const row of striking.slice(0, 15)) {
      console.log(`    ${fmt(row.position).padStart(5)} ${String(row.impressions).padStart(6)} ${String(row.clicks).padStart(7)}  ${row.keys[0]}`);
    }
  }

  const noClicks = queries.filter((r) => r.clicks === 0 && r.impressions >= 20 && r.position <= 10);
  if (noClicks.length) {
    console.log(`\n  Seen on page one but never clicked (${noClicks.length}) — the title or description is not earning the click:`);
    for (const row of noClicks.slice(0, 10)) {
      console.log(`    pos ${fmt(row.position).padStart(4)}  ${String(row.impressions).padStart(5)} impr  ${row.keys[0]}`);
    }
  }
}

const pages = await searchConsole.searchAnalytics({ startDate, endDate, dimensions: ['page'], rowLimit: 250 });
if (pages.length) {
  console.log(`\n  Pages earning impressions: ${pages.length}`);
  for (const row of [...pages].sort((a, b) => b.impressions - a.impressions).slice(0, 12)) {
    const path = row.keys[0].replace(/^https?:\/\/[^/]+/, '') || '/';
    console.log(`    ${String(row.impressions).padStart(6)} impr  ${String(row.clicks).padStart(4)} clicks  ${path}`);
  }
}

const inspected = [];
const notIndexed = [];

if (doInspect) {
  // The URL Inspection API is rate-limited to roughly 2000/day and is slow, so
  // this is opt-in rather than part of every run.
  const sitemap = readFileSync(resolve(process.cwd(), 'dist/sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`\n  Index status for ${urls.length} sitemap URLs (slow, rate-limited):\n`);


  for (const url of urls) {
    try {
      const status = await searchConsole.inspect(url);
      inspected.push(status);
      if (status.verdict !== 'PASS') {
        notIndexed.push(status);
        console.log(`    ${status.verdict.padEnd(8)} ${status.coverage.padEnd(38)} ${url.replace('https://xala.no', '') || '/'}`);
      }
    } catch (error) {
      console.log(`    ERROR    ${String(error.message).slice(0, 60)}  ${url}`);
    }
  }
  console.log(
    notIndexed.length
      ? `\n  ${notIndexed.length}/${urls.length} not indexed.\n`
      : `\n  all ${urls.length} sitemap URLs are indexed.\n`
  );
} else {
  console.log('\n  Add --inspect to check which sitemap URLs Google has actually indexed.\n');
}

/**
 * Index coverage is the headline, so it is persisted even when --inspect was
 * not run — as null, which the report reads as "not checked" rather than as
 * "nothing wrong".
 */
const index = doInspect
  ? { checked: inspected.length, notIndexed: notIndexed.map((s) => ({ url: s.url, coverage: s.coverage })) }
  : null;

mkdirSync(resolve(process.cwd(), 'seo-data'), { recursive: true });
writeFileSync(
  resolve(process.cwd(), 'seo-data/search-console.json'),
  JSON.stringify({ startDate, endDate, queries, pages, index }, null, 2) + '\n'
);
