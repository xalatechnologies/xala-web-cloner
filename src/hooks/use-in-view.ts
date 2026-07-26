import { useEffect, useRef, useState } from 'react';

/** True when the user has asked for less motion, or when we cannot ask. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface UseInViewOptions {
  /** How much of the element must be visible before it counts. */
  threshold?: number;
  /** Start the reveal slightly before the element reaches the viewport. */
  rootMargin?: string;
  /** Reveal once and stay revealed. Re-animating on scroll-back is nauseating. */
  once?: boolean;
}

/**
 * Reveals an element when it scrolls into view.
 *
 * Sections currently apply `animate-fade-in` on mount, which means everything
 * below the fold has already finished animating by the time it is seen. This
 * fires on intersection instead.
 *
 * Two deliberate fallbacks, both of which return `true` so content is never
 * hidden by a capability check: no IntersectionObserver (jsdom, older
 * browsers), and prefers-reduced-motion, where the element should simply be
 * present without a transition.
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const reduced = prefersReducedMotion();
  const [inView, setInView] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setInView(true);
      return;
    }
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, reduced]);

  return { ref, inView, reduced };
}
