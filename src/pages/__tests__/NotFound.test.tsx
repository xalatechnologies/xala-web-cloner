import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import NotFound from '../NotFound';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/finnes-ikke']}>
      <NotFound />
    </MemoryRouter>
  );
}

function hrefs() {
  return screen.getAllByRole('link').map((el) => el.getAttribute('href'));
}

describe('NotFound', () => {
  it('keeps the 404 heading and existing copy', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('error.pageNotFound');
    expect(screen.getByRole('button', { name: 'common.goBack' })).toBeInTheDocument();
  });

  it('includes site nav links to home, caser, blogg and kontakt', () => {
    renderPage();

    const links = hrefs();
    expect(links).toContain('/');
    expect(links).toContain('/caser');
    expect(links).toContain('/blogg');
    expect(links).toContain('/kontakt');
  });

  it('still shows footer legal links', () => {
    renderPage();

    const links = hrefs();
    expect(links).toContain('/privacy');
    expect(links).toContain('/terms');
    expect(links).toContain('/cookies');
    expect(document.querySelector('footer')).toBeTruthy();
    expect(document.querySelector('nav')).toBeTruthy();
  });
});
