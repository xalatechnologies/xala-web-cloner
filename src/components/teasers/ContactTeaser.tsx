import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Clock, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';

/**
 * Contained card rather than a full-bleed accent band.
 *
 * This section used to paint the whole viewport width in --primary with
 * --primary-foreground text, which made it the loudest thing on the page and
 * meant it needed a completely separate dark-mode treatment. As a card on the
 * normal page ground it uses one set of tokens for both schemes, and the accent
 * is spent on the single call to action instead of 900px of background.
 */
const DETAILS = [
  { icon: Mail, titleKey: 'teasers.contact.contactInfo.email.title', valueKey: 'teasers.contact.contactInfo.email.value', ltr: true },
  { icon: Phone, titleKey: 'teasers.contact.contactInfo.phone.title', valueKey: 'teasers.contact.contactInfo.phone.value', ltr: true },
  { icon: Clock, titleKey: 'teasers.contact.responseTime.title', valueKey: 'teasers.contact.responseTime.value', ltr: false },
] as const;

export default function ContactTeaser() {
  const { t } = useTranslation();

  return (
    <Section tone="default" size="md" labelledBy="contact-teaser-heading">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 md:px-16 md:py-20">
        {/* A single warm wash in the corner, so the card has depth without
            becoming a coloured panel. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            {t('teasers.contact.eyebrow', 'Kontakt')}
          </p>
          <h2
            id="contact-teaser-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
          >
            {t('teasers.contact.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {t('teasers.contact.description')}
          </p>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {DETAILS.map(({ icon: Icon, titleKey, valueKey, ltr }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-border/60 bg-muted/40 p-6 text-center transition-colors duration-200 hover:border-primary/40"
            >
              <Icon className="mx-auto mb-3 h-6 w-6 text-primary" aria-hidden />
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {t(titleKey)}
              </div>
              <div
                {...(ltr ? { dir: 'ltr' as const } : {})}
                className="mt-2 text-base font-semibold text-foreground"
              >
                {t(valueKey)}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-12 text-center">
          <Link
            to="/kontakt"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all duration-200 hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('teasers.contact.getInTouch')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
