import { useTranslation } from 'react-i18next';
import legalData from '@/data/legal.json';

type Language = 'no' | 'en' | 'ar';
type LegalType = 'privacy' | 'terms' | 'cookies';

export interface LegalSection {
  id: string;
  title: string;
  content?: string;
  description?: string;
  items?: Array<{
    id: string;
    title?: string;
    content: string;
  }>;
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
      title: content.title,
      sections: content.sections.map(s => ({
        id: s.id,
        title: s.title,
        // Keep the section lead when items are also present. Dropping `content`
        // here is how a processors intro (and the older collection/usage leads)
        // never reached the page.
        description: s.description || (s.items && s.items.length > 0 ? s.content : undefined) || undefined,
        items: s.items && s.items.length > 0 
          ? s.items 
          : (s.content ? [{ id: s.id, title: undefined, content: s.content }] : [])
      })),
      lastUpdated: content.lastUpdated
    } : null,
    isLoading: false,
    error: content ? null : new Error(`Legal content "${type}" not found`),
  };
};
