import { describe, expect, it } from "vitest";
import { explainerInlineHtml } from "@/lib/explainerInlineHtml";
import { isExplainerLinkHref } from "@/lib/explainerLinkHref";

describe("isExplainerLinkHref", () => {
  it("allows an exact /blogg/<slug> path", () => {
    expect(isExplainerLinkHref("/blogg/fagsystem-uten-api")).toBe(true);
  });

  it("rejects every other link shape", () => {
    expect(isExplainerLinkHref("/tjenester/systemintegrasjon")).toBe(false);
    expect(isExplainerLinkHref("/kontakt")).toBe(false);
    expect(isExplainerLinkHref("/blogg")).toBe(false);
    expect(isExplainerLinkHref("https://xala.no/blogg/fagsystem-uten-api")).toBe(false);
    expect(isExplainerLinkHref("https://example.com")).toBe(false);
    expect(isExplainerLinkHref("mailto:post@xala.no")).toBe(false);
    expect(isExplainerLinkHref("javascript:alert(1)")).toBe(false);
  });

  it("rejects traversal, double slashes, encoded dots, query/hash suffixes, uppercase and whitespace", () => {
    expect(isExplainerLinkHref("//evil.com")).toBe(false);
    expect(isExplainerLinkHref("data:text/html,<script>")).toBe(false);
    expect(isExplainerLinkHref("/blogg/../x")).toBe(false);
    expect(isExplainerLinkHref("/blogg//x")).toBe(false);
    expect(isExplainerLinkHref("/blogg/%2e%2e/x")).toBe(false);
    expect(isExplainerLinkHref("/blogg/x?y")).toBe(false);
    expect(isExplainerLinkHref("/blogg/x#y")).toBe(false);
    expect(isExplainerLinkHref("/blogg/FAGSYSTEM-UTEN-API")).toBe(false);
    expect(isExplainerLinkHref(" /blogg/fagsystem-uten-api")).toBe(false);
    expect(isExplainerLinkHref("/blogg/fagsystem-uten-api ")).toBe(false);
  });

  it("allows all five real service-page outbound links", () => {
    const realLinks = [
      "/blogg/modernisere-fagsystem-uten-driftsstans",
      "/blogg/fagsystem-uten-api",
      "/blogg/testautomatisering-for-fagsystemer",
      "/blogg/teknologivalg-for-fagsystemer-som-skal-vare",
      "/blogg/altinn-3-hva-endrer-seg-for-fagsystemet",
    ];
    for (const href of realLinks) {
      expect(isExplainerLinkHref(href), href).toBe(true);
    }
  });
});

describe("explainerInlineHtml", () => {
  it("turns a [label](/blogg/...) link into an anchor", () => {
    const html = explainerInlineHtml("Se [en annen vei inn til dataene](/blogg/fagsystem-uten-api) her.");
    expect(html).toBe(
      'Se <a href="/blogg/fagsystem-uten-api">en annen vei inn til dataene</a> her.',
    );
  });

  it("drops any other link target to plain text, keeping only the label", () => {
    const service = explainerInlineHtml("Se [tjenesten](/tjenester/systemintegrasjon) her.");
    expect(service).toBe("Se tjenesten her.");
    expect(service).not.toContain("<a");

    const external = explainerInlineHtml("Les [Digdir](https://digdir.no) om dette.");
    expect(external).toBe("Les Digdir om dette.");
    expect(external).not.toContain("<a");
  });

  it.each([
    "//evil.com",
    "data:text/html,<script>",
    "/blogg/../x",
    "/blogg//x",
    "/blogg/%2e%2e/x",
    "/blogg/x?y",
    "/blogg/x#y",
    "/blogg/FAGSYSTEM-UTEN-API",
    " /blogg/fagsystem-uten-api",
  ])("renders [label](%s) as plain text, not a link", (href) => {
    const html = explainerInlineHtml(`Se [lenken](${href}) her.`);
    expect(html).not.toContain("<a");
    expect(html).toContain("lenken");
  });

  it.each([
    "/blogg/modernisere-fagsystem-uten-driftsstans",
    "/blogg/fagsystem-uten-api",
    "/blogg/testautomatisering-for-fagsystemer",
    "/blogg/teknologivalg-for-fagsystemer-som-skal-vare",
    "/blogg/altinn-3-hva-endrer-seg-for-fagsystemet",
  ])("renders the real service-page outbound link [label](%s) as an anchor", (href) => {
    const html = explainerInlineHtml(`Se [lenken](${href}) her.`);
    expect(html).toContain(`<a href="${href}">lenken</a>`);
  });

  it("escapes plain text with no markdown link", () => {
    expect(explainerInlineHtml('Tegn <&> "sitat"')).toBe("Tegn &lt;&amp;&gt; &quot;sitat&quot;");
  });

  it("escapes the label and href of an allowed link", () => {
    const html = explainerInlineHtml('[<bold> & "quote"](/blogg/foo)');
    expect(html).toBe('<a href="/blogg/foo">&lt;bold&gt; &amp; &quot;quote&quot;</a>');
  });
});
