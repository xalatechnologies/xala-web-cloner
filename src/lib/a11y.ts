export function initA11y() {
  if (import.meta.env.MODE === 'development' && typeof window !== 'undefined') {
    import('@axe-core/react').then(({ default: axe }) => {
      if (window.React) {
        axe(window.React, 1000);
      }
    }).catch(() => {
      // Silently fail if axe-core is not available
      console.warn('Accessibility testing library not available');
    });
  }
}


