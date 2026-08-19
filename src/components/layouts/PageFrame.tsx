import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * The frame every content page shares: an opening statement, and a way onward.
 *
 * Five pages were a bare shell around one homepage section — no heading of
 * their own (the section owned the h1, which is why six routes once shipped
 * with no h1 at all), no framing, and nothing after the section ended. The
 * first three were fixed by hand and the header markup was three copies of the
 * same thirteen lines before this existed.
 *
 * Extracted at the third repetition rather than the second, so the shape had a
 * chance to settle: an eyebrow, a heading, a paragraph, and a closing band with
 * two actions is what all three converged on.
 */

interface PageHeaderProps {
  /** Small uppercase label above the heading. */
  eyebrow: string;
  title: string;
  description?: string;
  /**
   * Bottom padding. Sections bring their own generous top padding, and the two
   * stacked to a screenful of empty space — so this defaults to almost none.
   */
  tight?: boolean;
}

export function PageHeader({ eyebrow, title, description, tight = true }: PageHeaderProps) {
  return (
    <header className={`container mx-auto px-4 pt-14 md:pt-20 ${tight ? 'pb-2 md:pb-4' : 'pb-10 md:pb-14'}`}>
      <p className="mb-5 eyebrow">{eyebrow}</p>
      <h1 className="max-w-[20ch] page-heading">
        {title}
      </h1>
      {description && (
        <p className="mt-6 max-w-2xl section-lead">{description}</p>
      )}
    </header>
  );
}

interface PageCTAAction {
  to: string;
  label: string;
}

interface PageCTAProps {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  /** First action is the filled button; the second is outlined. */
  primary: PageCTAAction;
  secondary?: PageCTAAction;
  children?: ReactNode;
}

/**
 * The closing band. Its whole job is that a page does not dead-end: every one
 * of these previously stopped at the bottom of its last section with no route
 * anywhere except the nav.
 */
export function PageCTA({
  id,
  eyebrow,
  title,
  description,
  primary,
  secondary,
  children,
}: PageCTAProps) {
  const { t } = useTranslation();

  return (
    <section aria-labelledby={id} className="border-t border-border bg-muted/40 py-14 md:py-20">
      <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow">
            {eyebrow ?? t('cta.eyebrow', 'Neste steg')}
          </p>
          <h2 id={id} className="mt-3 subsection-heading">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl section-lead">
            {description}
          </p>
          {children}
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <Link
            to={primary.to}
            className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              to={secondary.to}
              className="inline-flex min-h-12 items-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
