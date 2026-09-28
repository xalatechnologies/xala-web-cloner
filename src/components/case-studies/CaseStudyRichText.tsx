import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { isAllowedHref, isExternalHref } from '@/lib/markdownLinkHref';
import { parseMarkdownLinks } from '@/lib/markdownLinks';

function InlineLinks({ text }: { text: string }) {
  const links = parseMarkdownLinks(text);
  if (!links.length) return <>{text}</>;

  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const link of links) {
    if (link.start > last) nodes.push(text.slice(last, link.start));
    const label = link.label;
    const href = link.href.trim();
    const key = `${href}-${index++}`;
    if (!isAllowedHref(href)) {
      nodes.push(label);
    } else if (href.startsWith('/') || href.startsWith('#')) {
      nodes.push(
        <Link key={key} to={href} className="underline underline-offset-4 hover:text-primary">
          {label}
        </Link>
      );
    } else if (isExternalHref(href)) {
      nodes.push(
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-primary"
        >
          {label}
        </a>
      );
    } else {
      nodes.push(
        <a key={key} href={href} className="underline underline-offset-4 hover:text-primary">
          {label}
        </a>
      );
    }
    last = link.end;
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
