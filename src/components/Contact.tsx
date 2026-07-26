import { useTranslation } from 'react-i18next';
import { useSection } from '@/hooks/use-section';
import { ContactInfo } from './contact/ContactInfo';
import { SocialLinks } from './contact/SocialLinks';
import { ContactForm } from './contact/ContactForm';

const Contact = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('contact');

  // Head tags come from RouteSEO; analytics is mounted once, app-wide, in
  // App.tsx — this component used to be the site's only analytics mount point.
  // The dark: gradient stops referenced undefined xala-* colours and rendered
  // transparent, so they are dropped rather than re-coloured.
  return (
    <>
      <section id="contact" className="relative py-24 overflow-hidden bg-background hero-gradient">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-float-1"></div>
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-float-2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {section?.title || t('contact.title')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {section?.description || t('contact.description')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 overflow-hidden">
            <div className="w-full lg:w-[400px] lg:shrink-0 space-y-4 lg:space-y-8">
              <ContactInfo />
              <SocialLinks />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;