import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi } from 'vitest';
import BloggPostPage from '../BloggPostPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

// ArticleToc's scroll-spy needs IntersectionObserver; jsdom does not have one.
class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);

const SLUG = 'automatisering-av-saksbehandling-hva-boer-og-ikke';

function renderPost(slug = SLUG) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/blogg/${slug}`]}>
        <Routes>
          <Route path="/blogg/:slug" element={<BloggPostPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('BloggPostPage lead vs cover', () => {
  it('puts Kort svar (Digdir / Prop. 79 L / forskrift) above the cover, not below it', () => {
    const { container } = renderPost();

    const lead = screen.getByRole('heading', { level: 2, name: 'Kort svar' });
    const cover = container.querySelector(`img[src="/images/blog/${SLUG}.webp"]`);
    expect(cover).toBeTruthy();

    const position = lead.compareDocumentPosition(cover!);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const article = container.querySelector('article');
    const text = article?.textContent ?? '';
    expect(text).toContain(
      'Regelstyrte steg og registerinnhenting kan automatiseres. Skjønnsvedtak kan ikke.'
    );
    expect(text).toContain('Digdir');
    expect(text).toContain('Prop. 79 L');
    expect(text).toContain('Forskriftsarbeidet');
    expect(text.match(/## Kort svar|Kort svar/g)?.filter((m) => m === 'Kort svar').length).toBeGreaterThanOrEqual(1);
  });

  it('does not rewrite the Kort svar paragraph', () => {
    renderPost();

    expect(
      screen.getByText(/Ny forvaltningslov \(lov 20\. juni 2025 nr\. 81, Prop\. 79 L\)/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Begynn med arbeidet rundt vedtaket, ikke vedtaket selv/)
    ).toBeInTheDocument();
  });

  it('prerenders the lead above the cover so first HTML matches the SPA', () => {
    const prerender = readFileSync(resolve(__dirname, '../../../scripts/prerender-blog.ts'), 'utf8');
    expect(prerender).toContain('splitLeadSection');
    const leadAt = prerender.indexOf('${leadHtml}');
    const coverAt = prerender.indexOf('${cover}');
    expect(leadAt).toBeGreaterThan(-1);
    expect(coverAt).toBeGreaterThan(-1);
    expect(leadAt).toBeLessThan(coverAt);
  });

  it('leaves a post without Kort svar in the existing header → cover → body order', () => {
    const { container } = renderPost('agentiske-arbeidsflyter-i-saksbehandling');

    expect(screen.queryByRole('heading', { level: 2, name: 'Kort svar' })).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 1 });
    const cover = container.querySelector(
      'img[src="/images/blog/agentiske-arbeidsflyter-i-saksbehandling.webp"]'
    );
    const firstBodyHeading = screen.getByRole('heading', { level: 2, name: 'Skillet går ved vedtaket' });

    expect(cover).toBeTruthy();
    expect(heading.compareDocumentPosition(cover!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(cover!.compareDocumentPosition(firstBodyHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
