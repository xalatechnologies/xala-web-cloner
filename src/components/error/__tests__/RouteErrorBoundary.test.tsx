import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RouteErrorBoundary, { RELOAD_KEY } from '../RouteErrorBoundary';

/**
 * Guards the containment of a failed route.
 *
 * On 21 Aug 2026 a reader on xala.no clicked through to /caser while a deploy
 * was landing. `assets/CaserPage-BJrlDSWZ.js` answered 404, the rejected
 * dynamic import surfaced as an uncaught TypeError, and the page went blank —
 * the run's no-page-errors check failed on that exception.
 *
 * Three things have to stay true: the error never leaves the boundary, a stale
 * chunk reloads the document exactly once, and any other failure renders a
 * readable page rather than looping or blanking.
 */
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

const CHUNK_ERROR =
  'Failed to fetch dynamically imported module: https://xala.no/assets/CaserPage-BJrlDSWZ.js';

const reload = vi.fn();

function Boom({ message }: { message: string }): JSX.Element {
  throw new Error(message);
}

beforeEach(() => {
  reload.mockClear();
  window.sessionStorage.clear();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, pathname: '/caser', reload },
  });
  // React logs every error a boundary catches; the test is about the boundary.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('RouteErrorBoundary', () => {
  it('renders its children when nothing throws', () => {
    render(
      <RouteErrorBoundary>
        <p>Caser</p>
      </RouteErrorBoundary>
    );

    expect(screen.getByText('Caser')).toBeInTheDocument();
  });

  it('catches a missing route chunk instead of letting it reach the window', () => {
    expect(() =>
      render(
        <RouteErrorBoundary>
          <Boom message={CHUNK_ERROR} />
        </RouteErrorBoundary>
      )
    ).not.toThrow();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('reloads the document once for a chunk a deploy has replaced', () => {
    render(
      <RouteErrorBoundary>
        <Boom message={CHUNK_ERROR} />
      </RouteErrorBoundary>
    );

    expect(reload).toHaveBeenCalledTimes(1);
    expect(window.sessionStorage.getItem(RELOAD_KEY)).toBe('1');
  });

  it('does not reload a second time, so a chunk that is truly gone cannot loop', () => {
    window.sessionStorage.setItem(RELOAD_KEY, '1');

    render(
      <RouteErrorBoundary>
        <Boom message={CHUNK_ERROR} />
      </RouteErrorBoundary>
    );

    expect(reload).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('shows a page with somewhere to go for any other error', () => {
    render(
      <RouteErrorBoundary>
        <Boom message="Cannot read properties of undefined" />
      </RouteErrorBoundary>
    );

    expect(reload).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ops!');
    expect(screen.getByRole('link', { name: 'Til forsiden' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Prøv igjen' })).toHaveAttribute('href', '/caser');
  });
});
