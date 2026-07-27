import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Technologies from '../components/Technologies';
import Footer from '../components/Footer';
import { PageCTA, PageHeader } from '../components/layouts/PageFrame';

export default function TeknologiPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('technologyPage.eyebrow', 'Teknologi')}
          title={t('technologyPage.title', 'Valg vi må kunne forsvare om fem år')}
          description={t(
            'technologyPage.description',
            'Vi velger kjedelig der det teller. Et fagsystem lever lenger enn rammeverkene som var populære da det ble bygget.'
          )}
        />

        <Technologies headingLevel="h2" />

        <PageCTA
          id="teknologi-cta"
          title={t('technologyPage.ctaTitle', 'Lurer dere på om dette passer?')}
          description={t(
            'technologyPage.ctaDescription',
            'Vi går gjerne gjennom hva dere har i dag, og hva som er verdt å bytte ut først.'
          )}
          primary={{ to: '/kontakt', label: t('technologyPage.ctaContact', 'Kontakt oss') }}
          secondary={{ to: '/caser', label: t('technologyPage.ctaCases', 'Se kundecaser') }}
        />
      </main>
      <Footer />
    </div>
  );
}
