import { motion } from 'motion/react'
import { ShieldCheck, Mail } from 'lucide-react'
import { useT, useLocale } from '~/i18n/context'

export default function Privacy() {
  const t = useT()
  const locale = useLocale()
  const p = t.privacyPage

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-6">
              {p.badge}
            </p>
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-amber-brand mx-auto mb-8">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">{p.title}</h1>
            <p className="text-dim text-xl max-w-2xl mx-auto leading-relaxed">{p.subtitle}</p>
            <p className="text-mute text-sm mt-4">{p.lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Sections ── */}
      <section className="pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-0 divide-y divide-edge">
            {p.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="py-10"
              >
                <div className="flex gap-5">
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <span className="text-amber-brand font-mono text-xs font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-cream mb-3">{section.title}</h2>
                    <p className="text-dim leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer link */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 pt-10 border-t border-edge flex flex-wrap items-center justify-between gap-4"
          >
            <a
              href={`/${locale}/terms`}
              className="text-dim hover:text-cream text-sm transition-colors underline underline-offset-4"
            >
              {t.footer.columns.legal.links[1]} →
            </a>
            <a
              href="mailto:privacy@dochunt.info"
              className="inline-flex items-center gap-2 text-dim hover:text-cream text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              privacy@dochunt.info
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
