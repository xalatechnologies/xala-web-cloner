import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parsePosts, publishedPosts } from "@/lib/blog/posts";
import { servicePageHtml } from "@/lib/servicePageHtml";

const CONTENT_DIR = resolve(__dirname, "../../content/blog");

function loadPosts() {
  const files: Record<string, string> = {};
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.mdx?$/.test(entry.name)) {
        files[`/src/content/blog/${entry.name}`] = readFileSync(full, "utf-8");
      }
    }
  };
  walk(CONTENT_DIR);
  return publishedPosts(parsePosts(files).posts);
}

describe("servicePageHtml", () => {
  const posts = loadPosts();

  it("renders the H1, intro and main sections for a head-term page", () => {
    const html = servicePageHtml("saksbehandlingssystem", { posts });

    expect(html).toContain("<h1 class=\"page-heading\">Saksbehandlingssystem</h1>");
    expect(html).toContain("Et saksbehandlingssystem skal gjøre én ting godt");
    expect(html).toContain("<h2 id=\"problem-heading\">Der det som regel går galt</h2>");
    expect(html).toContain("<h2 id=\"capability-heading\">Hva vi bygger inn</h2>");
    expect(html).toContain("<h2 id=\"features-heading\">Funksjonalitet</h2>");
    expect(html).toContain("<h2 id=\"faq-heading\">Ofte stilte spørsmål</h2>");
    expect(html).toContain("Hvor lang tid tar det å få et saksbehandlingssystem i drift?");
  });

  it("renders child links on a category page", () => {
    const html = servicePageHtml("saksbehandlingsplattform", { posts });

    expect(html).toContain("<h2 id=\"children-heading\">Løsninger vi bygger på denne plattformen</h2>");
    expect(html).toContain('href="/tjenester/tilskuddsportal"');
    expect(html).toContain('href="/tjenester/saksbehandlingssystem"');
  });

  it("is the markup the prerender actually writes into #root", () => {
    const prerender = readFileSync(resolve(__dirname, "../../../scripts/prerender-blog.ts"), "utf8");
    expect(prerender).toContain("servicePageHtml");
    expect(prerender).toContain("renderBody(");
    expect(prerender).toMatch(/renderBody\(\s*renderHead\(shell,\s*\{[\s\S]*?\}\),\s*servicePageHtml\(/);
  });
});
