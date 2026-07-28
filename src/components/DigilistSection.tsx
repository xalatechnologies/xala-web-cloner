import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';
import type { LucideIcon } from 'lucide-react';

/**
 * Digilist on the front page.
 *
 * Replaces the Norchain block, which claimed the homepage's product slot while
 * being the least commercially active of the three. Norchain keeps its entry on
 * /produkter — this is about which product gets the attention of someone who
 * lands on the front page, not about dropping anything.
 *
 * ## What is deliberately not here
 *
 * Numbers. digilist.no publishes figures — admin time saved, share of bookings
 * on mobile, organisations onboarded — but those are attributed to named
 * customers in testimonials on that site. Restating them here, stripped of the
 * customer they belong to, turns a specific claim into a general one this page
 * cannot support. Capabilities are verifiable from the product; outcomes belong
 * with the customer who reported them.
 *
 * The capability list doubles as the AEO surface: "sesongtildeling",
 * "ID-porten", "Noark" and "SSA-L" are the terms a municipality actually
 * searches, and each is stated as plain text rather than buried in an image or
 * a carousel.
 */
const CAPABILITIES = [
  {
    icon: 'CalendarRange',
    key: 'digilist.capabilities.booking',
    title: 'Booking og sesongtildeling',
    description:
      'Enkeltbookinger og sesongtildeling i samme system, inkludert fordeling av treningstid mellom lag og foreninger.',
  },
  {
    icon: 'Building2',
    key: 'digilist.capabilities.venues',
    title: 'Lokaler av alle slag',
    description:
      'Idrettshaller, gymsaler, møterom, kulturhus, selskapslokaler og utstyr. Samme flyt uansett hva som leies ut.',
  },
  {
    icon: 'ShieldCheck',
    key: 'digilist.capabilities.login',
    title: 'Innlogging med ID-porten',
    description:
      'Sikker innlogging for innbyggere og foreninger, med roller for saksbehandlere og driftspersonell.',
  },
  {
    icon: 'FileCheck2',
    key: 'digilist.capabilities.caseflow',
    title: 'Søknad, vedtak og arkiv',
    description:
      'Søknader som krever behandling går gjennom en saksflyt med sporbare vedtak og arkivering mot Noark.',
  },
  {
    icon: 'Receipt',
    key: 'digilist.capabilities.invoicing',
    title: 'Fakturering og betaling',
    description:
      'Egne priser per leietakertype, automatisk fakturagrunnlag og betaling på nett, uten manuell etterregistrering.',
  },
  {
    icon: 'Accessibility',
    key: 'digilist.capabilities.compliance',
    title: 'Krav i offentlig sektor',
    description:
      'Universell utforming etter WCAG 2.2 AA, krav i personvernforordningen og dokumentasjon som holder i en anskaffelse.',
  },
] as const;

export default function DigilistSection() {
  const { t } = useTranslation();
  const iconFor = (name: string): LucideIcon =>
    resolveIcon(name, 'CircleDot');

  return (
    <section
      id="digilist"
      aria-labelledby="digilist-heading"
      className="border-y border-border bg-background py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 eyebrow">
            {t('digilist.eyebrow', 'Vårt produkt')}
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs tracking-[0.14em]">
              {t('digilist.badge', 'I drift')}
            </span>
          </p>
          <h2
            id="digilist-heading"
            className="section-heading"
          >
            {t('digilist.title', 'Digilist: booking og utleie av lokaler')}
          </h2>
          <p className="mt-5 section-lead">
            {t(
              'digilist.description',
              'Mange kommuner styrer fortsatt lokalene sine i regneark og på e-post. Digilist samler booking, sesongtildeling, saksbehandling og fakturering i ett system som er bygget for norske krav.'
            )}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {CAPABILITIES.map((capability) => {
            const Icon = iconFor(capability.icon);
            return (
              <li
                key={capability.key}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center gap-3">
                  <span className="card-icon group-hover:bg-primary/20">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="card-heading">
                    {t(`${capability.key}.title`, capability.title)}
                  </h3>
                </div>
                <p className="mt-4 card-body">
                  {t(`${capability.key}.description`, capability.description)}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://digilist.no"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('digilist.visit', 'Besøk digilist.no')}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{t('common.newTab', '(åpnes i ny fane)')}</span>
          </a>
          <Link
            to="/produkter"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('digilist.allProducts', 'Alle produkter')}
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
