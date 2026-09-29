import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import productsData from "@/data/products.json";
import no from "@/i18n/locales/no.json";
import { parsePosts, publishedPosts } from "@/lib/blog/posts";
import { productPageHtml } from "@/lib/productPageHtml";
import { escapeHtml } from "@/lib/escapeHtml";

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

describe("productPageHtml", () => {
  const posts = loadPosts();
  const slugs = productsData.no.filter((product) => product.slug).map((product) => product.slug as string);

  it("reads labels from no.json so static HTML cannot drift from the SPA", () => {
    const html = productPageHtml("bevillingsportal", { posts });

    expect(html).toContain(escapeHtml(no.productPage.back));
    expect(html).toContain(`<h2 id="faq-heading">${no.servicePage.faqTitle}</h2>`);
    expect(html).toContain(`<h2 id="produkt-cta">${no.productPage.ctaTitle}</h2>`);
    expect(html).toContain(no.productPage.relatedService);
  });

  it("renders digilist with one H1 and the product title", () => {
    const product = productsData.no.find((item) => item.slug === "digilist")!;
    const html = productPageHtml("digilist", { posts });

    expect(() => productPageHtml("digilist", { posts })).not.toThrow();
    expect(html.match(/<h1>/g)?.length).toBe(1);
    expect(html).toContain(`<h1>${escapeHtml(product.title)}`);
    expect(html).toContain("digilist.no");
  });

  it.each(slugs)("renders %s with one H1 and the expected title", (slug) => {
    const product = productsData.no.find((item) => item.slug === slug)!;

    expect(() => productPageHtml(slug, { posts })).not.toThrow();
    const html = productPageHtml(slug, { posts });
    expect(html.match(/<h1>/g)?.length).toBe(1);
    expect(html).toContain(`<h1>${escapeHtml(product.title)}`);
  });

  it("is wired into the prerender for every product", () => {
    const prerender = readFileSync(resolve(__dirname, "../../../scripts/prerender-blog.ts"), "utf8");
    expect(prerender).toMatch(/renderBody\([\s\S]*productPageHtml\(product\.slug as string, \{ posts \}\)/);
  });
});
