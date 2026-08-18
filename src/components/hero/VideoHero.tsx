import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { processServiceTitle } from '@/utils/text-hyphenation'
import { DEFAULT_HERO_WORDS } from './words'

interface VideoHeroProps {
  videoSrc?: string
  poster?: string
  words?: string[]
}

function DynamicWord({
  words,
  interval = 2500,
  language,
}: {
  words: string[]
  interval?: number
  language: string
}) {
  const safeWords = useMemo(() => (words?.length ? words : ['AI', 'sky', 'apper', 'data']), [words])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % safeWords.length), interval)
    return () => clearInterval(id)
  }, [safeWords, interval])

  const raw = safeWords[index]
  const display = processServiceTitle(raw, language)

  return (
    /*
      initial={false} only for the word already on screen at mount: it is part
      of the LCP heading, and fading it in held the heading's own paint back.
      Every later tick still animates, because the key changes after mount.
    */
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={raw}
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        /*
          inline-block lets the enter/exit translate run, but without a max
          width it shrink-to-fits the compound and the heading's inherited
          overflow-wrap never fires. max-w-full caps it to the column;
          overflow-wrap:anywhere shrinks min-content so a flex parent cannot
          grow a horizontal scrollbar around the unbroken word.
        */
        className="inline-block max-w-full text-primary [overflow-wrap:anywhere]"
      >
        {display}
      </motion.span>
    </AnimatePresence>
  )
}

export default function VideoHero({ videoSrc = '/videos/xala.mp4', poster = '/hero-bg.svg', words }: VideoHeroProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  /**
   * The background film loads after the first paint, never before it.
   *
   * It was 7 MB at 11 Mbps, autoplaying, with no preload hint — so a phone on a
   * Norwegian mobile connection spent its whole first second of bandwidth on a
   * video that sits behind an 85% opaque overlay and a blur. Largest
   * Contentful Paint was 4.2s on the page every visitor lands on.
   *
   * Re-encoding for how it is actually seen took it to 163 KB. Deferring the
   * fetch takes it off the critical path entirely: the poster is a 2.6 KB SVG
   * that paints immediately, and the video swaps in once the browser is idle.
   * Nobody watching a blurred 15%-opacity background notices the difference;
   * the LCP measurement does.
   */
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (!videoSrc) return
    // requestIdleCallback where available, so this cannot compete with paint.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1))
    const cancel = window.cancelIdleCallback ?? window.clearTimeout
    const handle = idle(() => setVideoReady(true))
    return () => cancel(handle as number)
  }, [videoSrc])

  return (
    /*
     * pt-32 clears the fixed navbar. Without it the h1 rendered underneath the
     * nav links, which is invisible while the bar is transparent at scroll 0.
     *
     * Height is 88vh rather than 100dvh: at full viewport height the content
     * plus the trust bar overflowed, pushing the headline below the fold on
     * load, so the first thing a visitor saw was an empty page.
     */
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-32 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* public/videos/xala.mp4 is the background film. The conditional
            stays so a caller can opt out with videoSrc={undefined} and fall
            back to the poster, but the default is the real asset.

            aria-hidden because it is decoration: it carries no information a
            screen reader could use, and an unlabelled video element announces
            itself as media a user might try to control. */}
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={videoReady ? videoSrc : undefined}
            poster={poster}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}
        {/* 
          Light mode: frosted white glass overlay — text is dark (foreground) 
          Dark mode: deep dark overlay — text is light (foreground)
          Both use the same text tokens because the overlay matches the theme.
        */}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm dark:bg-background/80" />
        {/* Subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      </div>

      {/* Content — uses design tokens, works in both themes */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t('hero.certifications.microsoft', 'Microsoft Partner')}
          </span>
        </motion.div>

        {/*
          Main headline — the largest text on the page, so it is the Largest
          Contentful Paint element. It used to mount at opacity 0 and fade in
          on a 0.3s delay, which means the browser cannot count it as painted
          until the animation starts: the entrance delay was added to LCP on
          the page every visitor lands on. It renders immediately now. The
          elements around it still animate; none of them is the LCP candidate.
        */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          {/* Two fixed lines. The rotating word sits on its own line with a
              reserved height, because the words differ in length
              ("integrasjoner" vs "saksbehandlingssystemer") and inline they
              reflowed the headline between two and three lines on every tick.
              The audience clause moved to the subtitle rather than making the
              heading a third line. */}
          <span className="block">{t('hero.heroText.weBuild', 'Vi bygger')} </span>
          <span className="block min-h-[1.15em] min-w-0 max-w-full">
            <DynamicWord
              language={i18n.language}
              words={words ?? [...DEFAULT_HERO_WORDS]}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          /*
            Not muted-foreground, and not font-light. Over the hero video this
            measured 4.28:1 where 20px non-bold text needs 4.5, and 300-weight
            strokes over moving footage are hard to read at any ratio. 75%
            foreground keeps it subordinate to the headline while staying
            legible in both schemes.
          */
          className="max-w-2xl mx-auto text-lg sm:text-xl text-foreground/75 mb-10 leading-relaxed"
        >
          {t('hero.subtitle', 'Norsk systemutviklingshus. Skreddersydd programvare, AI-løsninger og skyarkitektur for offentlig sektor og næringsliv.')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/kontakt')}
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:shadow-[0_0_32px_hsl(var(--primary)/0.35)] transition-all duration-300 shadow-lg"
          >
            {t('hero.bookMeeting', 'Book et møte')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/caser')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium rounded-xl border border-border text-foreground hover:bg-accent transition-all duration-300"
          >
            {t('hero.viewCases', 'Se våre prosjekter')}
          </button>
        </motion.div>

        {/* Credentials. AWS dropped — Azure is the platform these systems
            actually run on — and the list now leads with what a Norwegian
            public-sector buyer screens for: universal design, WCAG and the
            DigDir design principles sit alongside the security certifications.
            Rendered as bordered chips rather than 11px grey text, which was
            close to invisible for the most load-bearing proof on the page. */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-2.5"
          aria-label={t('hero.credentials.label', 'Sertifiseringer og standarder')}
        >
          {[
            t('hero.credentials.iso27001', 'ISO 27001'),
            t('hero.credentials.soc2', 'SOC 2'),
            t('hero.credentials.gdpr', 'GDPR'),
            t('hero.credentials.wcag', 'WCAG 2.2 AA'),
            t('hero.credentials.uu', 'Universell utforming'),
            t('hero.credentials.digdir', 'DigDir designprinsipper'),
            t('hero.credentials.azure', 'Microsoft Azure'),
            t('hero.credentials.microsoft', 'Microsoft Partner'),
          ].map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80 backdrop-blur-sm"
            >
              {item}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => {
          const next = document.getElementById('clients')
          next?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 inline-flex items-center justify-center min-h-11 min-w-11 text-muted-foreground/70 hover:text-foreground transition-colors"
        aria-label={t('hero.scrollToNext', 'Scroll ned')}
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  )
}