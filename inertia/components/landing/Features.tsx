import { motion } from 'motion/react'
import { UserRound, MapPin, Clock4, Lock, Link2, ShieldAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useT } from '~/i18n/context'

const ICONS: LucideIcon[] = [UserRound, MapPin, Clock4, Lock, Link2, ShieldAlert]

export default function Features() {
  const t = useT()

  return (
    <section id="features" className="py-[120px]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-4">
            {t.features.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.features.title}</h2>
          <p className="text-dim text-[17px] max-w-[560px] mx-auto">{t.features.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {t.features.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-bg-card border border-edge rounded-[14px] p-9 overflow-hidden hover:border-edge-hover hover:bg-bg-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-xl bg-[rgba(34,197,94,0.12)] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-amber-brand" />
                </div>
                <h3 className="text-lg font-semibold mb-2.5">{item.title}</h3>
                <p className="text-dim text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
