import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductsTeaser from '../ProductsTeaser';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

describe('ProductsTeaser', () => {
  it('keeps min-w-0 on every products card chain', () => {
    render(
      <MemoryRouter>
        <ProductsTeaser />
      </MemoryRouter>
    );

    const cards = screen.getAllByRole('listitem');
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      const link = card.querySelector(':scope > a');
      const row = link?.querySelector(':scope > div');
      const heading = row?.querySelector(':scope > h3');
      expect(card).toHaveClass('min-w-0');
      expect(link).toHaveClass('min-w-0');
      expect(row).toHaveClass('min-w-0');
      expect(heading).toHaveClass('min-w-0');
    }
  });
});
