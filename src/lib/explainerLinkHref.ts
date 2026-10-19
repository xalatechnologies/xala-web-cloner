/**
 * The service-page explainer section is new, hand-written copy — not a
 * markdown body someone already reviewed line by line. Keeping its one
 * allowed link type to internal `/blogg/` posts (rather than reusing the
 * broader `isAllowedHref`) means a stray external or `/tjenester/` URL in a
 * future edit silently drops to plain text instead of becoming a link.
 *
 * An exact match against a lower-case slug, not a prefix check — a bare
 * `startsWith("/blogg/")` also lets through `/blogg/../kontakt`,
 * `/blogg//evil`, encoded traversal such as `/blogg/%2e%2e/x`, and anything
 * with a query string or hash. No `.trim()`: a href with leading or
 * trailing whitespace is not a path this site generates and should not pass.
 *
 * Deliberately does not check the slug against the published post list.
 * `isExplainerLinkHref` runs in the browser bundle (via `ExplainerInline`),
 * and the only post list available there is `allPosts()` from
 * `@/lib/blog`, which inlines every post's raw markdown through
 * `import.meta.glob(..., { eager: true })`. Importing that here would pull
 * all posts into this tiny check's chunk for no gain: an explainer string
 * pointing at a slug that does not exist is a content bug the prerender's
 * identical check and a manual read already catch, not a security concern.
 */
export function isExplainerLinkHref(href: string): boolean {
  return /^\/blogg\/[a-z0-9-]+$/.test(href);
}
