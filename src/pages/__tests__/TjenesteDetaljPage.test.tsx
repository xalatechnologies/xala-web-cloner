import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import servicePages from '@/data/service-pages.json';
import TjenesteDetaljPage from '../TjenesteDetaljPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback?: string) => fallback ?? _key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

function renderAt(slug: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/tjenester/${slug}`]}>
        <Routes>
          <Route path="/tjenester/:slug" element={<TjenesteDetaljPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

afterEach(() => {
  document.head.querySelectorAll('script,meta,link,title').forEach((el) => el.remove());
});

describe('TjenesteDetaljPage explainer section', () => {
  it('renders the explainer heading, signals and outro link for modernisering-av-fagsystemer', () => {
    renderAt('modernisering-av-fagsystemer');

    expect(
      screen.getByRole('heading', { level: 2, name: 'Hva er et fagsystem, og når må det moderniseres?' })
    ).toBeInTheDocument();

    // Internal /blogg/ links in the explainer render as real links.
    const altinnLink = screen.getByRole('link', { name: 'koblingen til Altinn 3' });
    expect(altinnLink).toHaveAttribute('href', '/blogg/altinn-3-hva-endrer-seg-for-fagsystemet');

    const frameworksLink = screen.getByRole('link', { name: 'lever lenger enn rammeverkene' });
    expect(frameworksLink).toHaveAttribute('href', '/blogg/teknologivalg-for-fagsystemer-som-skal-vare');

    const outroLink = screen.getByRole('link', { name: 'slik moderniserer du et fagsystem modul for modul' });
    expect(outroLink).toHaveAttribute('href', '/blogg/modernisere-fagsystem-uten-driftsstans');

    // Capability bodies go through the same allowlisted renderer.
    const followDataLink = screen.getByRole('link', { name: 'en annen vei inn til dataene' });
    expect(followDataLink).toHaveAttribute('href', '/blogg/fagsystem-uten-api');

    const oneModuleLink = screen.getByRole('link', { name: 'automatiske tester' });
    expect(oneModuleLink).toHaveAttribute('href', '/blogg/testautomatisering-for-fagsystemer');
  });

  it('shows one H1 and the one CTA link to /kontakt, with the shared "Slik vi jobber" link intact', () => {
    renderAt('modernisering-av-fagsystemer');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Modernisering av fagsystemer for offentlig sektor'
    );
    const contactLinks = screen.getAllByRole('link', { name: 'Kontakt oss' });
    expect(contactLinks.some((link) => link.getAttribute('href') === '/kontakt')).toBe(true);
    expect(screen.getByRole('link', { name: 'Slik vi jobber' })).toHaveAttribute('href', '/slik-vi-jobber');
  });

  it.each(Object.keys(servicePages).filter((slug) => slug !== 'modernisering-av-fagsystemer'))(
    'renders %s with no explainer section and one H1 (unaffected by the new optional fields)',
    (slug) => {
      renderAt(slug);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.queryByText('Hva er et fagsystem, og når må det moderniseres?')).not.toBeInTheDocument();
      expect(document.getElementById('explainer-heading')).not.toBeInTheDocument();
    }
  );
});
