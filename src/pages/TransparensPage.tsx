import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, LifeBuoy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Section } from '@/components/ui/section';
import { SurfaceCard, CardIcon } from '@/components/ui/surface-card';

/**
 * Åpenhet om drift: hva vi lover på oppetid og SLA, hvordan sikkerhet er
 * forankret i leveransen, og hvor kunder henvender seg ved en hendelse.
 */
export default function TransparensPage() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: Activity,
      title: t('transparensPage.cards.sla.title', 'Oppetid og SLA-avtaler'),
      description: t(
        'transparensPage.cards.sla.description',
        'Oppetids- og SLA-krav avtales per prosjekt og forankres i driftsavtalen. Terskler og oppfølging tilpasses hvor kritisk løsningen er.'
      )
    },
    {
      icon: ShieldCheck,
      title: t('transparensPage.cards.security.title', 'Forvaltning og sikkerhet'),
      description: t(
        'transparensPage.cards.security.description',
        'Vi er ISO 27001-sertifisert. Forvaltning, drift og sikkerhet er del av leveransen fra første dag — driftbarhet og tilgjengelighet er designvalg vi tar sammen med dere, ikke noe som legges til etterpå.'
      )
    },
    {
      icon: LifeBuoy,
      title: t('transparensPage.cards.incidents.title', 'Hendelser og status'),
      description: t(
        'transparensPage.cards.incidents.description',
        'Opplever dere nedetid eller avvik fra avtalt SLA, tar dere kontakt med oss direkte. Vi rapporterer status og oppfølging gjennom kanalen som er avtalt i driftsavtalen.'
      )
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <header className="container mx-auto px-4 pb-2 pt-14 md:pb-4 md:pt-20">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            {t('transparensPage.eyebrow', 'Åpenhet')}
          </p>
          <h1 className="max-w-[20ch] text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            {t('transparensPage.title', 'Oppetid, SLA og drift')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t(
              'transparensPage.description',
              'Vi er tydelige på hvordan vi drifter det vi bygger: hvilke oppetids- og SLA-forpliktelser vi tar på oss, hvordan sikkerhet er forankret i arbeidet, og hvor dere henvender dere ved en hendelse.'
            )}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t(
              'transparensPage.statusBefore',
              'Vi har ikke et offentlig statusboard. Se'
            )}{' '}
            <Link to="/status" className="font-semibold text-primary underline underline-offset-4">
              {t('transparensPage.statusLink', 'status-siden')}
            </Link>
            {t('transparensPage.statusAfter', '.')}
          </p>
        </header>

        <Section tone="muted" size="md" styled container={false}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {cards.map(({ icon: Icon, title, description }) => (
                <SurfaceCard key={title}>
                  <div className="mb-5 flex items-center gap-4">
                    <CardIcon>
                      <Icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </CardIcon>
                    <h2 className="text-xl font-bold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                      {title}
                    </h2>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {description}
                  </p>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </Section>

        <section
          aria-labelledby="transparens-cta"
          className="border-t border-border bg-muted/40 py-14 md:py-20"
        >
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 id="transparens-cta" className="text-3xl font-bold tracking-tight md:text-4xl">
                {t('transparensPage.ctaTitle', 'Spørsmål om drift eller SLA?')}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {t(
                  'transparensPage.ctaDescription',
                  'Fortell oss om systemet deres, så går vi gjennom hvilke oppetids- og SLA-vilkår som passer.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/kontakt"
                className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t('transparensPage.ctaContact', 'Kontakt oss')}
              </Link>
              <Link
                to="/status"
                className="inline-flex min-h-12 items-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t('transparensPage.ctaStatus', 'Statusside')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
