import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import technologies from '@/data/technologies.json';

/**
 * The stack, on the front page.
 *
 * Reads technologies.json rather than keeping its own copy. The hardcoded list
 * it used to hold still included AWS long after AWS was removed from the
 * credentials strip in favour of Azure, which is what a second copy of a list
 * always ends up doing.
 *
 * Logos are loaded from a CDN and are decorative; the name beside each one is
 * the actual claim, and it is text.
 */
export default function TechTeaser() {
  const { t } = useTranslation();

  return (
    <section
      id="tech-teaser"
      aria-labelledby="tech-teaser-heading"
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="section-header">
          <p className="mb-5 eyebrow">
            {t('teasers.tech.eyebrow', 'Teknologi')}
          </p>
          <h2
            id="tech-teaser-heading"
            className="section-heading"
          >
            {t('teasers.tech.title')}
          </h2>
          <p className="section-lead mt-5 max-w-[52ch]">
            {t('teasers.tech.description')}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {technologies.map((tech) => (
            <li
              key={tech.id}
              className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/50"
            >
              <img
                src={tech.icon}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-10 w-10 shrink-0 object-contain"
              />
              <span className="card-heading">{tech.name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/teknologi"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('teasers.tech.viewTechnology')}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
