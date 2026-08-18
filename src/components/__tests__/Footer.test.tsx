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

  it('labels the solutions /caser link Caser, not Cases', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const caser = screen.getByRole('link', { name: 'Caser' });
    expect(caser).toHaveAttribute('href', '/caser');
    expect(screen.queryByRole('link', { name: 'Cases' })).not.toBeInTheDocument();
  });

  it('points a crawlable footer link at /faq', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const faq = screen.getByRole('link', { name: 'Ofte stilte spørsmål' });
    expect(faq).toHaveAttribute('href', '/faq');
  });
});
