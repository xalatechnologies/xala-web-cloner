import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import AboutFeatureCard from './about/AboutFeatureCard';
import { useAboutFeatures } from '@/hooks/use-about-features';
import { Skeleton } from './ui/skeleton';

interface AboutProps {
  /**
   * Heading level for the section title. The page hosting this section owns the
   * h1; this stays an h1 only where the section leads the page.
   */
  headingLevel?: 'h1' | 'h2';
}

/**
 * Who this company is, stated in facts rather than adjectives.
 *
 * The section was four cards reading "Vi driver kontinuerlig innovasjon", "Vårt
 * team består av erfarne utviklere" and so on — sentences that would be true of
 * any consultancy anywhere, which is another way of saying they carry no
 * information. Every one of them was centred under a left-aligned page header,
 * and all four rendered the same brain icon.
 *
 * The facts strip below the intro is deliberate and not decoration. An answer
 * engine asked "who builds case management systems in Norway" needs
 * attributable specifics — an organisation number, a founding year, a place, a
 * certification — and those were previously only in the JSON-LD, never in the
 * text a crawler quotes from. Stating them visibly puts the same claims in both
 * places, which is the condition for being treated as a known entity rather
 * than an anonymous supplier.
 */
const FACTS = [
  { key: 'about.facts.founded', value: '2018', fallback: 'Etablert' },
  { key: 'about.facts.orgnr', value: '920 972 454', fallback: 'Organisasjonsnummer' },
  { key: 'about.facts.location', value: 'Nesbru, Asker', fallback: 'Hovedkontor' },
  { key: 'about.facts.certification', value: 'ISO 27001', fallback: 'Sertifisering' },
] as const;

const About = ({ headingLevel = 'h1' }: AboutProps = {}) => {
  const { t } = useTranslation();
  const { data: aboutSection } = useSection('about');
  const { data: visionSection } = useSection('vision');
  const { data: features, isLoading } = useAboutFeatures();
  const Heading = headingLevel;

  if (isLoading) {
    return (
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Skeleton className="mb-4 h-9 w-72" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-44 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="bg-background py-16 md:py-24" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <p className="mb-5 eyebrow">
            {t('about.eyebrow', 'Om selskapet')}
          </p>
          <Heading
            id="about-heading"
            className="section-heading"
          >
            {aboutSection?.title}
          </Heading>
          {aboutSection?.description && (
            <p className="section-lead mt-5 max-w-[52ch]">
              {aboutSection.description}
            </p>
          )}
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.key} className="bg-card p-5 md:p-6">
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t(fact.key, fact.fallback)}
              </dt>
              <dd className="mt-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16">
          <h2 className="subsection-heading">
            {t('about.principlesTitle', 'Det vi holder oss til')}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {features?.map((feature) => (
              <AboutFeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>

        {visionSection && (
          <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 md:p-12">
            {/* Was a purple-to-magenta-to-blue gradient in dark mode, left over
                from the palette before the bronze one. */}
            <h2 className="subsection-heading">
              {visionSection.title}
            </h2>
            <p className="mt-4 max-w-3xl section-lead">
              {visionSection.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
