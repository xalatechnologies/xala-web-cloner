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

/**
 * Which questions belong to which page.
 *
 * The whole set used to render on /tjenester and nowhere else, so the four
 * questions people ask about *engagement* — cost, timeline, public
 * procurement, who runs it afterwards — sat on a page about capabilities,
 * while the page named "how we work" answered nothing.
 *
 * The split is disjoint on purpose. Google asks that FAQPage markup describe
 * FAQs visible on that page, and two URLs publishing the same FAQPage is the
 * duplication that guidance exists to prevent. Each page now shows, and marks
 * up, its own questions.
 */
export const FAQ_TOPICS = {
  /** What we can do — capabilities, stack, compliance, reach. */
  services: ['teknologi', 'overta', 'gdpr', 'sted'],
  /** What working with us is like — cost, time, procurement, aftercare. */
  process: ['kostnad', 'tid', 'offentlig', 'forvaltning'],
} as const;

/** The entries for a topic, in the order the topic lists them. */
export function faqsForTopic(language: string, ids: readonly string[]): FAQEntry[] {
  const all = faqsFor(language);
  return ids
    .map((id) => all.find((entry) => entry.id === id))
    .filter((entry): entry is FAQEntry => entry !== undefined);
}
