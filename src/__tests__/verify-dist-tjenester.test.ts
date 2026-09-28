import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { firstH1, hasEmptyRoot, servicePageSlugs } from "../../scripts/verify-dist.mjs";
import servicePages from "@/data/service-pages.json";

describe("verify-dist /tjenester first HTML", () => {
  it("flags an empty #root and a page with no H1", () => {
    expect(hasEmptyRoot('<div id="root"></div>')).toBe(true);
    expect(hasEmptyRoot('<div id="root">   </div>')).toBe(true);
    expect(hasEmptyRoot('<div id="root"><h1>Hei</h1></div>')).toBe(false);
    expect(firstH1('<div id="root"><h1 class="page-heading">Saksbehandlingssystem</h1></div>')).toBe(
      "Saksbehandlingssystem",
    );
    expect(firstH1('<div id="root"><p>no heading</p></div>')).toBeNull();
  });

  it("lists every service slug from service-pages.json", () => {
    expect(servicePageSlugs()).toEqual(Object.keys(servicePages));
    expect(servicePageSlugs().length).toBeGreaterThanOrEqual(10);
  });

  it("requires the prerender to call renderBody for service pages", () => {
    const source = readFileSync(resolve(__dirname, "../../scripts/prerender-blog.ts"), "utf8");
    expect(source).toContain("servicePageHtml(slug, { posts })");
    expect(source).toMatch(/renderBody\(\s*renderHead\(shell,\s*\{[\s\S]*?\}\),\s*servicePageHtml\(slug/);
  });
});
