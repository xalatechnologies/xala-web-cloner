import { useQuery } from '@tanstack/react-query';
import { Code, Shield, LineChart, Laptop } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { type Database } from '@/integrations/supabase/types';
import ServiceBackground from './services/ServiceBackground';

const iconMap: { [key: string]: React.ReactNode } = {
  Code: <Code className="w-12 h-12 text-xala-accent mb-4" />,
  Shield: <Shield className="w-12 h-12 text-xala-accent mb-4" />,
  LineChart: <LineChart className="w-12 h-12 text-xala-accent mb-4" />,
  Laptop: <Laptop className="w-12 h-12 text-xala-accent mb-4" />
};

const Services = () => {
  const { i18n } = useTranslation();

  // Fetch section data
  const { data: sectionData, isLoading: isSectionLoading } = useQuery({
    queryKey: ['sections', 'services', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as Database['public']['Enums']['supported_language'];
      console.log('Fetching services section data for language:', currentLanguage);
      
      // First try current language
      let { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('language', currentLanguage)
        .eq('section_name', 'services')
        .maybeSingle();
      
      // If no data found and current language is not English, try English as fallback
      if (!data && currentLanguage !== 'en') {
        console.log('No data found in current language, trying English fallback');
        const fallbackResult = await supabase
          .from('sections')
          .select('*')
          .eq('language', 'en')
          .eq('section_name', 'services')
          .maybeSingle();
          
        data = fallbackResult.data;
        error = fallbackResult.error;
      }

      if (error) throw error;
      return data;
    }
  });

  // Fetch services data
  const { data: services, isLoading: isServicesLoading } = useQuery({
    queryKey: ['services', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as Database['public']['Enums']['supported_language'];
      console.log('Fetching services data for language:', currentLanguage);
      
      // First try current language
      let { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order');

      // If no data found and current language is not English, try English as fallback
      if ((!data || data.length === 0) && currentLanguage !== 'en') {
        console.log('No services found in current language, trying English fallback');
        const fallbackResult = await supabase
          .from('services')
          .select('*')
          .eq('language', 'en')
          .order('sort_order');
          
        data = fallbackResult.data;
        error = fallbackResult.error;
      }

      if (error) throw error;
      return data;
    }
  });

  if (isServicesLoading || isSectionLoading) {
    return (
      <section id="services" className="py-20 bg-xala-secondary relative">
        <ServiceBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="h-8 w-64 bg-xala-primary/20 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-xala-primary/20 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="p-6 bg-xala-primary/80 backdrop-blur-sm rounded-lg animate-pulse"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-xala-accent/20 rounded-lg mb-4" />
                  <div className="h-6 w-32 bg-xala-accent/20 rounded mb-3" />
                  <div className="h-4 w-full bg-xala-accent/20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default content if no data is found
  const defaultTitle = "Our Services";
  const defaultDescription = "We deliver comprehensive technology solutions to help your business succeed in the digital age";

  return (
    <section id="services" className="py-20 bg-xala-secondary relative">
      <ServiceBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">
            {sectionData?.title || defaultTitle}
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            {sectionData?.description || defaultDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services?.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-xala-primary/80 backdrop-blur-sm rounded-lg hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                {iconMap[service.icon]}
                <h3 className="text-xl font-semibold mb-3 text-xala-accent">{service.title}</h3>
                <p className="text-xala-text">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;