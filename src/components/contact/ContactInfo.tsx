import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

type ContactInfoProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  details: string;
};

const ContactInfoItem = ({ icon, title, details }: ContactInfoProps) => (
  <div className="group p-4 sm:p-6 rounded-2xl bg-card text-card-foreground border border-border transition-all duration-700 animate-fade-in dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent">
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-xl bg-muted transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:bg-muted/70 dark:bg-white/5 dark:group-hover:bg-white/10">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground">{details}</p>
      </div>
    </div>
  </div>
);

export const ContactInfo = () => {
  const { i18n } = useTranslation();

  const { data: contactInfoData } = useQuery({
    queryKey: ['contact-info', i18n.language],
    queryFn: async () => {
      const currentLang = i18n.language.toLowerCase() as SupportedLanguage;
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .eq('language', currentLang);

      if (error) throw error;
      return data;
    },
  });

  const getContactValue = (type: string) => {
    return contactInfoData?.find(info => info.type === type)?.value || '';
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: getContactValue('phone_label'),
      subtitle: getContactValue('phone_description'),
      details: getContactValue('phone')
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: getContactValue('email_label'),
      subtitle: getContactValue('email_description'),
      details: getContactValue('email')
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: getContactValue('address_label'),
      subtitle: getContactValue('address_description'),
      details: getContactValue('address')
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-8 w-full">
      {contactInfo.map((info, index) => (
        <ContactInfoItem key={index} {...info} />
      ))}
    </div>
  );
};