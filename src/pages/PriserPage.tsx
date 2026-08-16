import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Archive,
  ArrowRight,
  Accessibility,
  Building2,
  Database,
  FileSignature,
  Layers,
  Network,
  Settings,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQSection from '../components/faq/FAQSection';
import { FAQ_TOPICS } from '../components/faq/faqs';
import { PageCTA, PageHeader } from '../components/layouts/PageFrame';
import { Section } from '@/components/ui/section';
import { SurfaceCard, CardIcon } from '@/components/ui/surface-card';

const COST_DRIVERS = [
  { key: 'cases', icon: Layers },
  { key: 'integrations', icon: Network },
  { key: 'accessibility', icon: Accessibility },
  { key: 'archive', icon: Archive },
  { key: 'migration', icon: Database },
  { key: 'tenancy', icon: Building2 },
  { key: 'contract', icon: FileSignature },
  { key: 'operations', icon: Settings },
] as const;

const SCOPE = ['included', 'separate'] as const;

const NEXT_STEPS = [
  {
    to: '/kontakt',
    key: 'pricesPage.next.contact',
    fallbackTitle: 'Be om et estimat',
    fallbackBlurb: 'Fortell oss hva dere står i, så sier vi hva vi trenger for å prise.',
  },
  {
    to: '/tjenester',
    key: 'pricesPage.next.services',
    fallbackTitle: 'Hva vi bygger',
    fallbackBlurb: 'Saksbehandling, portaler, integrasjoner og modernisering.',
  },
  {
    to: '/slik-vi-jobber',
    key: 'pricesPage.next.process',
    fallbackTitle: 'Slik vi jobber',
    fallbackBlurb: 'Tid, anskaffelse og hvem som drifter løsningen etterpå.',
  },
] as const;

export default function PriserPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('pricesPage.eyebrow', 'Priser')}
          title={t('pricesPage.title', 'Hva koster et saksbehandlingssystem?')}
          description={t(
            'pricesPage.description',
            'Det finnes ingen fast prisliste. Prisen følger omfanget: hvilke sakstyper dere trenger, hvilke nasjonale felleskomponenter løsningen skal snakke med, og om dere kjøper utvikling, forvaltning eller begge deler.'
          )}
        />

        <Section tone="default" size="sm" labelledBy="priser-hvorfor">
          <h2 id="priser-hvorfor" className="section-heading">
            {t('pricesPage.whyTitle', 'Derfor har vi ikke en prisliste')}
          </h2>
          <p className="mt-6 max-w-3xl section-lead">
            {t(
              'pricesPage.whyBody',
              'Et saksbehandlingssystem for tre sakstyper og et for et direktorat med titalls integrasjoner er ikke samme leveranse. Kontraktsform, arkivkrav og om løsningen skal deles eller stå alene endrer både arbeid og risiko. En tabell med kroner ville enten være for generell til å bruke, eller så spesifikk at den bare gjaldt ett prosjekt.'
            )}
          </p>
        </Section>

        <Section tone="muted" size="md" styled labelledBy="priser-drivere">
          <h2 id="priser-drivere" className="section-heading">
            {t('pricesPage.driversTitle', 'Hva som driver kostnaden')}
          </h2>
          <p className="mt-6 max-w-3xl section-lead">
            {t(
              'pricesPage.driversLead',
              'Dette er postene som faktisk endrer et estimat for et norsk, offentlig fagsystem. Vi priser dem etter kartlegging, ikke som en ferdig pakke.'
            )}
          </p>
          <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {COST_DRIVERS.map(({ key, icon: Icon }) => (
              <li key={key}>
                <SurfaceCard>
                  <div className="mb-5 flex items-center gap-4">
                    <CardIcon>
                      <Icon
                        className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                    </CardIcon>
                    <h3 className="card-heading transition-colors duration-300 group-hover:text-primary">
                      {t(`pricesPage.drivers.${key}.title`)}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground md:text-lg md:pl-[68px]">
                    {t(`pricesPage.drivers.${key}.body`)}
                  </p>
                </SurfaceCard>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="default" size="md" labelledBy="priser-omfang">
          <h2 id="priser-omfang" className="section-heading">
            {t('pricesPage.scopeTitle', 'Hva som inngår, og hva som prises separat')}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {SCOPE.map((key) => (
              <div key={key} className="rounded-2xl border border-border bg-card p-8">
                <h3 className="card-heading">{t(`pricesPage.scope.${key}.title`)}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {t(`pricesPage.scope.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="muted" size="sm" labelledBy="priser-prosess">
          <h2 id="priser-prosess" className="section-heading">
            {t('pricesPage.processTitle', 'Tid, anskaffelse og forvaltning')}
          </h2>
          <p className="mt-6 max-w-3xl section-lead">
            {t(
              'pricesPage.processBody',
              'Spørsmål om fremdrift, offentlige anskaffelser og hvem som drifter løsningen etterpå hører til engasjementet, ikke til denne siden.'
            )}
          </p>
          <Link
            to="/slik-vi-jobber#prosess-faq"
            className="mt-8 inline-flex min-h-12 items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('pricesPage.processLink', 'Les om tid, anskaffelse og forvaltning')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Section>

        <FAQSection
          id="priser-faq"
          only={FAQ_TOPICS.pricing}
          title={t('pricesPage.faqTitle', 'Spørsmål om pris')}
          description={t(
            'pricesPage.faqDescription',
            'Svar på det folk spør om når de skal budsjettere et saksbehandlingssystem. Tid, anskaffelse og forvaltning ligger under Slik vi jobber.'
          )}
        />

        <section
          aria-labelledby="priser-neste"
          className="border-t border-border bg-muted/40 py-14 md:py-20"
        >
          <div className="container mx-auto px-4">
            <h2 id="priser-neste" className="subsection-heading">
              {t('pricesPage.nextTitle', 'Videre herfra')}
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

        <PageCTA
          id="priser-cta"
          title={t('pricesPage.ctaTitle', 'Vil dere ha et estimat med forutsetninger?')}
          description={t(
            'pricesPage.ctaDescription',
            'Fortell oss hva dere står i. Vi sier hva vi trenger å vite for å prise, og hva vi ville ventet med.'
          )}
          primary={{ to: '/kontakt', label: t('pricesPage.ctaContact', 'Kontakt oss') }}
          secondary={{ to: '/slik-vi-jobber', label: t('pricesPage.ctaProcess', 'Slik vi jobber') }}
        />
      </main>

      <Footer />
    </div>
  );
}
