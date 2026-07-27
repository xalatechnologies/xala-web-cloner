import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ContactInfoProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  details: string;
  isLtr?: boolean; // Force LTR for phone numbers
};

// Document already has dir="rtl" for Arabic, so flexbox automatically reverses
// We just need to keep phone numbers LTR to prevent digit reversal
const ContactInfoItem = ({ icon, title, details, isLtr }: ContactInfoProps) => (
  <div className="group p-4 sm:p-6 rounded-2xl bg-card text-card-foreground border border-border transition-all duration-700 animate-fade-in dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-muted transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:bg-muted/70 dark:bg-white/5 dark:group-hover:bg-white/10">
        {icon}
      </div>
      <div>
        <h2 className="card-heading mb-1">{title}</h2>
        <p className="text-muted-foreground" dir={isLtr ? 'ltr' : undefined}>{details}</p>
      </div>
    </div>
  </div>
);

// Static contact info - no Supabase
const contactData = {
  no: {
    phone: { label: 'Telefon', value: '+47 966 65 001' },
    email: { label: 'E-post', value: 'info@xala.no' },
    address: { label: 'Adresse', value: 'Nesbru, Norge' }
  },
  en: {
    phone: { label: 'Phone', value: '+47 966 65 001' },
    email: { label: 'Email', value: 'info@xala.no' },
    address: { label: 'Address', value: 'Nesbru, Norway' }
  },
  ar: {
    phone: { label: 'الهاتف', value: '+47 966 65 001' },
    email: { label: 'البريد الإلكتروني', value: 'info@xala.no' },
    address: { label: 'العنوان', value: 'أوسلو، النرويج' }
  }
};

type Language = 'no' | 'en' | 'ar';

export const ContactInfo = () => {
  const { i18n } = useTranslation();

  // Normalize language
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  const data = contactData[currentLanguage];

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: data.phone.label,
      subtitle: '',
      details: data.phone.value,
      isLtr: true // Phone numbers should always be LTR
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: data.email.label,
      subtitle: '',
      details: data.email.value
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: data.address.label,
      subtitle: '',
      details: data.address.value
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