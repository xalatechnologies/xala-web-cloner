import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi } from 'vitest';
import ProdukterPage from '../ProdukterPage';

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
      <MemoryRouter initialEntries={['/produkter']}>
        <ProdukterPage />
      </MemoryRouter>
    </HelmetProvider>
  );
}

/**
 * XWEB-183: at 1280px the display H1 hyphenated "kommune" as "kom-mune".
 * The copy stays the same; hyphenation is off on that heading so the word
 * wraps whole.
 */
describe('ProdukterPage heading', () => {
  it('renders the products H1 with kommune unbroken and hyphenation off', () => {
    renderPage();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Seks produkter for kommune og næringsliv');
    expect(heading.textContent).toContain('kommune');
    expect(heading.textContent).not.toMatch(/kom[\u00AD-]mune/);
    expect(heading.className).toContain('page-heading-no-hyphens');
    // XWEB-194: drop the 20ch clamp so the H1 uses the container. Keep
    // hyphenation off so kommune still wraps as a whole word (XWEB-183).
    expect(heading.className).not.toContain('max-w-[20ch]');
    expect(heading.className).not.toContain('max-w-[18ch]');
  });

  it('defines page-heading-no-hyphens as hyphens: none', () => {
    const css = readFileSync(resolve(__dirname, '../../index.css'), 'utf8');
    expect(css).toMatch(/\.page-heading-no-hyphens\s*\{[^}]*hyphens:\s*none/);
  });
});
