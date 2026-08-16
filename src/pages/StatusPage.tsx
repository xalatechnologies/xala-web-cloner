import { Link } from 'react-router-dom';
import { Activity, Bell, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Section } from '@/components/ui/section';
import { SurfaceCard, CardIcon } from '@/components/ui/surface-card';

const CARDS = [
  {
    icon: Activity,
    title: 'Driftsstatus',
    description:
      'Vi overvåker driften av løsningene vi forvalter kontinuerlig. Oppetid rapporteres til kunden gjennom kanalen som er avtalt i driftsavtalen, ikke som et offentlig, sanntids dashbord.',
  },
  {
    icon: Bell,
    title: 'Hendelser',
    description:
      'Ved nedetid eller avvik fra avtalt SLA varsler vi berørte kunder direkte og følger opp til hendelsen er lukket, med en kort oppsummering av årsak og tiltak.',
  },
  {
    icon: ShieldCheck,
    title: 'Ansvar og forankring',
    description:
      'Forvaltning og drift er del av leveransen fra første dag. Se hvilke forpliktelser og sertifiseringer dette bygger på på siden om åpenhet.',
  },
];

export default function StatusPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <header className="container mx-auto px-4 pb-2 pt-14 md:pb-4 md:pt-20">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            Drift
          </p>
          <h1 className="max-w-[20ch] text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Driftsstatus
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Hvordan vi følger opp driften av løsningene vi har levert, og hvor dere henvender dere ved en
            hendelse. For mer om oppetidsforpliktelser og sertifiseringer, se{' '}
            <Link to="/transparens" className="font-semibold text-primary underline underline-offset-4">
              siden om åpenhet
            </Link>
            .
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

        <section aria-labelledby="status-transparency" className="border-t border-border bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 id="status-transparency" className="text-3xl font-bold tracking-tight md:text-4xl">
                Vil du vite mer om hvordan vi jobber med drift og sikkerhet?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Siden om åpenhet beskriver oppetidsforpliktelser, SLA-avtaler og sertifiseringene vi drifter etter.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/transparens"
                className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Åpenhet om drift
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
