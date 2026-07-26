import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoHeroProps {
  videoSrc?: string
  poster?: string
  words?: string[]
}

function DynamicWord({ words, interval = 2500 }: { words: string[]; interval?: number }) {
  const safeWords = useMemo(() => (words?.length ? words : ['AI', 'sky', 'apper', 'data']), [words])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % safeWords.length), interval)
    return () => clearInterval(id)
  }, [safeWords, interval])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={safeWords[index]}
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="inline-block text-primary"
      >
        {safeWords[index]}
      </motion.span>
    </AnimatePresence>
  )
}

export default function VideoHero({ videoSrc, poster = '/hero-bg.svg', words }: VideoHeroProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

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
        {/* Rendered only when a video is actually supplied. The default used to
            be /videos/xala.mp4, which does not exist — every page load fetched
            it and 404'd. The poster carries the background on its own. */}
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
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

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
        >
          {t('hero.heroText.weUse', 'Vi bruker')}{' '}
          <DynamicWord words={words ?? ['AI', 'sky', 'apper', 'data']} />
          <br className="hidden sm:block" />
          {' '}{t('hero.heroText.to', 'til å')}{' '}
          {t('hero.heroText.create', 'skape')}{' '}
          <span className="text-primary">
            {t('hero.heroText.positiveChange', 'positiv endring')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground font-light mb-10 leading-relaxed"
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

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-semibold"
        >
          <span>ISO 27001</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>GDPR</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>Microsoft Partner</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>AWS</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => {
          const next = document.getElementById('clients')
          next?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-2 text-muted-foreground/70 hover:text-foreground transition-colors"
        aria-label={t('hero.scrollToNext', 'Scroll ned')}
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  )
}