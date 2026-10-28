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
  it('gives every product card min-w-0', () => {
    render(
      <MemoryRouter>
        <ProductsTeaser />
      </MemoryRouter>
    );

    const cards = screen.getAllByRole('listitem');
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      expect(card).toHaveClass('min-w-0');
    }
  });
});
