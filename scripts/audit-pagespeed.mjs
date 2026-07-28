/**
 * Core Web Vitals as Google measures them: real Chrome users, not a simulation.
 *
 * scripts/audit-vitals.mjs already measures this machine loading the site over
 * localhost, which is useful for catching a regression before it ships and
 * useless as a prediction of the ranking signal. Google ranks on field data —
 * the 75th percentile of real visits over 28 days, on real Norwegian networks
 * and real phones. Those two numbers routinely disagree, and only one of them
 * is the one that counts.
 *
 * Field data only exists once a URL has enough traffic. "no field data yet" is
 * an honest answer and is reported as one, rather than quietly falling back to
 * the lab score and presenting it as the same thing.
 *
 *   node scripts/audit-pagespeed.mjs
 *   node scripts/audit-pagespeed.mjs --strategy desktop
 */
import { requireEnv } from './seo/env.mjs';
import { pagespeed } from './seo/providers.mjs';

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const strategy = flag('strategy') ?? 'mobile';

/** The pages that carry the traffic, not all 61 — this API is slow. */
const URLS = [
  'https://xala.no/',
  'https://xala.no/tjenester',
  'https://xala.no/tjenester/saksbehandlingssystem',
  'https://xala.no/produkter',
  'https://xala.no/caser',
  'https://xala.no/blogg',
  'https://xala.no/blogg/tilskuddsportal-som-faktisk-brukes',
  'https://xala.no/kontakt',
];

requireEnv(
  pagespeed.keys,
  pagespeed.name,
  'console.cloud.google.com → APIs & Services → enable "PageSpeed Insights API"\n→ Credentials → Create credentials → API key.\nFree; no billing account needed.'
);

// Google's own thresholds for "good".
const GOOD = { lcp: 2500, inp: 200, cls: 0.1 };

const verdict = (value, limit, scale = 1) =>
  value === null ? '   —' : `${(value / scale).toFixed(scale === 1 ? 0 : 2)}${value <= limit ? ' ' : '!'}`;

console.log(`\n=== PageSpeed Insights: ${URLS.length} pages, ${strategy} ===\n`);
console.log('  field data = real Chrome users, 28 days, 75th percentile — this is the ranking signal');
console.log('  lab data   = one simulated load, useful for debugging only\n');

const rows = [];
for (const url of URLS) {
  try {
    const r = await pagespeed.run(url, strategy);
    rows.push(r);
    const path = url.replace('https://xala.no', '') || '/';
    if (r.hasFieldData) {
      console.log(
        `  ${path.padEnd(46)} FIELD  LCP ${verdict(r.field.lcp, GOOD.lcp)}ms  ` +
        `INP ${verdict(r.field.inp, GOOD.inp)}ms  CLS ${verdict(r.field.cls / 100, GOOD.cls, 1)}  ` +
        `[${r.field.overall ?? '—'}]`
      );
    } else {
      console.log(
        `  ${path.padEnd(46)} no field data yet  ·  lab perf ${r.lab.performance}  ` +
        `LCP ${Math.round(r.lab.lcp)}ms  CLS ${r.lab.cls.toFixed(3)}  TBT ${Math.round(r.lab.tbt)}ms`
      );
    }
  } catch (error) {
    console.log(`  ${url.replace('https://xala.no', '').padEnd(46)} ERROR  ${String(error.message).slice(0, 70)}`);
  }
}

const withField = rows.filter((r) => r.hasFieldData);
const labs = rows.filter((r) => !r.hasFieldData);

console.log('');
if (withField.length) {
  const failing = withField.filter(
    (r) =>
      (r.field.lcp ?? 0) > GOOD.lcp ||
      (r.field.inp ?? 0) > GOOD.inp ||
      (r.field.cls ?? 0) / 100 > GOOD.cls
  );
  console.log(
    failing.length
      ? `  ${failing.length}/${withField.length} pages with field data fail at least one Core Web Vital.`
      : `  all ${withField.length} pages with field data pass Core Web Vitals.`
  );
}
if (labs.length) {
  const avg = Math.round(labs.reduce((a, r) => a + r.lab.performance, 0) / labs.length);
  console.log(`  ${labs.length} pages have no field data yet (too little traffic); their average lab score is ${avg}.`);
}

// A page whose lab score is fine but whose field data fails is the interesting
// case: the problem is real networks and real devices, not the code path a
// local run exercises.
const divergent = withField.filter((r) => r.lab.performance >= 90 && (r.field.lcp ?? 0) > GOOD.lcp);
if (divergent.length) {
  console.log(`\n  ${divergent.length} page(s) score well in the lab but fail LCP in the field —`);
  console.log('  that gap is network and device, not bundle size:');
  for (const r of divergent) console.log(`    ${r.url.replace('https://xala.no', '') || '/'}  lab ${r.lab.performance}, field LCP ${r.field.lcp}ms`);
}
console.log('');
