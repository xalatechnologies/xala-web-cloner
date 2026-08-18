import { useTranslation } from 'react-i18next';
import { localizedSeo } from '@/data/case-studies/localized';
import type { CaseStudy } from '@/types/caseStudy';

/**
 * Returns a copy of the case study with locale-specific field overrides applied.
 * Falls back to English (base) content when a translation is missing.
 * Returns undefined if the input is undefined.
 */
export function useLocalizedCaseStudy(cs: CaseStudy | undefined): CaseStudy | undefined {
  const { i18n } = useTranslation();
  const rawLang = i18n.language?.split('-')[0];
  // Normalize Norwegian variants (nb, nn) to 'no'
  const lang = (rawLang === 'nb' || rawLang === 'nn' ? 'no' : rawLang) as 'no' | 'ar' | 'en';

  if (!cs) return undefined;
  const locale = cs.translations?.[lang as 'no' | 'ar'];
  if (!locale) {
    return lang === 'no' ? { ...cs, seo: localizedSeo(cs, 'no') } : cs;
  }

  return {
    ...cs,
    subtitle: locale.subtitle ?? cs.subtitle,
    summary: locale.summary ?? cs.summary,
    challenge: locale.challenge ?? cs.challenge,
    objectives: locale.objectives ?? cs.objectives,
    solution: locale.solution
      ? { ...cs.solution, ...locale.solution }
      : cs.solution,
    timeline: locale.timeline ?? cs.timeline,
    outcomes: locale.outcomes ?? cs.outcomes,
    capabilities: locale.capabilities ?? cs.capabilities,
    scope: locale.scope ?? cs.scope,
    card: locale.card ? { ...cs.card, ...locale.card } : cs.card,
    seo: localizedSeo(cs, lang),
  };
}
