/**
 * Wires axe-core's dev-time accessibility reporter.
 *
 * This previously read `window.React`, which this app never assigns, so the
 * guard was always false and axe never ran. It also called axe with two
 * arguments; the signature is (React, ReactDOM, timeout). Both are fixed by
 * importing the two modules directly.
 */
export function initA11y() {
  if (import.meta.env.MODE === 'development' && typeof window !== 'undefined') {
    Promise.all([import('@axe-core/react'), import('react'), import('react-dom')])
      .then(([{ default: axe }, React, ReactDOM]) => {
        axe(React, ReactDOM, 1000);
      })
      .catch(() => {
        // Dev-only tooling: never let a missing reporter break the app.
        console.warn('Accessibility testing library not available');
      });
  }
}


