import { describe, expect, it } from "vitest";
import { explainerInlineHtml } from "@/lib/explainerInlineHtml";
import { isExplainerLinkHref } from "@/lib/explainerLinkHref";

describe("isExplainerLinkHref", () => {
  it("allows internal /blogg/ paths only", () => {
    expect(isExplainerLinkHref("/blogg/fagsystem-uten-api")).toBe(true);
    expect(isExplainerLinkHref(" /blogg/fagsystem-uten-api ")).toBe(true);
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

  it("escapes plain text with no markdown link", () => {
    expect(explainerInlineHtml('Tegn <&> "sitat"')).toBe("Tegn &lt;&amp;&gt; &quot;sitat&quot;");
  });

  it("escapes the label and href of an allowed link", () => {
    const html = explainerInlineHtml('[<bold> & "quote"](/blogg/foo)');
    expect(html).toBe('<a href="/blogg/foo">&lt;bold&gt; &amp; &quot;quote&quot;</a>');
  });
});
