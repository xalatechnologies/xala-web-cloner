import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

type ContactInfoProps = {
  icon: React.ReactNode;
  title: string;
  details: string;
};

const ContactInfoItem = ({ icon, title, details }: ContactInfoProps) => (
  <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 
                hover:border-white/20 transition-all duration-700 animate-fade-in">
    <div className="flex items-center space-x-6">
      <div className="p-4 rounded-xl bg-white/5 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:bg-white/10">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-xala-text/80">{details}</p>
      </div>
    </div>
  </div>
);

export const ContactInfo = () => {
  const { t, i18n } = useTranslation();

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
      title: t('contact.info.phone.title'),
      details: getContactValue('phone')
    },
    {
      icon: <Mail className="w-6 h-6 text-[#D946EF]" />,
      title: t('contact.info.email.title'),
      details: getContactValue('email')
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#0EA5E9]" />,
      title: t('contact.info.address.title'),
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