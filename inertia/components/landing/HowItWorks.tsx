import { motion } from 'motion/react'
import { useT } from '~/i18n/context'

export default function HowItWorks() {
  const t = useT()

  return (
    <section id="how" className="py-[120px] bg-bg-secondary border-t border-b border-edge">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-4">
            {t.howItWorks.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-dim text-[17px] max-w-[560px] mx-auto">{t.howItWorks.subtitle}</p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-10">
          <div className="hidden md:block absolute top-9 left-[calc(16.6%+36px)] right-[calc(16.6%+36px)] h-px bg-[repeating-linear-gradient(90deg,#222228_0,#222228_8px,transparent_8px,transparent_16px)]" />
          {t.howItWorks.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-center relative"
            >
              <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-bg-card border-2 border-amber-brand flex items-center justify-center font-mono text-2xl font-bold text-amber-brand mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                0{i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2.5">{step.title}</h3>
              <p className="text-dim text-sm max-w-[280px] mx-auto leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
