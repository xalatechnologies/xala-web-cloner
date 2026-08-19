import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import FAQSection from '../components/faq/FAQSection';
import { FAQ_TOPICS } from '../components/faq/faqs';
import Footer from '../components/Footer';
import { PageHeader } from '../components/layouts/PageFrame';
import { generateServicesSchema } from '@/components/seo/sectionSchemas';
import { ORGANIZATION, ORG_ID, SITE_ORIGIN } from '@/lib/blog/seo';
import { SERVICES_PAGE_HEADING } from '@/lib/staticRouteHeading';
import servicesData from '@/data/services.json';

type Language = 'no' | 'en' | 'ar';

/** Where a reader goes after deciding a service is relevant. */
const NEXT_STEPS = [
  {
    to: '/slik-vi-jobber',
    key: 'servicesPage.next.process',
    fallbackTitle: 'Slik vi jobber',
    fallbackBlurb: 'Fem etapper, og hva hver av dem gir dere.',
  },
  {
    to: '/caser',
    key: 'servicesPage.next.cases',
    fallbackTitle: 'Kundecaser',
    fallbackBlurb: 'Hva vi har levert til stat, helse og kommune.',
  },
  {
    to: '/teknologi',
    key: 'servicesPage.next.tech',
    fallbackTitle: 'Teknologien vi bygger på',
    fallbackBlurb: 'Plattformene løsningene står på, og hvorfor.',
  },
] as const;

export default function TjenesterPage() {
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  // Derived from the catalogue the page renders, so the markup cannot describe
  // a service the page does not show.
  const schema = useMemo(
    () =>
      generateServicesSchema(servicesData[language] ?? servicesData.no, {
        url: `${SITE_ORIGIN}/tjenester`,
        organizationId: ORG_ID,
        name: t('services.title', 'Våre tjenester'),
      }),
    [language, t]
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Only structured data here — the route's title, description and
          canonical come from RouteSEO, which owns this path. */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('servicesPage.eyebrow', 'Tjenester')}
          title={t('servicesPage.title', SERVICES_PAGE_HEADING)}
          description={t(
            'servicesPage.description',
            'Vi bygger saksbehandlingssystemer, portaler og integrasjoner for offentlig sektor og næringsliv — og forvalter dem videre etter lansering.'
          )}
        />

        <Services headingLevel="h2" />


        <section
          aria-labelledby="tjenester-neste"
          className="border-t border-border bg-muted/40 py-14 md:py-20"
        >
          <div className="container mx-auto px-4">
            <h2
              id="tjenester-neste"
              className="subsection-heading"
            >
              {t('servicesPage.nextTitle', 'Videre herfra')}
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {NEXT_STEPS.map((step) => (
                <li key={step.to}>
                  <Link
                    to={step.to}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="flex items-center gap-2 card-heading">
                      {t(`${step.key}.title`, step.fallbackTitle)}
                      <ArrowRight
                        className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-3 card-body">
                      {t(`${step.key}.blurb`, step.fallbackBlurb)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Capability questions only. Engagement questions live on
            /slik-vi-jobber (time, procurement, aftercare) and /priser (cost).
            Visible sets stay disjoint; FAQPage schema is emitted on /faq. */}
        <FAQSection only={FAQ_TOPICS.services} includeSchema={false} />
      </main>

      <Footer />
    </div>
  );
}
