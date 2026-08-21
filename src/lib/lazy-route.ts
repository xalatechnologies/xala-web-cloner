import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * `React.lazy` for a route chunk, with the stale-deploy case handled.
 *
 * Every route in App.tsx is code-split, so the chunk filename a visitor's tab
 * knows about — `assets/CaserPage-BJrlDSWZ.js` — is the one that was current
 * when their copy of index.html was served. deploy.sh ships each build into a
 * fresh `releases/rel-<ts>/` and flips a symlink, so the moment a new release
 * goes live the old filenames are no longer under the served root. A tab that
 * was open across the flip asks for a chunk that is not there any more.
 *
 * That is not a hypothetical. On 21 Aug 2026 a reader on xala.no scrolled the
 * homepage, clicked through to /caser, and got a 404 on
 * `assets/CaserPage-BJrlDSWZ.js`. The rejected import came back out of `lazy()`
 * as an uncaught `TypeError: Failed to fetch dynamically imported module`,
 * nothing was mounted to catch it, and React unmounted the tree — a blank white
 * page with no heading, no text, and no way forward.
 *
 * The HTML is what is stale, so reloading the document is the fix: the reload
 * revalidates index.html, gets the new release's chunk names, and the route
 * loads. The visitor lands on the URL they clicked instead of on nothing.
 *
 * Guarded by a sessionStorage flag so a chunk that is genuinely missing —
 * a broken build rather than a superseded one — fails once and reports itself,
 * rather than reloading the page forever.
 */
const RELOAD_FLAG = 'xala-chunk-reloaded';

/** sessionStorage throws in some privacy modes; a failed read means "not yet". */
function alreadyReloaded(): boolean {
  try {
    return window.sessionStorage.getItem(RELOAD_FLAG) === 'true';
  } catch {
    return false;
  }
}

function markReloaded(): void {
  try {
    window.sessionStorage.setItem(RELOAD_FLAG, 'true');
  } catch {
    // Nothing to do: without storage the guard cannot arm, and one extra
    // reload is still better than a blank page.
  }
}

export function clearReloadFlag(): void {
  try {
    window.sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    // Same as above — best effort.
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyRoute<T extends ComponentType<any>>(
  load: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(() =>
    load().catch((error: unknown) => {
      if (typeof window === 'undefined' || alreadyReloaded()) throw error;
      markReloaded();
      window.location.reload();
      // The document is on its way out. Resolving anything here would render a
      // route into a page that is about to be replaced, and rejecting would put
      // the blank screen back; so this promise simply never settles and the
      // Suspense fallback stays up until the reload lands.
      return new Promise<{ default: T }>(() => {});
    })
  );
}
