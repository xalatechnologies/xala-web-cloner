import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BookDemoPage from '../BookDemoPage';

// Pins XWEB-4: production served a real 404 for /book-demo because no route,
// page or STATIC_ROUTES entry existed for it (see App.tsx, routeRules.ts,
// feeds.ts). This renders the page component the route now points at and
// checks the form the E2E journey depends on is actually there.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/book-demo']}>
      <BookDemoPage />
    </MemoryRouter>
  );
}

describe('BookDemoPage', () => {
  beforeEach(() => {
    vi.stubGlobal('open', vi.fn());
  });

  it('renders a heading, name + email inputs and a submit button', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('contact.form.name.placeholder')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('contact.form.email.placeholder')
    ).toHaveAttribute('type', 'email');
    expect(screen.getByRole('button', { name: 'contact.form.status.send' })).toBeInTheDocument();
  });

  it('accepts typed input without submitting anything', () => {
    renderPage();

    const name = screen.getByPlaceholderText('contact.form.name.placeholder') as HTMLInputElement;
    const email = screen.getByPlaceholderText('contact.form.email.placeholder') as HTMLInputElement;

    fireEvent.change(name, { target: { value: 'Jane Doe' } });
    fireEvent.change(email, { target: { value: 'jane@example.com' } });

    expect(name).toHaveValue('Jane Doe');
    expect(email).toHaveValue('jane@example.com');
    // Typing into the fields must never hand anything off on its own —
    // only clicking submit may do that, and this test never clicks it.
    expect(window.open).not.toHaveBeenCalled();
  });
});
