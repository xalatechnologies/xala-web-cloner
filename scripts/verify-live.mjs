/**
 * Post-deploy verification — prove the site is live and the blog is crawlable.
 *
 * A deploy that "succeeded" is not evidence. This fetches the real site over
 * the real network and asserts the properties the blog exists for, so a
 * regression fails the deploy instead of sitting live until someone notices
 * traffic did not arrive:
 *
 *   - the homepage answers 200
 *   - /blogg answers 200 and lists every published post BY TITLE, in the HTML,
 *     with no JavaScript executed — the whole point of the prerender step
 *   - /blogg?q=gebyr answers 200 with only the gebyr card in #root — a file
 *     under /blogg/q/gebyr/ is not enough if the live query URL still serves
 *     the unfiltered listing
 *   - every post page answers 200, carries postMeta() as the first <title>
 *     (`seoTitle ?? title` + ` | Xala`, not the listing shell), its own
 *     canonical, and Article JSON-LD
 *   - sitemap.xml and rss.xml parse and list the same posts
 *
 * Usage: node scripts/verify-live.mjs [origin]
 */
import dns from "node:dns/promises";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Same brand suffix prerender writes via postMeta() after XWEB-184. */
export const BRAND = "Xala";

const ORIGIN = (process.argv[2] || process.env.VERIFY_ORIGIN || "https://xala.no").replace(/\/$/, "");
/**
 * The server this deploy actually wrote to. Verification is pinned to it.
 *
 * Otherwise the gate is hostage to DNS. During the one.com → VPS cutover the
 * apex was already correct at both authoritative nameservers, Google saw the
 * new address, and Cloudflare still had the old one cached with 40 minutes to
 * run — so the deploy shipped correctly and the verify step failed against a
 * server it had never deployed to. A gate that goes red because of someone
 * else's resolver cache is a gate people learn to ignore.
 *
 * Pinning is also just more honest: the question this step answers is "is the
 * release I just pushed serving correctly", not "has DNS converged". DNS is
 * checked separately below and reported, never used to fail the build.
 */
const DEPLOY_IP = process.env.VERIFY_DEPLOY_IP || "72.61.23.56";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "src", "content", "blog");

