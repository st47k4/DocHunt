import { ScanSearch } from 'lucide-react'
import { useT, useLocale } from '~/i18n/context'

export default function Footer() {
  const t = useT()
  const locale = useLocale()

  const columns = [
    {
      title: t.footer.columns.product.title,
      links: t.footer.columns.product.links,
      hrefs: [`/${locale}#features`, `/${locale}/demo`, `/${locale}#formats`, '#'],
    },
    {
      title: t.footer.columns.resources.title,
      links: t.footer.columns.resources.links,
      hrefs: ['#', '#', '#'],
    },
    {
      title: t.footer.columns.legal.title,
      links: t.footer.columns.legal.links,
      hrefs: ['#', '#', '#'],
    },
  ]

  return (
    <footer className="border-t border-edge">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[280px]">
            <div className="flex items-center gap-2.5 font-mono font-bold text-lg mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-brand to-amber-dim flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.25)]">
                <ScanSearch className="w-3.5 h-3.5 text-bg-dark" />
              </div>
              DocHunt
            </div>
            <p className="text-mute text-[13px] leading-relaxed">{t.footer.description}</p>
          </div>

          <div className="flex gap-14 flex-wrap">
            {columns.map((col) => (
              <div key={col.title}>
                <h5 className="text-[11px] uppercase tracking-[2px] text-mute font-semibold mb-4">{col.title}</h5>
                <ul className="space-y-2">
                  {col.links.map((label, i) => (
                    <li key={label}>
                      <a href={col.hrefs[i]} className="text-dim hover:text-cream text-sm transition-colors">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-edge flex flex-wrap justify-between items-center gap-3 text-[12px] text-mute">
          <span>© 2025 DocHunt — dochunt.info</span>
          <span>{t.footer.builtWith}</span>
        </div>
      </div>
    </footer>
  )
}
