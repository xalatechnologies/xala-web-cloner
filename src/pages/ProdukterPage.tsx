import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import CoreProducts from '../components/CoreProducts';
import Footer from '../components/Footer';
import { PageCTA, PageHeader } from '../components/layouts/PageFrame';

export default function ProdukterPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('productsPage.eyebrow', 'Produkter')}
          title={t('productsPage.title', 'Seks produkter for kommune og næringsliv')}
          hyphenate={false}
          description={t(
            'productsPage.description',
            'Bevillingsportal, Tilskuddsportal, Redusert foreldrebetaling, Arkitekturprinsipper, Digilist og Digiskjema. Bygget av de samme delene vi bruker i kundeprosjekter, og forvaltet på samme måte.'
          )}
        />

        <CoreProducts headingLevel="h2" />

        <PageCTA
          id="produkter-cta"
          title={t('productsPage.ctaTitle', 'Passer noe av dette til dere?')}
          description={t(
            'productsPage.ctaDescription',
            'Produktene tilpasses. Fortell oss hva dere trenger, så sier vi om det er en tilpasning eller et prosjekt.'
          )}
          primary={{ to: '/kontakt', label: t('productsPage.ctaContact', 'Kontakt oss') }}
          secondary={{ to: '/tjenester', label: t('productsPage.ctaServices', 'Se tjenester') }}
        />
      </main>
      <Footer />
    </div>
  );
}
