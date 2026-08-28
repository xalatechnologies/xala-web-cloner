import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi } from 'vitest';
import TjenesterPage from '../TjenesterPage';
import { getPageSEO } from '@/components/seo/seoContent';
import { SERVICES_PAGE_HEADING } from '@/lib/staticRouteHeading';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback?: string) => fallback ?? _key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/tjenester']}>
        <TjenesterPage />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('TjenesterPage heading vs document title', () => {
  it('keeps the designed H1 and the SEO <title> as different sentences', () => {
    // XWEB-195: flipping the visible H1 to the SEO title would "fix" the
    // prerender mismatch the wrong way. RouteSEO owns the document title.
    renderPage();

    const seoTitle = getPageSEO('services', 'no').title;
    const heading = screen.getByRole('heading', { level: 1 });
    const titleLead = seoTitle.split(' | ')[0];
    expect(heading).toHaveTextContent(SERVICES_PAGE_HEADING);
    expect(SERVICES_PAGE_HEADING).toBe(
      'Saksbehandlingssystem og fagsystem som skal stå i mange år',
    );
    expect(seoTitle).toBe('Saksbehandlingssystem og fagsystem | Xala');
    // H1 extends the title lead; they must stay different sentences.
    // toHaveTextContent is a substring check and would fail here.
    expect(SERVICES_PAGE_HEADING).not.toBe(titleLead);
    expect(heading.textContent).not.toBe(titleLead);
    // XWEB-194: H1 uses the container. XWEB-183 lives on /produkter.
    expect(heading.className).toContain('page-heading');
    expect(heading.className).not.toContain('max-w-[18ch]');
    expect(heading.className).not.toContain('max-w-[20ch]');
  });
});
