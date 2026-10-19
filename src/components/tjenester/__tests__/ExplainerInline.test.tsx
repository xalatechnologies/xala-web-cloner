import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ExplainerInline } from "@/components/tjenester/ExplainerInline";

function renderInline(text: string) {
  return render(
    <MemoryRouter>
      <p>
        <ExplainerInline text={text} />
      </p>
    </MemoryRouter>,
  );
}

describe("ExplainerInline", () => {
  it("renders a real /blogg/<slug> link as a <Link> with the exact href", () => {
    renderInline("Se [en annen vei inn til dataene](/blogg/fagsystem-uten-api) her.");
    const link = screen.getByRole("link", { name: "en annen vei inn til dataene" });
    expect(link).toHaveAttribute("href", "/blogg/fagsystem-uten-api");
  });

  it.each([
    [" /blogg/fagsystem-uten-api", "leading-space href"],
    ["//evil.com", "protocol-relative href"],
    ["/blogg/../x", "path traversal"],
    ["/blogg/x?y", "query-string suffix"],
    ["/blogg/FAGSYSTEM-UTEN-API", "uppercase slug"],
  ])("renders [label](%s) as plain text with no <a> (%s)", (href) => {
    renderInline(`Se [lenken](${href}) her.`);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText(/Se lenken her\./)).toBeInTheDocument();
  });

  it("does not trim the href before checking it, matching explainerInlineHtml", () => {
    // A leading space makes the href fail the exact /blogg/<slug> match. If the
    // component trimmed first, this would wrongly render as a link.
    renderInline("Se [lenken]( /blogg/fagsystem-uten-api) her.");
    expect(screen.queryByRole("link")).toBeNull();
  });
});
