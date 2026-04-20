import { motion } from 'motion/react'
import { Search } from 'lucide-react'
import { router } from '@inertiajs/react'
import { useT, useLocale } from '~/i18n/context'

export default function Cta() {
  const t = useT()
  const locale = useLocale()

  return (
    <section className="py-[120px] text-center relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,transparent_60%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-[54px] font-extrabold tracking-[-1.5px] mb-4">
            {t.cta.title} <span className="text-amber-brand">{t.cta.highlight}</span>
            {' ?'}
          </h2>
          <p className="text-dim text-[17px] max-w-[480px] mx-auto mb-9">{t.cta.subtitle}</p>
          <button
            onClick={() => router.visit(`/${locale}/demo`)}
            className="inline-flex items-center gap-2.5 px-9 py-4 bg-amber-brand hover:bg-green-400 text-bg-dark rounded-full font-semibold text-[17px] shadow-[0_4px_30px_rgba(34,197,94,0.25)] hover:shadow-[0_8px_50px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Search className="w-5 h-5" />
            {t.cta.button}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
