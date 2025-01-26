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

const ContactInfoItem = ({ icon, title, subtitle, details }: ContactInfoProps) => (
  <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 
                hover:border-white/20 transition-all duration-700 animate-fade-in">
    <div className="flex items-center space-x-6">
      <div className="p-4 rounded-xl bg-white/5 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:bg-white/10">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-xala-text/60 mb-2">{subtitle}</p>
        <p className="text-xala-text/80">{details}</p>
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
      icon: <Phone className="w-6 h-6 text-[#8B5CF6]" />,
      title: getContactValue('phone_label'),
      subtitle: getContactValue('phone_description'),
      details: getContactValue('phone')
    },
    {
      icon: <Mail className="w-6 h-6 text-[#D946EF]" />,
      title: getContactValue('email_label'),
      subtitle: getContactValue('email_description'),
      details: getContactValue('email')
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#0EA5E9]" />,
      title: getContactValue('address_label'),
      subtitle: getContactValue('address_description'),
      details: getContactValue('address')
    }
  ];

  return (
    <div className="space-y-8">
      {contactInfo.map((info, index) => (
        <ContactInfoItem key={index} {...info} />
      ))}
    </div>
  );
};