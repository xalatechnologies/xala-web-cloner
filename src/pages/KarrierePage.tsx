import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import rolesData from '@/data/careers-roles.json';
import { PageHeader } from '../components/layouts/PageFrame';
import ApplicationForm from '../components/careers/ApplicationForm';

type Language = 'no' | 'en' | 'ar';

interface CareerRole {
  id: string;
  icon: string;
  title: string;
  description: string;
  focus: string[];
}

const CONTACT = 'info@xala.no';

/**
 * Careers.
 *
 * The page offered one generic "open application" with a single mailto, so
 * every applicant — engineer, designer, tester — arrived in the same inbox with
 * the same subject line and had to explain from scratch what they were applying
 * for. Naming the disciplines does two jobs: it tells people the roles exist
 * (nobody applies speculatively to a company that lists nothing), and it sorts
 * the applications on arrival, since each link carries its own subject.
 *
 * These are open applications, not vacancies. Nothing here claims a position is
 * currently funded or that a process is running — that would be a promise this
 * page has no basis to make.
 */
export default function KarrierePage() {
  const { t, i18n } = useTranslation();

  const language: Language = useMemo(() => {
    const lang = i18n.language?.toLowerCase() ?? 'no';
    return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'no';
  }, [i18n.language]);

  const roles: CareerRole[] = rolesData[language] ?? rolesData.no;

  const iconFor = (name: string): LucideIcon =>
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Briefcase;

  const mailtoFor = (role?: CareerRole) => {
    const subject = role
      ? t('careers.mailSubjectRole', 'Åpen søknad: {{role}}', { role: role.title })
      : t('careers.mailSubjectGeneral', 'Åpen søknad – Xala Technologies');
    const body = t(
      'careers.mailBody',
      'Hei,\n\nJeg sender en åpen søknad til Xala Technologies.\n\nCV og en kort beskrivelse av meg selv følger vedlagt.\n\nMed vennlig hilsen'
    );
    return `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main id="main" className="flex-1 pt-20">
        <PageHeader
          eyebrow={t('careers.eyebrow', 'Karriere')}
          title={t('careers.title', 'Vi tar imot åpne søknader hele året')}
          description={t(
            'careers.description',
            'Vi lyser ikke ut stillinger løpende, men vi leser alle søknader. Finner du disiplinen din under, send oss noen ord om hva du har jobbet med.'
          )}
        />

        <section
          aria-labelledby="roller-heading"
          className="container mx-auto px-4 pb-16 pt-10 md:pb-24 md:pt-14"
        >
          <h2
            id="roller-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {t('careers.rolesTitle', 'Disiplinene vi ansetter i')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t(
              'careers.rolesDescription',
              'Hver lenke åpner en e-post med riktig emnefelt, så søknaden havner der den skal.'
            )}
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => {
              const Icon = iconFor(role.icon);
              return (
                <li key={role.id}>
                  <a
                    href={mailtoFor(role)}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold text-foreground md:text-xl">{role.title}</h3>
                    </div>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {role.focus.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-6 inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-primary">
                      {t('careers.applyFor', 'Send åpen søknad')}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          aria-labelledby="soknad-heading"
          className="border-t border-border bg-muted/40 py-14 md:py-20"
        >
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                {t('careers.howEyebrow', 'Slik søker du')}
              </p>
              <h2 id="soknad-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {t('careers.howTitle', 'Send søknaden herfra')}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t(
                  'careers.howDescription',
                  'Fyll ut skjemaet, så er søknaden ferdig formulert når e-postprogrammet ditt åpner seg. Da legger du ved CV-en og sender.'
                )}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {t(
                  'careers.noVacancyNote',
                  'Vi lyser ikke ut faste stillinger her. En åpen søknad blir liggende hos oss, og vi tar kontakt når vi har noe som passer.'
                )}
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                {t('careers.emailLabel', 'E-post')}:{' '}
                <a href={`mailto:${CONTACT}`} className="text-primary hover:underline">
                  {CONTACT}
                </a>
              </p>
            </div>

            <div className="lg:col-span-7">
              <ApplicationForm roles={roles.map((role) => role.title)} contactEmail={CONTACT} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