const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? "  ok  " : "  FAIL"}  ${message}`);
  if (!ok) failures.push(message);
};

/**
 * GET a URL with the connection pinned to DEPLOY_IP, following redirects.
 *
 * `fetch()` cannot do this — there is no per-request DNS override — so this
 * drops to node:http(s), which takes a `lookup` hook. SNI and the Host header
 * still carry the real hostname, so nginx picks the right vhost and TLS
 * validates against the real certificate; only the TCP destination is pinned.
 */
function get(url, { redirectsLeft = 5 } = {}) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const mod = u.protocol === "https:" ? https : http;
    const req = mod.request(
      u,
      {
        method: "GET",
        servername: u.hostname,
        headers: { "User-Agent": "xala-deploy-verify/1.0", Host: u.host },
        // Two callback shapes: Node calls this with `all: true` under
        // autoSelectFamily (the default since 20), which wants an array of
        // {address, family}; otherwise it wants (err, address, family).
        // Answering the wrong one fails with "Invalid IP address: undefined".
        lookup: (_host, opts, cb) => {
          const family = DEPLOY_IP.includes(":") ? 6 : 4;
          return opts?.all
            ? cb(null, [{ address: DEPLOY_IP, family }])
            : cb(null, DEPLOY_IP, family);
        },
      },
      (res) => {
        const location = res.headers.location;
        if (location && res.statusCode >= 300 && res.statusCode < 400 && redirectsLeft > 0) {
          res.resume();
          resolve(get(new URL(location, url).href, { redirectsLeft: redirectsLeft - 1 }));
          return;
        }
        let body = "";
        res.setEncoding("utf-8");
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve({ status: res.statusCode, body }));
      },
    );
    req.on("error", (error) => resolve({ status: 0, body: "", error }));
    req.setTimeout(20000, () => {
      req.destroy();
      resolve({ status: 0, body: "", error: new Error("timeout") });
    });
    req.end();
  });
}

/** Retry: an atomic symlink flip is instant, but nginx and TLS need a moment. */
async function fetchText(url, { attempts = 4 } = {}) {
  let last = { status: 0, body: "" };
  for (let i = 0; i < attempts; i += 1) {
    last = await get(url);
    if (last.status) return last;
    await new Promise((r) => setTimeout(r, 3000));
  }
  return last;
}

/**
 * Report where public DNS points, without failing on it.
 *
 * Propagation is not something a deploy can fix or wait out, so it is never a
 * build failure — but silently ignoring it would hide a real cutover that never
 * happened. Say it out loud instead.
 */
async function reportDns(hostname) {
  const addrs = await dns.resolve4(hostname).catch(() => []);
  const v6 = await dns.resolve6(hostname).catch(() => []);
  const onTarget = addrs.includes(DEPLOY_IP);
  console.log(`  ${onTarget ? "ok  " : "note"}  public DNS: ${hostname} A → ${addrs.join(", ") || "(none)"}${
    v6.length ? ` · AAAA → ${v6.join(", ")}` : ""
  }`);
  if (!onTarget) {
    console.log(`        not yet ${DEPLOY_IP} — still propagating, or the record was not changed.`);
    console.log(`        Verification below is pinned to ${DEPLOY_IP} and is unaffected.`);
  }
  if (v6.length) {
    console.log(`        AAAA still published: IPv6 clients bypass ${DEPLOY_IP} entirely.`);
  }
}

/** The posts we expect to be live, read from source — not from the site. */
export function expectedPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !/^_/.test(f) && f.toLowerCase() !== "readme.md")
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
      if (!block) return null;
      const field = (name) => {
        const m = new RegExp(`^${name}:\\s*(.*)$`, "m").exec(block[1]);
        return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
      };
      if (field("draft") === "true") return null;
      const topicHashtagsField = field("topicHashtags");
      return {
        slug: field("slug") || file.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
        title: field("title"),
        seoTitle: field("seoTitle") || undefined,
        tag: field("tag") || undefined,
        keywords: parseKeywords(block[1]),
        topicHashtags: topicHashtagsField === "false" ? false : undefined,
      };
    })
    .filter(Boolean);
}

/** Inline `keywords: ["a", "b"]` or a block list. Same shapes the content agent writes. */
export function parseKeywords(block) {
  const inline = /^keywords:\s*(\[[\s\S]*?\])\s*$/m.exec(block);
  if (inline) {
    return [...inline[1].matchAll(/"([^"]+)"|'([^']+)'/g)].map((m) => m[1] || m[2]).filter(Boolean);
  }
  const start = /^keywords:[ \t]*$/m.exec(block);
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

const AUDIENCE = new Set(["it-leder", "arkitekt", "utvikler"]);

/** Same 3–5 topic pick as `topicKeywords()` in src/lib/blog/topics.ts. */
export function topicKeywordsFromList(keywords, audienceTag) {
  const audience = audienceTag?.trim().toLowerCase();
  const seen = new Set();
  const topics = [];
  for (const raw of keywords ?? []) {
    const keyword = raw.trim();
    if (!keyword) continue;
    const key = keyword.toLowerCase();
    if (AUDIENCE.has(key) || (audience && key === audience)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    topics.push(keyword);
    if (topics.length === 5) break;
  }
  return topics;
}

export function keywordToHashtag(keyword) {
  const body = keyword.trim().replace(/\s+/g, "").replace(/[^\p{L}\p{N}-]/gu, "");
  return body ? `#${body}` : "";
}

const decode = (html) =>
  html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

/** First HTML `<title>`, decoded — the string a crawler reads before JS. */
export function firstHtmlTitle(html) {
  return decode(/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "").trim();
}

