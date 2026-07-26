import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';

/**
 * One vertical rhythm for every section on the site.
 *
 * The six teaser sections previously carried six different paddings
 * (py-12/16/20 with md:py-16/20/24/28) and six unrelated backgrounds, so
 * adjacent sections had no relationship to each other. `tone` is the only
 * background choice a section gets, and the scale alternates rather than being
 * picked per file.
 */
export type SectionTone = 'default' | 'muted' | 'dark';

/** Sizes are deliberately few — three, not a free-form padding prop. */
export type SectionSize = 'sm' | 'md' | 'lg';

const TONE: Record<SectionTone, string> = {
  default: 'bg-background text-foreground',
  muted: 'bg-surface text-foreground',
  // Dark in both colour schemes, so its contents must use light text. Matches
  // NorchainSection, which established this treatment.
  dark: 'bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white',
};

const SIZE: Record<SectionSize, string> = {
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-24 md:py-32',
};

interface SectionProps {
  children: ReactNode;
  id?: string;
  tone?: SectionTone;
  size?: SectionSize;
  /** Adds the ambient radial wash defined in index.css. */
  styled?: boolean;
  /** Fade-and-rise on scroll. Disabled automatically for reduced motion. */
  reveal?: boolean;
  className?: string;
  /** id of the heading that names this section, for screen readers. */
  labelledBy?: string;
  /**
   * Wrap children in the standard container. Set false when the section already
   * has its own inner wrapper, so migrating an existing section changes only
   * its rhythm and tone and not its measure.
   */
  container?: boolean;
}

export const Section = ({
  children,
  id,
  tone = 'default',
  size = 'md',
  styled = false,
  reveal = true,
  className,
  labelledBy,
  container = true,
}: SectionProps) => {
  const { ref, inView, reduced } = useInView<HTMLElement>();
  const animate = reveal && !reduced;

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative overflow-hidden',
        SIZE[size],
        TONE[tone],
        styled && 'section-styled',
        animate && 'transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none',
        animate && (inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'),
        className,
      )}
    >
      {container ? (
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section;
