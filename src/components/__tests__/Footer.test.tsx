import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';
import '@/i18n/config';

describe('Footer legal row', () => {
  it('labels the cookies link Informasjonskapsler and keeps /cookies', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const cookies = screen.getByRole('link', { name: 'Informasjonskapsler' });
    expect(cookies).toHaveAttribute('href', '/cookies');
    expect(screen.queryByRole('link', { name: 'Cookies' })).not.toBeInTheDocument();
  });
});