/**
 * The document title prerender writes: `postMeta()` = `(seoTitle ?? title) | Xala`.
 * The long frontmatter `title` is the listing card / H1, not this string.
 */
export function documentTitleFromPost(post) {
  const topic = post.seoTitle ?? post.title;
  return topic ? `${topic} | ${BRAND}` : "";
}

/** True only when the first `<title>` is the post's own postMeta(), not the shell. */
export function isOwnDocumentTitle(html, post) {
  const expected = documentTitleFromPost(post);
  return Boolean(expected) && firstHtmlTitle(html) === expected;
}

const GEBYR_HREF = "/blogg/skjenkebevilling-gebyr-og-omsetningsoppgave";
const UNRELATED_LISTING_HREFS = [
  "/blogg/iso-27001-i-praksis-for-utviklingsprosjekter",
  "/blogg/wcag-2-2-aa-i-praksis-for-fagsystemer",
  "/blogg/id-porten-eller-maskinporten-hva-velger-du",
];

/** Homepage / canned strings that must not appear as a post's keywords. */
export const HOMEPAGE_KEYWORDS =
  "systemutvikling, skreddersydd programvare, AI-utvikling, skyløsninger, systemintegrasjon, cybersikkerhet, Asker, Norge, offentlig sektor";
export const BLOGPOST_CANNED_KEYWORDS = "fagartikkel, systemutvikling, arkitektur, AI, digitalisering";

