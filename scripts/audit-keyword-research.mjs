/**
 * Which Norwegian searches are worth writing a page for.
 *
 * scripts/seo/keywords.json is a list of guesses. It was written from what this
 * company calls its own services, which is the standard way to build a keyword
 * list and the reason most keyword lists are wrong: a term can be the correct
 * name for what you sell and still be something nobody types into Google. The
 * first ranking run found 1 of 28 tracked keywords ranking at all, and it was
 * the brand name — which tells you the pages are not competitive, but not
 * whether the keywords were worth competing for.
 *
 * This answers that. Three sources, in increasing order of signal:
 *
 *   1. Ideas from seed terms — what else people search around a topic.
 *   2. Long-tail suggestions — the specific phrasings, which are where a small
 *      site can actually win.
 *   3. What competitors already rank for — not a tool's opinion about what is
 *      related, but queries a company in this market is being found for today.
 *      The competitors are not guessed either: they are the domains that
 *      outranked xala.no in the last rankings run.
 *
 * Everything is scored on volume against difficulty, because a term with 2000
 * searches and a difficulty of 80 is worth less to a site with no authority
 * than one with 90 searches and a difficulty of 15.
 *
 *   node scripts/audit-keyword-research.mjs
 *   node scripts/audit-keyword-research.mjs --limit 300
 *
 * Costs roughly $0.05-0.15 per run depending on --limit.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { requireEnv } from './seo/env.mjs';
import { dataforseo } from './seo/providers.mjs';

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const LIMIT = Number(flag('limit') ?? 200);
const OUT = resolve(process.cwd(), 'seo-data/keywords.json');

requireEnv(dataforseo.keys, dataforseo.name, 'DataForSEO dashboard → API Access.');

/**
 * Seed terms, one per thing this company actually sells.
 *
 * Deliberately short and generic: these are the roots the API expands from, so
 * a narrow seed ("saksbehandlingssystem for kommuner med Noark-integrasjon")
 * returns nothing while a broad one returns the vocabulary real buyers use.
 */
const SEEDS = [
  'saksbehandlingssystem',
  'tilskuddsportal',
  'bevillingsportal',
  'systemintegrasjon',
  'altinn integrasjon',
  'id-porten',
  'noark 5',
  'fagsystem kommune',
  'digitalisering kommune',
  'saas offentlig sektor',
  'automatisering saksbehandling',
  'ai offentlig sektor',
  'systemutvikling',
  'skjenkebevilling',
  'booking kommune',
];

/**
 * Competitors, taken from the domains that outranked xala.no in the last
 * rankings run rather than from a list of who we think the competition is.
 */
const COMPETITORS = [
  'minflyt.no',
  'capraconsulting.no',
  'publixgroup.io',
  'bevillingsklar.no',
  'resp.no',
];

/**
 * Relevance, because volume alone produces a useless list.
 *
 * The first working run returned 626 keywords with real Norwegian volume and
 * the top of the list was "visma" (60500), "minvakt" (14800), "ølsalg lørdag"
 * (8100) and "haaland lønn" (3600). All real searches; none of them anything
 * this company could or should rank for. Two failure modes produced that:
 *
 *   - Competitor brand terms. minflyt.no ranks for Visma product names because
 *     it is part of that ecosystem. We are not, and chasing a competitor's
 *     brand is chasing a query whose searcher already knows who they want.
 *   - Seeds that leak into consumer intent. "skjenkebevilling" is a municipal
 *     licensing term to us and a question about when you can buy beer to
 *     everyone else, so it dragged in ølsalg, vinmonopolet and opening hours.
 *
 * A keyword has to look like something a public-sector buyer would type. That
 * is a cruder test than semantic relevance, and it is the one that turns this
 * from a volume dump into a list someone can act on.
 */
const RELEVANT = [
  'saksbehandl', 'tilskudd', 'bevilling', 'integrasjon', 'altinn', 'id-porten',
  'maskinporten', 'noark', 'arkiv', 'fagsystem', 'kommune', 'offentlig',
  'digitaliser', 'systemutvikl', 'saas', 'skyløsning', 'automatiser',
  'kunstig intelligens', ' ai ', 'wcag', 'universell utforming', 'iso 27001',
  'gdpr', 'personvern', 'anskaffelse', 'ssa-', 'folkeregister', 'enhetsregister',
  'portal', 'selvbetjening', 'innbygger', 'etat', 'forvaltning', 'vedtak',
  'søknadsbehandling', 'utvikling av', 'programvare', 'systemleverandør',
];

