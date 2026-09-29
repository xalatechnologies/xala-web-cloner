import { escapeHtml } from "@/lib/escapeHtml";
import { isAllowedHref, isExternalHref } from "@/lib/markdownLinkHref";
import { parseMarkdownLinks } from "@/lib/markdownLinks";

export { escapeHtml, decodeHtmlEntities } from "@/lib/escapeHtml";

/** Turn approved markdown links into anchors; everything else is escaped. */
export function richInlineHtml(text: string): string {
  const links = parseMarkdownLinks(text);
  if (!links.length) return escapeHtml(text);

  const parts: string[] = [];
  let last = 0;
  for (const link of links) {
    if (link.start > last) parts.push(escapeHtml(text.slice(last, link.start)));
    const label = escapeHtml(link.label);
    if (!isAllowedHref(link.href)) {
      parts.push(label);
    } else {
      const href = escapeHtml(link.href.trim());
      const external = isExternalHref(link.href);
      parts.push(
        `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`,
      );
    }
    last = link.end;
  }
  if (last < text.length) parts.push(escapeHtml(text.slice(last)));
  return parts.join("");
}

/** Paragraphs separated by blank lines, same shape as CaseStudyRichText. */
export function richParagraphsHtml(text: string): string {
  return text
    .split(/\n\n+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${richInlineHtml(paragraph)}</p>`)
    .join("\n");
}
