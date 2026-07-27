import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import StatusPage from '../StatusPage';
import TransparencyPage from '../TransparencyPage';
import { resolveRoute } from '@/components/seo/routeRules';

/**
 * Pins XWEB-6: /status and /transparency both need to exist and to link to
 * each other, or the "status and transparency pages cross-link operational
 * metrics" E2E journey 404s again.
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

describe('status and transparency pages', () => {
  it('resolves both routes to a real SEO page id, not the 404 fallback', () => {
    expect(resolveRoute('/status').pageId).toBe('status');
    expect(resolveRoute('/transparency').pageId).toBe('transparency');
  });

  it('links from the status page to the transparency page', () => {
    render(
      <MemoryRouter initialEntries={['/status']}>
        <StatusPage />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === '/transparency');
    expect(links.length).toBeGreaterThan(0);
  });

  it('links from the transparency page back to the status page', () => {
    render(
      <MemoryRouter initialEntries={['/transparency']}>
        <TransparencyPage />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === '/status');
    expect(links.length).toBeGreaterThan(0);
  });
});
