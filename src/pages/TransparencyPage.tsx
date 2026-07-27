import { Link } from 'react-router-dom';
import { FileCheck2, Gauge, LifeBuoy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Section } from '@/components/ui/section';
import { SurfaceCard, CardIcon } from '@/components/ui/surface-card';

const CARDS = [
  {
    icon: Gauge,
    title: 'Oppetid og SLA',
    description:
      'Oppetids- og SLA-krav avtales per prosjekt og forankres i driftsavtalen. For nasjonal infrastruktur har vi levert løsninger med 99,99 % oppetid; for mindre kritiske systemer avtaler vi enklere terskler tilpasset hvor kritisk løsningen er.',
  },
  {
    icon: FileCheck2,
    title: 'Sertifisering',
    description:
      'Vi er ISO 27001-sertifisert. Forvaltning, drift og sikkerhet er del av leveransen fra første dag, ikke noe som legges til etter at løsningen er satt i produksjon.',
  },
  {
    icon: LifeBuoy,
    title: 'Hendelser',
    description:
      'Opplever dere nedetid eller avvik fra avtalt SLA, tar dere kontakt med oss direkte. Se driftsstatussiden for hvordan vi rapporterer status og oppfølging.',
  },
];

export default function TransparencyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <header className="container mx-auto px-4 pb-2 pt-14 md:pb-4 md:pt-20">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            Åpenhet
          </p>
          <h1 className="max-w-[20ch] text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Åpenhet om drift og sikkerhet
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Vi er tydelige på hvordan vi drifter det vi bygger: hvilke oppetids- og SLA-forpliktelser vi tar
            på oss, hvordan sikkerhet er forankret i arbeidet, og hvor dere henvender dere ved en hendelse.
            Se{' '}
            <Link to="/status" className="font-semibold text-primary underline underline-offset-4">
              driftsstatussiden
            </Link>{' '}
            for hvordan vi følger opp hendelser løpende.
          </p>
        </header>

        <Section tone="muted" size="md" styled container={false}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {CARDS.map(({ icon: Icon, title, description }) => (
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

        <section aria-labelledby="transparency-status" className="border-t border-border bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 id="transparency-status" className="text-3xl font-bold tracking-tight md:text-4xl">
                Vil du se hvordan vi følger opp drift løpende?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Driftsstatussiden beskriver hvordan vi rapporterer oppetid og varsler ved hendelser.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/status"
                className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Driftsstatus
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
