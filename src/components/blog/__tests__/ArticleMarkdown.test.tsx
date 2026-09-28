import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { describe, expect, it } from 'vitest';

import { articleMarkdownComponents } from '../ArticleMarkdown';

const TABLE_MARKDOWN = `## Table

| Spør om | Godt svar | Varseltegn |
|---|---|---|
| Én sak hele veien | En ekte sak vises live | Bare skjermbilder |
`;

/** Same renderer the prerender script uses for article body tables. */
function renderArticleTableHtml(markdown: string): string {
  return renderToStaticMarkup(
    createElement(ReactMarkdown, { remarkPlugins: [remarkGfm], components: articleMarkdownComponents }, markdown),
  );
}

describe('articleMarkdownComponents', () => {
  it('does not leak react-markdown node props onto table elements', () => {
    const html = renderArticleTableHtml(TABLE_MARKDOWN);

    expect(html).not.toMatch(/node=/);
    expect(html).toContain('<table');
    expect(html).toContain('<th');
    expect(html).toContain('<td');
  });
});
