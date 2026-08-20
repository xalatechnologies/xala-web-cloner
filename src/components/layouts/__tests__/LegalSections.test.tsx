import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LegalSections from '../LegalSections';

describe('LegalSections', () => {
  it('turns a markdown internal path into a cookies link', () => {
    render(
      <MemoryRouter>
        <LegalSections
          sections={[
            {
              id: 'collection',
              title: 'Innsamling',
              items: [
                {
                  id: 'cookies',
                  title: 'Informasjonskapsler',
                  content:
                    'Nødvendige kapsler lastes for at siden skal virke. Se [informasjonskapsler](/cookies).',
                },
              ],
            },
          ]}
        />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'informasjonskapsler' });
    expect(link).toHaveAttribute('href', '/cookies');
  });
});
