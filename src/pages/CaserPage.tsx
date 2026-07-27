import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';
import { SITE_ORIGIN } from '@/lib/blog/seo';
import {
  caserEntries,
  ALL_SECTORS,
  ALL_TAGS,
  type CaserEntry,
} from '@/data/caser-page-entries';

// ─── Sector color map ─────────────────────────────────────────────────────────
/**
 * Sector badges stay categorical: nine sectors need nine tellable-apart hues,
 * and an all-warm ramp would collapse them into one another. They are pulled
 * toward the warm end of the wheel where the palette allows, and each entry
 * uses a single hue for text, fill and border so a badge reads as one thing.
 */
const SECTOR_COLORS: Record<string, string> = {
  'Public Sector':       'text-amber-800 dark:text-amber-300 bg-amber-500/10 border-amber-500/30',
  'Aviation':            'text-sky-700 dark:text-sky-300 bg-sky-500/10 border-sky-500/30',
  'Finance':             'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
  'Healthcare':          'text-rose-700 dark:text-rose-300 bg-rose-500/10 border-rose-500/30',
  'Legal / Tech':        'text-violet-700 dark:text-violet-300 bg-violet-500/10 border-violet-500/30',
  'Public Transport':    'text-orange-700 dark:text-orange-300 bg-orange-500/10 border-orange-500/30',
  'Energy':              'text-yellow-700 dark:text-yellow-300 bg-yellow-500/10 border-yellow-500/30',
  'NGO / International': 'text-teal-700 dark:text-teal-300 bg-teal-500/10 border-teal-500/30',
  'Telecom':             'text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/30',
};

const SECTOR_DOT: Record<string, string> = {
  'Public Sector':       'bg-amber-400',
  'Aviation':            'bg-sky-400',
  'Finance':             'bg-emerald-400',
  'Healthcare':          'bg-rose-400',
  'Legal / Tech':        'bg-violet-400',
  'Public Transport':    'bg-orange-400',
  'Energy':              'bg-yellow-400',
  'NGO / International': 'bg-teal-400',
  'Telecom':             'bg-fuchsia-400',
};

/**
 * Sector is a closed taxonomy used as the filter key, the colour-map key and
 * the visible label. Only the label is translated — keeping the raw English
 * value as the key means filtering, colours and the data file all stay in sync.
 */
const sectorKey = (sector: string) =>
  `caserPage.sectors.${sector.toLowerCase().replace(' / ', '_').replace(/ /g, '_')}`;

