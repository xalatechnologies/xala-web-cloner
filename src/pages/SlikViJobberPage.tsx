import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WorkProcess from '../components/WorkProcess';
import FAQSection from '../components/faq/FAQSection';
import { FAQ_TOPICS } from '../components/faq/faqs';

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
        {/* Bottom padding is deliberately small: WorkProcess brings its own
            generous top padding, and the two stacked to a screenful of nothing
            between the intro and the first step. */}
        <header className="container mx-auto px-4 pb-2 pt-14 md:pb-4 md:pt-20">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            {t('processPage.eyebrow', 'Slik vi jobber')}
          </p>
          <h1 className="max-w-[20ch] text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            {t('processPage.title', 'Fra første samtale til system i drift')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t(
              'processPage.description',
              'Vi leverer i etapper, ikke som én stor overlevering. Hver etappe gir noe som virker, og noe dere kan ta stilling til før den neste starter.'
            )}
          </p>
        </header>

        <WorkProcess headingLevel="h2" />

        {/* The engagement questions belong here rather than on /tjenester,
            where all eight of them used to sit. See FAQ_TOPICS. */}
        <FAQSection
          id="prosess-faq"
          only={FAQ_TOPICS.process}
          title={t('processPage.faqTitle', 'Før dere setter i gang')}
          description={t(
            'processPage.faqDescription',
            'Det folk oftest vil vite før de tar kontakt — pris, tid, anskaffelse og hvem som drifter løsningen etterpå.'
          )}
        />

        <section
          aria-labelledby="prosess-cta"
          className="border-t border-border bg-muted/40 py-14 md:py-20"
        >
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                {t('processPage.ctaEyebrow', 'Neste steg')}
              </p>
              <h2 id="prosess-cta" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {t('processPage.ctaTitle', 'Ta en uforpliktende prat')}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {t(
                  'processPage.ctaDescription',
                  'Fortell oss hva dere står i, så sier vi hva vi ville gjort først — og hva vi ville ventet med.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/kontakt"
                className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t('processPage.ctaContact', 'Kontakt oss')}
              </Link>
              <Link
                to="/caser"
                className="inline-flex min-h-12 items-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t('processPage.ctaCases', 'Se kundecaser')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
