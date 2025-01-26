import { useQuery } from '@tanstack/react-query';
import { Code, Shield, LineChart, Laptop } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { type Database } from '@/integrations/supabase/types';

const iconMap: { [key: string]: React.ReactNode } = {
  Code: <Code className="w-12 h-12 text-xala-accent mb-4" />,
  Shield: <Shield className="w-12 h-12 text-xala-accent mb-4" />,
  LineChart: <LineChart className="w-12 h-12 text-xala-accent mb-4" />,
  Laptop: <Laptop className="w-12 h-12 text-xala-accent mb-4" />
};

const Services = () => {
  const { i18n } = useTranslation();
  const { data: services, isLoading } = useQuery({
    queryKey: ['services', i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as Database['public']['Enums']['supported_language'];
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order');

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-xala-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 w-64 bg-xala-primary/20 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-xala-primary/20 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="p-6 bg-xala-primary rounded-lg animate-pulse"
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

  return (
    <section id="services" className="py-20 bg-xala-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">Our Services</h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            We deliver comprehensive technology solutions to help your business succeed in the digital age
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services?.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-xala-primary rounded-lg hover:transform hover:scale-105 transition-all duration-300"
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