import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
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

let location: { pathname: string; search: string } | null = null;

/** Where the router ended up, as a path a reader could paste into the bar. */
function currentLocation() {
  return location ? `${location.pathname}${location.search}` : null;
}

function LocationProbe() {
  location = useLocation();
  return null;
}

function renderNavbar(path = HOME) {
  location = null;
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
      <LocationProbe />
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

  it('offers a search box that hands the query to the article index', () => {
    renderNavbar();

    // The front page shipped with no search box at all: search lived on /blogg
    // and /caser, so a reader who landed anywhere else had nowhere to type.
    const box = screen.getByRole('searchbox', { name: 'Søk i artikler' });

    fireEvent.change(box, { target: { value: '  tilskuddsportal  ' } });
    fireEvent.submit(box.closest('form')!);

    expect(currentLocation()).toBe('/blogg?q=tilskuddsportal');
  });

  it('sends an empty search to the article index rather than nowhere', () => {
    renderNavbar();

    fireEvent.submit(screen.getByRole('searchbox', { name: 'Søk i artikler' }).closest('form')!);

    expect(currentLocation()).toBe('/blogg');
  });

  it('offers no language picker, because the site is Norwegian only', () => {
    renderNavbar();

    // The picker switched language client-side on one URL, so Google only ever
    // had a Norwegian page to index and the English and Arabic copy earned no
    // search traffic while costing 66 KB in every bundle. Removing it is the
    // decision; this is what stops a future change quietly reintroducing a
    // switcher without the prefixed URLs and hreflang that would make it work.
    for (const name of ['Norsk', 'English', 'العربية']) {
      expect(screen.queryByRole('button', { name })).not.toBeInTheDocument();
    }
    expect(screen.queryByRole('group', { name: /språk|language/i })).not.toBeInTheDocument();
  });

  it('exposes the logo as a link home', () => {
    renderNavbar('/tjenester');

    expect(screen.getAllByAltText('Xala Technologies')[0]).toBeInTheDocument();
  });
});
