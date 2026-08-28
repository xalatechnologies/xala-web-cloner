/**
 * Visible H1 on STATIC_ROUTES first HTML, when that sentence is not the
 * SEO document title.
 *
 * Shared by the no-JS prerender and the React page on purpose. Deriving the
 * H1 from `title.split(" | ")[0]` is how first HTML said one sentence and
 * hydrate swapped it for another (XWEB-188 on /blogg, XWEB-195 on /tjenester).
 */
export const SERVICES_PAGE_HEADING = 'Saksbehandlingssystem og fagsystem som skal stå i mange år';

/**
 * First-HTML H1 for a marketing route.
 *
 * `/tjenester` keeps the designed heading; document `<title>` stays the SEO
 * string from getPageSEO("services"). Every other static route still uses the
 * title prefix, which already matches the hydrated H1 (/produkter, /priser).
 * `/blogg` is not a STATIC_ROUTES entry — it uses BLOG_LISTING_HEADING.
 */
export function staticRouteVisibleHeading(path: string, seoTitle: string): string {
  if (path === '/tjenester') return SERVICES_PAGE_HEADING;
  return seoTitle.split(' | ')[0];
}
