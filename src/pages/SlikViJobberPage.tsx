import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WorkProcess from '../components/WorkProcess';
import FAQSection from '../components/faq/FAQSection';
import { FAQ_TOPICS } from '../components/faq/faqs';
import { PageCTA, PageHeader } from '../components/layouts/PageFrame';

/**
 * How we work.
 *
 * This page used to be a single component: five process cards in a
 * three-column grid, on a dark gradient with floating blur blobs, and nothing
 * else — no page heading of its own, no answers, no way onward. For a
 * consultancy it is one of the two or three pages a buyer reads before making
 * contact, and it ended where the grid ended.
 *
 * It now reads top to bottom: what to expect, the sequence itself, the
 * questions people ask before engaging, and a way to start the conversation.
 */
export default function SlikViJobberPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('processPage.eyebrow', 'Slik vi jobber')}
          title={t('processPage.title', 'Fra første samtale til system i drift')}
          description={t(
            'processPage.description',
            'Vi leverer i etapper, ikke som én stor overlevering. Hver etappe gir noe som virker, og noe dere kan ta stilling til før den neste starter.'
          )}
        />

        <WorkProcess headingLevel="h2" />

        <p className="container mx-auto max-w-3xl px-4 pb-2 text-center text-lg text-muted-foreground">
          {t('processPage.priceNoteBefore', 'Spørsmål om pris og hva som driver kostnaden')}{' '}
          <Link
            to="/priser"
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('processPage.priceNoteLink', 'finnes på prissiden')}
          </Link>
          .
        </p>

        {/* Time, procurement and aftercare belong here. Cost moved to /priser
            so the two pages do not emit the same FAQPage questions. */}
        <FAQSection
          id="prosess-faq"
          only={FAQ_TOPICS.process}
          title={t('processPage.faqTitle', 'Før dere setter i gang')}
          description={t(
            'processPage.faqDescription',
            'Det folk oftest vil vite før de tar kontakt: tid, anskaffelse og hvem som drifter løsningen etterpå.'
          )}
        />

        <PageCTA
          id="prosess-cta"
          eyebrow={t('processPage.ctaEyebrow', 'Neste steg')}
          title={t('processPage.ctaTitle', 'Ta en uforpliktende prat')}
          description={t(
            'processPage.ctaDescription',
            'Fortell oss hva dere står i, så sier vi hva vi ville gjort først — og hva vi ville ventet med.'
          )}
          primary={{ to: '/kontakt', label: t('processPage.ctaContact', 'Kontakt oss') }}
          secondary={{ to: '/caser', label: t('processPage.ctaCases', 'Se kundecaser') }}
        />
      </main>

      <Footer />
    </div>
  );
}
