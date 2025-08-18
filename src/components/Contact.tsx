import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { ContactInfo } from './contact/ContactInfo';
import { SocialLinks } from './contact/SocialLinks';
import { ContactForm } from './contact/ContactForm';
import MainLayout from './layouts/MainLayout';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

const Contact = () => {
  const { t, i18n } = useTranslation();

  // Fetch section data based on current language
  const { data: section } = useQuery({
    queryKey: ['contact-section', i18n.language],
    queryFn: async () => {
      const currentLang = i18n.language.toLowerCase() as SupportedLanguage;
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('section_name', 'contact')
        .eq('language', currentLang)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  return (
    <MainLayout 
      pageId="contact"
      language={i18n.language}
      analytics={{
        googleAnalyticsId: "G-NFGNKJDHHW",
        microsoftClarityId: "q15abxku18",
        plausibleDomain: 'xala.no'
      }}
    >
      <section id="contact" className="relative py-24 overflow-hidden bg-background dark:bg-gradient-to-b dark:from-xala-primary dark:to-xala-secondary">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-float-1"></div>
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-[#D946EF]/10 rounded-full blur-3xl animate-float-2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] text-transparent bg-clip-text mb-4">
              {section?.title || t('contact.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {section?.description || t('contact.description')}
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-[400px] space-y-8">
              <ContactInfo />
              <SocialLinks />
            </div>
            <div className="flex-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;