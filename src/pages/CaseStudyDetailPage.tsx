import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  CheckCircle2,
  Building2,
  Calendar,
  Users,
  Layers,
  ChevronRight,
  ArrowRight,
  Zap,
  Target,
  Cpu,
  GitMerge,
  BarChart3,
  Star,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { caseStudyBySlug } from '@/data/case-studies';
import { useLocalizedCaseStudy } from '@/hooks/useLocalizedCaseStudy';

// ─── TOC section IDs (order matters) ─────────────────────────────────────────
const TOC_IDS = [
  'overview',
  'challenge',
  'objectives',
  'solution',
  'architecture',
  'tech',
  'integrations',
  'timeline',
  'outcomes',
  'capabilities',
] as const;

const TOC_ICONS: Record<string, React.ReactNode> = {
  overview: <Star className="h-3 w-3" />,
  challenge: <Zap className="h-3 w-3" />,
  objectives: <Target className="h-3 w-3" />,
  solution: <CheckCircle2 className="h-3 w-3" />,
  architecture: <Layers className="h-3 w-3" />,
  tech: <Cpu className="h-3 w-3" />,
  integrations: <GitMerge className="h-3 w-3" />,
  timeline: <Calendar className="h-3 w-3" />,
  outcomes: <BarChart3 className="h-3 w-3" />,
  capabilities: <Star className="h-3 w-3" />,
};

