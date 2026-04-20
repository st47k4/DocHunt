import { motion } from 'motion/react'
import { useT } from '~/i18n/context'

export default function Faq() {
  const t = useT()

  return (
    <section id="faq" className="py-[120px] bg-bg-secondary border-t border-b border-edge">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-4">
            {t.faq.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.faq.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
          {t.faq.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="bg-bg-card border border-edge hover:border-edge-hover rounded-[14px] p-7 transition-colors"
            >
              <h4 className="text-[15px] font-semibold mb-2.5 flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 bg-[rgba(34,197,94,0.12)] rounded-md flex items-center justify-center font-mono text-xs font-bold text-amber-brand mt-0.5">
                  ?
                </span>
                {item.question}
              </h4>
              <p className="text-dim text-sm leading-relaxed pl-[34px]">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
