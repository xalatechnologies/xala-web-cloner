const ALLOWED_SCHEME = /^(https:|http:|mailto:|tel:)/i;

/** True when a markdown link target is safe to render as an anchor. */
export function isAllowedHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return true;
  return ALLOWED_SCHEME.test(trimmed);
}

/** External links open in a new tab — http(s) only. */
export function isExternalHref(href: string): boolean {
  const lower = href.trim().toLowerCase();
  return lower.startsWith("https:") || lower.startsWith("http:");
}
