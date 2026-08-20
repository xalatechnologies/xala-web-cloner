import { CaseStudyRichInline } from '@/components/case-studies/CaseStudyRichText';
import type { LegalSection } from '@/hooks/use-legal-content';

/**
 * Shared legal-page body. Content lives in legal.json; this is the renderer
 * that already understands markdown internal links such as
 * `[informasjonskapsler](/cookies)`.
 */
const LegalSections = ({ sections }: { sections: LegalSection[] }) => (
  <>
    {sections.map((section) => (
      <section key={section.id} className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
        {section.description && (
          <p className="text-foreground/80 leading-relaxed">
            <CaseStudyRichInline text={section.description} />
          </p>
        )}
        {!section.description && section.items && section.items.length === 1 && !section.items[0].title && (
          <p className="text-foreground/90 leading-relaxed">
            <CaseStudyRichInline text={section.items[0].content} />
          </p>
        )}
        {section.items && section.items.length > 0 && section.items.some((item) => item.title) && (
          <ul className="space-y-4 pl-6 list-disc marker:text-primary">
            {section.items.map((item) => (
              <li key={item.id} className="text-foreground/90">
                {item.title && <strong className="text-primary dark:text-primary">{item.title}: </strong>}
                <CaseStudyRichInline text={item.content} />
              </li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </>
);

export default LegalSections;
