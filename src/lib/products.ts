/**
 * The product catalogue shown on /produkter and the homepage teaser.
 *
 * Detail pages and the sitemap still see every entry in products.json. The
 * listing can hide a product (`listed: false`) without deleting its page —
 * used when a card must not claim a live external site.
 */
export function catalogProducts<T extends { listed?: boolean }>(products: T[]): T[] {
  return products.filter((product) => product.listed !== false);
}
