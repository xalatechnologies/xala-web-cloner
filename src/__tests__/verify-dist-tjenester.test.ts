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
  tjenesterHubHasBodyMarker,
  tjenesterHubLede,
} from "../../scripts/verify-dist.mjs";
import servicePages from "@/data/service-pages.json";
import no from "@/i18n/locales/no.json";

const MAIN_NAV_HREFS = [
  "/tjenester",
  "/produkter",
  "/caser",
  "/blogg",
  "/slik-vi-jobber",
  "/teknologi",
  "/om-oss",
  "/karriere",
  "/faq",
  "/kontakt",
];

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

  it("requires the hub body marker inside #root so a soft shell fails", () => {
    const shell =
      '<div id="root"><h1>Tjenester</h1><p>Lede</p><nav aria-label="Hovedmeny"><a href="/tjenester">Tjenester</a></nav></div>';
    expect(tjenesterHubHasBodyMarker(shell)).toBe(false);
    const withBody = shell.replace(
      "</div>",
      '<section aria-labelledby="tjenester-neste"><h2 id="tjenester-neste">Neste</h2></section></div>',
    );
    expect(tjenesterHubHasBodyMarker(withBody)).toBe(true);
    expect(
      tjenesterHubHasBodyMarker(
        '<h2 id="tjenester-neste">outside</h2><div id="root"><h1>Tjenester</h1></div>',
      ),
    ).toBe(false);
  });

  it("finds exactly 10 Hovedmeny links inside #root", () => {
    const nav = MAIN_NAV_HREFS.map((href) => `<a href="${href}">${href}</a>`).join("");
    const html = `<div id="root"><nav aria-label="Hovedmeny">${nav}</nav></div>`;
    const links = hovedmenyNavInRoot(html);
    expect(links).toHaveLength(10);
    expect(links).toEqual(MAIN_NAV_HREFS);
  });

  it("matches case H1 to the Article JSON-LD headline in the same document", () => {
    const headline = "Altinn 3 og Altinn Studio";
    const html =
      `<script type="application/ld+json">{"@graph":[{"@type":"Article","headline":"${headline}"}]}</script>` +
      `<div id="root"><h1>${headline}</h1></div>`;
    expect(firstH1(html)).toBe(decodeHtmlEntities(articleHeadlineFromHtml(html)!));
  });

  it("lists product slugs from products.json and parses case slugs from sitemap locs", () => {
    expect(productSlugs().length).toBeGreaterThanOrEqual(6);
    const locs = ["https://xala.no/caser", "https://xala.no/caser/altinn", "https://xala.no/caser/ssb"];
    expect(detailSlugsFromLocs(locs, "https://xala.no", "/caser")).toEqual(["altinn", "ssb"]);
  });
});
