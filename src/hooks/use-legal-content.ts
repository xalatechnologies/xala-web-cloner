import { useTranslation } from 'react-i18next';
import legalData from '@/data/legal.json';

type Language = 'no' | 'en' | 'ar';
type LegalType = 'privacy' | 'terms' | 'cookies';

export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalContent {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

interface UseLegalContentProps {
  type: LegalType;
}

export const useLegalContent = ({ type }: UseLegalContentProps) => {
  const { i18n } = useTranslation();

  // Normalize language
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  const langData = legalData[currentLanguage] || legalData.no;
  const content = langData[type] as LegalContent | undefined;

  return {
    data: content ? {
      sections: content.sections.map(s => ({
        ...s,
        items: [{ content: s.content }]
      })),
      lastUpdated: content.lastUpdated
    } : null,
    isLoading: false,
    error: content ? null : new Error(`Legal content "${type}" not found`),
  };
};
