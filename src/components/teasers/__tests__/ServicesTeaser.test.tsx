import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ServicesTeaser from '../ServicesTeaser';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

describe('ServicesTeaser', () => {
  it('gives every card heading min-w-0', () => {
    render(
      <MemoryRouter>
        <ServicesTeaser />
      </MemoryRouter>
    );

    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThan(0);
    for (const heading of headings) {
      expect(heading).toHaveClass('min-w-0');
    }
  });
});
