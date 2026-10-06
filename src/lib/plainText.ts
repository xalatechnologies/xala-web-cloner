/**
 * Strip inline markdown to plain text for JSON-LD and other non-rendered fields.
 *
 * Visible FAQ copy keeps its markdown so links stay clickable; schema.org
 * `acceptedAnswer.text` and question names must not carry `[label](url)` syntax.
 *
 * Stars strip longest-first (`***`, then `**`, then `*`). A word character
 * may follow the closer, so `**Xala**s` becomes `Xalas`. The opener still
 * requires start-of-text or a non-word character, so `2*3*4` stays.
 * Underscores keep both guards (`snake_case_name`). No lookbehind — Safari
 * before 16.4.
 * Inline code loses its backticks only. An escaped `\*` stays a literal `*`.
 */
const TRIPLE_STAR = /(^|[^\w])\*\*\*(?=\S)([\s\S]*?\S)\*\*\*/g;
const DOUBLE_STAR = /(^|[^\w])\*\*(?=\S)([\s\S]*?\S)\*\*/g;
const SINGLE_STAR = /(^|[^\w])\*(?=\S)([\s\S]*?\S)\*/g;
const UNDERSCORE_EMPHASIS = /(^|[^\w])(_{1,3})(?=\S)([\s\S]*?\S)\2(?!\w)/g;
const CODE_SPAN = /`([^`]+)`/g;
const LINK_OR_IMAGE = /!?\[([^\]]*)\]\([^)]*\)/g;
const ESCAPED_STAR = /\\\*/g;
const PARKED_STAR = /\uE000\d+\uE000/g;

function stripInlineEmphasis(text: string): string {
  let prev = text;
  for (let pass = 0; pass < 3; pass++) {
    const next = prev
      .replace(TRIPLE_STAR, '$1$2')
      .replace(DOUBLE_STAR, '$1$2')
      .replace(SINGLE_STAR, '$1$2')
      .replace(UNDERSCORE_EMPHASIS, '$1$3');
    if (next === prev) break;
    prev = next;
  }
  return prev;
}

/** Hide `\*` so it cannot open or close emphasis, then put `*` back. */
function withLiteralStars(text: string): string {
  let count = 0;
  const parked = text.replace(ESCAPED_STAR, () => `\uE000${count++}\uE000`);
  return stripInlineEmphasis(parked.replace(LINK_OR_IMAGE, '$1')).replace(PARKED_STAR, '*');
}

export function markdownToPlainText(markdown: string): string {
  const parts: string[] = [];
  const codeSpan = new RegExp(CODE_SPAN.source, 'g');
  let last = 0;

  for (let match = codeSpan.exec(markdown); match; match = codeSpan.exec(markdown)) {
    parts.push(withLiteralStars(markdown.slice(last, match.index)));
    parts.push(match[1]);
    last = match.index + match[0].length;
  }
  parts.push(withLiteralStars(markdown.slice(last)));
  return parts.join('').trim();
}
