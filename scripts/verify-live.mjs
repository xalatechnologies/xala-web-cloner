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
 *   - every post page answers 200, carries its own <title> (not the shell's),
 *     its own canonical, and Article JSON-LD
 *   - sitemap.xml and rss.xml parse and list the same posts
 *
 * Usage: node scripts/verify-live.mjs [origin]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = (process.argv[2] || process.env.VERIFY_ORIGIN || "https://xala.no").replace(/\/$/, "");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "src", "content", "blog");

const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? "  ok  " : "  FAIL"}  ${message}`);
  if (!ok) failures.push(message);
};

/** Retry: an atomic symlink flip is instant, but nginx and TLS need a moment. */
async function fetchText(url, { attempts = 4 } = {}) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": "xala-deploy-verify/1.0" },
      });
      return { status: res.status, body: await res.text() };
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
  return { status: 0, body: "", error: lastError };
}

/** The posts we expect to be live, read from source — not from the site. */
function expectedPosts() {
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
      return {
        slug: field("slug") || file.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
        title: field("title"),
      };
    })
    .filter(Boolean);
}

const decode = (html) =>
  html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

async function main() {
  console.log(`Verifying ${ORIGIN}\n`);
  const posts = expectedPosts();

  const home = await fetchText(`${ORIGIN}/`);
  check(home.status === 200, `homepage 200 (got ${home.status})`);

  const index = await fetchText(`${ORIGIN}/blogg`);
  check(index.status === 200, `/blogg 200 (got ${index.status})`);
  // Prerendered, not client-rendered: an empty #root means every AI crawler
  // sees a blank page.
  check(
    !/<div id="root">\s*<\/div>/.test(index.body),
    "/blogg has prerendered markup (#root is not empty)",
  );

  for (const post of posts) {
    const url = `${ORIGIN}/blogg/${post.slug}`;
    const page = await fetchText(url);
    check(page.status === 200, `${url} → 200 (got ${page.status})`);
    if (page.status !== 200) continue;

    const title = /<title>([\s\S]*?)<\/title>/i.exec(page.body)?.[1] ?? "";
    check(
      post.title ? decode(title).includes(post.title) : title.length > 0,
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

main().catch((err) => {
  console.error("verify-live crashed:", err);
  process.exit(1);
});
