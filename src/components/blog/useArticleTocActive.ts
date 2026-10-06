import { useEffect, useRef, useState } from 'react';
import type { TocHeading } from '@/lib/blog/toc';

/**
 * Spy band, just under the sticky header.
 *
 * `rootMargin` shrinks the viewport so a heading counts as current when it
 * reaches reading position, not when it first clips the edge. The bottom
 * margin keeps that band in the top 30%. Earlier sections rely on this and
 * the threshold stays 0 — same observer as before.
 */
const SPY_TOP_PX = 96;
const SPY_ROOT_MARGIN = `-${SPY_TOP_PX}px 0px -70% 0px`;

/** How long a TOC click keeps the spy from overwriting the chosen section. */
const CLICK_SETTLE_MS = 1000;

function isScrolledToEnd(): boolean {
  const root = document.scrollingElement ?? document.documentElement;
  const remaining = root.scrollHeight - window.scrollY - window.innerHeight;
  // A page that fits on one screen is "at the end" at scroll 0. That is the
  // top of the article, not the FAQ, so a real scroll is required.
  return window.scrollY > 1 && remaining <= 4;
}

function headingInView(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.bottom > SPY_TOP_PX && rect.top < window.innerHeight;
}

/**
 * Which TOC row is current.
 *
 * IntersectionObserver handles every section that can reach the reading
 * band. The last section often cannot: the page runs out of room before
 * «Vanlige spørsmål» crosses into that band, so the callback never selects
 * it and the previous row stays lit — or nothing does, right after a click
 * that scrolled as far as the page allows. Reaching the end of the scroll
 * selects the last heading.
 *
 * A click selects its row immediately. The selection stays through the
 * smooth scroll; the spy takes over again once that scroll has settled,
 * unless the page is at the end, in which case the last heading remains.
 */
export function useArticleTocActive(headings: TocHeading[]): {
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
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
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
      if (target && headingInView(target)) setActiveId(id);
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
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);
        if (visible.length) {
          const first = elements.find((element) => visible.includes(element.id));
          if (first) setActiveId(first.id);
        }
      },
      { rootMargin: SPY_ROOT_MARGIN, threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));

    const onScroll = () => {
      if (clickedId.current) {
        armSettleTimer();
        return;
      }
      if (isScrolledToEnd()) setActiveId(lastId);
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
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', onScrollEnd);
    };
  }, [headings]);

  const selectHeading = (id: string) => {
    clickedId.current = id;
    setActiveId(id);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => releaseRef.current(), CLICK_SETTLE_MS);
  };

  return { activeId, selectHeading };
}
