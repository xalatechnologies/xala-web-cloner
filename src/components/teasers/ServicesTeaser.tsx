import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';
import type { LucideIcon } from 'lucide-react';
import servicesData from '@/data/services.json';

type Language = 'no' | 'en' | 'ar';

/**
 * The service catalogue, on the front page.
 *
 * Reads services.json — the same file /tjenester renders and the same file the
 * OfferCatalog schema is generated from. It used to hold its own hardcoded list
 * of four: AI & Machine Learning, Cloud, Web Development, Mobile Development.
 * None of those survived the repositioning, so the homepage advertised a
 * catalogue the services page no longer offered, and no amount of editing
 * services.json would have corrected it.
 *
 * Four of six, because this is a teaser and the page it links to has them all.
 */
const TEASER_COUNT = 4;

export default function ServicesTeaser() {
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  const services = (servicesData[language] ?? servicesData.no).slice(0, TEASER_COUNT);
  const iconFor = (name: string): LucideIcon =>
    resolveIcon(name, 'CircleDot');

  return (
    <section
      id="services-teaser"
      aria-labelledby="services-teaser-heading"
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="mb-5 eyebrow">
            {t('teasers.services.eyebrow', 'Tjenester')}
          </p>
          <h2
            id="services-teaser-heading"
            className="section-heading"
          >
            {t('teasers.services.title')}
          </h2>
          <p className="mt-5 section-lead">
            {t('teasers.services.description')}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = iconFor(service.icon);
            return (
              <li key={service.id}>
                <Link
                  to="/tjenester"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="card-icon group-hover:bg-primary/20">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="flex items-center gap-2 card-heading">
                      {service.title}
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </h3>
                  </div>
                  <p className="mt-4 card-body">
                    {service.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <Link
            to="/tjenester"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('teasers.services.viewAll')}
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
