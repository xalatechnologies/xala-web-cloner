import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Reads the stylesheet text. jsdom does not apply src/index.css, so this does
 * not prove a 320px layout or a computed min-width. It only proves the three
 * rules declare min-width: 0, and that the heading and lead also declare
 * overflow-wrap and hyphens.
 */
function componentRule(css: string, className: string): string {
  const match = css.match(new RegExp(`(?:^|\\n)\\s*\\.${className}\\s*\\{([^}]*)\\}`));
  expect(match, `.${className}`).not.toBeNull();
  return match![1];
}

describe('section header shrink', () => {
  const css = readFileSync(resolve(__dirname, '../index.css'), 'utf8');

  it('lets section headings, leads, and eyebrows shrink', () => {
    for (const className of ['section-heading', 'section-lead', 'eyebrow']) {
      expect(componentRule(css, className)).toMatch(/min-width:\s*0/);
    }

    for (const className of ['section-heading', 'section-lead']) {
      const body = componentRule(css, className);
      expect(body).toMatch(/overflow-wrap:\s*break-word/);
      expect(body).toMatch(/(?<!-webkit-)hyphens:\s*auto/);
      expect(body).toMatch(/-webkit-hyphens:\s*auto/);
    }
  });
});
