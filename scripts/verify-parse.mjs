/** Inline `field: ["a", "b"]` or a block list. Same shapes the content agent writes. */
export function parseStringList(block, field) {
  const inline = new RegExp(`^${field}:\\s*(\\[[\\s\\S]*?\\])\\s*$`, "m").exec(block);
  if (inline) {
    return [...inline[1].matchAll(/"([^"]+)"|'([^']+)'/g)].map((m) => m[1] || m[2]).filter(Boolean);
  }
  const start = new RegExp(`^${field}:[ \\t]*$`, "m").exec(block);
  if (!start) return [];
  const items = [];
  for (const line of block.slice(start.index + start[0].length).split(/\r?\n/)) {
    if (!line.trim()) continue;
    const item = /^\s+-\s+(.+)$/.exec(line);
    if (!item) break;
    items.push(item[1].trim().replace(/^["']|["']$/g, ""));
  }
  return items;
}

/** Inline `keywords: ["a", "b"]` or a block list. Same shapes the content agent writes. */
export function parseKeywords(block) {
  return parseStringList(block, "keywords");
}

/** Inline `hashtags: ["a"]` or a block list. */
export function parseHashtags(block) {
  return parseStringList(block, "hashtags");
}
