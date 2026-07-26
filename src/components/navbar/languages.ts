/**
 * The languages the site ships copy for.
 *
 * Kept out of Navbar.tsx so that file exports only a component (react-refresh),
 * and so the list has one home rather than being re-derived per consumer.
 */
export type LanguageCode = 'no' | 'en' | 'ar';

/**
 * `name` is written in the language it selects — the convention for language
 * pickers, because someone looking for Arabic is looking for العربية.
 */
export const LANGUAGES: { code: LanguageCode; label: string; name: string }[] = [
  { code: 'no', label: 'NO', name: 'Norsk' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

/** i18next reports tags like nb-NO or en-GB; collapse to the three we ship. */
export function normalizeLang(raw: string | undefined): LanguageCode {
  const lang = raw?.toLowerCase() ?? 'no';
  if (lang.startsWith('ar')) return 'ar';
  if (lang.startsWith('en')) return 'en';
  return 'no';
}
