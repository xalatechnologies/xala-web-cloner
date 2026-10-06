import { useEffect, useState } from 'react';
import type { TocHeading } from '@/lib/blog/toc';
import { useArticleTocActive } from './useArticleTocActive';

interface ArticleTocProps {
  headings: TocHeading[];
  label?: string;
  /**
   * `desktop` is the sticky sidebar (lg and up). `mobile` is the inline
   * copy. Only the one that is actually on screen runs the scroll spy, so
   * the hidden copy does not keep a second observer.
   */
  mode?: 'always' | 'mobile' | 'desktop';
}

const DESKTOP_QUERY = '(min-width: 1024px)';

function mediaMatches(query: string, fallback: boolean): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return fallback;
  return window.matchMedia(query).matches;
}

function useTocEnabled(mode: 'always' | 'mobile' | 'desktop'): boolean {
  const [enabled, setEnabled] = useState(() => {
    if (mode === 'always') return true;
    // No matchMedia (jsdom): one spy, on the inline copy.
    return mediaMatches(DESKTOP_QUERY, false) === (mode === 'desktop');
  });

  useEffect(() => {
    if (mode === 'always' || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setEnabled(media.matches === (mode === 'desktop'));
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [mode]);

  return mode === 'always' ? true : enabled;
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
export default function ArticleToc({
  headings,
  label = 'I denne artikkelen',
  mode = 'always',
}: ArticleTocProps) {
  const enabled = useTocEnabled(mode);
  const { activeId, selectHeading } = useArticleTocActive(headings, enabled);

  if (headings.length < 2) return null;

  return (
    <nav aria-label={label}>
      <p className="mb-4 eyebrow">{label}</p>
      <ul className="flex flex-col border-l border-border">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => selectHeading(heading.id)}
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
