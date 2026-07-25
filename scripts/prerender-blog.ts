/**
 * Post-build prerender: write real HTML for every blog page.
 *
 * WHY THIS EXISTS. xala.no is a client-rendered SPA — `dist/index.html` ships an
 * empty `<div id="root">` and the content appears only after React runs. Google
 * will usually render that eventually; the answer engines this site is being
 * optimised for largely will not. An AI crawler that does not execute
 * JavaScript sees a blank page, so a blog written specifically to be cited
 * would be invisible to exactly the readers it was written for.
 *
 * WHAT IT DOES. Reuses the built `dist/index.html` as the shell, so the hashed
 * CSS/JS tags stay correct, then per post: replaces the title/description/OG
 * tags, adds canonical + Article JSON-LD, and renders the post into `#root`.
 * When React mounts it calls createRoot().render(), which REPLACES the
 * container's children — so the prerendered markup is what a crawler reads and
 * what a visitor sees first, and the SPA takes over from there without a
 * hydration mismatch (this is render, not hydrate).
 *
 * Run after `vite build`; see the `build` script in package.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { parsePosts, publishedPosts, relatedPosts } from "../src/lib/blog/posts";
import {
  BLOG_PATH,
  ORGANIZATION,
  SITE_ORIGIN,
  absolute,
  articleJsonLd,
  blogJsonLd,
  formatDate,
  postUrl,
} from "../src/lib/blog/seo";
import {
  STATIC_ROUTES,
  blogSitemapEntries,
  escapeXml,
  renderRss,
  renderSitemap,
  staticSitemapEntries,
} from "../src/lib/blog/feeds";
import type { BlogPost } from "../src/lib/blog/types";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "src", "content", "blog");
const DIST = path.join(ROOT, "dist");

function readContentFiles(): Record<string, string> {
  if (!fs.existsSync(CONTENT_DIR)) return {};
  const files: Record<string, string> = {};
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.mdx?$/.test(entry.name)) {
        files[`/${path.relative(ROOT, full).split(path.sep).join("/")}`] = fs.readFileSync(full, "utf-8");
      }
    }
  };
  walk(CONTENT_DIR);
  return files;
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Render markdown exactly the way the SPA does — same component, same plugin. */
function markdownToHtml(body: string): string {
  return renderToStaticMarkup(
    createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, body),
  );
}

interface HeadFields {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  ogType: "article" | "website";
  jsonLd: Record<string, unknown>;
  publishedTime?: string;
}

/**
 * Rewrite the shell's head for this page.
 *
 * REPLACE rather than append: the shell already carries a `<title>` and OG tags
 * for the home page, and when a document has two of either, consumers take the
 * first. Appending would leave every blog post advertising the front page's
 * title to search results and link previews.
 */
function renderHead(shell: string, fields: HeadFields): string {
  let html = shell;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fields.title)}</title>`);

  const replaceMeta = (attr: string, name: string, content: string) => {
    const pattern = new RegExp(`<meta\\s+${attr}=["']${name}["'][^>]*>`, "i");
    const tag = `<meta ${attr}="${name}" content="${escapeHtml(content)}" />`;
    html = pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
  };

  replaceMeta("name", "title", fields.title);
  replaceMeta("name", "description", fields.description);
  replaceMeta("property", "og:title", fields.title);
  replaceMeta("property", "og:description", fields.description);
  replaceMeta("property", "og:url", fields.canonical);
  replaceMeta("property", "og:type", fields.ogType);
  if (fields.image) replaceMeta("property", "og:image", fields.image);

  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, "");

  const extra = [
    `<link rel="canonical" href="${escapeHtml(fields.canonical)}" />`,
    `<link rel="alternate" type="application/rss+xml" title="Blogg | ${escapeHtml(ORGANIZATION)}" href="${SITE_ORIGIN}${BLOG_PATH}/rss.xml" />`,
    fields.publishedTime
      ? `<meta property="article:published_time" content="${fields.publishedTime}" />`
      : "",
    `<script type="application/ld+json">${JSON.stringify(fields.jsonLd)}</script>`,
  ]
    .filter(Boolean)
    .map((tag) => `    ${tag}`)
    .join("\n");

  return html.replace("</head>", `${extra}\n  </head>`);
}

/** Put the prerendered markup where React will later take over. */
function renderBody(shell: string, inner: string): string {
  const pattern = /<div id="root">[\s\S]*?<\/div>/i;
  if (!pattern.test(shell)) {
    throw new Error('prerender: dist/index.html has no <div id="root"></div> to render into');
  }
  return shell.replace(pattern, `<div id="root">${inner}</div>`);
}

