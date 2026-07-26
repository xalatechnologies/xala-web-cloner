import faqData from '@/data/faq.json';

type Language = 'no' | 'en' | 'ar';

export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
}

/** Kept out of FAQSection.tsx so that file exports only a component. */
export function faqsFor(language: string): FAQEntry[] {
  const lang = language?.toLowerCase() ?? 'no';
  const key: Language = lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  return (faqData as Record<Language, FAQEntry[]>)[key] ?? faqData.no;
}
