import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { SurfaceCard, CardIcon } from '../surface-card';

function renderCard(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('SurfaceCard', () => {
  it('renders a plain surface when it is not a link', () => {
    renderCard(<SurfaceCard>innhold</SurfaceCard>);

    expect(screen.getByText('innhold')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('makes the whole surface one link when given a destination', () => {
    renderCard(<SurfaceCard to="/produkter">Produkter</SurfaceCard>);

    const link = screen.getByRole('link', { name: 'Produkter' });
    expect(link).toHaveAttribute('href', '/produkter');
    // The content must live inside the anchor, not beside it — otherwise only
    // part of the card is clickable and keyboard users get a small target.
    expect(link).toContainElement(screen.getByText('Produkter'));
  });

  it('gives the linked card a visible focus ring', () => {
    renderCard(<SurfaceCard to="/caser">Caser</SurfaceCard>);

    expect(screen.getByRole('link').className).toContain('focus-visible:ring-2');
  });

  it('carries the shared surface treatment in both forms', () => {
    const { unmount } = renderCard(<SurfaceCard>a</SurfaceCard>);
    const plain = screen.getByText('a').parentElement!;
    unmount();

    renderCard(<SurfaceCard to="/x">b</SurfaceCard>);
    const linked = screen.getByRole('link');

    for (const cls of ['rounded-2xl', 'border-border', 'bg-card', 'hover:border-primary/50']) {
      expect(plain.className, `plain card missing ${cls}`).toContain(cls);
      expect(linked.className, `linked card missing ${cls}`).toContain(cls);
    }
  });

  it('keeps decorative layers out of the accessibility tree', () => {
    const { container } = renderCard(<SurfaceCard>a</SurfaceCard>);

    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThan(0);
    // Nothing decorative should be focusable or announced.
    hidden.forEach((el) => expect(el.getAttribute('tabindex')).toBeNull());
  });

  it('appends caller classes without dropping the base treatment', () => {
    renderCard(<SurfaceCard className="mt-4">a</SurfaceCard>);

    const card = screen.getByText('a').parentElement!;
    expect(card.className).toContain('mt-4');
    expect(card.className).toContain('rounded-2xl');
  });
});

describe('CardIcon', () => {
  it('renders its icon and hides the halo from assistive tech', () => {
    const { container } = renderCard(
      <SurfaceCard>
        <CardIcon>
          <svg data-testid="icon" />
        </CardIcon>
      </SurfaceCard>
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    // Halo plus the card's hover wash.
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(2);
  });
});
