import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { generateFAQSchema } from '@/components/seo/sectionSchemas';
import { faqsFor } from './faqs';

/**
 * The questions buyers actually ask, answered on the page and mirrored as
 * FAQPage structured data.
 *
 * The schema is emitted here rather than from RouteSEO on purpose: Google
 * requires FAQPage markup to describe FAQs that are visible on the page, so
 * tying the two together means the markup cannot outlive the content. Drop this
 * component from a page and its schema goes with it.
 */
interface FAQSectionProps {
  /** Rendered as the section heading; defaults to a translated fallback. */
  title?: string;
}

const FAQSection = ({ title }: FAQSectionProps) => {
  const { t, i18n } = useTranslation();
  const faqs = faqsFor(i18n.language);

  if (!faqs.length) return null;

  const heading = title ?? t('faq.title', 'Ofte stilte spørsmål');

  return (
    <section id="faq" className="py-20 md:py-24 bg-muted/30" aria-labelledby="faq-heading">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(faqs.map(({ question, answer }) => ({ question, answer }))))}
        </script>
      </Helmet>

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('faq.description', 'Svar på det folk spør oss om oftest. Finner du ikke svaret, ta kontakt.')}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-border">
              <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
