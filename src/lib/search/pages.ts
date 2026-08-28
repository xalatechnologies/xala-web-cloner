/**
 * The site's own pages, as something the search box can return.
 *
 * The header search hands every query to the article index, and that index
 * knows about the blog and nothing else. So a reader who typed what this
 * company actually sells — a product name, the price page, contact — got
 * "Ingen treff." and a dead end: a search with no result to open. The pages
 * below are the rest of the site, described with the copy each one already
 * publishes about itself in seoContent, so this file invents no new wording
 * and cannot drift away from what the page's own <title> says.
 *
 * Keywords are searched but never shown: they are how "Digilist" or
 * "Maskinporten" reaches /produkter and /tjenester, neither of which names
 * them in its title.
 */
import { getPageSEO, type Language, type PageId } from '@/components/seo/seoContent';

export interface SitePage {
  path: string;
  title: string;
  description: string;
}

/** `Kontakt Xala Technologies` keeps its name; `… | Xala` loses the suffix. */
const BRAND_SUFFIX = /\s*\|\s*Xala\b.*$/;

/**
 * Every static route, in the order a visitor is most likely to want it — the
 * order is what decides which page is the first result when several match, and
 * which ones are offered when nothing does. Parameterised routes (a single
 * product, service or case) are not here: they are reachable from the index
 * pages above them, which are.
 */
const PAGES: ReadonlyArray<{ path: string; pageId: PageId }> = [
  { path: '/', pageId: 'home' },
  { path: '/tjenester', pageId: 'services' },
  { path: '/produkter', pageId: 'products' },
  { path: '/caser', pageId: 'cases' },
  { path: '/blogg', pageId: 'blog' },
  { path: '/priser', pageId: 'pricing' },
  { path: '/slik-vi-jobber', pageId: 'process' },
  { path: '/teknologi', pageId: 'technology' },
  { path: '/faq', pageId: 'faq' },
  { path: '/om-oss', pageId: 'about' },
  { path: '/kontakt', pageId: 'contact' },
  { path: '/book-demo', pageId: 'bookDemo' },
  { path: '/karriere', pageId: 'careers' },
  { path: '/transparens', pageId: 'transparens' },
  { path: '/status', pageId: 'status' },
  { path: '/privacy', pageId: 'privacy' },
  { path: '/terms', pageId: 'terms' },
  { path: '/cookies', pageId: 'cookies' },
];

interface IndexedPage extends SitePage {
  /** title + description + keywords + path, lowercased once. */
  haystack: string;
}

function indexPages(language: Language): IndexedPage[] {
  return PAGES.map(({ path, pageId }) => {
    const seo = getPageSEO(pageId, language);
    const title = seo.title.replace(BRAND_SUFFIX, '').trim();
    return {
      path,
      title,
      description: seo.description,
      haystack: `${title} ${seo.description} ${seo.keywords} ${path}`.toLowerCase(),
    };
  });
}

const strip = ({ path, title, description }: IndexedPage): SitePage => ({ path, title, description });

/** Every indexed page, in declared order. */
export function sitePages(language: Language = 'no'): SitePage[] {
  return indexPages(language).map(strip);
}

const WORD = /[\p{L}\p{N}]{2,}/gu;

/** True when `needle` is its own word in `haystack`, not only a compound part. */
function hasWholeWord(haystack: string, needle: string): boolean {
  if (/\s/.test(needle)) return haystack.includes(needle);
  return (haystack.match(WORD) ?? []).includes(needle);
}

/**
 * Pages matching `query`, title matches first, then whole-word haystack
 * matches ahead of compound-substring hits. Declared order breaks remaining ties.
 *
 * Filter stays substring, like the article filter next to it: same query, same
 * inclusion rules, so a reader cannot get a hit in one list and silently miss
 * it in the other.
 */
export function matchSitePages(query: string, language: Language = 'no'): SitePage[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const hits = indexPages(language).filter((page) => page.haystack.includes(needle));
  // Stable sort, so pages that still tie keep the declared order above.
  return hits
    .sort((a, b) => {
      const byTitle =
        Number(b.title.toLowerCase().includes(needle)) -
        Number(a.title.toLowerCase().includes(needle));
      if (byTitle !== 0) return byTitle;
      return Number(hasWholeWord(b.haystack, needle)) - Number(hasWholeWord(a.haystack, needle));
    })
    .map(strip);
}

/** What to offer when a query matches nothing: the pages people came for. */
export function suggestedSitePages(limit = 6, language: Language = 'no'): SitePage[] {
  return sitePages(language).slice(0, limit);
}
