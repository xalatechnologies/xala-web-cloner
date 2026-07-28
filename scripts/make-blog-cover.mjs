/**
 * Generates a blog cover from the post's own title.
 *
 * Covers are the one asset a written-to-order post always lacks, and a post
 * without one renders a card with a hole in it. These are deliberately typographic
 * rather than illustrative: a generated illustration would be decoration that
 * says nothing, whereas the title set large on the brand's own palette at least
 * carries the subject.
 *
 *   node scripts/make-blog-cover.mjs "<slug>" "<title>" "<tag>"
 */
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const [slug, title, tag = ''] = process.argv.slice(2);
if (!slug || !title) {
  console.error('usage: make-blog-cover.mjs <slug> <title> [tag]');
  process.exit(1);
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Break the title into lines that fit, measured roughly by character width. */
function wrap(text, max = 26) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line.trim());
      line = word;
    } else {
      line = `${line} ${word}`;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.slice(0, 4);
}

const lines = wrap(title);
const start = 300 - (lines.length - 1) * 38;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#171310"/>
      <stop offset="60%" stop-color="#211b16"/>
      <stop offset="100%" stop-color="#2c211a"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#D0934E"/>
      <stop offset="100%" stop-color="#D0934E" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g opacity="0.05" stroke="#D0934E" stroke-width="1">
    ${Array.from({ length: 15 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="630"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 80}" x2="1200" y2="${i * 80}"/>`).join('')}
  </g>
  <circle cx="1080" cy="120" r="220" fill="#D0934E" opacity="0.07"/>
  <rect x="80" y="88" width="120" height="4" fill="url(#rule)"/>
  ${tag ? `<text x="80" y="140" font-family="Inter, Helvetica, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#D0934E">${escape(tag.toUpperCase())}</text>` : ''}
  ${lines
    .map(
      (l, i) =>
        `<text x="80" y="${start + i * 76}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#F7F5F3">${escape(l)}</text>`
    )
    .join('\n  ')}
  <text x="80" y="560" font-family="Inter, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="2" fill="#D0934E">XALA TECHNOLOGIES</text>
</svg>`;

const tmp = `/tmp/cover-${slug}.svg`;
writeFileSync(tmp, svg);
const out = join('public', 'images', 'blog', `${slug}.png`);
execFileSync('rsvg-convert', ['-w', '1200', '-h', '630', tmp, '-o', out]);
console.log(`cover: ${out}`);
