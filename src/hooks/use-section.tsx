import { useTranslation } from 'react-i18next';
import sectionsData from '@/data/sections.json';

type Language = 'no' | 'en' | 'ar';

export interface Section {
  id: string;
  title: string;
  description: string | null;
  background?: string | null;
}

export const useSection = (sectionName: string) => {
  const { i18n } = useTranslation();

  // Normalize language code
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  // Get section data directly from JSON
  const langSections = sectionsData[currentLanguage] || sectionsData.no;
  const data = langSections[sectionName as keyof typeof langSections] as Section | undefined;

  return {
    data: data ?? null,
    isLoading: false,
    error: data ? null : new Error(`Section "${sectionName}" not found`),
  };
};