import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProcessTeaser from '../ProcessTeaser';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

describe('ProcessTeaser', () => {
  it('keeps min-w-0 on every process card chain', () => {
    render(
      <MemoryRouter>
        <ProcessTeaser />
      </MemoryRouter>
    );

    // These cards are not links. The chain is the li, the title row, and the h3.
    const cards = screen.getAllByRole('listitem');
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      expect(card.querySelector('a')).toBeNull();
      const row = card.querySelector(':scope > div');
      const heading = row?.querySelector(':scope > h3');
      expect(card).toHaveClass('min-w-0');
      expect(row).toHaveClass('min-w-0');
      expect(heading).toHaveClass('min-w-0');
    }
  });
});
