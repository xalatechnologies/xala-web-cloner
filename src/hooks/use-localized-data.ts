import { useTranslation } from 'react-i18next';
import servicesData from '@/data/services.json';
import productsData from '@/data/products.json';
import clientsData from '@/data/clients.json';
import technologiesData from '@/data/technologies.json';

type Language = 'no' | 'en' | 'ar';

interface UseLocalizedDataOptions {
  queryKey: string;
  enabled?: boolean;
}

/** A data file is either a flat array or an object keyed by language. */
type LocalizedSource = unknown[] | Record<string, unknown[]>;

// Maps query keys to their data sources
const dataMap: Record<string, LocalizedSource> = {
  services: servicesData,
  products: productsData,
  clients: clientsData,
  technologies: technologiesData,
};

export function useLocalizedData<T>({
  queryKey,
  enabled = true
}: UseLocalizedDataOptions) {
  const { i18n } = useTranslation();

  // Normalize language code
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  if (!enabled) {
    return { data: [] as T[], isLoading: false, error: null };
  }

  const source = dataMap[queryKey];

  if (!source) {
    return {
      data: [] as T[],
      isLoading: false,
      error: new Error(`Unknown data source: ${queryKey}`)
    };
  }

  // If data is language-keyed (object), get the language version
  // If data is a flat array (like clients, technologies), return as-is
  const data = Array.isArray(source)
    ? source
    : (source[currentLanguage] || source.no || []);

  return {
    data: data as T[],
    isLoading: false,
    error: null,
  };
}
