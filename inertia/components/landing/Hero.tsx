import { motion } from 'motion/react'
import { Search, ChevronRight } from 'lucide-react'
import { router } from '@inertiajs/react'
import { useT, useLocale } from '~/i18n/context'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export default function Hero() {
  const t = useT()
  const locale = useLocale()
  const stats = [
    { value: '42+', label: t.hero.stats.metadata },
    { value: 'PDF', label: t.hero.stats.format },
    { value: '100%', label: t.hero.stats.clientSide },
    { value: '0', label: t.hero.stats.stored },
  ]

  return (
    <section className="pt-44 pb-24 text-center relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute -top-52 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(34,197,94,0.15)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-bg-card border border-edge rounded-full text-sm font-medium text-amber-brand mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-brand animate-pulse" />
          {t.hero.badge}
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-[76px] font-extrabold tracking-[-2px] leading-[1.05] mb-6"
        >
          {t.hero.titleStart}{' '}
          <span className="bg-gradient-to-r from-amber-brand via-green-400 to-amber-dim bg-clip-text text-transparent">
            {t.hero.titleHighlight}
          </span>
          <br />
          {t.hero.titleEnd}
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="text-lg text-dim max-w-[560px] mx-auto mb-11">
          {t.hero.subtitle}
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex gap-3.5 justify-center flex-wrap">
          <button
            onClick={() => router.visit(`/${locale}/demo`)}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-brand hover:bg-green-400 text-bg-dark rounded-full font-semibold text-base shadow-[0_4px_30px_rgba(34,197,94,0.25)] hover:shadow-[0_8px_50px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            {t.hero.ctaPrimary}
          </button>
          <button
            onClick={() => scrollTo('how')}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-bg-card border border-edge hover:border-edge-hover hover:bg-bg-card-hover text-cream rounded-full font-semibold text-base hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            {t.hero.ctaSecondary}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-20 max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border border-edge"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-bg-secondary px-5 py-7 text-center border-r border-edge last:border-r-0"
            >
              <div className="font-mono text-[28px] font-bold text-amber-brand">{s.value}</div>
              <div className="text-[11px] text-mute uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
