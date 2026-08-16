import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import StatusPage from '../StatusPage';
import { resolveRoute } from '@/components/seo/routeRules';

/**
 * Pins the combined XWEB-6 / XWEB-14 surface: /status and /transparens both
 * exist, /transparency is only an alias of /transparens, and status links to
 * the canonical openness page.
 */
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

describe('status and transparens pages', () => {
  it('resolves both real routes to a SEO page id, not the 404 fallback', () => {
    expect(resolveRoute('/status').pageId).toBe('status');
    expect(resolveRoute('/transparens').pageId).toBe('transparens');
  });

  it('treats /transparency as an alias of /transparens', () => {
    expect(resolveRoute('/transparency').pageId).toBe('transparens');
    expect(resolveRoute('/transparency').pageId).not.toBe('notFound');
  });

  it('links from the status page to the canonical transparens page', () => {
    render(
      <MemoryRouter initialEntries={['/status']}>
        <StatusPage />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === '/transparens');
    expect(links.length).toBeGreaterThan(0);
  });
});
