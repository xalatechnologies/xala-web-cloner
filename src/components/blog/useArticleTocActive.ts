import { useEffect, useRef, useState } from 'react';
import type { TocHeading } from '@/lib/blog/toc';

/**
 * Spy band, just under the sticky header.
 *
 * The bottom root margin keeps the band in the top 30% of the viewport.
 * A heading is in that band when its box meets the same edges the
 * IntersectionObserver uses: below 96px and above 30% of the height.
 */
const SPY_TOP_PX = 96;
const BAND_END_RATIO = 0.3;
const SPY_ROOT_MARGIN = `-${SPY_TOP_PX}px 0px -70% 0px`;

/** How long a TOC click keeps the spy from overwriting the chosen section. */
export const CLICK_SETTLE_MS = 1000;

function isScrolledToEnd(): boolean {
  const root = document.scrollingElement ?? document.documentElement;
  const remaining = root.scrollHeight - window.scrollY - window.innerHeight;
  // A page that fits on one screen is "at the end" at scroll 0. That is the
  // top of the article, not the FAQ, so a real scroll is required.
  return window.scrollY > 1 && remaining <= 4;
}

/** Same band the observer uses. "Anywhere on screen" is not enough. */
function headingInBand(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.bottom > SPY_TOP_PX && rect.top < window.innerHeight * BAND_END_RATIO;
}

/**
 * Which TOC row is current.
 *
 * A TOC click used to kill the spy. The hash change re-rendered the post,
 * and the heading components were created inside that render, so React
 * remounted every heading. The observer kept the detached nodes and never
 * fired again. The headings are stable now; this hook still releases the
 * click lock so a later intersection can move the row.
 *
 * The FAQ heading can reach the band — the footer and the next articles
 * sit below it. Reaching the end of the scroll still selects the last
 * heading, as a safety net when a short page cannot.
 *
 * A click selects its row immediately. The selection stays through the
 * scroll, then the lock releases. It keeps the clicked row only when that
 * heading is in the band, or the last row when the page is at the end.
 */
export function useArticleTocActive(
  headings: TocHeading[],
  enabled = true,
): {
  activeId: string;
  selectHeading: (id: string) => void;
} {
  const [activeId, setActiveId] = useState('');
  const clickedId = useRef<string | null>(null);
  const settleTimer = useRef(0);
  const releaseRef = useRef<() => void>(() => {
    clickedId.current = null;
  });

  useEffect(() => {
    setActiveId('');
    clickedId.current = null;
    window.clearTimeout(settleTimer.current);
    if (!enabled || !headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null && element.isConnected);
    if (!elements.length) return;

    const lastId = elements[elements.length - 1].id;

    const releaseClick = () => {
      const id = clickedId.current;
      if (!id) return;
      clickedId.current = null;
      window.clearTimeout(settleTimer.current);
      if (isScrolledToEnd()) {
        setActiveId(lastId);
        return;
      }
      const target = document.getElementById(id);
      if (target?.isConnected && headingInBand(target)) {
        setActiveId(id);
        return;
      }
      // The click's row is not the one in the band. Drop it so the spy
      // can name whoever is.
      const inBand = elements.find((element) => element.isConnected && headingInBand(element));
      setActiveId(inBand?.id ?? '');
    };
    releaseRef.current = releaseClick;

    const armSettleTimer = () => {
      window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => releaseRef.current(), CLICK_SETTLE_MS);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // While a click is scrolling, intermediate headings pass through
        // the band. Applying them would drop the row the reader just chose.
        if (clickedId.current) return;
        if (isScrolledToEnd()) {
          setActiveId(lastId);
          return;
        }
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.target.isConnected)
          .map((entry) => entry.target.id);
        if (visible.length) {
          const first = elements.find((element) => visible.includes(element.id));
          if (first) setActiveId(first.id);
        }
      },
      { rootMargin: SPY_ROOT_MARGIN, threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));

    let frame = 0;
    const onScroll = () => {
      if (clickedId.current) {
        armSettleTimer();
        return;
      }
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (clickedId.current) return;
        if (isScrolledToEnd()) setActiveId(lastId);
      });
    };

    const onScrollEnd = () => {
      if (!clickedId.current) return;
      releaseClick();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', onScrollEnd);

    return () => {
      observer.disconnect();
      window.clearTimeout(settleTimer.current);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', onScrollEnd);
    };
  }, [headings, enabled]);

  const selectHeading = (id: string) => {
    clickedId.current = id;
    setActiveId(id);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => releaseRef.current(), CLICK_SETTLE_MS);
  };

  return { activeId, selectHeading };
}
