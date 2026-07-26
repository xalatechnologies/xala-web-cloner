import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Section } from '../section';
import { prefersReducedMotion } from '@/hooks/use-in-view';

/** jsdom has no IntersectionObserver; the hook must cope, so control it here. */
const observers: Array<{ callback: IntersectionObserverCallback; disconnect: () => void }> = [];

function installObserver() {
  const disconnect = vi.fn();
  class FakeObserver {
    callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
      observers.push({ callback, disconnect });
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = disconnect;
    takeRecords = () => [];
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  vi.stubGlobal('IntersectionObserver', FakeObserver as unknown as typeof IntersectionObserver);
}

function setReducedMotion(reduce: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  observers.length = 0;
  setReducedMotion(false);
  installObserver();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const sectionEl = () => document.querySelector('section')!;

describe('Section rhythm', () => {
  it('uses one padding scale rather than a free-form value', () => {
    const { unmount } = render(<Section size="sm">a</Section>);
    expect(sectionEl().className).toContain('py-16');
    unmount();

    render(<Section size="lg">b</Section>);
    expect(sectionEl().className).toContain('py-24');
  });

  it('offers exactly the three tones, and dark carries light text', () => {
    const { unmount } = render(<Section tone="muted">a</Section>);
    expect(sectionEl().className).toContain('bg-muted/30');
    unmount();

    render(<Section tone="dark">b</Section>);
    // A dark section in both colour schemes must not rely on text-foreground.
    expect(sectionEl().className).toContain('text-white');
    expect(sectionEl().className).toContain('from-slate-900');
  });

  it('renders its children inside a container', () => {
    render(<Section>content</Section>);
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(document.querySelector('section > .container')).not.toBeNull();
  });

  it('associates a heading with the section for screen readers', () => {
    render(
      <Section id="faq" labelledBy="faq-heading">
        <h2 id="faq-heading">Spørsmål</h2>
      </Section>
    );
    expect(sectionEl()).toHaveAttribute('aria-labelledby', 'faq-heading');
  });
});

describe('Section reveal', () => {
  it('starts hidden and reveals once it intersects', () => {
    render(<Section>content</Section>);

    expect(sectionEl().className).toContain('opacity-0');

    act(() => {
      observers[0].callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(sectionEl().className).toContain('opacity-100');
  });

  it('never hides content when reveal is off', () => {
    render(<Section reveal={false}>content</Section>);

    expect(sectionEl().className).not.toContain('opacity-0');
  });

  it('shows content immediately when the user prefers reduced motion', () => {
    setReducedMotion(true);
    render(<Section>content</Section>);

    // No transition classes, and nothing starts invisible.
    expect(prefersReducedMotion()).toBe(true);
    expect(sectionEl().className).not.toContain('opacity-0');
    expect(sectionEl().className).not.toContain('transition-');
  });

  it('shows content when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<Section>content</Section>);

    // A capability gap must never leave the page blank.
    expect(sectionEl().className).toContain('opacity-100');
  });
});
