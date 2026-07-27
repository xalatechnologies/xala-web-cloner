import { useEffect, useState } from 'react';
import type { TocHeading } from '@/lib/blog/toc';

interface ArticleTocProps {
  headings: TocHeading[];
  label?: string;
}

/**
 * In-article navigation, with the current section marked as you scroll.
 *
 * The scroll-spy is the part worth the code. A static list of links tells you
 * what an article contains; a list that tracks where you are tells you how far
 * through it you got — which is the question a reader of a long piece actually
 * has. It costs one IntersectionObserver.
 *
 * The observer's root margin pins the "active" line just under the sticky
 * header, so a heading counts as current when it reaches reading position
 * rather than when it first clips the viewport edge.
 */
export default function ArticleToc({ headings, label = 'I denne artikkelen' }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Track every heading's state, not just the ones that changed this
        // tick: scrolling fast fires one callback covering several headings,
        // and reacting to only the last entry picks an arbitrary winner.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);
        if (visible.length) {
          const first = elements.find((element) => visible.includes(element.id));
          if (first) setActiveId(first.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label={label}>
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">{label}</p>
      <ul className="flex flex-col border-l border-border">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors ${
                  isActive
                    ? 'border-primary font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground'
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
