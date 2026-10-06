/**
 * Strip inline markdown to plain text for JSON-LD and other non-rendered fields.
 *
 * Visible FAQ copy keeps its markdown so links stay clickable; schema.org
 * `acceptedAnswer.text` and question names must not carry `[label](url)` syntax.
 */
const STAR_EMPHASIS = /(^|[^\w])(\*{1,3})(?=\S)([\s\S]*?\S)\2(?!\w)/g;
const UNDERSCORE_EMPHASIS = /(^|[^\w])(_{1,3})(?=\S)([\s\S]*?\S)\2(?!\w)/g;

function stripInlineEmphasis(text: string): string {
  let prev = text;
  for (let pass = 0; pass < 3; pass++) {
    const next = prev
      .replace(STAR_EMPHASIS, '$1$3')
      .replace(UNDERSCORE_EMPHASIS, '$1$3');
    if (next === prev) break;
    prev = next;
  }
  return prev;
}

export function markdownToPlainText(markdown: string): string {
  return stripInlineEmphasis(
    markdown
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1'),
  ).trim();
}
