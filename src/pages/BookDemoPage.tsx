import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ContactForm } from '../components/contact/ContactForm';

export default function BookDemoPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main" className="pt-20 flex-1">
        <section className="relative py-24 overflow-hidden bg-background hero-gradient">
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t('bookDemo.title')}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('bookDemo.description')}
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
