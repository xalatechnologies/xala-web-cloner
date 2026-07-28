/**
 * Thin clients for the four search-data APIs.
 *
 * Each returns the same shape so the callers do not care which one answered:
 * a SERP is a list of { position, url, title }, whoever fetched it. That
 * matters because DataForSEO and SerpAPI are priced an order of magnitude
 * apart, and the cheap one should be the default without the reporting script
 * having to know.
 *
 * No SDKs. Every one of these is a single HTTPS call, and a dependency that
 * wraps one call is a dependency to audit, update and explain in an ISO 27001
 * review for no benefit.
 */
import { createSign } from 'node:crypto';
import { env } from './env.mjs';

/** Norway, Norwegian, Google. The market this site sells into. */
export const MARKET = {
  dataforseoLocation: 2578, // Norway
  dataforseoLanguage: 'no',
  serpapiLocation: 'Norway',
  hl: 'no',
  gl: 'no',
};

const asJson = async (response, provider) => {
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${provider}: HTTP ${response.status} — ${text.slice(0, 300)}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${provider}: response was not JSON — ${text.slice(0, 200)}`);
  }
};

/* ── DataForSEO ─────────────────────────────────────────────────────────────
 * Basic auth with the login/password pair from the dashboard, not a token.
 * "live/advanced" returns the parsed SERP in one call; the queued endpoints are
 * cheaper still but need polling, which is not worth it at this volume.
 */
export const dataforseo = {
  name: 'DataForSEO',
  keys: ['DATAFORSEO_LOGIN', 'DATAFORSEO_PASSWORD'],

  async serp(keyword) {
    const auth = Buffer.from(`${env('DATAFORSEO_LOGIN')}:${env('DATAFORSEO_PASSWORD')}`).toString('base64');
    const body = JSON.stringify([
      {
        keyword,
        location_code: MARKET.dataforseoLocation,
        language_code: MARKET.dataforseoLanguage,
        device: 'desktop',
        depth: 100,
      },
    ]);

    const data = await asJson(
      await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
        body,
      }),
      'DataForSEO'
    );

    // DataForSEO reports per-task errors inside a 200, so status_code has to be
    // checked explicitly or a failed lookup reads as "not ranking".
    const task = data.tasks?.[0];
    if (!task || task.status_code !== 20000) {
      throw new Error(`DataForSEO: task failed — ${task?.status_message ?? 'no task returned'}`);
    }

    const items = task.result?.[0]?.items ?? [];
    return items
      .filter((item) => item.type === 'organic')
      .map((item) => ({ position: item.rank_absolute, url: item.url, title: item.title }));
  },
};

/* ── SerpAPI ───────────────────────────────────────────────────────────────── */
export const serpapi = {
  name: 'SerpAPI',
  keys: ['SERPAPI_KEY'],

  async serp(keyword) {
    const url = new URL('https://serpapi.com/search.json');
    url.searchParams.set('q', keyword);
    url.searchParams.set('location', MARKET.serpapiLocation);
    url.searchParams.set('hl', MARKET.hl);
    url.searchParams.set('gl', MARKET.gl);
    url.searchParams.set('num', '100');
    url.searchParams.set('api_key', env('SERPAPI_KEY'));

    const data = await asJson(await fetch(url), 'SerpAPI');
    if (data.error) throw new Error(`SerpAPI: ${data.error}`);

    return (data.organic_results ?? []).map((item) => ({
      position: item.position,
      url: item.link,
      title: item.title,
    }));
  },
};

/* ── Google Search Console ──────────────────────────────────────────────────
 * Service-account JWT signed here and exchanged for an access token, rather
 * than pulling in googleapis (≈40 transitive packages) to make two requests.
 */
export const searchConsole = {
  name: 'Google Search Console',
  keys: ['GSC_CLIENT_EMAIL', 'GSC_PRIVATE_KEY', 'GSC_SITE_URL'],

  async accessToken() {
    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: env('GSC_CLIENT_EMAIL'),
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };
    const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64(claim)}`;

    // A key pasted into .env.local arrives with literal \n rather than newlines.
    const pem = env('GSC_PRIVATE_KEY').replace(/\\n/g, '\n');
    const signature = createSign('RSA-SHA256').update(unsigned).sign(pem, 'base64url');

    const token = await asJson(
      await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: `${unsigned}.${signature}`,
        }),
      }),
      'Google OAuth'
    );
    if (!token.access_token) throw new Error(`Google OAuth: no access_token — ${JSON.stringify(token).slice(0, 200)}`);
    return token.access_token;
  },

  /** Real impressions, clicks and average position for whatever you group by. */
  async searchAnalytics({ startDate, endDate, dimensions = ['query'], rowLimit = 200 }) {
    const site = encodeURIComponent(env('GSC_SITE_URL'));
    const data = await asJson(
      await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await this.accessToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate, dimensions, rowLimit }),
      }),
      'Search Console'
    );
    return data.rows ?? [];
  },

  /** Whether Google has actually indexed a URL, which a sitemap cannot tell you. */
  async inspect(pageUrl) {
    const data = await asJson(
      await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await this.accessToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inspectionUrl: pageUrl,
          siteUrl: env('GSC_SITE_URL'),
          languageCode: 'nb',
        }),
      }),
      'URL Inspection'
    );
    const result = data.inspectionResult?.indexStatusResult ?? {};
    return {
      url: pageUrl,
      verdict: result.verdict ?? 'UNKNOWN',
      coverage: result.coverageState ?? 'unknown',
      lastCrawl: result.lastCrawlTime ?? null,
      canonical: result.googleCanonical ?? null,
    };
  },
};

/* ── PageSpeed Insights ─────────────────────────────────────────────────────
 * The field data (loadingExperience) is what Google actually ranks on: real
 * Chrome users over 28 days. The lab score in the same response is a
 * simulation, and the two disagree often enough that reporting the lab number
 * as "your Core Web Vitals" would be wrong.
 */
export const pagespeed = {
  name: 'PageSpeed Insights',
  keys: ['PAGESPEED_API_KEY'],

  async run(pageUrl, strategy = 'mobile') {
    const url = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    url.searchParams.set('url', pageUrl);
    url.searchParams.set('strategy', strategy);
    url.searchParams.set('key', env('PAGESPEED_API_KEY'));
    for (const category of ['performance', 'accessibility', 'seo', 'best-practices']) {
      url.searchParams.append('category', category);
    }

    const data = await asJson(await fetch(url), 'PageSpeed');
    const field = data.loadingExperience?.metrics ?? {};
    const audits = data.lighthouseResult?.audits ?? {};
    const categories = data.lighthouseResult?.categories ?? {};

    return {
      url: pageUrl,
      strategy,
      hasFieldData: Boolean(data.loadingExperience?.metrics),
      field: {
        lcp: field.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
        inp: field.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
        cls: field.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile ?? null,
        overall: data.loadingExperience?.overall_category ?? null,
      },
      lab: {
        performance: Math.round((categories.performance?.score ?? 0) * 100),
        accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
        seo: Math.round((categories.seo?.score ?? 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score ?? 0) * 100),
        lcp: audits['largest-contentful-paint']?.numericValue ?? null,
        cls: audits['cumulative-layout-shift']?.numericValue ?? null,
        tbt: audits['total-blocking-time']?.numericValue ?? null,
      },
    };
  },
};
