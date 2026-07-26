import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Navbar from '../Navbar';
import { useMenuItems } from '@/hooks/use-menu-items';

const mockUseMenuItems = vi.mocked(useMenuItems);

vi.mock('@/hooks/use-menu-items');
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));
vi.mock('../navbar/Logo', () => ({ default: () => <div /> }));
vi.mock('../navbar/Controls', () => ({ default: () => <div /> }));
vi.mock('../navbar/NavigationMenu', () => ({
  default: ({ items }: { items: { name: string; href: string }[] }) => (
    <div data-testid="nav-items">
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.name}
        </a>
      ))}
    </div>
  ),
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the real menu items when the query succeeds', () => {
    mockUseMenuItems.mockReturnValue({
      data: [{ id: '1', name: 'Custom Page', href: '/custom', language: 'no', sort_order: 1, parent_id: null }],
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useMenuItems>);

    render(<MemoryRouter><Navbar /></MemoryRouter>);

    expect(screen.getByText('Custom Page')).toBeInTheDocument();
    expect(screen.queryByText('Tjenester')).not.toBeInTheDocument();
  });

  it('falls back to a hardcoded menu when the menu_items query errors', () => {
    mockUseMenuItems.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof useMenuItems>);

    render(<MemoryRouter><Navbar /></MemoryRouter>);

    expect(screen.getByText('Tjenester')).toBeInTheDocument();
    expect(screen.getByText('Kontakt')).toBeInTheDocument();
  });

  it('falls back to a hardcoded menu when the query returns no items', () => {
    mockUseMenuItems.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useMenuItems>);

    render(<MemoryRouter><Navbar /></MemoryRouter>);

    expect(screen.getByText('Tjenester')).toBeInTheDocument();
  });
});
