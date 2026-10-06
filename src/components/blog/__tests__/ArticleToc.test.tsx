import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ArticleToc from '../ArticleToc';
import type { TocHeading } from '@/lib/blog/toc';

/**
 * jsdom has no IntersectionObserver. The scroll-spy stores the callback so a
 * test can deliver the entries a real scroll would.
 */
const observers: Array<{
  callback: IntersectionObserverCallback;
  observed: Element[];
}> = [];

class FakeIntersectionObserver {
  callback: IntersectionObserverCallback;
  observed: Element[] = [];
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observers.push(this);
  }
  observe(element: Element) {
    this.observed.push(element);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

const HEADINGS: TocHeading[] = [
  { id: 'intro', text: 'Innledning' },
  { id: 'krav', text: 'Kravet' },
  { id: 'vanlige-sporsmal', text: 'Vanlige spørsmål' },
];

function renderToc() {
  return render(
    <div>
      <h2 id="intro">Innledning</h2>
      <h2 id="krav">Kravet</h2>
      <h2 id="vanlige-sporsmal">Vanlige spørsmål</h2>
      <ArticleToc headings={HEADINGS} />
    </div>,
  );
}

function link(name: string) {
  return screen.getByRole('link', { name });
}

function intersect(id: string, isIntersecting: boolean) {
  const target = document.getElementById(id);
  if (!target) throw new Error(`missing #${id}`);
  act(() => {
    observers[0].callback(
      [{ isIntersecting, target } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

function setScrollPosition(y: number, scrollHeight: number, innerHeight: number) {
  vi.spyOn(window, 'scrollY', 'get').mockReturnValue(y);
  vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(innerHeight);
  vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(scrollHeight);
}

afterEach(() => {
  observers.length = 0;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('ArticleToc scroll spy', () => {
  it('marks Vanlige spørsmål active when that heading intersects', () => {
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    renderToc();

    expect(observers[0].observed.map((element) => element.id)).toContain('vanlige-sporsmal');

    intersect('intro', true);
    intersect('vanlige-sporsmal', true);

    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Innledning')).not.toHaveAttribute('aria-current');
  });

  it('marks Vanlige spørsmål active on click and keeps it after the scroll settles', () => {
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    renderToc();

    fireEvent.click(link('Vanlige spørsmål'));
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');

    // Headings that pass through the band while the smooth scroll runs
    // must not steal the row the reader just chose.
    intersect('krav', true);
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Kravet')).not.toHaveAttribute('aria-current');

    const faq = document.getElementById('vanlige-sporsmal')!;
    vi.spyOn(faq, 'getBoundingClientRect').mockReturnValue({
      top: 128,
      bottom: 168,
      left: 0,
      right: 0,
      width: 0,
      height: 40,
      x: 0,
      y: 128,
      toJSON() {
        return {};
      },
    });
    // Scrolled as far as the page allows: the FAQ heading sits in view,
    // below the spy band, because nothing is left underneath it.
    setScrollPosition(1000, 1804, 800);

    act(() => {
      window.dispatchEvent(new Event('scrollend'));
    });

    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Kravet')).not.toHaveAttribute('aria-current');
  });

  it('keeps the earlier heading that intersects when the page is not at the end', () => {
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    renderToc();

    intersect('intro', true);
    expect(link('Innledning')).toHaveAttribute('aria-current', 'true');
    expect(link('Kravet')).not.toHaveAttribute('aria-current');
    expect(link('Vanlige spørsmål')).not.toHaveAttribute('aria-current');

    intersect('krav', true);
    expect(link('Kravet')).toHaveAttribute('aria-current', 'true');
    expect(link('Innledning')).not.toHaveAttribute('aria-current');

    // Leaving the band does not clear the current row. The next heading
    // takes over only when it actually intersects.
    intersect('krav', false);
    expect(link('Kravet')).toHaveAttribute('aria-current', 'true');

    intersect('intro', true);
    expect(link('Innledning')).toHaveAttribute('aria-current', 'true');
    expect(link('Vanlige spørsmål')).not.toHaveAttribute('aria-current');
  });

  it('activates the last heading when the page is scrolled to the end', () => {
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    renderToc();

    intersect('krav', true);
    expect(link('Kravet')).toHaveAttribute('aria-current', 'true');

    // FAQ is on screen, but the page cannot lift it into the spy band.
    setScrollPosition(1400, 1704, 300);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Kravet')).not.toHaveAttribute('aria-current');

    // An earlier heading still reporting intersection must not win at the end.
    intersect('krav', true);
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
  });
});
