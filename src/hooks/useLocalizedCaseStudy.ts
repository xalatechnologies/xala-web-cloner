import { useTranslation } from 'react-i18next';
import { localizeCaseStudy } from '@/data/case-studies/localized';
import type { CaseStudy } from '@/types/caseStudy';

/**
 * Returns a copy of the case study with locale-specific field overrides applied.
 * Falls back to English (base) content when a translation is missing.
 * Returns undefined if the input is undefined.
 */
export function useLocalizedCaseStudy(cs: CaseStudy | undefined): CaseStudy | undefined {
  const { i18n } = useTranslation();
  if (!cs) return undefined;
  return localizeCaseStudy(cs, i18n.language);
}