/** Competitor and unrelated brands: their traffic is not available to us. */
const BRAND_NOISE = [
  'visma', 'minflyt', 'minvakt', 'min vakt', 'elevportal', 'flyt skole',
  'flyt timeplan', 'flyt ressursstyring', 'unit4', 'tieto', 'evry', 'sikri',
  'acos', 'elements', 'public360', 'websak',
];

/**
 * "Tilskudd" is two different words.
 *
 * In public administration it is a grant or subsidy — the thing a
 * tilskuddsportal administers. In everyday Norwegian it is a dietary
 * supplement, and that meaning owns most of the search volume: krom tilskudd,
 * kobber tilskudd, ZMA, GABA, tilskudd til sau. A keyword tool cannot tell
 * these apart because they are spelled identically, so the substances get
 * named explicitly. Real grant schemes (IMDi, Bufdir, Landbruksdirektoratet)
 * stay, because those are the queries a public-sector buyer actually makes.
 */
const SUPPLEMENT_NOISE = [
  'krom', 'kobber', 'zma', 'gaba', 'magnesium', 'sink', 'jern', 'kalsium',
  'vitamin', 'omega', 'protein', 'kreatin', 'kosttilskudd', 'sau', 'hest',
  'hund', 'katt', 'ku ', 'kylling', 'fôr', 'for til', 'selen', 'jod', 'biotin',
];

/** Consumer intent that municipal-licensing seeds drag in. */
const CONSUMER_NOISE = [
  'ølsalg', 'vinmonopolet', 'øl ', 'alkohol', 'åpningstid', 'lønn', 'haaland',
  'bergen fiber', 'klatresenter', 'storm ', 'pent no', 'kod bergen', 'timeplan',
];

/** Queries about the word itself, not about buying anything. */
const LINGUISTIC_NOISE = ['på engelsk', 'engelsk', 'betyr', 'definisjon', 'synonym', 'wikipedia'];

function isRelevant(keyword) {
  const k = ` ${keyword.toLowerCase()} `;
  if (BRAND_NOISE.some((b) => k.includes(b))) return false;
  if (CONSUMER_NOISE.some((c) => k.includes(c))) return false;
  if (LINGUISTIC_NOISE.some((l) => k.includes(l))) return false;
  if (k.includes('tilskudd') && SUPPLEMENT_NOISE.some((n) => k.includes(n))) return false;
  // "skoleportalen", "foreldreportalen" — school systems, a different market.
  if (/\b(skole|elev|foreldre|barnehage)/.test(k)) return false;
  return RELEVANT.some((r) => k.includes(r));
}

let apiFailures = 0;
let rejected = 0;
const seen = new Map();
const record = (kw, source) => {
  if (!kw.keyword || !kw.volume) return; // zero volume is not a keyword
  if (!isRelevant(kw.keyword)) {
    rejected += 1;
    return;
  }
  const existing = seen.get(kw.keyword);
  if (existing) {
    existing.sources.add(source);
    if (kw.difficulty != null) existing.difficulty ??= kw.difficulty;
    return;
  }
  seen.set(kw.keyword, { ...kw, sources: new Set([source]) });
};

console.log(`\n=== keyword research: Norway, Norwegian ===\n`);

console.log(`  ideas from ${SEEDS.length} seed terms…`);
try {
  for (const kw of await dataforseo.keywordIdeas(SEEDS, LIMIT)) record(kw, 'ideas');
} catch (error) {
  apiFailures += 1;
  console.log(`    failed: ${error.message.slice(0, 120)}`);
}
console.log(`    ${seen.size} keywords with measurable volume so far`);

console.log(`\n  long-tail suggestions per seed…`);
for (const seed of SEEDS) {
  try {
    const before = seen.size;
    for (const kw of await dataforseo.keywordSuggestions(seed, 60)) record(kw, 'suggestions');
    console.log(`    ${seed.padEnd(32)} +${seen.size - before}`);
  } catch (error) {
    apiFailures += 1;
    console.log(`    ${seed.padEnd(32)} failed: ${error.message.slice(0, 60)}`);
  }
}

console.log(`\n  what competitors already rank for…`);
const competitorKeywords = new Map();
for (const domain of COMPETITORS) {
  try {
    const rows = await dataforseo.rankedKeywords(domain, 120);
    for (const kw of rows) {
      record(kw, 'competitor');
      if (!competitorKeywords.has(kw.keyword)) competitorKeywords.set(kw.keyword, []);
      competitorKeywords.get(kw.keyword).push({ domain, position: kw.position });
    }
    console.log(`    ${domain.padEnd(26)} ${rows.length} ranked keywords`);
  } catch (error) {
    apiFailures += 1;
    console.log(`    ${domain.padEnd(26)} failed: ${error.message.slice(0, 60)}`);
  }
}

