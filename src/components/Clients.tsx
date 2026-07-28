import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import clientsData from '@/data/clients.json';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ClientLogo from './clients/ClientLogo';
import { caserEntries } from '@/data/caser-page-entries';

/**
 * Published figures, shown with the logos rather than in a section of their
 * own. ProofTeaser used to sit directly below this one repeating the same
 * claim in words — who we deliver to — under its own heading. Numbers and
 * names are the same argument, so they belong in the same block.
 */
const STATS = [
  { value: '15+', key: 'proof.stats.projects', fallback: 'Leverte prosjekter' },
  { value: '10+', key: 'proof.stats.experience', fallback: 'Års erfaring' },
  { value: '5M+', key: 'proof.stats.users', fallback: 'Sluttbrukere betjent' },
] as const;

/**
 * Who we have delivered to.
 *
 * Replaces a two-row marquee of white cards. Two problems with that, one
 * visual and one structural.
 *
 * Visually: the logos are dark-ink files, so each sat on its own light card —
 * and in dark mode the rule was literally `bg-stone-200/95`, a row of white
 * boxes down a dark page. The chrome existed only to make the artwork legible.
 * Rendering each logo as a flat monochrome silhouette removes the reason for
 * the box, so the boxes go too.
 *
 * Structurally: the names were only ever inside images. A crawler reading this
 * page saw a decorative strip; an answer engine asked who Xala works for found
 * nothing to quote. The names are text now, in a list, with the logo as the
 * accessible label — which is the version that can be cited.
 *
 * Also no longer moving. Motion on a logo strip is a slot machine: it asks the
 * reader to wait for a name to come round rather than letting them scan.
 */
const Clients = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('clients');

  return (
    <section id="clients" className="border-y border-border bg-muted/30 py-16 md:py-24" aria-labelledby="clients-heading">
      <div className="container mx-auto px-4">
        <div className="section-header">
          <p className="mb-5 eyebrow">
            {t('clients.eyebrow', 'Referanser')}
          </p>
          <h2
            id="clients-heading"
            className="section-heading"
          >
            {section?.title || t('clients.title')}
          </h2>
          <p className="section-lead mt-5 max-w-[52ch]">
            {section?.description || t('clients.description')}
          </p>
        </div>

        {/*
          Five columns, because there are fifteen clients: three full rows with
          no gap left at the end. A wrapping flex row sized to its content
          stopped short of the right edge and left the section looking
          unfinished.
        */}
        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.key} className="bg-card p-6 md:p-8">
              <dt className="text-sm text-muted-foreground">{t(stat.key, stat.fallback)}</dt>
              <dd className="mt-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {clientsData.map((client) => (
            <li key={client.id}>
              <ClientLogo name={client.name} logoUrl={client.logoUrl} websiteUrl={client.websiteUrl} />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/caser"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('proof.viewAll', 'Se alle {{count}} kundecaser', {
              count: caserEntries.filter((entry) => entry.slug).length,
            })}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Clients;
