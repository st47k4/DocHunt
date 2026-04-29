import { motion } from 'motion/react'
import { FileText, FileType2, Image, Sheet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useT } from '~/i18n/context'

const ICONS: { icon: LucideIcon; ext: string; color: string; soon: boolean }[] = [
  { icon: FileText, ext: '.PDF',       color: 'text-red-500',    soon: false },
  { icon: FileType2, ext: '.DOCX',     color: 'text-blue-500',   soon: false },
  { icon: Image,    ext: '.JPG / .PNG', color: 'text-purple-500', soon: false },
  { icon: Sheet,    ext: '.XLSX / .PPTX', color: 'text-green-500', soon: false },
]

export default function Formats() {
  const t = useT()

  return (
    <section id="formats" className="py-[120px]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-4">
            {t.formats.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.formats.title}</h2>
          <p className="text-dim text-[17px] max-w-[560px] mx-auto">{t.formats.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ICONS.map(({ icon: Icon, ext, color, soon }, i) => {
            const item = t.formats.items[i]
            return (
              <motion.div
                key={ext}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-bg-card border border-edge rounded-[14px] px-5 py-8 text-center hover:border-edge-hover hover:-translate-y-0.5 transition-all"
              >
                {soon && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-bg-secondary border border-edge rounded-full text-[10px] font-semibold uppercase tracking-wide text-mute">
                    {t.formats.soon}
                  </span>
                )}
                <Icon className={`w-8 h-8 mx-auto mb-3 ${color}`} />
                <div className={`font-mono text-[26px] font-bold mb-3 ${color}`}>{ext}</div>
                <h4 className="text-sm font-semibold mb-1">{item.label}</h4>
                <p className="text-xs text-mute">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
