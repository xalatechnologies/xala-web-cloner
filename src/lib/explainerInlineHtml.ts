import { escapeHtml } from "@/lib/escapeHtml";
import { isExplainerLinkHref } from "@/lib/explainerLinkHref";
import { parseMarkdownLinks } from "@/lib/markdownLinks";

export { escapeHtml };

/**
 * Turn `[label](/blogg/...)` into an anchor; any other link, including a
 * plain `/tjenester/` path or an external URL, is rendered as its label with
 * no `<a>`. Used for the prerendered HTML of the service-page explainer
 * section and capability bodies, so first paint and the SPA show identical
 * markup for the same source string.
 */
export function explainerInlineHtml(text: string): string {
  const links = parseMarkdownLinks(text);
  if (!links.length) return escapeHtml(text);

  const parts: string[] = [];
  let last = 0;
  for (const link of links) {
    if (link.start > last) parts.push(escapeHtml(text.slice(last, link.start)));
    const label = escapeHtml(link.label);
    if (isExplainerLinkHref(link.href)) {
      const href = escapeHtml(link.href);
      parts.push(`<a href="${href}">${label}</a>`);
    } else {
      parts.push(label);
    }
    last = link.end;
  }
  if (last < text.length) parts.push(escapeHtml(text.slice(last)));
  return parts.join("");
}
