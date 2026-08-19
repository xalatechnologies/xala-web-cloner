/**
 * Listing page number from the URL.
 *
 * Pagination writes `page`. `side` is accepted on the way in so a Norwegian
 * deep link still opens the same slice. Prefer `page` when both are present.
 */
export function listingPageNumber(searchParams: Pick<URLSearchParams, "get">): number {
  const raw = searchParams.get("page") ?? searchParams.get("side");
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
