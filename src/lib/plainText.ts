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
 *
 * Inline code is parked (a different private-use mark from escaped stars)
 * before links and emphasis run, then restored without backticks. Markers
 * that wrap a span still match; the inner text is not interpreted.
 * `\\` is parked before `\*`, so an escaped backslash stays `\` and the
 * following star can still be emphasis. A lone `\*` stays a literal `*`.
 *
 * U+E000, U+E001 and U+E002 are stripped from the input before any placeholder
 * is inserted. Text that already contains those private-use marks cannot
 * collide with parked stars, code spans or backslashes.
 */
const TRIPLE_STAR = /(^|[^\w])\*\*\*(?=\S)([\s\S]*?\S)\*\*\*/g;
const DOUBLE_STAR = /(^|[^\w])\*\*(?=\S)([\s\S]*?\S)\*\*/g;
const SINGLE_STAR = /(^|[^\w])\*(?=\S)([\s\S]*?\S)\*/g;
const UNDERSCORE_EMPHASIS = /(^|[^\w])(_{1,3})(?=\S)([\s\S]*?\S)\2(?!\w)/g;
const CODE_SPAN = /`([^`]+)`/g;
const LINK_OR_IMAGE = /!?\[([^\]]*)\]\([^)]*\)/g;
const ESCAPED_BACKSLASH = /\\\\/g;
const ESCAPED_STAR = /\\\*/g;
const PARKED_STAR = /\uE000\d+\uE000/g;
const PARKED_CODE = /\uE001(\d+)\uE001/g;
const PARKED_BACKSLASH = /\uE002\d+\uE002/g;
const PUA_MARKS = /[\uE000\uE001\uE002]/g;

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

function park(text: string, pattern: RegExp, mark: string): string {
  let count = 0;
  return text.replace(pattern, () => `${mark}${count++}${mark}`);
}

export function markdownToPlainText(markdown: string): string {
  const source = markdown.replace(PUA_MARKS, '');
  const code: string[] = [];
  const parkedCode = source.replace(CODE_SPAN, (_match, inner: string) => {
    code.push(inner);
    return `\uE001${code.length - 1}\uE001`;
  });
  const parked = park(park(parkedCode, ESCAPED_BACKSLASH, '\uE002'), ESCAPED_STAR, '\uE000');

  return stripInlineEmphasis(parked.replace(LINK_OR_IMAGE, '$1'))
    .replace(PARKED_STAR, '*')
    .replace(PARKED_BACKSLASH, '\\')
    .replace(PARKED_CODE, (_match, index: string) => code[Number(index)] ?? '')
    .trim();
}
