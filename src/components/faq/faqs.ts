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
 * The whole set used to render on /tjenester and nowhere else, so the
 * questions people ask about engagement (cost, timeline, public procurement,
 * who runs it afterwards) sat on a page about capabilities, while the page
 * named "how we work" answered nothing.
 *
 * Cost then moved again, to /priser, which is the page that exists to answer
 * "hva koster et saksbehandlingssystem". Timeline, procurement and aftercare
 * stay on /slik-vi-jobber.
 *
 * The split is disjoint on purpose so each landing page shows the questions
 * that belong there. FAQPage structured data is emitted only on /faq, which
 * publishes the full set — two URLs marking up the same FAQPage is the
 * duplication Google's guidance exists to prevent.
 */
export const FAQ_TOPICS = {
  /** What we can do: capabilities, stack, compliance, reach. */
  services: ['teknologi', 'overta', 'gdpr', 'sted'],
  /** What working with us is like: time, procurement, aftercare. */
  process: ['tid', 'offentlig', 'forvaltning'],
  /** What a system costs, and why there is no fixed list. */
  pricing: ['kostnad', 'prisliste', 'inkludert', 'kontrakt'],
} as const;

/** The entries for a topic, in the order the topic lists them. */
export function faqsForTopic(language: string, ids: readonly string[]): FAQEntry[] {
  const all = faqsFor(language);
  return ids
    .map((id) => all.find((entry) => entry.id === id))
    .filter((entry): entry is FAQEntry => entry !== undefined);
}
