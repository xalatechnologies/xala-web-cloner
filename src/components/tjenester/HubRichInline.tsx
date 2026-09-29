import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { isAllowedHref, isExternalHref } from "@/lib/markdownLinkHref";
import { parseMarkdownLinks } from "@/lib/markdownLinks";

/** Hub prose links — bare Link / <a>, matching main before CaseStudyRichInline. */
export function HubRichInline({ text }: { text: string }) {
  const links = parseMarkdownLinks(text);
  if (!links.length) return <Fragment>{text}</Fragment>;

  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const link of links) {
    if (link.start > last) nodes.push(text.slice(last, link.start));
    const href = link.href.trim();
    const key = `${href}-${index++}`;
    if (!isAllowedHref(href)) {
      nodes.push(link.label);
    } else if (href.startsWith("/") || href.startsWith("#")) {
      nodes.push(<Link key={key} to={href}>{link.label}</Link>);
    } else if (isExternalHref(href)) {
      nodes.push(
        <a key={key} href={href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>,
      );
    } else {
      nodes.push(<a key={key} href={href}>{link.label}</a>);
    }
    last = link.end;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <Fragment>{nodes}</Fragment>;
}
