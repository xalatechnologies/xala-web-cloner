import { BLOG_PATH } from "@/lib/blog/seo";

/**
 * The service-page explainer section is new, hand-written copy — not a
 * markdown body someone already reviewed line by line. Keeping its one
 * allowed link type to internal `/blogg/` posts (rather than reusing the
 * broader `isAllowedHref`) means a stray external or `/tjenester/` URL in a
 * future edit silently drops to plain text instead of becoming a link.
 */
export function isExplainerLinkHref(href: string): boolean {
  return href.trim().startsWith(`${BLOG_PATH}/`);
}
