import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ArticleToc from '../ArticleToc';
import { CLICK_SETTLE_MS } from '../useArticleTocActive';
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

function installBrowserFakes() {
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', () => {});
}

function renderToc(headings: TocHeading[] = HEADINGS) {
  return render(
    <div>
      {headings.map((heading) => (
        <h2 key={heading.id} id={heading.id}>
          {heading.text}
        </h2>
      ))}
      <ArticleToc headings={headings} />
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

function mockRect(id: string, top: number, height = 40) {
  const element = document.getElementById(id);
  if (!element) throw new Error(`missing #${id}`);
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    top,
    bottom: top + height,
    left: 0,
    right: 0,
    width: 0,
    height,
    x: 0,
    y: top,
    toJSON() {
      return {};
    },
  });
}

function scrollToEnd() {
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

afterEach(() => {
  observers.length = 0;
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('ArticleToc scroll spy', () => {
  it('marks Vanlige spørsmål active when that heading intersects', () => {
    installBrowserFakes();
    renderToc();

    expect(observers[0].observed.map((element) => element.id)).toContain('vanlige-sporsmal');

    intersect('intro', true);
    intersect('vanlige-sporsmal', true);

    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Innledning')).not.toHaveAttribute('aria-current');
  });

  it('marks Vanlige spørsmål active on click and keeps it when the page is at the end', () => {
    installBrowserFakes();
    renderToc();

    fireEvent.click(link('Vanlige spørsmål'));
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');

    // Headings that pass through the band while the scroll runs must not
    // steal the row the reader just chose.
    intersect('krav', true);
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Kravet')).not.toHaveAttribute('aria-current');

    // Below the band (top 30% of 800px is 240). Only the end rule keeps it.
    mockRect('vanlige-sporsmal', 500);
    setScrollPosition(1000, 1804, 800);

    act(() => {
      window.dispatchEvent(new Event('scrollend'));
    });

    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Kravet')).not.toHaveAttribute('aria-current');
  });

  it('keeps the earlier heading that intersects when the page is not at the end', () => {
    installBrowserFakes();
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
    installBrowserFakes();
    renderToc();

    intersect('krav', true);
    expect(link('Kravet')).toHaveAttribute('aria-current', 'true');

    setScrollPosition(1400, 1704, 300);
    scrollToEnd();

    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Kravet')).not.toHaveAttribute('aria-current');

    // An earlier heading still reporting intersection must not win at the end.
    intersect('krav', true);
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
  });

  it('releases the click lock so a later heading can become active', () => {
    installBrowserFakes();
    renderToc();

    fireEvent.click(link('Vanlige spørsmål'));
    intersect('krav', true);
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');

    mockRect('vanlige-sporsmal', 500);
    setScrollPosition(100, 5000, 800);
    act(() => {
      window.dispatchEvent(new Event('scrollend'));
    });

    intersect('krav', true);
    expect(link('Kravet')).toHaveAttribute('aria-current', 'true');
    expect(link('Vanlige spørsmål')).not.toHaveAttribute('aria-current');
  });

  it('leaves the FAQ when the page scrolls up from the bottom', () => {
    installBrowserFakes();
    renderToc();

    setScrollPosition(1400, 1704, 300);
    scrollToEnd();
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');

    setScrollPosition(400, 5000, 800);
    scrollToEnd();
    intersect('intro', true);

    expect(link('Innledning')).toHaveAttribute('aria-current', 'true');
    expect(link('Vanlige spørsmål')).not.toHaveAttribute('aria-current');
  });

  it('drops a clicked row that is on screen but outside the band', () => {
    installBrowserFakes();
    renderToc();

    fireEvent.click(link('Vanlige spørsmål'));
    // On screen (top < 800) but below the band, which ends at 240.
    mockRect('vanlige-sporsmal', 500);
    setScrollPosition(100, 5000, 800);

    act(() => {
      window.dispatchEvent(new Event('scrollend'));
    });

    expect(link('Vanlige spørsmål')).not.toHaveAttribute('aria-current');
  });

  it('keeps the clicked row when it is in the band and the page is not at the end', () => {
    installBrowserFakes();
    renderToc();

    fireEvent.click(link('Kravet'));
    mockRect('krav', 120);
    setScrollPosition(100, 5000, 800);

    act(() => {
      window.dispatchEvent(new Event('scrollend'));
    });

    expect(link('Kravet')).toHaveAttribute('aria-current', 'true');
  });

  it('prefers the last heading when a click releases at the end of the page', () => {
    installBrowserFakes();
    renderToc();

    fireEvent.click(link('Innledning'));
    mockRect('intro', 120);
    setScrollPosition(1000, 1804, 800);

    act(() => {
      window.dispatchEvent(new Event('scrollend'));
    });

    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');
    expect(link('Innledning')).not.toHaveAttribute('aria-current');
  });

  it('releases a click that never scrolls once the settle time has passed', () => {
    vi.useFakeTimers();
    installBrowserFakes();
    renderToc();

    fireEvent.click(link('Vanlige spørsmål'));
    act(() => {
      vi.advanceTimersByTime(CLICK_SETTLE_MS - 1);
    });
    intersect('krav', true);
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    intersect('krav', true);
    expect(link('Kravet')).toHaveAttribute('aria-current', 'true');
    expect(link('Vanlige spørsmål')).not.toHaveAttribute('aria-current');
  });

  it('clears the active row when the heading list changes', () => {
    installBrowserFakes();
    const { rerender } = renderToc();

    intersect('vanlige-sporsmal', true);
    expect(link('Vanlige spørsmål')).toHaveAttribute('aria-current', 'true');

    const next: TocHeading[] = [
      { id: 'annet', text: 'Annet' },
      { id: 'vanlige-sporsmal', text: 'Vanlige spørsmål' },
    ];
    rerender(
      <div>
        {next.map((heading) => (
          <h2 key={heading.id} id={heading.id}>
            {heading.text}
          </h2>
        ))}
        <ArticleToc headings={next} />
      </div>,
    );

    expect(link('Vanlige spørsmål')).not.toHaveAttribute('aria-current');
    expect(link('Annet')).not.toHaveAttribute('aria-current');
  });
});
