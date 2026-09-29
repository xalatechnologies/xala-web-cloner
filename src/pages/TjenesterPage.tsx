import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageHeader } from '../components/layouts/PageFrame';
import TjenesterHubBody from '@/components/tjenester/TjenesterHubBody';
import { TJENESTER_HUB_CTA, TJENESTER_HUB_NEXT_STEPS } from '@/data/tjenester-hub-content';
import { SERVICES_PAGE_HEADING } from '@/lib/staticRouteHeading';

export default function TjenesterPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet />

      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('servicesPage.eyebrow', 'Tjenester')}
          title={t('servicesPage.title', SERVICES_PAGE_HEADING)}
          description={t(
            'servicesPage.description',
            'Vi bygger saksbehandlingssystem og fagsystem, pluss integrasjon og modernisering, for offentlig sektor.'
          )}
        />

        <section className="container mx-auto px-4 py-14 md:py-20">
          <div className="prose prose-neutral mx-auto max-w-4xl dark:prose-invert">
            <TjenesterHubBody />
          </div>
        </section>

        <section
          aria-labelledby="tjenester-neste"
          className="border-t border-border bg-muted/40 py-14 md:py-20"
        >
          <div className="container mx-auto px-4">
            <h2
              id="tjenester-neste"
              className="subsection-heading"
            >
              {TJENESTER_HUB_CTA.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {TJENESTER_HUB_CTA.descriptionBefore}
              <Link to={TJENESTER_HUB_CTA.contactPath} className="text-primary underline-offset-4 hover:underline">
                {TJENESTER_HUB_CTA.contactPath}
              </Link>
              .
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {TJENESTER_HUB_NEXT_STEPS.map((step) => (
                <li key={step.to}>
                  <Link
                    to={step.to}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="flex items-center gap-2 card-heading">
                      {t(`${step.titleKey}`, step.fallbackTitle)}
                      <ArrowRight
                        className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-3 card-body">
                      {t(`${step.blurbKey}`, step.fallbackBlurb)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
