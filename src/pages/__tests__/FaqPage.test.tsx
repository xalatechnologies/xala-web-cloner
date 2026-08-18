import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi, afterEach } from 'vitest';
import FaqPage from '../FaqPage';
import faqData from '@/data/faq.json';
import { STATIC_ROUTES } from '@/lib/blog/feeds';
import { CANONICAL_ALIASES, resolveRoute } from '@/components/seo/routeRules';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback?: string) => fallback ?? _key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

function jsonLdBlocks() {
  return [...document.head.querySelectorAll('script[type="application/ld+json"]')].map((el) =>
    JSON.parse(el.textContent ?? '')
  );
}

function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/faq']}>
        <FaqPage />
      </MemoryRouter>
    </HelmetProvider>
  );
}

afterEach(() => {
  document.head.querySelectorAll('script,meta,link,title').forEach((el) => el.remove());
});

describe('FaqPage', () => {
  it('is a real route in STATIC_ROUTES, not an alias of /priser', () => {
    expect(STATIC_ROUTES.map((route) => route.path)).toContain('/faq');
    expect(CANONICAL_ALIASES['/faq']).toBeUndefined();
    expect(resolveRoute('/faq').pageId).toBe('faq');
    expect(resolveRoute('/faq').pageId).not.toBe('pricing');
  });

  it('renders a page heading and the existing FAQ copy', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ofte stilte spørsmål');
    for (const faq of faqData.no) {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    }
  });

  it('emits one FAQPage graph for the questions on the page', async () => {
    renderPage();

    await waitFor(() => expect(jsonLdBlocks().some((block) => block['@type'] === 'FAQPage')).toBe(true));

    const faqPages = jsonLdBlocks().filter((block) => block['@type'] === 'FAQPage');
    expect(faqPages).toHaveLength(1);
    expect(faqPages[0].mainEntity).toHaveLength(faqData.no.length);
  });

  it('is linked from the prerendered main nav so a crawler can reach it', () => {
    const prerender = readFileSync(resolve(__dirname, '../../../scripts/prerender-blog.ts'), 'utf8');
    expect(prerender).toContain('href: "/faq"');
    expect(prerender).toContain('generateFAQSchema');
  });

  it('does not invent uptime or SLA figures', () => {
    const { container } = renderPage();
    expect(container.textContent ?? '').not.toMatch(/99[,.]99/);
  });
});
