import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ShieldCheck, Lock, BookOpen, Calendar, ArrowRight, Award, Cloud, Brain, Database, Code, Cpu } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface VideoHeroProps {
  videoSrc?: string
  poster?: string
  words?: string[]
}

function DynamicWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const safeWords = useMemo(() => (words?.length ? words : ['AI', 'sky', 'design', 'data']), [words])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % safeWords.length), interval)
    return () => clearInterval(id)
  }, [safeWords, interval])

  return (
    <span key={index} className="inline-block min-w-[5ch] transition-opacity duration-500">
      {safeWords[index]}
    </span>
  )
}

export default function VideoHero({ videoSrc = '/videos/xala.mp4', poster = '/hero-bg.svg', words }: VideoHeroProps) {
  const { t } = useTranslation();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover animate-hero-kenburns"
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Enhanced readability overlays for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/40" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Enhanced Headline */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="group relative rounded-xl bg-card/95 border border-border shadow-xl backdrop-blur-sm px-6 py-3 text-lg font-semibold text-card-foreground hover:shadow-2xl transition-all duration-300 min-w-[140px]">
              <Code className="absolute -top-1 -right-1 h-3 w-3 text-primary" />
              {t('hero.heroText.weUse')} <span className="sr-only">_</span>
            </span>
            <span className="group relative rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 shadow-xl backdrop-blur-sm px-6 py-3 text-lg font-bold text-primary hover:shadow-2xl transition-all duration-300 min-w-[140px]">
              <Brain className="absolute -top-1 -right-1 h-3 w-3 text-primary" />
              <DynamicWord words={words ?? ['AI', 'sky', 'apps', 'data']} />
            </span>
            <span className="group relative rounded-xl bg-card/95 border border-border shadow-xl backdrop-blur-sm px-6 py-3 text-lg font-semibold text-card-foreground hover:shadow-2xl transition-all duration-300 min-w-[140px]">
              <Database className="absolute -top-1 -right-1 h-3 w-3 text-emerald-500" />
              {t('hero.heroText.to')}
            </span>
          </div>
          <div className="inline-flex items-center gap-3">
            <span className="group relative rounded-xl bg-card/95 border border-border shadow-xl backdrop-blur-sm px-6 py-3 text-lg font-semibold text-card-foreground hover:shadow-2xl transition-all duration-300 min-w-[140px]">
              <Cpu className="absolute -top-1 -right-1 h-3 w-3 text-purple-500" />
              {t('hero.heroText.create')}
            </span>
            <span className="group relative rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 shadow-xl backdrop-blur-sm px-6 py-3 text-lg font-bold text-primary hover:shadow-2xl transition-all duration-300 min-w-[160px]">
              <Brain className="absolute -top-1 -right-1 h-3 w-3 text-primary" />
              {t('hero.heroText.positiveChange')}
            </span>
          </div>
        </div>

        {/* Enhanced scroll indicator with smooth scroll functionality */}
        <div className="mt-6 flex items-center justify-center">
          <button 
            onClick={() => {
              const nextSection = document.getElementById('clients');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group cursor-pointer p-2 rounded-full border border-border bg-card/90 backdrop-blur-sm hover:bg-accent transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label={t('hero.scrollToNext')}
          >
            <ChevronDown className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors duration-300 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Enhanced Bottom Corner Overlays */}
      <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2 max-w-[200px]">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 backdrop-blur-sm px-3 py-1.5 text-sm font-semibold text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="p-0.5 rounded-full bg-primary/10">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          </div>
          {t('hero.certifications.iso')}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 backdrop-blur-sm px-3 py-1.5 text-sm font-semibold text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="p-0.5 rounded-full bg-emerald-500/10">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          {t('hero.certifications.gdpr')}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 backdrop-blur-sm px-3 py-1.5 text-sm font-semibold text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="p-0.5 rounded-full bg-primary/10">
            <Award className="h-3.5 w-3.5 text-primary" />
          </div>
          {t('hero.certifications.microsoft')}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 backdrop-blur-sm px-3 py-1.5 text-sm font-semibold text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="p-0.5 rounded-full bg-orange-500/10">
            <Cloud className="h-3.5 w-3.5 text-orange-600" />
          </div>
          {t('hero.certifications.aws')}
        </span>
      </div>

      <div className="absolute bottom-6 right-6 z-20">
        <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-primary/90 font-semibold">
          <Calendar className="h-4 w-4" />
          {t('hero.bookMeeting')}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        </a>
      </div>
    </section>
  )
}


