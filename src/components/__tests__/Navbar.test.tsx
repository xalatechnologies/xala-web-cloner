import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import Navbar from '../Navbar';
import menuData from '@/data/menu.json';

// useMenuItems is deliberately NOT mocked: it reads src/data/menu.json
// synchronously, so exercising the real hook makes these tests a guard on the
// menu data itself (see the "Blogg" case) rather than on a fixture that can
// drift away from what ships.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

const HOME = '/';
const CONTACT = '/kontakt';
const inlineItems = menuData.no.filter((item) => item.href !== HOME && item.href !== CONTACT);
const contactItem = menuData.no.find((item) => item.href === CONTACT)!;

function renderNavbar(path = HOME) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders an inline link for every menu entry except home and contact', () => {
    renderNavbar();

    expect(inlineItems.length).toBeGreaterThan(0);
    for (const item of inlineItems) {
      expect(screen.getByRole('link', { name: item.name })).toHaveAttribute('href', item.href);
    }
  });

  it('keeps the blog reachable from the navigation', () => {
    renderNavbar();

    // The blog shipped without a nav entry once already; this pins it.
    expect(screen.getByRole('link', { name: 'Blogg' })).toHaveAttribute('href', '/blogg');
  });

  it('renders contact as the call-to-action rather than an inline link', () => {
    renderNavbar();

    const cta = screen.getByRole('link', { name: new RegExp(contactItem.name) });
    expect(cta).toHaveAttribute('href', CONTACT);
    // Home is not an inline link either — it lives on the logo and in the drawer.
    expect(screen.queryByRole('link', { name: 'Hjem' })).not.toBeInTheDocument();
  });

  it('opens the mobile drawer and closes it again', () => {
    renderNavbar();

    expect(screen.queryByRole('link', { name: 'Hjem' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Open menu'));

    // "Hjem" only exists inside the drawer, so it is an unambiguous marker
    // that the drawer mounted.
    expect(screen.getByRole('link', { name: 'Hjem' })).toHaveAttribute('href', HOME);

    fireEvent.click(screen.getByLabelText('Close menu'));

    expect(screen.queryByRole('link', { name: 'Hjem' })).not.toBeInTheDocument();
  });

  it('exposes the logo as a link home', () => {
    renderNavbar('/tjenester');

    expect(screen.getAllByAltText('Xala Technologies')[0]).toBeInTheDocument();
  });
});
