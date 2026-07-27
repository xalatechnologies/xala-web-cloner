import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { processServiceTitle } from '@/utils/text-hyphenation';

export interface ServicePlatform {
  title: string;
  description: string;
  /** Present when this platform has a landing page of its own. */
  slug?: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  platforms?: ServicePlatform[];
  language?: string;
  /** Landing page for this category. */
  slug?: string;
  readMoreLabel?: string;
}

/**
 * One service category, with the platform types under it.
 *
 * The catalogue used to be six flat entries, which made a technical capability
 * and a concrete deliverable look like the same kind of thing. Grouping them
 * separates the two: the category is what we do, the platforms under it are
 * what a buyer is actually looking to have built.
 *
 * Platforms with a landing page link to it. Those are the head terms, and the
 * link from here is what makes this page the hub of the topic rather than a
 * page that merely mentions it.
 */
const ServiceCard = ({
  title,
  description,
  icon,
  platforms = [],
  language = 'no',
  slug,
  readMoreLabel,
}: ServiceCardProps) => {
  const Icon = (Icons[icon as keyof typeof Icons] as LucideIcon) || Icons.CircleDot;
  const isNorwegian = /^(no|nb|nn)/.test(language.toLowerCase());

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 md:p-7">
      <div className="flex items-center gap-3">
        <span className="card-icon group-hover:bg-primary/20">
          <Icon aria-hidden="true" />
        </span>
        <h3 className={`card-heading ${isNorwegian ? 'hyphenate-no' : ''}`}>
          {slug ? (
            <Link
              to={`/tjenester/${slug}`}
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              {processServiceTitle(title, language)}
            </Link>
          ) : (
            processServiceTitle(title, language)
          )}
        </h3>
      </div>

      <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>

      {platforms.length > 0 && (
        <ul className="mt-6 divide-y divide-border border-t border-border">
          {platforms.map((platform) => {
            const inner = (
              <>
                <span className="flex items-center gap-2 font-medium text-foreground">
                  {platform.title}
                  {platform.slug && (
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span className="mt-2 block card-body">
                  {platform.description}
                </span>
              </>
            );

            return (
              <li key={platform.title}>
                {platform.slug ? (
                  <Link
                    to={`/tjenester/${platform.slug}`}
                    className="group block py-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="py-4">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {slug && (
        <Link
          to={`/tjenester/${slug}`}
          className="group mt-6 inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          {readMoreLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      )}
    </article>
  );
};

export default ServiceCard;
