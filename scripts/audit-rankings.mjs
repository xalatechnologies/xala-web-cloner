/**
 * Where xala.no actually ranks for the searches it is written to win.
 *
 * Every other audit in this directory measures the site against itself: is the
 * head complete, does the contrast pass, is the schema valid. All necessary,
 * none of them able to answer "are we winning". This one asks Google.
 *
 * Results are appended to seo-rankings.json so position changes are visible
 * over time. A single run tells you where you are; the file tells you which
 * direction you are going, which is the part that decides what to write next.
 *
 *   node scripts/audit-rankings.mjs                 # DataForSEO, the cheap one
 *   node scripts/audit-rankings.mjs --provider serpapi
 *   node scripts/audit-rankings.mjs --keyword "tilskuddsportal"
 *
 * Costs money per keyword. Twenty-eight keywords is roughly $0.03 on DataForSEO
 * and $0.28 on SerpAPI at list price, so this is not something to put on a
 * five-minute loop.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { requireEnv } from './seo/env.mjs';
import { dataforseo, serpapi } from './seo/providers.mjs';

const SITE = 'xala.no';
const HISTORY = resolve(process.cwd(), 'seo-rankings.json');
const KEYWORDS = JSON.parse(readFileSync(resolve(process.cwd(), 'scripts/seo/keywords.json'), 'utf8'));

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};

const provider = flag('provider') === 'serpapi' ? serpapi : dataforseo;
const only = flag('keyword');

const tracked = only
  ? KEYWORDS.keywords.filter((k) => k.keyword === only)
  : KEYWORDS.keywords;

if (!tracked.length) {
  console.error(`No tracked keyword matches "${only}". See scripts/seo/keywords.json.`);
  process.exit(2);
}

requireEnv(
  provider.keys,
  provider.name,
  provider === dataforseo
    ? 'DataForSEO: dashboard → API Access. The login is your account email and\nthe password is the API password shown there, not your dashboard password.'
    : 'SerpAPI: serpapi.com/manage-api-key'
);

/** Our best-ranking result for a keyword, and what beats it. */
function analyse(results, target) {
  const ours = results.find((r) => {
    try {
      return new URL(r.url).hostname.replace(/^www\./, '') === SITE;
    } catch {
      return false;
    }
  });

  const path = ours ? new URL(ours.url).pathname.replace(/\/$/, '') || '/' : null;
  return {
    position: ours?.position ?? null,
    url: path,
    // Ranking with a page other than the one written for the query usually
    // means the intended page is thinner than the one Google preferred.
    onTarget: path === null ? null : path === target.replace(/\/$/, ''),
    ahead: results.filter((r) => !ours || r.position < ours.position).slice(0, 3).map((r) => {
      try {
        return new URL(r.url).hostname.replace(/^www\./, '');
      } catch {
        return r.url;
      }
    }),
  };
}

const stamp = new Date().toISOString().slice(0, 10);
const rows = [];

console.log(`\n=== rankings: ${tracked.length} keywords via ${provider.name} (google.no, nb) ===\n`);

for (const entry of tracked) {
  try {
    const results = await provider.serp(entry.keyword);
    const found = analyse(results, entry.target);
    rows.push({ ...entry, ...found });

    const pos = found.position ? String(found.position).padStart(3) : '  —';
    const mark = found.position === null ? ' ' : found.position <= 3 ? '★' : found.position <= 10 ? '·' : ' ';
    const note = found.position === null
      ? `not in top 100 — ahead: ${found.ahead.slice(0, 2).join(', ')}`
      : found.onTarget
        ? found.url
        : `${found.url}  (expected ${entry.target})`;
    console.log(`${mark} ${pos}  ${entry.keyword.padEnd(38)} ${note}`);
  } catch (error) {
    rows.push({ ...entry, position: null, error: String(error.message) });
    console.log(`  ERR  ${entry.keyword.padEnd(38)} ${error.message.slice(0, 80)}`);
  }
}

const ranked = rows.filter((r) => r.position !== null);
const top3 = ranked.filter((r) => r.position <= 3).length;
const top10 = ranked.filter((r) => r.position <= 10).length;
const offTarget = ranked.filter((r) => r.onTarget === false);

console.log(`\n  ranking at all: ${ranked.length}/${rows.length}   top 10: ${top10}   top 3: ${top3}`);
if (offTarget.length) {
  console.log(`  ranking with an unintended page: ${offTarget.length}`);
}

// Append rather than overwrite: one run is a number, the series is the signal.
const history = existsSync(HISTORY) ? JSON.parse(readFileSync(HISTORY, 'utf8')) : { runs: [] };
history.runs = history.runs.filter((run) => run.date !== stamp || run.provider !== provider.name);
history.runs.push({ date: stamp, provider: provider.name, rows });
history.runs.sort((a, b) => a.date.localeCompare(b.date));
writeFileSync(HISTORY, JSON.stringify(history, null, 2) + '\n');

const previous = history.runs.filter((r) => r.date !== stamp).at(-1);
if (previous) {
  const moves = rows
    .map((row) => {
      const before = previous.rows.find((r) => r.keyword === row.keyword);
      if (!before || before.position === null || row.position === null) return null;
      const delta = before.position - row.position;
      return delta === 0 ? null : { keyword: row.keyword, delta, from: before.position, to: row.position };
    })
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  if (moves.length) {
    console.log(`\n  since ${previous.date}:`);
    for (const m of moves.slice(0, 10)) {
      console.log(`    ${m.delta > 0 ? '+' : ''}${m.delta}  ${m.keyword} (${m.from} → ${m.to})`);
    }
  }
}

console.log(`\n  history: seo-rankings.json (${history.runs.length} run(s))\n`);
