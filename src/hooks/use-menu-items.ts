import { useTranslation } from 'react-i18next';
import menuData from '@/data/menu.json';

type Language = 'no' | 'en' | 'ar';

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  sortOrder: number;
}

export function useMenuItems() {
  const { i18n } = useTranslation();

  // Normalize language code
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  // Return data directly from static JSON - no Supabase, no async, no loading state
  const data = menuData[currentLanguage] || menuData.no;

  return {
    data,
    isLoading: false,
    error: null,
  };
}
