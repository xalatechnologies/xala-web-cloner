import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { caserEntries } from '@/data/caser-page-entries';

/**
 * Numbers and named references, above the fold-ish rather than buried on /caser.
 *
 * Learned from digilist.no, which puts named social proof with hard metrics
 * high on its front page. The same material existed here — the figures were
 * already published on /caser and the client names in the case data — but the
 * homepage carried none of it, so a visitor had to go looking for the single
 * most persuasive thing on the site.
 *
 * Deliberately NOT copied from that reference: its testimonial quotes. Writing
 * a quote and attributing it to Digdir or SSB would be inventing a statement
 * from a real organisation. Metrics that are already published, and client
 * names that are already listed, are the honest half of that pattern.
 */
const STATS = [
  { value: '15+', key: 'proof.stats.projects', fallback: 'Leverte prosjekter' },
  { value: '10+', key: 'proof.stats.experience', fallback: 'Års erfaring' },
  { value: '5M+', key: 'proof.stats.users', fallback: 'Sluttbrukere betjent' },
] as const;

/*
 * The named-reference chips that used to sit here are gone. The client wall
 * directly above now renders every client's name as text, so this repeated six
 * of them a few hundred pixels lower, under the same "Referanser" eyebrow.
 */

export default function ProofTeaser() {
  const { t } = useTranslation();
  const linked = caserEntries.filter((entry) => entry.slug).length;

  return (
    <Section tone="default" size="md" labelledBy="proof-heading">
      <div className="max-w-3xl">
        <p className="mb-5 eyebrow">
          {t('proof.eyebrow', 'Resultater')}
        </p>
        <h2
          id="proof-heading"
          className="section-heading"
        >
          {t('proof.title', 'Systemer i drift hos dem som ikke kan ha nedetid')}
        </h2>
        <p className="mt-5 max-w-2xl section-lead">
          {t(
            'proof.description',
            'Vi har levert til statlige etater, helseforetak og kommuner, og vi forvalter løsningene videre etter lansering.'
          )}
        </p>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.key} className="bg-card p-6 md:p-8">
            <dt className="text-sm text-muted-foreground">{t(stat.key, stat.fallback)}</dt>
            <dd className="mt-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>


      <div className="mt-10">
        <Link
          to="/caser"
          className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all duration-200 hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t('proof.viewAll', 'Se alle {{count}} kundecaser', { count: linked })}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Section>
  );
}
