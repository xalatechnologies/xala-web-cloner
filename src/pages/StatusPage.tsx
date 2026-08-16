import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageCTA, PageHeader } from '@/components/layouts/PageFrame';

/**
 * Short “no public statusboard” page. SLA, oppetid and sertifiseringer live
 * on /transparens — this route only exists so /status is not a 404.
 */
export default function StatusPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('statusPage.eyebrow', 'Drift')}
          title={t('statusPage.title', 'Ingen offentlig statusside')}
          description={t(
            'statusPage.description',
            'Vi har ikke et offentlig, sanntids dashbord. Oppetid og hendelser rapporteres til kunden gjennom kanalen som er avtalt i driftsavtalen.'
          )}
        />

        <section className="container mx-auto px-4 pb-10 pt-6 md:pb-14">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t('statusPage.transparensBefore', 'For oppetidsforpliktelser, SLA og sertifiseringer, se')}{' '}
            <Link to="/transparens" className="font-semibold text-primary underline underline-offset-4">
              {t('statusPage.transparensLink', 'siden om åpenhet')}
            </Link>
            {t('statusPage.transparensAfter', '.')}
          </p>
        </section>

        <PageCTA
          id="status-transparens"
          title={t('statusPage.ctaTitle', 'Mer om drift og SLA')}
          description={t(
            'statusPage.ctaDescription',
            'Åpenhetssiden beskriver hvordan vi avtaler oppetid, og hvem dere kontakter ved en hendelse.'
          )}
          primary={{
            to: '/transparens',
            label: t('statusPage.ctaTransparens', 'Åpenhet om drift'),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
