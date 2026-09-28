import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type HeadingRenderer = (props: { children?: ReactNode }) => JSX.Element;

interface ArticleMarkdownProps {
  markdown: string;
  className?: string;
  heading: (tag: 'h2' | 'h3') => HeadingRenderer;
}

type MarkdownNodeProps = { node?: unknown };

function ArticleTable({
  children,
  node: _node,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement> & MarkdownNodeProps) {
  return (
    <div className="article-table my-8 w-full min-w-0 not-prose">
      <p className="mb-2 text-xs text-muted-foreground md:hidden" aria-hidden="true">
        Sveip for å se hele tabellen →
      </p>
      <div className="overflow-x-auto rounded-xl border border-border shadow-sm [-webkit-overflow-scrolling:touch]">
        <table {...props} className="w-full min-w-[36rem] border-collapse text-sm">
          {children}
        </table>
      </div>
    </div>
  );
}

function ArticleTh({
  children,
  node: _node,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & MarkdownNodeProps) {
  return (
    <th
      {...props}
      className="border-b border-border bg-muted/50 px-3 py-2.5 text-left align-top text-xs font-semibold uppercase tracking-wide text-foreground sm:text-sm sm:normal-case sm:tracking-normal"
    >
      {children}
    </th>
  );
}

function ArticleTd({
  children,
  node: _node,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & MarkdownNodeProps) {
  return (
    <td
      {...props}
      className="border-b border-border px-3 py-2.5 align-top text-foreground [overflow-wrap:anywhere]"
    >
      {children}
    </td>
  );
}

/** Shared by SPA and prerender so tables render the same in first HTML. */
export const articleMarkdownComponents = {
  table: ArticleTable,
  th: ArticleTh,
  td: ArticleTd,
};

/**
 * One markdown renderer for the article column — the lead and the rest of
 * the body share heading anchors so the TOC still lands on Kort svar after
 * it has been lifted above the cover.
 */
export default function ArticleMarkdown({ markdown, className, heading }: ArticleMarkdownProps) {
  if (!markdown) return null;

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: heading('h2'),
          h3: heading('h3'),
          ...articleMarkdownComponents,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
