import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  articleHeadlineFromHtml,
  decodeHtmlEntities,
  detailSlugsFromLocs,
  firstH1,
  hasEmptyRoot,
  hovedmenyNavInRoot,
  productSlugs,
  servicePageSlugs,
  tjenesterHubLede,
} from "../../scripts/verify-dist.mjs";
import servicePages from "@/data/service-pages.json";
import no from "@/i18n/locales/no.json";

const HUB_FILE = resolve(__dirname, "../../dist/tjenester/index.html");
const ALTINN_FILE = resolve(__dirname, "../../dist/caser/altinn/index.html");

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

  it("decodes HTML entities in firstH1", () => {
    expect(firstH1('<div id="root"><h1>A &amp; B &quot;quoted&quot;</h1></div>')).toBe('A & B "quoted"');
    expect(decodeHtmlEntities("A &amp; B &quot;quoted&quot;")).toBe('A & B "quoted"');
  });

  it("lists every service slug from service-pages.json", () => {
    expect(servicePageSlugs()).toEqual(Object.keys(servicePages));
    expect(servicePageSlugs().length).toBeGreaterThanOrEqual(10);
  });

  it("scopes firstH1 to #root and strips inner tags", () => {
    const html =
      '<div id="root"><main><h1 class="page-heading">Visible <span>title</span></h1></main></div>' +
      '<h1 class="page-heading">Outside root</h1>';
    expect(firstH1(html)).toBe("Visible title");
  });

  it("reads the hub lede from the first paragraph after the H1", () => {
    const html =
      '<div id="root"><header><h1 class="page-heading">Title</h1><p>Hub lede copy</p></header></div>';
    expect(tjenesterHubLede(html)).toBe("Hub lede copy");
    expect(no.servicesPage.description.length).toBeGreaterThan(20);
  });

  it("reads Article JSON-LD headline from a case page", () => {
    const html = `<script type="application/ld+json">{"@graph":[{"@type":"Article","headline":"Altinn &amp; Studio"}]}</script>`;
    expect(articleHeadlineFromHtml(html)).toBe("Altinn &amp; Studio");
  });

  it("expects the prerendered hub to keep exactly 10 Hovedmeny links inside #root", () => {
    expect(existsSync(HUB_FILE)).toBe(true);
    const links = hovedmenyNavInRoot(readFileSync(HUB_FILE, "utf8"));
    expect(links).toHaveLength(10);
    expect(links?.[0]).toBe("/tjenester");
    expect(links?.[9]).toBe("/kontakt");
  });

  it("matches altinn H1 to the Article JSON-LD headline when dist is built", () => {
    expect(existsSync(ALTINN_FILE)).toBe(true);
    const html = readFileSync(ALTINN_FILE, "utf8");
    const headline = articleHeadlineFromHtml(html);
    expect(headline).toBeTruthy();
    expect(firstH1(html)).toBe(decodeHtmlEntities(headline!));
  });

  it("lists product slugs from products.json and parses case slugs from sitemap locs", () => {
    expect(productSlugs().length).toBeGreaterThanOrEqual(6);
    const locs = ["https://xala.no/caser", "https://xala.no/caser/altinn", "https://xala.no/caser/ssb"];
    expect(detailSlugsFromLocs(locs, "https://xala.no", "/caser")).toEqual(["altinn", "ssb"]);
  });
});
