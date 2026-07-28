import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';
import { useSection } from '@/hooks/use-section';
import workProcessData from '@/data/work-process.json';

type Language = 'no' | 'en' | 'ar';

interface WorkProcessItem {
  id: string;
  step_number: number;
  title: string;
  description: string;
  icon: string;
}

interface WorkProcessProps {
  /**
   * Heading level. The page that hosts this section owns the h1, so the
   * section heading is an h2 there; it stays configurable because a page that
   * leads with this section would want the reverse.
   */
  headingLevel?: 'h1' | 'h2';
}

/**
 * The delivery process, as a numbered sequence.
 *
 * Replaces a three-column card grid that had a five-item sequence in it — so
 * the last row held two cards and the reading order broke at the wrap, with
 * connector arrows hardcoded to appear after step three to paper over it. A
 * process is a list, and a list of five reads as five.
 *
 * The step numbers are set large and are the main visual element. They are the
 * one thing a reader scanning this page is looking for: where does this start,
 * how many stages are there, and how far in is the part I care about.
 */
const WorkProcess = ({ headingLevel = 'h2' }: WorkProcessProps) => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('work-process');

  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : lang === 'en' ? 'en' : 'no';
  const processes: WorkProcessItem[] = workProcessData[currentLanguage] || workProcessData.no;

  const Heading = headingLevel;
  const iconFor = (name: string): LucideIcon =>
    resolveIcon(name, 'HelpCircle');

  return (
    <section id="work-process" className="py-16 md:py-24" aria-labelledby="work-process-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="mb-5 eyebrow">
            {t('workProcess.eyebrow', 'Prosess')}
          </p>
          <Heading
            id="work-process-heading"
            className="section-heading"
          >
            {section?.title || t('workProcess.title', 'Hvordan vi jobber')}
          </Heading>
          {(section?.description ?? t('workProcess.description', '')) && (
            <p className="mt-5 max-w-2xl section-lead">
              {section?.description || t('workProcess.description', '')}
            </p>
          )}
        </div>

        <ol className="mt-14 border-t border-border">
          {processes.map((process) => {
            const Icon = iconFor(process.icon);
            return (
              <li key={process.id} className="group border-b border-border">
                <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  {/*
                    The numeral is decorative to assistive tech: the <ol> already
                    conveys position and order, so announcing "01" as content
                    would read the same information twice.
                  */}
                  <div className="md:col-span-2">
                    {/*
                      Full-strength primary, not a tint. At text-primary/25 the
                      numerals measured 1.53:1 — below the 3:1 WCAG asks of
                      large text, and faint enough that the one element the
                      layout is built around was the hardest thing to see.
                    */}
                    <span
                      aria-hidden="true"
                      className="block text-5xl font-bold leading-none tracking-tight text-primary md:text-6xl lg:text-7xl"
                    >
                      {String(process.step_number).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="flex items-center gap-3 card-heading md:text-2xl">
                      <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      {process.title}
                    </h3>
                  </div>

                  <div className="md:col-span-7">
                    <p className="max-w-[58ch] leading-relaxed text-muted-foreground">
                      {process.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default WorkProcess;
