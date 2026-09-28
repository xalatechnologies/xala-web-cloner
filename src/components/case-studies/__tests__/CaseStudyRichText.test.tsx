import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CaseStudyRichInline } from "@/components/case-studies/CaseStudyRichText";

describe("CaseStudyRichInline", () => {
  it("drops protocol-relative hrefs to plain text", () => {
    render(
      <MemoryRouter>
        <CaseStudyRichInline text={'Bad [evil](//evil.com) and [slash](/\\evil.com).'} />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText(/Bad evil and slash/)).toBeInTheDocument();
  });
});
