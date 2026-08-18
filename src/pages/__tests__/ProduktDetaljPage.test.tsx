import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ProduktDetaljPage from '../ProduktDetaljPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback?: string) => fallback ?? _key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

function renderAt(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/produkter/:slug" element={<ProduktDetaljPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

afterEach(() => {
  document.head.querySelectorAll('script,meta,link,title').forEach((el) => el.remove());
});

describe('ProduktDetaljPage', () => {
  it.each([
    'bevillingsportal',
    'tilskuddsportal',
    'redusert-foreldrebetaling',
    'arkitekturprinsipper',
    'digilist',
    'digiskjema',
    'xaheen',
  ])(
    'renders /produkter/%s with site chrome',
    (slug) => {
      renderAt(`/produkter/${slug}`);
      expect(document.querySelector('nav')).toBeTruthy();
      expect(document.querySelector('footer')).toBeTruthy();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    }
  );

  it('keeps Xaheen reachable while the listed portals use the real slugs', () => {
    renderAt('/produkter/bevillingsportal');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bevillingsportal');
    const contact = screen.getAllByRole('link').filter((link) => link.getAttribute('href') === '/kontakt');
    expect(contact.length).toBeGreaterThan(0);
  });
});
