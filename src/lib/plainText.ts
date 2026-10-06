/**
 * Strip inline markdown to plain text for JSON-LD and other non-rendered fields.
 *
 * Visible FAQ copy keeps its markdown so links stay clickable; schema.org
 * `acceptedAnswer.text` and question names must not carry `[label](url)` syntax.
 */
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_]{1,3}/g, '')
    .trim();
}

/** @deprecated Prefer markdownToPlainText — kept for callers that only need links. */
export function stripMarkdownLinks(text: string): string {
  return markdownToPlainText(text);
}
