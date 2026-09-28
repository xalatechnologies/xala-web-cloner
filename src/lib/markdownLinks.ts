export interface MarkdownLink {
  start: number;
  end: number;
  label: string;
  href: string;
}

/** Scan [label](href) segments, including href values that contain parentheses. */
export function parseMarkdownLinks(text: string): MarkdownLink[] {
  const links: MarkdownLink[] = [];
  let index = 0;

  while (index < text.length) {
    const open = text.indexOf("[", index);
    if (open === -1) break;

    const closeLabel = text.indexOf("]", open + 1);
    if (closeLabel === -1 || text[closeLabel + 1] !== "(") {
      index = open + 1;
      continue;
    }

    let depth = 1;
    let cursor = closeLabel + 2;
    while (cursor < text.length && depth > 0) {
      if (text[cursor] === "(") depth += 1;
      else if (text[cursor] === ")") depth -= 1;
      cursor += 1;
    }

    if (depth !== 0) {
      index = open + 1;
      continue;
    }

    links.push({
      start: open,
      end: cursor,
      label: text.slice(open + 1, closeLabel),
      href: text.slice(closeLabel + 2, cursor - 1),
    });
    index = cursor;
  }

  return links;
}
