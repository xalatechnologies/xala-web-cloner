import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';

/**
 * The page's closing statement, on the dark tone.
 *
 * This sits directly under ContactTeaser, and both were asking for the same
 * thing in the same visual register — two near-identical cards, one after the
 * other. Giving this one the dark tone makes it read as the end of the page
 * rather than a second contact card, and drops it to a single primary action
 * plus the phone and email in plain text.
 */
export default function FinalCTA() {
  const { t } = useTranslation();

  return (
    <Section tone="dark" size="md" labelledBy="final-cta-heading" className="text-center">
      <div className="mx-auto max-w-3xl">
        <h2
          id="final-cta-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
        >
          {t('finalCTA.title')}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-stone-300 leading-relaxed">
          {t('finalCTA.description')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/kontakt"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all duration-200 hover:shadow-[0_0_32px_hsl(var(--primary)/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
          >
            {t('finalCTA.startConversation')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/caser"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
          >
            {t('finalCTA.viewCases')}
          </Link>
        </div>

        <p className="mt-10 text-sm text-stone-400">
          {t('finalCTA.callUs')}{' '}
          <a href="tel:+4796665001" dir="ltr" className="font-semibold text-white hover:text-primary transition-colors">
            +47 966 65 001
          </a>{' '}
          {t('finalCTA.emailUs')}{' '}
          <a href="mailto:info@xala.no" className="font-semibold text-white hover:text-primary transition-colors">
            info@xala.no
          </a>
        </p>
      </div>
    </Section>
  );
}
