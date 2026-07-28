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
  /**
   * The Labs endpoints reject 'no' and require 'nb'.
   *
   * The SERP endpoint accepts either, so this looked correct until Labs
   * returned "Invalid Field: 'language_code'" for every call. Norway offers
   * exactly one Labs language — Norwegian (Bokmål) = nb — which is confirmable
   * from /v3/dataforseo_labs/locations_and_languages rather than guessable.
   */
  dataforseoLabsLanguage: 'nb',
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

  /** Shared POST helper — every Labs endpoint takes the same auth and shape. */
  async _post(path, task) {
    const auth = Buffer.from(`${env('DATAFORSEO_LOGIN')}:${env('DATAFORSEO_PASSWORD')}`).toString('base64');
    const data = await asJson(
      await fetch(`https://api.dataforseo.com${path}`, {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([task]),
      }),
      'DataForSEO'
    );
    const t = data.tasks?.[0];
    if (!t || t.status_code !== 20000) {
      throw new Error(`DataForSEO ${path}: ${t?.status_message ?? 'no task returned'}`);
    }
    return t.result?.[0]?.items ?? [];
  },

  /**
   * Keywords related to a set of seed terms, with the volume that decides
   * whether any of them is worth a page.
   *
   * Search volume is the number the whole exercise turns on. A keyword list
   * written from what a company calls its own services is a list of guesses;
   * roughly half of them usually turn out to have no measurable Norwegian
   * search volume at all, which means no page can rank for them because nobody
   * is searching.
   */
  async keywordIdeas(seeds, limit = 200) {
    const items = await this._post('/v3/dataforseo_labs/google/keyword_ideas/live', {
      keywords: seeds,
      location_code: MARKET.dataforseoLocation,
      language_code: MARKET.dataforseoLabsLanguage,
      include_serp_info: false,
      limit,
    });
    return items.map(shapeKeyword);
  },

  /** Keyword suggestions: long-tail phrases containing a seed. */
  async keywordSuggestions(seed, limit = 100) {
    const items = await this._post('/v3/dataforseo_labs/google/keyword_suggestions/live', {
      keyword: seed,
      location_code: MARKET.dataforseoLocation,
      language_code: MARKET.dataforseoLabsLanguage,
      limit,
    });
    return items.map(shapeKeyword);
  },

  /**
   * What a domain already ranks for.
   *
   * Pointed at a competitor this is the highest-signal keyword research
   * available: not what a keyword tool thinks is related, but the queries a
   * company in the same market is being found for right now.
   */
  async rankedKeywords(domain, limit = 200) {
    const items = await this._post('/v3/dataforseo_labs/google/ranked_keywords/live', {
      target: domain,
      location_code: MARKET.dataforseoLocation,
      language_code: MARKET.dataforseoLabsLanguage,
      limit,
      order_by: ['keyword_data.keyword_info.search_volume,desc'],
    });
    return items.map((item) => ({
      ...shapeKeyword(item),
      position: item.ranked_serp_element?.serp_item?.rank_absolute ?? null,
      url: item.ranked_serp_element?.serp_item?.url ?? null,
    }));
  },
};

/** DataForSEO nests the same numbers differently per endpoint. */
function shapeKeyword(item) {
  const kd = item.keyword_data ?? item;
  const info = kd.keyword_info ?? {};
  return {
    keyword: kd.keyword ?? item.keyword,
    volume: info.search_volume ?? 0,
    cpc: info.cpc ?? null,
    competition: info.competition_level ?? null,
    difficulty: kd.keyword_properties?.keyword_difficulty ?? null,
  };
}

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
