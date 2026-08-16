import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TransparensPage from '../TransparensPage';

// XWEB-14: the Playwright journey "transparens page exposes uptime or SLA
// metrics" goes to /transparens and expects a heading plus body copy
// mentioning uptime/SLA. This pins that content at the unit level so a
// future edit that drops the wording (or the route) fails fast, without a
// production deploy round trip.
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
    <MemoryRouter initialEntries={['/transparens']}>
      <TransparensPage />
    </MemoryRouter>
  );
}

describe('TransparensPage', () => {
  it('renders a visible primary heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
  });

  it('mentions uptime or SLA in the body copy', () => {
    const { container } = renderPage();
    const body = container.textContent?.toLowerCase() ?? '';
    expect(body).toMatch(/oppetid|uptime|sla|tilgjengelighet|drift/);
  });

  it('does not claim an unsourced 99.99% uptime figure', () => {
    const { container } = renderPage();
    expect(container.textContent ?? '').not.toMatch(/99[,.]99/);
  });
});
