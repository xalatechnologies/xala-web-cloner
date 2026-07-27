import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';
import { PageCTA, PageHeader } from '../components/layouts/PageFrame';

export default function OmOssPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('aboutPage.eyebrow', 'Om oss')}
          title={t('aboutPage.title', 'Et lite hus som forvalter det det bygger')}
          description={t(
            'aboutPage.description',
            'Vi leverer til statlige etater, helseforetak og kommuner — og blir værende etter lansering.'
          )}
        />

        <About headingLevel="h2" />

        <PageCTA
          id="om-oss-cta"
          title={t('aboutPage.ctaTitle', 'Vil dere vite mer?')}
          description={t(
            'aboutPage.ctaDescription',
            'Ta en uforpliktende prat, eller se hva vi har levert til andre i samme situasjon.'
          )}
          primary={{ to: '/kontakt', label: t('aboutPage.ctaContact', 'Kontakt oss') }}
          secondary={{ to: '/karriere', label: t('aboutPage.ctaCareers', 'Jobbe hos oss') }}
        />
      </main>
      <Footer />
    </div>
  );
}