// ─── Sticky TOC ───────────────────────────────────────────────────────────────
function StickyTOC({ activeId }: { activeId: string }) {
  const { t } = useTranslation();
  const activeIndex = TOC_IDS.indexOf(activeId as (typeof TOC_IDS)[number]);
  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-28">
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 px-3">
          {t('caseStudy.toc.label')}
        </p>
        {/* Progress bar */}
        <div className="mx-3 mb-4 h-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((activeIndex + 1) / TOC_IDS.length) * 100}%` }}
          />
        </div>
        <div className="space-y-0.5">
          {TOC_IDS.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'group flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg transition-all duration-200',
                activeId === id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : i < activeIndex
                  ? 'text-muted-foreground/50 hover:text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <span
                className={cn(
                  'shrink-0 transition-colors',
                  activeId === id ? 'text-primary' : 'text-muted-foreground/40 group-hover:text-muted-foreground'
                )}
              >
                {TOC_ICONS[id]}
              </span>
              {t(`caseStudy.toc.${id}`)}
              {i < activeIndex && (
                <span className="ml-auto text-primary/50">
                  <CheckCircle2 className="h-3 w-3" />
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  id,
  children,
  accent,
}: {
  id?: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="mb-10" id={id}>
      {accent && (
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
          <span className="h-px w-6 bg-primary inline-block" />
          {accent}
        </p>
      )}
      <h2 className="text-3xl font-extrabold text-foreground tracking-tight leading-tight">
        {children}
      </h2>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ cs }: { cs: NonNullable<ReturnType<typeof caseStudyBySlug>> }) {
  const { t } = useTranslation();

  const teamComposition =
    cs.team?.composition
      .map((member) => {
        if (member.count <= 1) return member.role;
        return `${member.count} ${member.role}${member.role.endsWith('s') ? '' : 's'}`;
      })
      .join(', ') ?? undefined;

  const teamSizeLabel = cs.estimatedTeamSize ?? (cs.team ? String(cs.team.size) : undefined);
  const durationLabel = cs.duration ?? cs.deliveryPeriod;

  return (
    <section className="relative overflow-hidden bg-background pt-20">
      {/* rich gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/3 to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-primary/4 rounded-full blur-[80px]" />
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container max-w-7xl relative">
        {/* breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-8 pb-8"
        >
          <Link
            to="/caser"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            {t('caseStudy.backToAll')}
            <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
            <span className="text-foreground">{cs.title}</span>
          </Link>
        </motion.div>

        <div className="pb-20 grid lg:grid-cols-[1fr_300px] gap-14 items-start">
          {/* left: content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* industry + period */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 bg-primary/8 px-3 py-1.5 rounded-full">
                {cs.industry}
              </span>
              {cs.deliveryPeriod && (
                <span className="text-sm text-muted-foreground flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
                  <Calendar className="h-3.5 w-3.5" />
                  {cs.deliveryPeriod}
                </span>
              )}
            </div>

            {/* logo */}
            {cs.logoUrl && (
              <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-border/50 inline-block">
                <img
                  src={cs.logoUrl}
                  alt={cs.title}
                  className="h-12 object-contain object-left"
                />
              </div>
            )}

            {/* title */}
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground mb-6 leading-[1.05]">
              {cs.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              {cs.subtitle}
            </p>

            {/* role badges */}
            <div className="flex flex-wrap gap-2">
              {cs.role.map((r) => (
                <span
                  key={r}
                  className="text-sm font-medium bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full border border-border"
                >
                  {r}
                </span>
              ))}
            </div>

            {/* inline overview + challenge to balance layout */}
            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div id="overview">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-primary inline-block" />
                  {t('caseStudy.sections.overview.accent')}
                </p>
                <h2 className="text-2xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
                  {t('caseStudy.sections.overview.heading')}
                </h2>
                <p className="text-base text-foreground/80 leading-relaxed">
                  {cs.summary}
                </p>
              </div>

              <div id="challenge">
                <p className="text-xs font-bold uppercase tracking-widest text-destructive mb-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-destructive inline-block" />
                  {t('caseStudy.sections.challenge.accent')}
                </p>
                <h2 className="text-2xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
                  {t('caseStudy.sections.challenge.heading')}
                </h2>
                <ul className="space-y-3">
                  {cs.challenge.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="shrink-0 h-6 w-6 rounded-full bg-destructive/10 border border-destructive/30 text-[11px] font-black flex items-center justify-center text-destructive mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-base text-foreground/80 leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* scope + core technologies */}
            {(cs.scope && cs.scope.length > 0) || (cs.coreTechnologies && cs.coreTechnologies.length > 0) ? (
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {cs.scope && cs.scope.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      {t('caseStudy.meta.scope')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cs.scope.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cs.coreTechnologies && cs.coreTechnologies.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      {t('caseStudy.meta.coreTechnologies')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cs.coreTechnologies.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>

          {/* right: meta card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl shadow-black/10"
          >
            {/* card header */}
            <div className="bg-primary/8 border-b border-border px-6 py-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Project Details
              </p>
            </div>
            <div className="p-6 space-y-6">
              <MetaRow icon={<Building2 className="h-4 w-4" />} label={t('caseStudy.meta.client')} value={cs.client} />
              <div className="h-px bg-border" />
              {cs.sector && (
                <>
                  <MetaRow icon={<Layers className="h-4 w-4" />} label={t('caseStudy.meta.sector')} value={cs.sector} />
                  <div className="h-px bg-border" />
                </>
              )}
              <MetaRow
                icon={<Layers className="h-4 w-4" />}
                label={t('caseStudy.meta.industry')}
                value={cs.industry}
              />
              {cs.deliveryModel && (
                <>
                  <div className="h-px bg-border" />
                  <MetaRow
                    icon={<Layers className="h-4 w-4" />}
                    label={t('caseStudy.meta.deliveryModel')}
                    value={cs.deliveryModel}
                  />
                </>
              )}
              {cs.partnerModel && (
                <>
                  <div className="h-px bg-border" />
                  <MetaRow
                    icon={<Layers className="h-4 w-4" />}
                    label={t('caseStudy.meta.partnerModel')}
                    value={cs.partnerModel}
                  />
                </>
              )}
              {durationLabel && (
                <>
                  <div className="h-px bg-border" />
                  <MetaRow
                    icon={<Calendar className="h-4 w-4" />}
                    label={t('caseStudy.meta.duration')}
                    value={durationLabel}
                  />
                </>
              )}
              <div className="h-px bg-border" />
              <MetaRow
                icon={<Users className="h-4 w-4" />}
                label={t('caseStudy.meta.role')}
                value={cs.role.join(', ')}
              />
              {teamComposition && (
                <>
                  <div className="h-px bg-border" />
                  <MetaRow
                    icon={<Users className="h-4 w-4" />}
                    label={t('caseStudy.meta.teamComposition')}
                    value={teamComposition}
                  />
                </>
              )}
              {teamSizeLabel && (
                <>
                  <div className="h-px bg-border" />
                  <MetaRow
                    icon={<Users className="h-4 w-4" />}
                    label={t('caseStudy.meta.teamSize')}
                    value={teamSizeLabel}
                  />
                </>
              )}
              {cs.status && (
                <>
                  <div className="h-px bg-border" />
                  <MetaRow
                    icon={<Calendar className="h-4 w-4" />}
                    label={t('caseStudy.meta.status')}
                    value={cs.status}
                  />
                </>
              )}
              {cs.budget && (
                <>
                  <div className="h-px bg-border" />
                  <MetaRow
                    icon={<Calendar className="h-4 w-4" />}
                    label={t('caseStudy.meta.budget')}
                    value={cs.budget}
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* bottom border with glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1.5">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

// ─── Objectives ───────────────────────────────────────────────────────────────
function ObjectivesSection({ objectives }: { objectives: string[] }) {
  const { t } = useTranslation();
  return (
    <section id="objectives" className="py-16 border-t border-border">
      <SectionHeading accent={t('caseStudy.sections.objectives.accent')}>
        {t('caseStudy.sections.objectives.heading')}
      </SectionHeading>
      <div className="grid sm:grid-cols-2 gap-4">
        {objectives.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4 items-start bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:bg-primary/2 transition-all group"
          >
            <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-base text-foreground/80 leading-relaxed">{item}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Solution ─────────────────────────────────────────────────────────────────
function SolutionSection({
  solution,
}: {
  solution: NonNullable<ReturnType<typeof caseStudyBySlug>>['solution'];
}) {
  const { t } = useTranslation();
  return (
    <section id="solution" className="py-16 border-t border-border">
      <SectionHeading accent={t('caseStudy.sections.solution.accent')}>
        {t('caseStudy.sections.solution.heading')}
      </SectionHeading>
      <p className="text-lg text-foreground/80 leading-relaxed mb-12">{solution.overview}</p>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
            <span className="h-px flex-1 bg-primary/20" />
            {t('caseStudy.sections.solution.modules')}
            <span className="h-px flex-1 bg-primary/20" />
          </h3>
          <ul className="space-y-3">
            {solution.modules.map((m, i) => (
              <li key={i} className="flex gap-3 text-base text-foreground/75 items-start">
                <span className="h-5 w-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </span>
                {m}
              </li>
            ))}
          </ul>
        </div>
        {solution.users && (
          <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
              <span className="h-px flex-1 bg-primary/20" />
              {t('caseStudy.sections.solution.users')}
              <span className="h-px flex-1 bg-primary/20" />
            </h3>
            <ul className="space-y-3">
              {solution.users.map((u, i) => (
                <li key={i} className="flex gap-3 text-base text-foreground/75 items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="h-3 w-3 text-primary" />
                  </span>
                  {u}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Architecture ─────────────────────────────────────────────────────────────
const LAYER_STYLES = [
  { pill: 'bg-primary/12 border-primary/25 text-primary', dot: 'bg-primary' },
  { pill: 'bg-orange-600/12 border-blue-500/25 text-blue-400', dot: 'bg-orange-600' },
  { pill: 'bg-orange-500/12 border-purple-500/25 text-purple-400', dot: 'bg-orange-500' },
  { pill: 'bg-orange-500/12 border-orange-500/25 text-orange-400', dot: 'bg-orange-500' },
  { pill: 'bg-amber-500/12 border-cyan-500/25 text-cyan-400', dot: 'bg-amber-500' },
  { pill: 'bg-rose-500/12 border-rose-500/25 text-rose-400', dot: 'bg-rose-500' },
];

function ArchitectureSection({
  architecture,
  diagram,
}: {
  architecture: NonNullable<ReturnType<typeof caseStudyBySlug>>['architecture'];
  diagram: NonNullable<ReturnType<typeof caseStudyBySlug>>['architectureDiagram'];
}) {
  const { t } = useTranslation();
  const layers = diagram.layers ?? [];
  const archEntries = [
    { label: t('caseStudy.archLayers.presentation'), items: architecture.presentation },
    { label: t('caseStudy.archLayers.services'), items: architecture.services },
    { label: t('caseStudy.archLayers.integrations'), items: architecture.integrations },
    { label: t('caseStudy.archLayers.data'), items: architecture.data },
    { label: t('caseStudy.archLayers.infrastructure'), items: architecture.infrastructure },
    { label: t('caseStudy.archLayers.security'), items: architecture.security },
  ].filter((e) => e.items && e.items.length > 0);

  return (
    <section id="architecture" className="py-16 border-t border-border">
      <SectionHeading accent={t('caseStudy.sections.architecture.accent')}>
        {diagram.title}
      </SectionHeading>

      {/* Layered diagram */}
      {layers.length > 0 && (
        <div className="mb-14 overflow-x-auto rounded-2xl border border-border bg-card">
          <div className="min-w-[580px] p-2">
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={cn(
                  'flex items-center gap-5 px-5 py-4 rounded-xl mb-1.5 last:mb-0 hover:bg-muted/30 transition-colors',
                  i % 2 === 0 ? '' : 'bg-muted/10'
                )}
              >
                <div className="shrink-0 w-48 flex items-center gap-2">
                  <span className={cn('shrink-0 h-2 w-2 rounded-full', LAYER_STYLES[i % LAYER_STYLES.length].dot)} />
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                    {layer.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layer.components.map((c, j) => (
                    <span
                      key={j}
                      className={cn(
                        'text-xs px-3 py-1 rounded-full border font-semibold',
                        LAYER_STYLES[i % LAYER_STYLES.length].pill
                      )}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Detail grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {archEntries.map(({ label, items }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/35 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={cn('h-2 w-2 rounded-full shrink-0', LAYER_STYLES[i % LAYER_STYLES.length].dot)} />
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                {label}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {items!.map((item, j) => (
                <li key={j} className="text-sm text-foreground/70 flex gap-2 items-start leading-relaxed">
                  <span className="text-primary shrink-0 mt-1 text-[10px]">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const TECH_STYLES = [
  { pill: 'text-blue-300 border-blue-500/30 bg-orange-600/10', header: 'text-blue-400', dot: 'bg-orange-600' },
  { pill: 'text-green-300 border-green-500/30 bg-green-500/10', header: 'text-green-400', dot: 'bg-green-500' },
  { pill: 'text-orange-300 border-orange-500/30 bg-orange-500/10', header: 'text-orange-400', dot: 'bg-orange-500' },
  { pill: 'text-cyan-300 border-cyan-500/30 bg-amber-500/10', header: 'text-cyan-400', dot: 'bg-amber-500' },
  { pill: 'text-purple-300 border-purple-500/30 bg-orange-500/10', header: 'text-purple-400', dot: 'bg-orange-500' },
  { pill: 'text-rose-300 border-rose-500/30 bg-rose-500/10', header: 'text-rose-400', dot: 'bg-rose-500' },
  { pill: 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10', header: 'text-yellow-400', dot: 'bg-yellow-500' },
];

function TechStackSection({
  technologies,
}: {
  technologies: NonNullable<ReturnType<typeof caseStudyBySlug>>['technologies'];
}) {
  const { t } = useTranslation();
  const techEntries = [
    { label: t('caseStudy.techCategories.frontend'), items: technologies.frontend },
    { label: t('caseStudy.techCategories.backend'), items: technologies.backend },
    { label: t('caseStudy.techCategories.databases'), items: technologies.databases },
    { label: t('caseStudy.techCategories.cloud'), items: technologies.cloud },
    { label: t('caseStudy.techCategories.identity'), items: technologies.identity },
    { label: t('caseStudy.techCategories.integrations'), items: technologies.integrations },
    { label: t('caseStudy.techCategories.devops'), items: technologies.devops },
  ].filter((e) => e.items && e.items.length > 0);

  return (
    <section id="tech" className="py-16 border-t border-border">
      <SectionHeading accent={t('caseStudy.sections.tech.accent')}>
        {t('caseStudy.sections.tech.heading')}
      </SectionHeading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {techEntries.map(({ label, items }, i) => {
          const style = TECH_STYLES[i % TECH_STYLES.length];
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={cn('h-2 w-2 rounded-full shrink-0', style.dot)} />
                <h3 className={cn('text-xs font-bold uppercase tracking-widest', style.header)}>
                  {label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items!.map((item, j) => (
                  <span
                    key={j}
                    className={cn('text-xs px-3 py-1.5 rounded-full border font-semibold', style.pill)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Integrations ─────────────────────────────────────────────────────────────
function IntegrationsSection({ integrations }: { integrations: string[] }) {
  const { t } = useTranslation();
  return (
    <section id="integrations" className="py-16 border-t border-border">
      <SectionHeading accent={t('caseStudy.sections.integrations.accent')}>
        {t('caseStudy.sections.integrations.heading')}
      </SectionHeading>
      <div className="grid sm:grid-cols-2 gap-4">
        {integrations.map((item, i) => {
          const [system, desc] = item.split(' — ');
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/35 hover:shadow-md transition-all group"
            >
              <div className="shrink-0 h-11 w-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary/15 transition-colors">
                ⇄
              </div>
              <div>
                <p className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  {system}
                </p>
                {desc && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function TimelineSection({
  timeline,
}: {
  timeline: NonNullable<ReturnType<typeof caseStudyBySlug>>['timeline'];
}) {
  const { t } = useTranslation();
  return (
    <section id="timeline" className="py-16 border-t border-border">
      <SectionHeading accent={t('caseStudy.sections.timeline.accent')}>
        {t('caseStudy.sections.timeline.heading')}
      </SectionHeading>
      <div className="relative pl-14">
        {/* vertical line */}
        <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent rounded-full" />
        <div className="space-y-6">
          {timeline.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              {/* number bubble */}
              <div className="absolute -left-14 top-4 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-black z-10 ring-4 ring-background shadow-lg shadow-primary/30">
                {i + 1}
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/35 hover:shadow-md transition-all">
                <h3 className="font-bold text-foreground mb-2 text-lg">{phase.phase}</h3>
                <p className="text-base text-foreground/70 leading-relaxed">{phase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Outcomes ─────────────────────────────────────────────────────────────────
function OutcomesSection({ outcomes }: { outcomes: string[] }) {
  const { t } = useTranslation();
  return (
    <section id="outcomes" className="py-16 border-t border-border">
      <SectionHeading accent={t('caseStudy.sections.outcomes.accent')}>
        {t('caseStudy.sections.outcomes.heading')}
      </SectionHeading>
      <div className="grid sm:grid-cols-2 gap-4">
        {outcomes.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/35 hover:bg-primary/2 transition-all group"
          >
            <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <p className="text-base text-foreground/80 leading-relaxed">{item}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Capabilities ─────────────────────────────────────────────────────────────
function CapabilitiesSection({ capabilities }: { capabilities: string[] }) {
  const { t } = useTranslation();
  return (
    <section id="capabilities" className="py-16 border-t border-border">
      <SectionHeading accent={t('caseStudy.sections.capabilities.accent')}>
        {t('caseStudy.sections.capabilities.heading')}
      </SectionHeading>
      <div className="flex flex-wrap gap-3">
        {capabilities.map((cap, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="text-sm font-semibold border border-primary/30 text-primary bg-primary/8 px-5 py-2.5 rounded-full hover:bg-primary/15 hover:border-primary/50 transition-all cursor-default"
          >
            {cap}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <section className="py-16 border-t border-border">
      <div className="relative overflow-hidden bg-card border border-border rounded-3xl p-12 text-center">
        {/* decorative */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/4 rounded-full blur-2xl pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 bg-primary/8 px-4 py-2 rounded-full mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {t('caseStudy.cta.accent')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4 leading-tight">
            {t('caseStudy.cta.heading')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            {t('caseStudy.cta.description')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-base hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              {t('caseStudy.cta.contact')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/caser"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl font-bold text-base hover:border-primary/50 hover:bg-muted/50 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('caseStudy.cta.allCases')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Active section tracker ───────────────────────────────────────────────────
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const rawCs = caseStudyBySlug(slug ?? '');
  const cs = useLocalizedCaseStudy(rawCs);
  const activeId = useActiveSection([...TOC_IDS]);

  if (!cs) return <Navigate to="/caser" replace />;

  return (
    <>
      <Helmet>
        <title>{cs.seo.title}</title>
        <meta name="description" content={cs.seo.description} />
        <meta property="og:title" content={cs.seo.title} />
        <meta property="og:description" content={cs.seo.description} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <HeroSection cs={cs} />

          {/* Content area with sidebar */}
          <div className="container max-w-7xl py-6">
            <div className="flex gap-14">
              <StickyTOC activeId={activeId} />

              <div className="flex-1 min-w-0">
                <ObjectivesSection objectives={cs.objectives} />
                <SolutionSection solution={cs.solution} />
                <ArchitectureSection architecture={cs.architecture} diagram={cs.architectureDiagram} />
                <TechStackSection technologies={cs.technologies} />
                {cs.integrationHighlights && cs.integrationHighlights.length > 0 && (
                  <IntegrationsSection integrations={cs.integrationHighlights} />
                )}
                <TimelineSection timeline={cs.timeline} />
                <OutcomesSection outcomes={cs.outcomes} />
                <CapabilitiesSection capabilities={cs.capabilities} />
                <CTASection title={cs.title} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
