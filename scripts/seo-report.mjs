/**
 * Turns the morning's measurements into a ranked list of things to do.
 *
 * The audits each answer one question well and none of them says what to work
 * on first. Reading four reports and deciding is the step that quietly does not
 * happen, so this does it: every finding carries a severity, a number that
 * justifies it, and where to look.
 *
 * Written to be read as a GitHub issue body. One rolling issue, updated in
 * place — a new issue every morning is a notification people mute in a week,
 * and a muted issue is worse than no issue because it looks like coverage.
 *
 *   node scripts/seo-report.mjs             # markdown to stdout
 *   node scripts/seo-report.mjs --json      # findings as data
 *
 * Reads only what is on disk. Missing inputs are reported as missing rather
 * than skipped, because "we never measured this" and "this is fine" are
 * different states and only one of them needs action.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DATA = resolve(process.cwd(), 'seo-data');
const read = (name) => {
  const path = resolve(DATA, name);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
};

const rankings = read('rankings.json');
const vitals = read('vitals.json');
const console_ = read('search-console.json');
const keywords = read('keywords.json');

/** critical → blocks ranking outright. high → measurable loss. info → context. */
const findings = [];
const add = (severity, title, detail, evidence) =>
  findings.push({ severity, title, detail, evidence });

/* ── Not measured at all ──────────────────────────────────────────────────── */

if (!console_) {
  add(
    'critical',
    'Search Console is not connected',
    'Nothing can currently confirm Google has indexed the site. A valid sitemap and an indexed page are different claims, and this repo has already shipped 17 case studies that rendered fine in a browser and returned 404 to every crawler.',
    'Add GSC_PRIVATE_KEY as a repository secret, and add the service account as a Full user in Search Console.'
  );
}
if (!rankings) {
  add('high', 'No ranking data', 'Nothing measures whether any of this is working.', 'Add DATAFORSEO_PASSWORD as a repository secret.');
}
if (!keywords) {
  add(
    'high',
    'Keyword targets are guesses',
    'scripts/seo/keywords.json was written from what the company calls its own services. A term can be the correct name for what you sell and still be one nobody searches for.',
    'Add DATAFORSEO_PASSWORD, then run npm run seo:keywords.'
  );
}

/* ── Core Web Vitals ──────────────────────────────────────────────────────── */

if (vitals?.pages?.length) {
  const { lcp: LCP_GOOD } = vitals.thresholds;
  const field = vitals.pages.filter((p) => p.hasFieldData);
  const lab = vitals.pages.filter((p) => !p.hasFieldData);

  const failingField = field.filter((p) => (p.field.lcp ?? 0) > LCP_GOOD);
  if (failingField.length) {
    add(
      'critical',
      `LCP fails for real users on ${failingField.length} of ${field.length} pages`,
      `Largest Contentful Paint above ${LCP_GOOD}ms at the 75th percentile of real Chrome users. This is a ranking signal, not a lab score.`,
      failingField.map((p) => `${path(p.url)} — ${p.field.lcp}ms`).join('\n')
    );
  }

  const slowLab = lab.filter((p) => p.lab.lcp > LCP_GOOD);
  if (slowLab.length) {
    const worst = Math.round(Math.max(...slowLab.map((p) => p.lab.lcp)));
    add(
      field.length ? 'high' : 'critical',
      `LCP is ${Math.round(Math.min(...slowLab.map((p) => p.lab.lcp)) / 100) / 10}–${Math.round(worst / 100) / 10}s on ${slowLab.length} pages (lab)`,
      `Above Google's ${LCP_GOOD}ms threshold on every measured page. No field data yet, so this is the simulated number — but a page that is this slow in a lab will not be fast in the field.`,
      slowLab
        .sort((a, b) => b.lab.lcp - a.lab.lcp)
        .map((p) => `${path(p.url)} — ${Math.round(p.lab.lcp)}ms (perf ${p.lab.performance})`)
        .join('\n')
    );
  }

  const badCls = vitals.pages.filter((p) => (p.hasFieldData ? p.field.cls / 100 : p.lab.cls) > vitals.thresholds.cls);
  if (badCls.length) {
    add('high', `Layout shift above threshold on ${badCls.length} pages`, 'CLS over 0.1 means content moves under the reader.', badCls.map((p) => path(p.url)).join('\n'));
  }
}

/* ── Rankings ─────────────────────────────────────────────────────────────── */

