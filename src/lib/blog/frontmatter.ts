/**
 * A frontmatter parser for exactly the YAML the content agent writes.
 *
 * Not a YAML library, and deliberately not one. The agent emits a flat block of
 * `key: value` pairs where values are quoted strings, bare scalars, or inline
 * arrays — no nesting, no anchors, no multi-line scalars. Pulling in a full YAML
 * parser to read that would add a dependency (and a parser surface) for
 * features nothing produces.
 *
 * What matters is the failure mode: a malformed block returns `null` and the
 * caller reports the file, rather than throwing mid-render and taking the whole
 * blog index down with it.
 */

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export interface FrontmatterResult {
  data: Record<string, unknown>;
  body: string;
}

/** Strip surrounding quotes and unescape the pairs YAML uses inside them. */
function unquote(raw: string): string {
  const trimmed = raw.trim();
  const quote = trimmed[0];
  if ((quote === '"' || quote === "'") && trimmed.endsWith(quote) && trimmed.length > 1) {
    const inner = trimmed.slice(1, -1);
    return quote === '"' ? inner.replace(/\\"/g, '"').replace(/\\\\/g, "\\") : inner.replace(/''/g, "'");
  }
  return trimmed;
}

/** `[a, "b c", 'd']` → `["a", "b c", "d"]`, respecting quoted commas. */
function parseInlineArray(raw: string): string[] {
  const inner = raw.trim().slice(1, -1);
  const items: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (const ch of inner) {
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === ",") {
      items.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  items.push(current.trim());
  return items.filter(Boolean);
}

function parseScalar(raw: string): unknown {
  const trimmed = raw.trim();
  if (trimmed === "") return "";
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return parseInlineArray(trimmed);
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null" || trimmed === "~") return null;
  // Quoted first: a quoted "2026" is a string the author meant as a string,
  // and a date like 2026-07-25 must never become the number 2026 minus 7.
  const quoted = trimmed[0] === '"' || trimmed[0] === "'";
  if (quoted) return unquote(trimmed);
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

/**
 * Split a markdown file into its frontmatter data and its body.
 *
 * Returns `null` when there is no frontmatter block at all — which is a
 * rejection reason, not a crash.
 */
export function parseFrontmatter(raw: string): FrontmatterResult | null {
  const source = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
  const match = FRONTMATTER.exec(source);
  if (!match) return null;

  const data: Record<string, unknown> = {};
  const lines = match[1].split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const kv = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    const [, key, rest] = kv;

    // Block list:
    //   keywords:
    //     - one
    //     - two
    if (rest.trim() === "") {
      const items: string[] = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        items.push(unquote(lines[i + 1].replace(/^\s*-\s+/, "")));
        i += 1;
      }
      data[key] = items.length ? items : "";
      continue;
    }

    data[key] = parseScalar(rest);
  }

  return { data, body: source.slice(match[0].length) };
}
