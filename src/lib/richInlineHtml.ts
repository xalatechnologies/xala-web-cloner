/** Escape text nodes in static prerender HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Turn approved markdown links into anchors; everything else is escaped. */
export function richInlineHtml(text: string): string {
  const parts: string[] = [];
  let last = 0;
  const pattern = new RegExp(MARKDOWN_LINK.source, "g");
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(escapeHtml(text.slice(last, start)));
    const label = escapeHtml(match[1]);
    const href = escapeHtml(match[2]);
    const external = match[2].startsWith("http");
    parts.push(
      `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`,
    );
    last = start + match[0].length;
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