const latest = rankings?.runs?.at(-1);
if (latest) {
  const rows = latest.rows;
  const ranked = rows.filter((r) => r.position !== null);
  const nonBrand = rows.filter((r) => r.intent !== 'navigational');
  const rankedNonBrand = nonBrand.filter((r) => r.position !== null);

  if (nonBrand.length && !rankedNonBrand.length) {
    add(
      'critical',
      `Not ranking for any of ${nonBrand.length} non-brand keywords`,
      'Every commercial query is outside the top 100. The site is findable by name and by nothing else.',
      `Measured ${latest.date} via ${latest.provider}.`
    );
  } else if (rankedNonBrand.length) {
    const striking = rankedNonBrand.filter((r) => r.position > 3 && r.position <= 20);
    if (striking.length) {
      add(
        'high',
        `${striking.length} keyword${striking.length === 1 ? '' : 's'} in positions 4–20`,
        'These already rank and already get seen. A better title, a stronger opening or an internal link moves them into the range that gets clicked — cheaper than writing a new page.',
        striking.map((r) => `#${r.position} ${r.keyword} → ${r.url ?? '—'}`).join('\n')
      );
    }
  }

  const offTarget = ranked.filter((r) => r.onTarget === false);
  if (offTarget.length) {
    add(
      'high',
      `${offTarget.length} keyword${offTarget.length === 1 ? '' : 's'} rank${offTarget.length === 1 ? 's' : ''} with the wrong page`,
      'Google preferred a page other than the one written for the query, which usually means the intended page is thinner than its competition.',
      offTarget.map((r) => `${r.keyword}: got ${r.url}, expected ${r.target}`).join('\n')
    );
  }

  // Movement since the previous run is the only thing that says whether last
  // week's work did anything.
  const previous = rankings.runs.at(-2);
  if (previous) {
    const drops = rows
      .map((row) => {
        const before = previous.rows.find((r) => r.keyword === row.keyword);
        if (!before?.position || !row.position) return null;
        const delta = before.position - row.position;
        return delta <= -3 ? { ...row, from: before.position, delta } : null;
      })
      .filter(Boolean);
    if (drops.length) {
      add(
        'high',
        `${drops.length} keyword${drops.length === 1 ? '' : 's'} dropped 3+ positions since ${previous.date}`,
        'A fall this size is usually a content or technical change, not noise.',
        drops.map((d) => `${d.keyword}: ${d.from} → ${d.position}`).join('\n')
      );
    }
  }
}

/* ── Search Console ───────────────────────────────────────────────────────── */

if (console_?.queries?.length) {
  const q = console_.queries;
  const impressions = q.reduce((a, r) => a + r.impressions, 0);
  const clicks = q.reduce((a, r) => a + r.clicks, 0);

  const striking = q.filter((r) => r.position > 3.5 && r.position <= 20 && r.impressions >= 5);
  if (striking.length) {
    add(
      'high',
      `${striking.length} real queries sitting just off page one`,
      'Google is already showing these. Improving the page that ranks is faster than creating another.',
      striking
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 15)
        .map((r) => `pos ${r.position.toFixed(1)} · ${r.impressions} impr · ${r.keys[0]}`)
        .join('\n')
    );
  }

  const noClicks = q.filter((r) => r.clicks === 0 && r.impressions >= 20 && r.position <= 10);
  if (noClicks.length) {
    add(
      'high',
      `${noClicks.length} queries rank on page one and get no clicks`,
      'The ranking is fine; the title or description is not earning the click. This is a copy problem, not an SEO problem.',
      noClicks.slice(0, 10).map((r) => `pos ${r.position.toFixed(1)} · ${r.impressions} impr · ${r.keys[0]}`).join('\n')
    );
  }

  add('info', `${impressions} impressions, ${clicks} clicks over ${console_.startDate} → ${console_.endDate}`, '', '');
} else if (console_) {
  add(
    'critical',
    'Search Console returns no data',
    'Either the site has no impressions at all, or GSC_SITE_URL does not match the verified property, or the service account was never added as a user.',
    'Check Settings → Users and permissions in Search Console.'
  );
}

/* ── Keywords ─────────────────────────────────────────────────────────────── */

if (keywords?.keywords?.length) {
  const winnable = keywords.keywords.filter((k) => (k.difficulty ?? 100) <= 30 && k.volume >= 30);
  if (winnable.length) {
    add(
      'high',
      `${winnable.length} winnable keywords with no page targeting them`,
      'Low difficulty, real Norwegian volume. These are where a site with no authority can actually rank.',
      winnable.slice(0, 15).map((k) => `${k.volume}/mo · diff ${k.difficulty ?? '—'} · ${k.keyword}`).join('\n')
    );
  }
}

/* ── Output ───────────────────────────────────────────────────────────────── */

function path(url) {
  return String(url).replace('https://xala.no', '') || '/';
}

const RANK = { critical: 0, high: 1, info: 2 };
findings.sort((a, b) => RANK[a.severity] - RANK[b.severity]);

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ findings }, null, 2));
  process.exit(0);
}

const ICON = { critical: '🔴', high: '🟠', info: 'ℹ️' };
const counts = findings.reduce((a, f) => ({ ...a, [f.severity]: (a[f.severity] ?? 0) + 1 }), {});

const out = [];
out.push('_Updated by the `SEO daily` workflow. This issue is rewritten each run, so it always reflects the latest measurement rather than a history of them._');
out.push('');
out.push(
  `**${counts.critical ?? 0} critical · ${counts.high ?? 0} high** — measured from ` +
    [rankings && 'rankings', console_ && 'Search Console', vitals && 'PageSpeed field data', keywords && 'keyword research']
      .filter(Boolean)
      .join(', ') || 'nothing yet'
);
out.push('');

for (const f of findings) {
  if (f.severity === 'info') continue;
  out.push(`### ${ICON[f.severity]} ${f.title}`);
  out.push('');
  if (f.detail) out.push(f.detail);
  if (f.evidence) {
    out.push('');
    out.push('```');
    out.push(f.evidence);
    out.push('```');
  }
  out.push('');
}

const info = findings.filter((f) => f.severity === 'info');
if (info.length) {
  out.push('---');
  for (const f of info) out.push(`- ${f.title}`);
  out.push('');
}

if (!findings.filter((f) => f.severity !== 'info').length) {
  out.push('No critical or high findings. That is either good news or a sign the measurements did not run — check the workflow log.');
}

console.log(out.join('\n'));
