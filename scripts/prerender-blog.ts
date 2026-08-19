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

import { coverAlt, parsePosts, publishedPosts, relatedPosts } from "../src/lib/blog/posts";
import { blogListingHtml } from "../src/lib/blog/listingHtml";
import { blogListingQueries, blogQueryFileKey, filterBlogPosts } from "../src/lib/blog/search";
import { extractFaq, faqJsonLd, splitLeadSection } from "../src/lib/blog/toc";
import { getPageSEO } from "../src/components/seo/seoContent";
import { CANONICAL_ALIASES, resolveRoute } from "../src/components/seo/routeRules";
import { staticRouteVisibleHeading } from "../src/lib/staticRouteHeading";
import {
  BLOG_PATH,
  ORGANIZATION,
  ORG_ID,
  SITE_ORIGIN,
  articleJsonLd,
  blogJsonLd,
  formatDate,
  postMeta,
  postUrl,
} from "../src/lib/blog/seo";
import { shareRowHtml } from "../src/lib/blog/share";
import { topicHashtagLineHtml } from "../src/lib/blog/topics";
import {
  STATIC_ROUTES,
  blogSitemapEntries,
  caseStudySitemapEntries,
  productSitemapEntries,
  serviceSitemapEntries,
  escapeXml,
  renderLlmsTxt,
  renderRss,
  renderSitemap,
  staticSitemapEntries,
} from "../src/lib/blog/feeds";
import type { BlogPost } from "../src/lib/blog/types";
import { caseStudies } from "../src/data/case-studies/index";
import { caseStudyFaqJsonLd } from "../src/data/case-studies/faq";
import { localizeCaseStudy, localizedSeo } from "../src/data/case-studies/localized";
import productsData from "../src/data/products.json";
import detailsData from "../src/data/product-details.json";
import servicePages from "../src/data/service-pages.json";
import faqData from "../src/data/faq.json";
import { generateFAQSchema } from "../src/components/seo/sectionSchemas";

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
  /** Further schema blocks (FAQPage, …) emitted as their own script tags. */
  extraJsonLd?: Record<string, unknown>[];
  publishedTime?: string;
  /** Post-specific keywords. Without this the shell keeps the homepage string. */
  keywords?: string;
  /** Open Graph article:tag values — the same 3–5 topics as the visible hashtags. */
  articleTags?: string[];
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

  // Everything written here carries data-rh so react-helmet-async treats it as
  // its own and replaces it on hydration. Without the attribute Helmet appends
  // a second copy beside the prerendered one, and the page ships two canonicals
  // — the exact defect this function exists to avoid, reintroduced one layer up.
  const replaceMeta = (attr: string, name: string, content: string) => {
    const pattern = new RegExp(`<meta\\s+${attr}=["']${name}["'][^>]*>`, "i");
    const tag = `<meta ${attr}="${name}" content="${escapeHtml(content)}" data-rh="true" />`;
    html = pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
  };

  replaceMeta("name", "title", fields.title);
  replaceMeta("name", "description", fields.description);
  replaceMeta("property", "og:title", fields.title);
  replaceMeta("property", "og:description", fields.description);
  replaceMeta("property", "og:url", fields.canonical);
  replaceMeta("property", "og:type", fields.ogType);
  // Default share image so summary_large_image is never a card with no image.
  // Blog posts pass their cover; everything else uses /og-image.png.
  const image = fields.image ?? `${SITE_ORIGIN}/og-image.png`;
  replaceMeta("property", "og:image", image);
  replaceMeta("property", "twitter:card", "summary_large_image");
  replaceMeta("property", "twitter:url", fields.canonical);
  replaceMeta("property", "twitter:title", fields.title);
  replaceMeta("property", "twitter:description", fields.description);
  replaceMeta("property", "twitter:image", image);
  if (fields.keywords) replaceMeta("name", "keywords", fields.keywords);

  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, "");

  const extra = [
    `<link rel="canonical" href="${escapeHtml(fields.canonical)}" data-rh="true" />`,
    `<link rel="alternate" type="application/rss+xml" title="${escapeHtml(getPageSEO("blog", "no").title)}" href="${SITE_ORIGIN}${BLOG_PATH}/rss.xml" />`,
    fields.publishedTime
      ? `<meta property="article:published_time" content="${fields.publishedTime}" data-rh="true" />`
      : "",
    ...(fields.articleTags ?? []).map(
      (tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" data-rh="true" />`,
    ),
    `<script type="application/ld+json" data-rh="true">${JSON.stringify(fields.jsonLd)}</script>`,
    // Separate blocks rather than one @graph: an FAQPage is a claim about the
    // page, and keeping it standalone is what the rich-result tests expect.
    ...(fields.extraJsonLd ?? []).map(
      (block) => `<script type="application/ld+json" data-rh="true">${JSON.stringify(block)}</script>`,
    ),
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

/**
 * The main navigation, rendered into the static HTML of every page.
 *
 * A crawler that fetches https://xala.no/ and does not run JavaScript saw an
 * empty <div id="root"> and zero <a href>. Google does render JS, but rendering
 * is queued and can lag crawling by days, and until it happens there is nothing
 * to follow — a large part of why 37 of 61 URLs were "unknown to Google"
 * despite every one being linked from the rendered navigation.
 *
 * This is the same set of links the rendered header carries, present before the
 * bundle runs. React replaces #root on mount, exactly as it already does on
 * /blogg.
 */
interface NavLink { href: string; label: string }

const MAIN_NAV: NavLink[] = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/produkter", label: "Produkter" },
  { href: "/caser", label: "Kundecaser" },
  { href: "/blogg", label: "Fagartikler" },
  { href: "/slik-vi-jobber", label: "Slik vi jobber" },
  { href: "/teknologi", label: "Teknologi" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/karriere", label: "Karriere" },
  { href: "/faq", label: "Ofte stilte spørsmål" },
  { href: "/kontakt", label: "Kontakt" },
];

interface ServicePageLink { slug: string; title: string }
interface ProductLink { slug: string; title: string }
interface CaseLink { slug: string; title: string }

/**
 * What is on screen before the bundle runs.
 *
 * On a throttled connection this is visible from about 300ms to 1600ms — the
 * window that used to be a blank white screen, since nothing painted until
 * 2.1s. Showing the heading that early is a straight improvement; showing it
 * as unstyled black-on-white markup next to a bare <ul> of sixty links is not,
 * because it reads as a broken page rather than a loading one.
 *
 * Styles are inline and few. The stylesheet is render-blocking so it has in
 * fact loaded by this point, but relying on generated utility class names from
 * a file this script does not read would break silently the first time the
 * build renamed one. These few declarations only have to survive ~1.3s.
 *
 * The links shown here are the site's main navigation, and they are genuinely
 * visible — not a sixty-link block hidden behind clip-rect. That version was
 * written first and is the thing not to do: markup a crawler reads and a
 * visitor never sees is cloaking, whatever the intent, and "it is the same as
 * the real nav" is exactly what every cloaked page claims.
 *
 * The deep URLs — seventeen articles, ten service pages, six products,
 * seventeen case studies — are reached through the sitemap, which is what a
 * sitemap is for and which is already working: thirteen of them moved from
 * "unknown to Google" to "discovered" within two hours of submission.
 */
function staticRouteHtml(heading: string, description: string, links: NavLink[]): string {
  const page =
    "min-height:100vh;background:#0b0b0d;color:#f5f5f4;font-family:Inter,system-ui,sans-serif;" +
    "display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:3rem 1.5rem;text-align:center";
  const h1 = "font-size:clamp(1.75rem,5vw,3rem);font-weight:700;line-height:1.15;margin:0";
  const lead = "margin:0;max-width:52ch;color:#a1a1aa;line-height:1.6";
  const navStyle = "display:flex;flex-wrap:wrap;gap:0.25rem 1.5rem;justify-content:center;margin-top:0.5rem";
  const linkStyle = "color:#d6a15e;text-decoration:none;font-size:0.95rem";

  const nav =
    `<nav aria-label="Hovedmeny" style="${navStyle}">` +
    links.map((l) => `<a href="${escapeHtml(l.href)}" style="${linkStyle}">${escapeHtml(l.label)}</a>`).join("") +
    `</nav>`;

  return (
    `<div style="${page}">` +
    `<h1 style="${h1}">${escapeHtml(heading)}</h1>` +
    `<p style="${lead}">${escapeHtml(description)}</p>` +
    nav +
    `</div>`
  );
}

function faqRouteHtml(
  heading: string,
  description: string,
  faqs: { question: string; answer: string }[],
  links: NavLink[],
): string {
  const items = faqs
    .map(
      (faq) =>
        `<dt>${escapeHtml(faq.question)}</dt><dd>${escapeHtml(faq.answer)}</dd>`,
    )
    .join("");
  const list =
    `<dl style="max-width:52ch;text-align:left;margin:1.5rem auto 0;color:#f5f5f4">${items}</dl>`;
  return staticRouteHtml(heading, description, links).replace("</div>", `${list}</div>`);
}

function webPageJsonLd(path: string, copy: { title: string; description: string }) {
  const url = `${SITE_ORIGIN}${path === "/" ? "" : path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: copy.title,
    description: copy.description,
    inLanguage: "nb-NO",
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    publisher: { "@id": ORG_ID },
  };
}

function postArticleHtml(post: BlogPost, related: BlogPost[]): string {
  const cover = post.cover
    ? `<img src="${escapeHtml(post.cover)}" alt="${escapeHtml(coverAlt(post))}" width="1200" height="675" />`
    : "";
  const relatedHtml = related.length
    ? `<section aria-labelledby="relaterte"><h2 id="relaterte">Relaterte artikler</h2><ul>${related
        .map(
          (r) =>
            `<li><a href="${BLOG_PATH}/${escapeHtml(r.slug)}">${escapeHtml(r.title)}</a> — ${escapeHtml(r.description)}</li>`,
        )
        .join("")}</ul></section>`
    : "";
  const { lead, rest } = splitLeadSection(post.body);
  const leadHtml = lead ? `<div>${markdownToHtml(lead)}</div>` : "";
  const bodyHtml = rest ? `<div>${markdownToHtml(rest)}</div>` : "";

  return `<div class="min-h-screen flex flex-col"><main><article>
<nav aria-label="Brødsmuler"><a href="/">Forside</a> / <a href="${BLOG_PATH}">Blogg</a> / <span aria-current="page">${escapeHtml(post.title)}</span></nav>
<header>${post.tag ? `<p>${escapeHtml(post.tag)}</p>` : ""}<h1>${escapeHtml(post.title)}</h1>
<p>${escapeHtml(post.description)}</p>
${leadHtml}
<p><span>${escapeHtml(post.author)}</span>${post.role ? ` · <span>${escapeHtml(post.role)}</span>` : ""} · <time datetime="${post.date}">${escapeHtml(formatDate(post.date, post.lang))}</time> · <span>${post.readingMinutes} min lesetid</span></p>
</header>
${cover}
${bodyHtml}
${topicHashtagLineHtml(post)}
${shareRowHtml(postUrl(post), post.title)}
<aside><h2>Snakk med oss om dette</h2><p>${escapeHtml(ORGANIZATION)} bygger løsninger som denne for offentlig sektor og næringsliv.</p><a href="/kontakt">Kontakt oss</a></aside>
</article>
${relatedHtml}
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

  const listing = getPageSEO("blog", "no");
  const listingHead = (listed: BlogPost[]) =>
    renderHead(shell, {
      title: listing.title,
      description: listing.description,
      canonical: `${SITE_ORIGIN}${BLOG_PATH}`,
      ogType: "website",
      jsonLd: blogJsonLd(listed),
    });

  write(
    path.join(DIST, "blogg", "index.html"),
    renderBody(listingHead(posts), blogListingHtml(posts)),
  );

  // /blogg?q= is one static file unless we emit a filtered listing and the
  // host maps the query onto it. Without these files a crawler (and a reader
  // with JavaScript off) always gets the full unfiltered card list.
  write(
    path.join(DIST, "blogg", "q", "_none", "index.html"),
    renderBody(
      listingHead([]),
      blogListingHtml([], { search: true, totalCount: posts.length }),
    ),
  );
  for (const query of blogListingQueries(posts)) {
    const key = blogQueryFileKey(query);
    if (!key) continue;
    const filtered = filterBlogPosts(posts, { query });
    write(
      path.join(DIST, "blogg", "q", key, "index.html"),
      renderBody(
        listingHead(filtered),
        blogListingHtml(filtered, { query, totalCount: posts.length }),
      ),
    );
  }

  for (const post of posts) {
    // Same title / description / canonical / image as Helmet. A second
    // formula here is how crawlers kept seeing `title | Xala Technologies AS`
    // after seoTitle + BRAND already existed in postMeta().
    const meta = postMeta(post);
    write(
      path.join(DIST, "blogg", post.slug, "index.html"),
      renderBody(
        renderHead(shell, {
          title: meta.title,
          description: meta.description,
          canonical: meta.canonical,
          image: meta.image,
          ogType: "article",
          publishedTime: post.date,
          keywords: meta.keywords,
          articleTags: meta.articleTags,
          jsonLd: articleJsonLd(post),
          // The rendered page derives this from the body; the static HTML a
          // crawler reads has to carry the same thing, or the FAQ only exists
          // for visitors whose browser ran the bundle.
          extraJsonLd: [faqJsonLd(postUrl(post), extractFaq(post.body))].filter(
            (block): block is Record<string, unknown> => block !== null,
          ),
        }),
        postArticleHtml(post, relatedPosts(all, post)),
      ),
    );
  }

  // Give every real route a file of its own, so nginx can serve `$uri/index.html`
  // and answer anything else with a genuine 404.
  //
  // dist/index.html is the shell every other page is rendered from, so the
  // in-memory `shell` is what we rewrite — never the file we just wrote.
  // The front page used to skip renderHead, which left crawlers the leftover
  // "Innovative Teknologiløsninger" title on the single most important URL.
  for (const route of STATIC_ROUTES) {
    const copy = getPageSEO(resolveRoute(route.path).pageId, "no");
    const canonical = `${SITE_ORIGIN}${route.path === "/" ? "" : route.path}`;
    const extraJsonLd =
      route.path === "/faq"
        ? [{ ...generateFAQSchema(faqData.no), "@id": `${SITE_ORIGIN}/faq#faq` }]
        : [];
    const heading = staticRouteVisibleHeading(route.path, copy.title);
    const inner =
      route.path === "/faq"
        ? faqRouteHtml(heading, copy.description, faqData.no, MAIN_NAV)
        : staticRouteHtml(heading, copy.description, MAIN_NAV);
    write(
      path.join(DIST, route.path.replace(/^\//, ""), "index.html"),
      renderBody(
        renderHead(shell, {
          title: copy.title,
          description: copy.description,
          canonical,
          ogType: "website",
          jsonLd: webPageJsonLd(route.path, copy),
          extraJsonLd,
        }),
        inner,
      ),
    );
  }
  // Aliases are not in STATIC_ROUTES: they share a pageId with the canonical
  // path, so listing them would duplicate the sitemap and break unique titles.
  // Copy the already-written file so a cold hit / crawler is not a 404, and
  // the canonical stays the one written for the target (e.g. /priser).
  for (const [alias, target] of Object.entries(CANONICAL_ALIASES)) {
    const source = path.join(DIST, target.replace(/^\//, ""), "index.html");
    if (!fs.existsSync(source)) {
      throw new Error(`prerender: alias ${alias} → ${target} but ${source} was not written`);
    }
    write(path.join(DIST, alias.replace(/^\//, ""), "index.html"), fs.readFileSync(source, "utf-8"));
  }

  // Every case study needs a file of its own for the same reason the static
  // routes do — more urgently, in fact, because these URLs are listed in the
  // sitemap. Without a file, nginx answered /caser/<slug> with a 404 for all
  // 17 of them: the page still rendered once React took over, so it looked
  // fine in a browser, while every crawler that followed the sitemap was told
  // the page does not exist.
  for (const study of caseStudies) {
    if (!study.slug) continue;
    const url = `${SITE_ORIGIN}/caser/${study.slug}`;
    const localized = localizeCaseStudy(study, "no");
    const seo = localizedSeo(study, "no");
    write(
      path.join(DIST, "caser", study.slug, "index.html"),
      renderHead(shell, {
        title: seo.title,
        description: seo.description,
        canonical: url,
        ogType: "article",
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${url}#article`,
              headline: localized.title,
              description: seo.description,
              inLanguage: "nb-NO",
              publisher: { "@id": ORG_ID },
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
              ...(localized.client ? { about: { "@type": "Organization", name: localized.client } } : {}),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Forside", item: SITE_ORIGIN },
                { "@type": "ListItem", position: 2, name: "Kundecaser", item: `${SITE_ORIGIN}/caser` },
                { "@type": "ListItem", position: 3, name: localized.title, item: url },
              ],
            },
          ],
        },
        extraJsonLd: [caseStudyFaqJsonLd(url, localized)].filter(
          (block): block is Record<string, unknown> => Boolean(block),
        ),
      }),
    );
  }

  // A file per service landing page, each with its own title, description and
  // FAQ schema. These are the pages meant to rank for the head terms, so they
  // must exist as files rather than only as client-side routes.
  for (const [slug, page] of Object.entries(servicePages)) {
    const copy = (page as { no: { metaTitle: string; metaDescription: string; title: string; faq: { question: string; answer: string }[] } }).no;
    const url = `${SITE_ORIGIN}/tjenester/${slug}`;
    write(
      path.join(DIST, "tjenester", slug, "index.html"),
      renderHead(shell, {
        title: copy.metaTitle,
        description: copy.metaDescription,
        canonical: url,
        ogType: "website",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: copy.title,
          description: copy.metaDescription,
          url,
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "Country", name: "Norge" },
          serviceType: copy.title,
        },
        extraJsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: copy.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ],
      }),
    );
  }

  // A file per product page, with that product's own title and description.
  // They cannot go through STATIC_ROUTES: every /produkter/* path resolves to
  // the same pageId, so all four would have shipped the same <title>.
  for (const product of productsData.no) {
    if (!product.slug) continue;
    const url = `${SITE_ORIGIN}/produkter/${product.slug}`;
    const details = (detailsData as Record<string, { no?: { faq?: { question: string; answer: string }[] } }>)[
      product.id
    ];
    const faq = details?.no?.faq ?? [];
    write(
      path.join(DIST, "produkter", product.slug, "index.html"),
      renderHead(shell, {
        title: `${product.title} | ${ORGANIZATION}`,
        description: product.description,
        canonical: url,
        ogType: "website",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${url}#product`,
          name: product.title,
          description: product.description,
          url,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          publisher: { "@id": ORG_ID },
          ...(product.features?.length ? { featureList: product.features } : {}),
        },
        extraJsonLd: faq.length
          ? [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: faq.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
              },
            ]
          : undefined,
      }),
    );
  }

  write(path.join(DIST, "404.html"), shell);

  write(path.join(DIST, "blogg", "rss.xml"), renderRss(posts));

  // Case studies feed both llms.txt and the sitemap. Only those with a slug
  // have a reachable /caser/:slug route.
  const routableCaseStudies = caseStudies.filter(
    (study): study is typeof study & { slug: string } => Boolean(study.slug),
  );
  const caseStudySlugs = routableCaseStudies.map((study) => study.slug);
  // The Norwegian summary where one exists. llms.txt is a Norwegian document
  // and was quoting English case summaries, which is the same defect the case
  // index had: the translations were written and then not read.
  const llmsCaseStudies = routableCaseStudies.map((study) => ({
    slug: study.slug,
    title: study.title,
    client: study.client,
    summary: study.translations?.no?.summary ?? study.summary,
  }));

  // llms.txt, unless one is committed under public/ — Vite copies public/ into
  // dist/, so a file the SEO agent produced and someone committed wins over
  // this build-time default rather than being silently overwritten.
  const llmsPath = path.join(DIST, "llms.txt");
  if (fs.existsSync(path.join(ROOT, "public", "llms.txt"))) {
    console.log("prerender: public/llms.txt is committed — keeping it, not regenerating");
  } else {
    // The service and product pages are what this file exists to advertise:
    // they answer a specific question each, and they were missing entirely
    // while llms.txt listed only the top-level navigation.
    const llmsServices = Object.entries(servicePages).map(([slug, page]) => {
      const copy = (page as { no: { title: string; intro: string } }).no;
      return { slug, title: copy.title, summary: copy.intro };
    });
    const llmsProducts = productsData.no
      .filter((product) => product.slug)
      .map((product) => ({
        slug: product.slug as string,
        title: product.title,
        summary: product.description,
      }));

    write(llmsPath, renderLlmsTxt(posts, llmsCaseStudies, llmsServices, llmsProducts));
  }

  write(
    path.join(DIST, "sitemap.xml"),
    renderSitemap([
      ...staticSitemapEntries(today),
      ...caseStudySitemapEntries(caseStudySlugs, today),
      ...serviceSitemapEntries(Object.keys(servicePages), today),
      ...productSitemapEntries(
        productsData.no.filter((p) => p.slug).map((p) => p.slug as string),
        today,
      ),
      ...blogSitemapEntries(posts),
    ]),
  );

  // robots.txt is a tracked file in public/ and Vite copies it into dist/ — one
  // source of truth. Assert it arrived rather than writing a default over it:
  // silently substituting our own would hide the case where someone deleted or
  // renamed it, and a missing robots.txt on a site built to be crawled is
  // exactly the kind of thing that should stop a deploy.
  if (!fs.existsSync(path.join(DIST, "robots.txt"))) {
    console.error("prerender: dist/robots.txt is missing — public/robots.txt was not copied.");
    process.exit(1);
  }

  console.log(
    `prerender: ${posts.length} post(s) → dist/blogg/, ${blogListingQueries(posts).length} query listing(s), plus rss.xml and sitemap.xml (${escapeXml(SITE_ORIGIN)})`,
  );
}

main();
