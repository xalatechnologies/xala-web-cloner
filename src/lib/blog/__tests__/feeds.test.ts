import { describe, expect, it } from "vitest";
import {
  blogSitemapEntries,
  escapeXml,
  renderLlmsTxt,
  renderRss,
  renderSitemap,
  staticSitemapEntries,
} from "../feeds";
import { parsePosts } from "../posts";
import type { BlogPost } from "../types";

function posts(): BlogPost[] {
  const { posts: parsed } = parsePosts({
    "/src/content/blog/a.md": `---
slug: forste
title: "Første & beste"
description: "En <beskrivelse> med tegn."
date: 2026-07-20
author: "Ibrahim Rahmani"
tag: "IT-leder"
cover: "/images/blog/a.webp"
---
Brødtekst.
`,
    "/src/content/blog/b.md": `---
slug: andre
title: "Andre"
description: "Kort."
date: 2026-06-10
author: "Ibrahim Rahmani"
---
Brødtekst.
`,
  });
  return parsed;
}

describe("escapeXml", () => {
  it("escapes all five XML metacharacters", () => {
    expect(escapeXml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&apos;");
  });

  it("escapes ampersands before the entities it just wrote", () => {
    expect(escapeXml("a & <b>")).toBe("a &amp; &lt;b&gt;");
  });
});

describe("renderRss", () => {
  const xml = renderRss(posts(), new Date("2026-07-25T12:00:00Z"));

  it("is a well-formed RSS 2.0 channel", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<atom:link href=\"https://xala.no/blogg/rss.xml\"");
    expect(xml).toContain("<language>nb-NO</language>");
  });

  it("lists one item per post, newest first", () => {
    const order = [...xml.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)].map((m) => m[1]);
    expect(order).toEqual(["https://xala.no/blogg/forste", "https://xala.no/blogg/andre"]);
  });

  // An unescaped & or < in a title makes the whole feed unparseable, which is
  // invisible until a reader silently stops updating.
  it("escapes post titles and descriptions", () => {
    expect(xml).toContain("<title>Første &amp; beste</title>");
    expect(xml).toContain("<description>En &lt;beskrivelse&gt; med tegn.</description>");
    expect(xml).not.toMatch(/<title>[^<]*&(?!amp;|lt;|gt;|quot;|apos;)/);
  });

  it("emits RFC-822 dates", () => {
    expect(xml).toContain("<pubDate>Mon, 20 Jul 2026 09:00:00 GMT</pubDate>");
    expect(xml).toContain("<lastBuildDate>Sat, 25 Jul 2026 12:00:00 GMT</lastBuildDate>");
  });

  it("includes an absolute enclosure only when the post has a cover", () => {
    expect(xml).toContain('<enclosure url="https://xala.no/images/blog/a.webp"');
    expect([...xml.matchAll(/<enclosure/g)]).toHaveLength(1);
  });
});

describe("sitemap", () => {
  it("lists the blog index and every post", () => {
    const entries = blogSitemapEntries(posts());
    expect(entries.map((e) => e.loc)).toEqual([
      "https://xala.no/blogg",
      "https://xala.no/blogg/forste",
      "https://xala.no/blogg/andre",
    ]);
  });

  it("dates the index from the newest post", () => {
    expect(blogSitemapEntries(posts())[0].lastmod).toBe("2026-07-20");
  });

  it("falls back to today when there are no posts", () => {
    expect(blogSitemapEntries([])[0].lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  // The live sitemap advertises /no/services and /services, which 404 or 301 —
  // the app's routes are Norwegian at the root. These must not repeat that.
  it("emits only routes the app actually serves", () => {
    const locs = staticSitemapEntries("2026-07-25").map((e) => e.loc);
    expect(locs).toContain("https://xala.no");
    expect(locs).toContain("https://xala.no/tjenester");
    expect(locs).toContain("https://xala.no/priser");
    expect(locs).not.toContain("https://xala.no/pris");
    expect(locs.some((l) => l.includes("/no/"))).toBe(false);
    expect(locs.some((l) => l.endsWith("/services"))).toBe(false);
  });

  it("renders valid sitemap XML with no trailing slash on the origin", () => {
    const entries = [...staticSitemapEntries("2026-07-25"), ...blogSitemapEntries(posts())];
    const xml = renderSitemap(entries);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain("<loc>https://xala.no</loc>");
    expect(xml).not.toContain("<loc>https://xala.no/</loc>");
    expect(entries.map((e) => e.loc)).toContain("https://xala.no/priser");
    expect(entries.map((e) => e.loc)).not.toContain("https://xala.no/pris");
    expect([...xml.matchAll(/<url>/g)]).toHaveLength(entries.length);
  });
});

describe("renderLlmsTxt", () => {
  const txt = renderLlmsTxt(posts());

  it("opens with the company as an H1 and a blockquote summary", () => {
    expect(txt.startsWith("# Xala Technologies AS")).toBe(true);
    expect(txt).toMatch(/\n> .+/);
  });

  // The facts an answer engine needs to resolve the entity, stated rather than
  // left to be inferred from a React bundle.
  it("states the identifying facts", () => {
    expect(txt).toContain("920972454");
    expect(txt).toContain("Nesbruveien 75, 1394 Nesbru, Asker");
  });

  it("lists every real route as a markdown link", () => {
    expect(txt).toContain("- [Forside](https://xala.no)");
    expect(txt).toContain("- [Tjenester](https://xala.no/tjenester)");
    expect(txt).toContain("- [Kontakt](https://xala.no/kontakt)");
    expect(txt).not.toContain("/no/");
  });

  it("lists each post with its description", () => {
    expect(txt).toContain("- [Første & beste](https://xala.no/blogg/forste): En <beskrivelse> med tegn.");
  });

  it("says so plainly when there are no posts, rather than emitting an empty section", () => {
    expect(renderLlmsTxt([])).toContain("(ingen publisert ennå)");
  });

  it("has no unresolved template placeholders", () => {
    expect(txt).not.toMatch(/\$\{|undefined|\[object/);
  });
});
