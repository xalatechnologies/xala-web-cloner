import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import clientsData from '@/data/clients.json';
import ClientLogo from './clients/ClientLogo';

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
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            {t('clients.eyebrow', 'Referanser')}
          </p>
          <h2
            id="clients-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {section?.title || t('clients.title')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {section?.description || t('clients.description')}
          </p>
        </div>

        {/*
          Five columns, because there are fifteen clients: three full rows with
          no gap left at the end. A wrapping flex row sized to its content
          stopped short of the right edge and left the section looking
          unfinished.
        */}
        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {clientsData.map((client) => (
            <li key={client.id}>
              <ClientLogo name={client.name} logoUrl={client.logoUrl} websiteUrl={client.websiteUrl} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