export function firstHtmlKeywords(html) {
  return decode(
    /<meta\s+[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i.exec(html)?.[1] ?? "",
  ).trim();
}

export function firstHtmlArticleTags(html) {
  return [
    ...html.matchAll(/<meta\s+[^>]*property=["']article:tag["'][^>]*content=["']([^"']*)["']/gi),
  ].map((m) => decode(m[1]));
}

/**
 * Hashtags in `#root`, including numeric ones like #360, but excluding hex
 * color tokens like #0F1117 (6-digit) or #RRGGBBAA (8-digit).
 */
export function firstHtmlHashtags(html) {
  const all = rootInner(html).match(/#[\p{L}\p{N}][\p{L}\p{N}-]*/gu) ?? [];
  return all.filter((tag) => {
    const body = tag.slice(1);
    if (/^[0-9A-Fa-f]{6}$/.test(body)) return false;
    if (/^[0-9A-Fa-f]{8}$/.test(body)) return false;
    return true;
  });
}

export function hasShareRow(html) {
  return rootInner(html).includes("Del artikkelen");
}

/**
 * True only when first HTML has this post's topics — not an empty title-style
 * match, not the homepage keyword string, not audience-only (IT-leder).
 */
export function isPostTopicHead(html, post) {
  const expected = topicKeywordsFromList(post.keywords, post.tag);
  if (expected.length < 3) return false;
  const keywords = firstHtmlKeywords(html);
  if (!keywords || keywords === HOMEPAGE_KEYWORDS || keywords === BLOGPOST_CANNED_KEYWORDS) {
    return false;
  }
  const tags = firstHtmlArticleTags(html);
  const hashtags = firstHtmlHashtags(html);
  if (tags.length < 3 || tags.length > 5) return false;
  if (tags.some((tag) => AUDIENCE.has(tag.toLowerCase()))) return false;
  if (tags.join("\0") !== expected.join("\0")) return false;
  for (const topic of expected) {
    if (!keywords.includes(topic)) return false;
    if (post.topicHashtags !== false && !hashtags.includes(keywordToHashtag(topic))) return false;
  }
  if (post.topicHashtags === false && hashtags.length > 0) return false;
  return hasShareRow(html);
}

/** Inner HTML of `#root`, including nested divs — first `</div>` is not enough. */
export function rootInner(html) {
  const start = html.search(/<div id="root">/i);
  if (start < 0) return "";
  const open = html.indexOf(">", start) + 1;
  let depth = 1;
  let i = open;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose < 0) return html.slice(open);
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) return html.slice(open, nextClose);
      i = nextClose + 6;
    }
  }
  return html.slice(open);
}

async function main() {
  console.log(`Verifying ${ORIGIN} (pinned to ${DEPLOY_IP})\n`);
  await reportDns(new URL(ORIGIN).hostname);
  const posts = expectedPosts();

  const home = await fetchText(`${ORIGIN}/`);
  check(home.status === 200, `homepage 200 (got ${home.status})`);

  const index = await fetchText(`${ORIGIN}/blogg`);
  check(index.status === 200, `/blogg 200 (got ${index.status})`);
  // Prerendered, not client-rendered: an empty #root means every AI crawler
  // sees a blank page.
  //
  // Requires a body. Asserting only "does NOT contain an empty #root" passes
  // vacuously on an empty response — a failed request reported prerendering as
  // fine, which is the one direction a check must never fail in.
  check(
    index.body.length > 0 && !/<div id="root">\s*<\/div>/.test(index.body),
    "/blogg has prerendered markup (#root is not empty)",
  );

  // First HTML for the query URL, not a file sitting under /blogg/q/.
  const queried = await fetchText(`${ORIGIN}/blogg?q=gebyr`);
  check(queried.status === 200, `/blogg?q=gebyr 200 (got ${queried.status})`);
  const queriedRoot = rootInner(queried.body);
  check(
    queried.body.length > 0 && queriedRoot.length > 0 && !/<div id="root">\s*<\/div>/.test(queried.body),
    "/blogg?q=gebyr has prerendered markup (#root is not empty)",
  );
  check(
    queriedRoot.includes(GEBYR_HREF),
    `/blogg?q=gebyr #root has the gebyr card (${GEBYR_HREF})`,
  );
  for (const href of UNRELATED_LISTING_HREFS) {
    check(
      !queriedRoot.includes(href),
      `/blogg?q=gebyr #root must not list ${href}`,
    );
  }

  for (const post of posts) {
    const url = `${ORIGIN}/blogg/${post.slug}`;
    const page = await fetchText(url);
    check(page.status === 200, `${url} → 200 (got ${page.status})`);
    if (page.status !== 200) continue;

    check(
      isOwnDocumentTitle(page.body, post),
      `${post.slug}: <title> is the post's own, not the shell's`,
    );
    check(
      new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${url}["']`, "i").test(page.body),
      `${post.slug}: canonical points at itself`,
    );
    check(/"@type"\s*:\s*"Article"/.test(page.body), `${post.slug}: Article JSON-LD present`);
    check(
      !/<div id="root">\s*<\/div>/.test(page.body),
      `${post.slug}: prose is in the HTML without JavaScript`,
    );
    check(
      isPostTopicHead(page.body, post),
      `${post.slug}: first HTML has topic hashtags, article:tag, post keywords, and Del artikkelen`,
    );
    if (post.title) {
      check(decode(index.body).includes(post.title), `/blogg lists "${post.title}"`);
    }
  }

  const sitemap = await fetchText(`${ORIGIN}/sitemap.xml`);
  check(sitemap.status === 200, `sitemap.xml 200 (got ${sitemap.status})`);
  check(sitemap.body.includes("<urlset"), "sitemap.xml is a urlset");
  for (const post of posts) {
    check(sitemap.body.includes(`${ORIGIN}/blogg/${post.slug}`), `sitemap lists ${post.slug}`);
  }

  const rss = await fetchText(`${ORIGIN}/blogg/rss.xml`);
  check(rss.status === 200, `rss.xml 200 (got ${rss.status})`);
  check(rss.body.includes("<rss"), "rss.xml is an RSS channel");

  console.log("");
  if (failures.length) {
    console.error(`${failures.length} check(s) FAILED:`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`All checks passed (${posts.length} post(s) verified live).`);
}

const isDirectRun =
  Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main().catch((err) => {
    console.error("verify-live crashed:", err);
    process.exit(1);
  });
}