function postArticleHtml(post: BlogPost, related: BlogPost[]): string {
  const cover = post.cover
    ? `<img src="${escapeHtml(post.cover)}" alt="" width="1200" height="675" />`
    : "";
  const relatedHtml = related.length
    ? `<section aria-labelledby="relaterte"><h2 id="relaterte">Relaterte artikler</h2><ul>${related
        .map(
          (r) =>
            `<li><a href="${BLOG_PATH}/${escapeHtml(r.slug)}">${escapeHtml(r.title)}</a> — ${escapeHtml(r.description)}</li>`,
        )
        .join("")}</ul></section>`
    : "";

  return `<div class="min-h-screen flex flex-col"><main><article>
<nav aria-label="Brødsmuler"><a href="/">Forside</a> / <a href="${BLOG_PATH}">Blogg</a> / <span aria-current="page">${escapeHtml(post.title)}</span></nav>
<header>${post.tag ? `<p>${escapeHtml(post.tag)}</p>` : ""}<h1>${escapeHtml(post.title)}</h1>
<p>${escapeHtml(post.description)}</p>
<p><span>${escapeHtml(post.author)}</span>${post.role ? ` · <span>${escapeHtml(post.role)}</span>` : ""} · <time datetime="${post.date}">${escapeHtml(formatDate(post.date, post.lang))}</time> · <span>${post.readingMinutes} min lesetid</span></p>
</header>
${cover}
<div>${markdownToHtml(post.body)}</div>
<aside><h2>Snakk med oss om dette</h2><p>${escapeHtml(ORGANIZATION)} bygger løsninger som denne for offentlig sektor og næringsliv.</p><a href="/kontakt">Kontakt oss</a></aside>
</article>
${relatedHtml}
</main></div>`;
}

function indexHtml(posts: BlogPost[]): string {
  const cards = posts
    .map(
      (post) => `<li><article>
<h2><a href="${BLOG_PATH}/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a></h2>
<p>${escapeHtml(post.description)}</p>
<p>${post.tag ? `<span>${escapeHtml(post.tag)}</span> · ` : ""}<time datetime="${post.date}">${escapeHtml(formatDate(post.date, post.lang))}</time> · <span>${post.readingMinutes} min</span></p>
</article></li>`,
    )
    .join("\n");

  return `<div class="min-h-screen flex flex-col"><main>
<nav aria-label="Brødsmuler"><a href="/">Forside</a> / <span aria-current="page">Blogg</span></nav>
<h1>Blogg</h1>
<p>Fagartikler om systemutvikling, Microsoft 365 og SharePoint, Azure, integrasjon og AI — skrevet for beslutningstakere i offentlig sektor og næringsliv.</p>
${posts.length ? `<ul>\n${cards}\n</ul>` : "<p>Ingen artikler her ennå.</p>"}
</main></div>`;
}

function write(file: string, contents: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents, "utf-8");
}

function main(): void {
  const shellPath = path.join(DIST, "index.html");
  if (!fs.existsSync(shellPath)) {
    console.error("prerender: dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }
  const shell = fs.readFileSync(shellPath, "utf-8");

  const { posts: all, errors } = parsePosts(readContentFiles());

  // A malformed post must fail the BUILD, not disappear from it. These files
  // are written unattended by the content agent; silently skipping one means
  // the pipeline reports a successful publish for a post that will never exist.
  if (errors.length) {
    console.error(`prerender: ${errors.length} markdown file(s) rejected:`);
    for (const err of errors) console.error(`  ${err.file}: ${err.reason}`);
    process.exit(1);
  }

  const posts = publishedPosts(all);
  const today = new Date().toISOString().slice(0, 10);

  write(
    path.join(DIST, "blogg", "index.html"),
    renderBody(
      renderHead(shell, {
        title: `Blogg | ${ORGANIZATION}`,
        description:
          "Fagartikler om systemutvikling, Microsoft 365 og SharePoint, Azure, integrasjon og AI — for offentlig sektor og næringsliv.",
        canonical: `${SITE_ORIGIN}${BLOG_PATH}`,
        ogType: "website",
        jsonLd: blogJsonLd(posts),
      }),
      indexHtml(posts),
    ),
  );

  for (const post of posts) {
    write(
      path.join(DIST, "blogg", post.slug, "index.html"),
      renderBody(
        renderHead(shell, {
          title: `${post.title} | ${ORGANIZATION}`,
          description: post.description,
          canonical: postUrl(post),
          image: absolute(post.cover),
          ogType: "article",
          publishedTime: post.date,
          jsonLd: articleJsonLd(post),
        }),
        postArticleHtml(post, relatedPosts(all, post)),
      ),
    );
  }

  // Give every real route a file of its own, so nginx can serve `$uri/index.html`
  // and answer anything else with a genuine 404.
  //
  // Without these the server needs a catch-all `/index.html` fallback, which
  // hands back HTTP 200 for URLs that do not exist — a soft 404. Crawlers treat
  // a site that answers 200 for everything as having unbounded duplicate
  // content, and the NotFound page React renders afterwards does not undo the
  // status line that was already sent.
  for (const route of STATIC_ROUTES) {
    if (route.path === "/") continue; // dist/index.html already is this
    write(path.join(DIST, route.path.replace(/^\//, ""), "index.html"), shell);
  }
  write(path.join(DIST, "404.html"), shell);

  write(path.join(DIST, "blogg", "rss.xml"), renderRss(posts));
  write(
    path.join(DIST, "sitemap.xml"),
    renderSitemap([...staticSitemapEntries(today), ...blogSitemapEntries(posts)]),
  );

  const robots = path.join(DIST, "robots.txt");
  if (!fs.existsSync(robots)) {
    write(robots, `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`);
  }

  console.log(
    `prerender: ${posts.length} post(s) → dist/blogg/, plus rss.xml and sitemap.xml (${escapeXml(SITE_ORIGIN)})`,
  );
}

main();
