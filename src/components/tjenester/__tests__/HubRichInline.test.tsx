import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HubRichInline } from "@/components/tjenester/HubRichInline";

function renderInline(text: string) {
  return render(
    <MemoryRouter>
      <p>
        <HubRichInline text={text} />
      </p>
    </MemoryRouter>,
  );
}

describe("HubRichInline", () => {
  it("renders internal links without underline classes", () => {
    renderInline("See [casen](/caser/altinn) for more.");
    const link = screen.getByRole("link", { name: "casen" });
    expect(link).toHaveAttribute("href", "/caser/altinn");
    expect(link.className).toBe("");
  });

  it("renders external https links with target and rel", () => {
    renderInline("Live at [digilist.no](https://digilist.no).");
    const link = screen.getByRole("link", { name: "digilist.no" });
    expect(link).toHaveAttribute("href", "https://digilist.no");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("drops protocol-relative hrefs to plain text", () => {
    renderInline("Bad [evil](//evil.com) and [slash](/\\evil.com).");
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText(/Bad evil and slash/)).toBeInTheDocument();
  });
});
