import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { isExplainerLinkHref } from "@/lib/explainerLinkHref";
import { parseMarkdownLinks } from "@/lib/markdownLinks";

/**
 * Service-page explainer prose: only an internal `/blogg/` link becomes a
 * `<Link>`. Any other `[label](href)` — a `/tjenester/` path, an external
 * URL — renders as its plain label, same as `explainerInlineHtml` on the
 * prerendered page.
 */
export function ExplainerInline({ text }: { text: string }) {
  const links = parseMarkdownLinks(text);
  if (!links.length) return <Fragment>{text}</Fragment>;

  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const link of links) {
    if (link.start > last) nodes.push(text.slice(last, link.start));
    const href = link.href.trim();
    const key = `${href}-${index++}`;
    if (isExplainerLinkHref(href)) {
      nodes.push(
        <Link key={key} to={href} className="underline underline-offset-4 hover:text-primary">
          {link.label}
        </Link>,
      );
    } else {
      nodes.push(link.label);
    }
    last = link.end;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <Fragment>{nodes}</Fragment>;
}