const all = [...seen.values()].map((kw) => ({
  ...kw,
  sources: [...kw.sources],
  competitors: competitorKeywords.get(kw.keyword) ?? [],
}));

/**
 * Opportunity: volume you could plausibly reach, not volume that exists.
 *
 * Dividing by difficulty rather than filtering on it keeps a high-volume,
 * high-difficulty term visible while ranking it below an easier one — the call
 * about whether to chase it stays a human one. Difficulty is missing often
 * enough that an absent value is treated as middling rather than as zero,
 * which would otherwise float every unmeasured keyword to the top.
 */
const score = (kw) => Math.round((kw.volume * 100) / ((kw.difficulty ?? 40) + 10));

all.forEach((kw) => (kw.opportunity = score(kw)));
all.sort((a, b) => b.opportunity - a.opportunity);

const tracked = new Set(
  JSON.parse(readFileSync(resolve(process.cwd(), 'scripts/seo/keywords.json'), 'utf8')).keywords.map(
    (k) => k.keyword
  )
);

const show = (rows, n = 25) => {
  console.log('      vol   diff   opp  keyword');
  for (const kw of rows.slice(0, n)) {
    const mark = tracked.has(kw.keyword) ? ' ' : '+';
    console.log(
      `  ${mark} ${String(kw.volume).padStart(5)}  ${String(kw.difficulty ?? '—').padStart(4)}  ${String(kw.opportunity).padStart(4)}  ${kw.keyword}`
    );
  }
};

console.log(`\n\n  ${all.length} relevant keywords with real Norwegian search volume`);
console.log(`  (${rejected} rejected as competitor brands, consumer intent, or off-topic)`);
console.log(`  (+ = not currently in scripts/seo/keywords.json)\n`);

console.log('  Best opportunities overall:');
show(all);

const winnable = all.filter((kw) => (kw.difficulty ?? 100) <= 30 && kw.volume >= 30);
console.log(`\n  Winnable now — difficulty ≤30, volume ≥30 (${winnable.length}):`);
show(winnable, 20);

const competitorOnly = all
  .filter((kw) => kw.competitors.length && !tracked.has(kw.keyword))
  .sort((a, b) => b.volume - a.volume);
console.log(`\n  Competitors rank for these and we do not (${competitorOnly.length}):`);
console.log('      vol   diff  keyword  ← who');
for (const kw of competitorOnly.slice(0, 20)) {
  const who = kw.competitors.map((c) => `${c.domain}#${c.position}`).slice(0, 2).join(', ');
  console.log(
    `    ${String(kw.volume).padStart(5)}  ${String(kw.difficulty ?? '—').padStart(4)}  ${kw.keyword.padEnd(42)} ${who}`
  );
}

/**
 * "We measured and found nothing" and "we failed to measure" are different
 * results, and only one of them is a finding.
 *
 * The first run of this reported all 28 tracked keywords as having no
 * measurable volume — "no page can rank for a search nobody makes" — when in
 * fact every API call had failed on a bad language code and nothing had been
 * measured at all. A report that confidently states a conclusion it did not
 * earn is worse than one that errors out.
 */
if (apiFailures) {
  console.log(`\n  ${apiFailures} API call(s) failed. Not reporting zero-volume keywords:`);
  console.log('  an unmeasured keyword and a keyword with no volume look identical');
  console.log('  from here, and only one of them means anything.');
  process.exitCode = 1;
} else {
  const zeroVolume = [...tracked].filter((k) => !seen.has(k));
  if (zeroVolume.length) {
    console.log(`\n  Tracked keywords with no measurable volume (${zeroVolume.length}) —`);
    console.log('  no page can rank for a search nobody makes:');
    for (const k of zeroVolume) console.log(`    ${k}`);
  }
}

mkdirSync(resolve(process.cwd(), 'seo-data'), { recursive: true });
writeFileSync(
  OUT,
  JSON.stringify(
    { generated: null, market: 'Norway / no', seeds: SEEDS, competitors: COMPETITORS, keywords: all },
    null,
    2
  ) + '\n'
);
console.log(`\n  full data: ${OUT.split('/').pop()} (${all.length} keywords)\n`);

if (!existsSync(OUT)) process.exitCode = 1;
