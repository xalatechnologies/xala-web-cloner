import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import workProcessData from '@/data/work-process.json';

type Language = 'no' | 'en' | 'ar';

/**
 * The delivery process, on the front page.
 *
 * Reads work-process.json, the same file /slik-vi-jobber renders. Its own
 * hardcoded list had four steps — Kartlegging, Design, Utvikling, Levering —
 * against the five in the data file, under different names. So the homepage
 * described a four-stage process and the page it linked to described a
 * different five-stage one.
 */
export default function ProcessTeaser() {
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  const steps = workProcessData[language] ?? workProcessData.no;
  const iconFor = (name: string): LucideIcon =>
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.CircleDot;

  return (
    <section
      id="process-teaser"
      aria-labelledby="process-teaser-heading"
      className="border-y border-border bg-muted/30 py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            {t('teasers.process.eyebrow', 'Prosess')}
          </p>
          <h2
            id="process-teaser-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {t('teasers.process.title')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t('teasers.process.description')}
          </p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => {
            const Icon = iconFor(step.icon);
            return (
              <li
                key={step.id}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="text-2xl font-bold leading-none tracking-tight text-primary"
                  >
                    {String(step.step_number).padStart(2, '0')}
                  </span>
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10">
          <Link
            to="/slik-vi-jobber"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('teasers.process.viewAll', 'Slik vi jobber')}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
