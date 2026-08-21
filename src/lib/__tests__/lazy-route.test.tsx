import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Component, Suspense, type ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearReloadFlag, lazyRoute } from '../lazy-route';

/**
 * Guards the recovery path for a code-split route whose chunk is gone.
 *
 * On 21 Aug 2026 a reader clicked from the xala.no homepage to /caser while a
 * deploy was landing. `assets/CaserPage-BJrlDSWZ.js` answered 404, the rejected
 * dynamic import surfaced as an uncaught TypeError, and the page went blank.
 *
 * Two things have to stay true: a failed chunk reloads the document exactly
 * once, and a second failure after that reload is allowed to throw rather than
 * putting the tab in a reload loop.
 */
const reload = vi.fn();

beforeEach(() => {
  clearReloadFlag();
  reload.mockClear();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, reload },
  });
});

afterEach(() => {
  clearReloadFlag();
});

/** What a 404 on a chunk actually throws in the browser. */
const chunkGone = () =>
  Promise.reject(
    new TypeError(
      'Failed to fetch dynamically imported module: https://xala.no/assets/CaserPage-BJrlDSWZ.js'
    )
  );

type Loader = () => Promise<{ default: () => JSX.Element }>;

/** Minimal boundary: renders the error text so a rethrow is observable. */
class Boundary extends Component<{ children: ReactNode }, { message: string | null }> {
  state = { message: null as string | null };

  static getDerivedStateFromError(error: Error) {
    return { message: error.message };
  }

  render() {
    return this.state.message ? <p>{this.state.message}</p> : this.props.children;
  }
}

describe('lazyRoute', () => {
  it('renders the route when the chunk loads', async () => {
    const Route = lazyRoute(async () => ({ default: () => <p>Caser</p> }));

    render(
      <Suspense fallback={<p>laster</p>}>
        <Route />
      </Suspense>
    );

    expect(await screen.findByText('Caser')).toBeInTheDocument();
    expect(reload).not.toHaveBeenCalled();
  });

  it('reloads the document when the chunk is missing, and keeps the fallback up', async () => {
    const Route = lazyRoute(chunkGone as Loader);

    render(
      <Suspense fallback={<p>laster</p>}>
        <Route />
      </Suspense>
    );

    await waitFor(() => expect(reload).toHaveBeenCalledTimes(1));
    // Never settling is the point: the visitor waits on the reload rather than
    // watching the tree unmount into a blank page.
    expect(screen.getByText('laster')).toBeInTheDocument();
  });

  it('reloads only once, so a genuinely missing chunk cannot loop', async () => {
    const First = lazyRoute(chunkGone as Loader);
    const { unmount } = render(
      <Boundary>
        <Suspense fallback={<p>laster</p>}>
          <First />
        </Suspense>
      </Boundary>
    );
    await waitFor(() => expect(reload).toHaveBeenCalledTimes(1));
    unmount();

    // Same session, chunk still missing: the flag is armed, so the rejection is
    // allowed through to an error boundary instead of reloading again.
    const Second = lazyRoute(chunkGone as Loader);
    render(
      <Boundary>
        <Suspense fallback={<p>laster</p>}>
          <Second />
        </Suspense>
      </Boundary>
    );

    expect(await screen.findByText(/Failed to fetch dynamically imported module/)).toBeInTheDocument();
    expect(reload).toHaveBeenCalledTimes(1);
  });
});

describe('App routes', () => {
  it('loads every route through lazyRoute rather than bare lazy()', () => {
    // A route added with `lazy()` would be the one that still blanks the page.
    const app = readFileSync(resolve(__dirname, '../../App.tsx'), 'utf8');
    expect(app).not.toMatch(/=\s*lazy\(/);
    expect(app.match(/=\s*lazyRoute\(/g)?.length ?? 0).toBeGreaterThanOrEqual(20);
  });
});
