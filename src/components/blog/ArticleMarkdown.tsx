import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type HeadingRenderer = (props: { children?: ReactNode }) => JSX.Element;

interface ArticleMarkdownProps {
  markdown: string;
  className?: string;
  heading: (tag: 'h2' | 'h3') => HeadingRenderer;
}

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
        components={{ h2: heading('h2'), h3: heading('h3') }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