// ─── Case Card ─────────────────────────────────────────────────────────────────
function CaseCard({ entry, index }: { entry: CaserEntry; index: number }) {
  const { t } = useTranslation();
  const isLinked = Boolean(entry.slug);
  const sectorColor = SECTOR_COLORS[entry.sector] ?? 'text-primary bg-primary/10 border-primary/20';

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn(
        'group h-full flex flex-col rounded-2xl border overflow-hidden transition-all duration-300',
        isLinked
          ? 'bg-card border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/8 hover:-translate-y-2 cursor-pointer'
          : 'bg-card border-border opacity-75'
      )}
    >
      {/* Logo area */}
      <div className="relative h-44 bg-muted/30 flex items-center justify-center px-10 overflow-hidden border-b border-border/50">
        {/* Sector badge */}
        <span className={cn(
          'absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border',
          sectorColor
        )}>
          {t(sectorKey(entry.sector), entry.sector)}
        </span>

        {/* Full case badge */}
        {isLinked && (
          <span className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {t('caserPage.fullCase')}
          </span>
        )}

        {entry.imageUrl && (
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className={cn(
              'object-contain max-h-16 max-w-[65%] transition-all duration-500',
              'brightness-0 invert opacity-60',
              isLinked && 'group-hover:opacity-100 group-hover:scale-105'
            )}
          />
        )}

        {isLinked && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className={cn(
          'text-xl font-bold mb-3 leading-tight transition-colors duration-200',
          isLinked ? 'text-foreground group-hover:text-primary' : 'text-muted-foreground'
        )}>
          {entry.title}
        </h2>

        <p className="text-sm leading-relaxed text-muted-foreground flex-1 line-clamp-3 mb-5">
          {entry.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {entry.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted border border-border/60 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {entry.tags.length > 3 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted border border-border/60 text-muted-foreground">
              +{entry.tags.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-border/60">
          {isLinked ? (
            <span className="inline-flex items-center gap-2 text-base font-bold text-primary group-hover:gap-3 transition-all duration-200">
              {t('caseStudy.readMore')}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          ) : (
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
              {t('caseStudy.comingSoon')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (isLinked) {
    return (
      <Link to={`/caser/${entry.slug}`} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

// ─── Filter Sidebar ──────────────────────────────────────────────────────────
function FilterSidebar({
  activeSector,
  setActiveSector,
  activeTags,
  toggleTag,
  clearAll,
  hasFilters,
  resultCount,
  totalCount,
}: {
  activeSector: string | null;
  setActiveSector: (s: string | null) => void;
  activeTags: Set<string>;
  toggleTag: (t: string) => void;
  clearAll: () => void;
  hasFilters: boolean;
  resultCount: number;
  totalCount: number;
}) {
  const { t } = useTranslation();
  const [techOpen, setTechOpen] = useState(true);

  return (
    <aside className="w-72 shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-8">

        {/* Active state summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-foreground">
            {hasFilters ? (
              <><span className="text-primary">{resultCount}</span> <span className="text-muted-foreground font-normal">/ {totalCount} {t('caserPage.cases')}</span></>
            ) : (
              <><span className="text-primary">{totalCount}</span> <span className="text-muted-foreground font-normal">{t('caserPage.casesTotal')}</span></>
            )}
          </p>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-semibold"
            >
              <X className="h-3.5 w-3.5" />
              {t('caserPage.clearAll')}
            </button>
          )}
        </div>

        {/* Sector */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
            {t('caserPage.sector')}
          </p>
          <div className="space-y-1">
            <button
              onClick={() => setActiveSector(null)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
                activeSector === null
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <span>{t('caserPage.allSectors')}</span>
              <span className={cn(
                'text-xs font-bold px-2 py-0.5 rounded-lg',
                activeSector === null ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              )}>
                {totalCount}
              </span>
            </button>

            {ALL_SECTORS.map((sector) => {
              const count = caserEntries.filter(e => e.sector === sector).length;
              const dot = SECTOR_DOT[sector] ?? 'bg-primary';
              return (
                <button
                  key={sector}
                  onClick={() => setActiveSector(activeSector === sector ? null : sector)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
                    activeSector === sector
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={cn('h-2 w-2 rounded-full shrink-0', dot)} />
                    {t(sectorKey(sector), sector)}
                  </span>
                  <span className="text-xs font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-lg">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Technology */}
        <div>
          <button
            onClick={() => setTechOpen(v => !v)}
            className="w-full flex items-center justify-between mb-4"
          >
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              {t('caserPage.technology')}
              {activeTags.size > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {activeTags.size}
                </span>
              )}
            </p>
            {techOpen
              ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
              : <ChevronDown className="h-4 w-4 text-muted-foreground" />
            }
          </button>
          <AnimatePresence>
            {techOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2">
                  {ALL_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'text-sm font-semibold px-3 py-1.5 rounded-xl border transition-all',
                        activeTags.has(tag)
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
                          : 'bg-muted/50 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}

// ─── Mobile Filter Bar ────────────────────────────────────────────────────────
function MobileFilterBar({
  activeSector,
  setActiveSector,
  activeTags,
  toggleTag,
  clearAll,
  hasFilters,
}: {
  activeSector: string | null;
  setActiveSector: (s: string | null) => void;
  activeTags: Set<string>;
  toggleTag: (t: string) => void;
  clearAll: () => void;
  hasFilters: boolean;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setOpen(v => !v)}
          className={cn(
            'shrink-0 flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl border transition-all',
            open || hasFilters
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card border-border text-foreground'
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t('caserPage.filters')}
          {hasFilters && (
            <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-black px-1.5 py-0.5 rounded-full leading-none">
              {(activeSector ? 1 : 0) + activeTags.size}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSector(null)}
          className={cn(
            'shrink-0 text-sm font-bold px-4 py-3 rounded-xl border transition-all',
            activeSector === null
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card border-border text-muted-foreground hover:text-foreground'
          )}
        >
          All
        </button>
        {ALL_SECTORS.map(sector => (
          <button
            key={sector}
            onClick={() => setActiveSector(activeSector === sector ? null : sector)}
            className={cn(
              'shrink-0 text-sm font-bold px-4 py-3 rounded-xl border transition-all whitespace-nowrap',
              activeSector === sector
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {t(sectorKey(sector), sector)}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-3"
          >
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">{t('caserPage.technology')}</p>
                {hasFilters && (
                  <button onClick={clearAll} className="text-sm text-primary font-bold">Clear all</button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'text-sm font-semibold px-3 py-1.5 rounded-xl border transition-all',
                      activeTags.has(tag)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CaserPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const clearAll = () => {
    setActiveSector(null);
    setActiveTags(new Set());
    setSearch('');
  };

  const hasFilters = activeSector !== null || activeTags.size > 0 || search.trim() !== '';

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return caserEntries.filter(e => {
      if (activeSector && e.sector !== activeSector) return false;
      if (activeTags.size > 0 && !e.tags.some(t => activeTags.has(t))) return false;
      if (q &&
        !e.title.toLowerCase().includes(q) &&
        !e.description.toLowerCase().includes(q) &&
        !e.sector.toLowerCase().includes(q) &&
        !e.tags.some(tg => tg.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [activeSector, activeTags, search]);

  const linkedCount = caserEntries.filter(e => e.slug).length;

  return (
    <>
      {/* This route is `selfManaged` in ROUTE_RULES, so RouteSEO deliberately
          stays out of its way — which means the canonical has to be here.
          Without it the page inherited index.html's homepage canonical and told
          Google it was a duplicate of the front page. */}
      <Helmet>
        <title>{t('caserPage.title')} – Xala</title>
        <meta name="description" content={t('caserPage.description')} />
        <link rel="canonical" href={`${SITE_ORIGIN}/caser`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_ORIGIN}/caser`} />
        <meta property="og:title" content={`${t('caserPage.title')} – Xala`} />
        <meta property="og:description" content={t('caserPage.description')} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main id="main" className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-32 pb-24 border-b border-border">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
            <div className="absolute top-10 right-1/4 w-60 h-60 bg-primary/3 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: 'linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="container max-w-6xl relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary mb-6">
                <span className="h-px w-10 bg-primary" />
                {t('caserPage.eyebrow')}
                <span className="h-px w-10 bg-primary" />
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6 leading-[1.0]">
                {t('caserPage.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t('caserPage.description')}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-5 max-w-2xl mx-auto">
              {[
                { value: '15+', key: 'caserPage.stats.projects' },
                { value: '10+', key: 'caserPage.stats.experience' },
                { value: '5M+', key: 'caserPage.stats.users' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-colors"
                >
                  <p className="text-5xl font-black text-primary leading-none mb-3">{stat.value}</p>
                  <p className="text-sm font-semibold text-muted-foreground">{t(stat.key)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </section>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="container max-w-7xl py-12 flex-1">

          {/* Search bar */}
          <div className="relative mb-10 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('caserPage.searchPlaceholder')}
              aria-label={t('caserPage.searchPlaceholder')}
              className="w-full h-14 pl-12 pr-12 bg-card border border-border rounded-2xl text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Mobile filters */}
          <div className="mb-8">
            <MobileFilterBar
              activeSector={activeSector}
              setActiveSector={setActiveSector}
              activeTags={activeTags}
              toggleTag={toggleTag}
              clearAll={clearAll}
              hasFilters={hasFilters}
            />
          </div>

          {/* Desktop: sidebar + grid */}
          <div className="flex gap-12 items-start">
            <FilterSidebar
              activeSector={activeSector}
              setActiveSector={setActiveSector}
              activeTags={activeTags}
              toggleTag={toggleTag}
              clearAll={clearAll}
              hasFilters={hasFilters}
              resultCount={filtered.length}
              totalCount={caserEntries.length}
            />

            {/* Grid area */}
            <div className="flex-1 min-w-0">

              {/* Result / active filter bar */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <p className="text-base text-muted-foreground leading-tight">
                  {hasFilters ? (
                    <>
                      <span className="font-black text-foreground text-lg">{filtered.length}</span>
                      <span className="text-muted-foreground"> of {caserEntries.length} cases match</span>
                    </>
                  ) : (
                    <>
                      <span className="font-black text-foreground text-lg">{caserEntries.length}</span>
                      <span className="text-muted-foreground"> {t('caserPage.cases')}</span>
                      <span className="mx-2 text-border">·</span>
                      <span className="font-bold text-primary">{linkedCount} {t('caserPage.withFullCase')}</span>
                    </>
                  )}
                </p>

                {/* Active chip pills */}
                {hasFilters && (
                  <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end">
                    {activeSector && (
                      <button
                        onClick={() => setActiveSector(null)}
                        className="flex items-center gap-1.5 text-sm font-bold bg-primary/10 text-primary border border-primary/25 px-3 py-1.5 rounded-xl hover:bg-primary/15 transition-colors"
                      >
                        {activeSector}
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                    {Array.from(activeTags).map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className="flex items-center gap-1.5 text-sm font-semibold bg-muted text-muted-foreground border border-border px-3 py-1.5 rounded-xl hover:border-primary/40 transition-colors"
                      >
                        {tag}
                        <X className="h-3.5 w-3.5" />
                      </button>
                    ))}
                    <button
                      onClick={clearAll}
                      className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-2"
                    >
                      {t('caserPage.clearAll')}
                    </button>
                  </div>
                )}
              </div>

              {/* Grid */}
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-32 bg-card border border-border rounded-2xl"
                  >
                    <div className="text-5xl mb-5">🔍</div>
                    <p className="text-2xl font-black text-foreground mb-2">No cases found</p>
                    <p className="text-base text-muted-foreground mb-8">Try adjusting your search or removing some filters</p>
                    <button
                      onClick={clearAll}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-xl font-bold text-base hover:bg-primary/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      {t('caserPage.clearAllFilters')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    <AnimatePresence>
                      {filtered.map((entry, i) => (
                        <motion.div
                          key={entry.id}
                          layout
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.25, delay: i * 0.03 }}
                        >
                          <CaseCard entry={entry} index={i} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        </main>

        <Footer />
      </div>
    </>
  );
}
