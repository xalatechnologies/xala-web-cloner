/**
 * Turn a markdown link into the visible label so JSON-LD answers match
 * the words on the page, not the source markup.
 */
export function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}
