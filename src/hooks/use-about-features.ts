import { useTranslation } from 'react-i18next';
import aboutFeaturesData from '@/data/about-features.json';

type Language = 'no' | 'en' | 'ar';

export interface AboutFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export function useAboutFeatures() {
  const { i18n } = useTranslation();

  // Normalize language
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  const features = aboutFeaturesData[currentLanguage] || aboutFeaturesData.no;

  return {
    data: features as AboutFeature[],
    isLoading: false,
    error: null,
  };
}
