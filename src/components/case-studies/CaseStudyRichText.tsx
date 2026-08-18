import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function InlineLinks({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  const pattern = new RegExp(MARKDOWN_LINK.source, 'g');
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const label = match[1];
    const href = match[2];
    const key = `${href}-${index++}`;
    if (href.startsWith('/')) {
      nodes.push(
        <Link key={key} to={href} className="underline underline-offset-4 hover:text-primary">
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a key={key} href={href} className="underline underline-offset-4 hover:text-primary">
          {label}
        </a>
      );
    }
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

/** Paragraphs of approved case copy, with markdown links kept clickable. */
export function CaseStudyRichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={className}>
          <InlineLinks text={paragraph} />
        </p>
      ))}
    </>
  );
}

export function CaseStudyRichInline({ text }: { text: string }) {
  return (
    <Fragment>
      <InlineLinks text={text} />
    </Fragment>
  );
}
