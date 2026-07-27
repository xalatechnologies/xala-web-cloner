import { SITE_ORIGIN } from '@/lib/blog/seo';
import type { Language, PageId } from './seoContent';

/**
 * Maps a URL path to the SEO copy and head-tag behaviour for that route.
 *
 * Kept apart from RouteSEO.tsx so the component file exports only a component
 * (react-refresh) and so these rules can be unit-tested without rendering.
 */
export interface RouteRule {
  pattern: RegExp;
  pageId: PageId;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  /** The page renders its own <Helmet>; RouteSEO must not compete with it. */
  selfManaged?: boolean;
}

export const ROUTE_RULES: RouteRule[] = [
  { pattern: /^\/$/, pageId: 'home' },
  { pattern: /^\/tjenester\/?$/, pageId: 'services' },
  { pattern: /^\/produkter\/?$/, pageId: 'products' },
  { pattern: /^\/caser\/?$/, pageId: 'cases', selfManaged: true },
  { pattern: /^\/caser\/[^/]+\/?$/, pageId: 'caseStudy', ogType: 'article', selfManaged: true },
  { pattern: /^\/slik-vi-jobber\/?$/, pageId: 'process' },
  { pattern: /^\/teknologi\/?$/, pageId: 'technology' },
  { pattern: /^\/om-oss\/?$/, pageId: 'about' },
  { pattern: /^\/kontakt\/?$/, pageId: 'contact' },
  { pattern: /^\/karriere\/?$/, pageId: 'careers' },
  { pattern: /^\/blogg\/?$/, pageId: 'blog', selfManaged: true },
  { pattern: /^\/blogg\/[^/]+\/?$/, pageId: 'blogPost', ogType: 'article', selfManaged: true },
  { pattern: /^\/privacy\/?$/, pageId: 'privacy' },
  { pattern: /^\/terms\/?$/, pageId: 'terms' },
  { pattern: /^\/cookies\/?$/, pageId: 'cookies' },
  { pattern: /^\/transparens\/?$/, pageId: 'transparens' },
];

/** Anything unmatched is the 404 page, which must never be indexed. */
export const NOT_FOUND_RULE: RouteRule = { pattern: /.*/, pageId: 'notFound', noIndex: true };

export function resolveRoute(pathname: string): RouteRule {
  return ROUTE_RULES.find((rule) => rule.pattern.test(pathname)) ?? NOT_FOUND_RULE;
}

/** i18next hands back tags like 'nb-NO' or 'en-GB'; collapse to our three. */
export function normalizeLanguage(raw: string | undefined): Language {
  const lang = raw?.toLowerCase() ?? 'no';
  if (lang.startsWith('ar')) return 'ar';
  if (lang.startsWith('en')) return 'en';
  return 'no';
}

export function canonicalFor(pathname: string): string {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return `${SITE_ORIGIN}${path === '/' ? '' : path}`;
}
