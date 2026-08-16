import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQSection from '../components/faq/FAQSection';
import { PageCTA, PageHeader } from '../components/layouts/PageFrame';

/**
 * The site's FAQ page. Copy comes from src/data/faq.json — the same questions
 * already shown in sections on /priser, /tjenester and /slik-vi-jobber.
 * FAQPage schema is emitted here and nowhere else, so those sections stay
 * visible without publishing a second FAQPage graph.
 */
export default function FaqPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('faq.eyebrow', 'FAQ')}
          title={t('faq.title', 'Ofte stilte spørsmål')}
          description={t(
            'faq.description',
            'Svar på det folk spør oss om oftest. Finner du ikke svaret, ta kontakt.'
          )}
        />

        <FAQSection includeIntro={false} />

        <PageCTA
          id="faq-cta"
          title={t('teasers.contact.title', 'Klar for en prat?')}
          description={t(
            'teasers.contact.description',
            'Vi svarer på alle henvendelser innen 24 timer. Ta kontakt for en uforpliktende samtale.'
          )}
          primary={{
            to: '/kontakt',
            label: t('teasers.contact.getInTouch', 'Ta kontakt'),
          }}
          secondary={{
            to: '/priser',
            label: t('nav.prices', 'Priser'),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
