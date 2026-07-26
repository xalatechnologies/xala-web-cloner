import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * The card used across the feature sections.
 *
 * ValueProps, ServicesTeaser and ProductsTeaser each carried a
 * character-identical 150-character className for this, plus an identical
 * hover-gradient overlay and icon halo. Three copies of the same string is
 * three places to forget when the hover treatment changes — which is how the
 * sections drifted apart in the first place.
 *
 * Pass `to` when the whole card is a link; it renders an <a> instead of a
 * <div> so the entire surface is one focusable target rather than a div with a
 * link buried inside it.
 */
interface SurfaceCardProps {
  children: ReactNode;
  /** Renders the card as a router link covering the whole surface. */
  to?: string;
  /**
   * Renders the card as an external link, opening in a new tab. Mutually
   * exclusive with `to`: one is in-app routing, the other leaves the site.
   */
  href?: string;
  /** Announced to screen readers when `href` opens a new tab. */
  externalLabel?: string;
  className?: string;
}

const BASE =
  'group relative overflow-hidden rounded-2xl border border-border bg-card p-8 ' +
  'transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10';

const LINK_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** The warm wash that fades in on hover. Decorative, hence aria-hidden. */
function HoverWash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-all duration-500 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-primary/10"
    />
  );
}

export const SurfaceCard = ({
  children,
  to,
  href,
  externalLabel = 'Åpnes i ny fane',
  className,
}: SurfaceCardProps) => {
  const body = (
    <>
      <HoverWash />
      <div className="relative z-10">{children}</div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn(BASE, 'block', LINK_FOCUS, className)}>
        {body}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(BASE, 'block', LINK_FOCUS, className)}
      >
        {body}
        {/* A link that leaves the site and opens a new tab should say so; the
            visual cue (a new tab appearing) is not available to everyone. */}
        <span className="sr-only"> ({externalLabel})</span>
      </a>
    );
  }

  return <div className={cn(BASE, className)}>{body}</div>;
};

/**
 * An icon in its tile, with the halo that lights up on card hover.
 *
 * Relies on the parent SurfaceCard's `group`, so it only makes sense inside one.
 */
export const CardIcon = ({ children }: { children: ReactNode }) => (
  <div className="relative shrink-0">
    <div
      aria-hidden
      className="absolute inset-0 scale-150 rounded-xl bg-primary/25 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
    />
    <div className="relative rounded-xl bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary/20">
      {children}
    </div>
  </div>
);

export default SurfaceCard;
