import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useT } from '~/i18n/context'

export default function BackToTop() {
  const t = useT()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = document.scrollingElement ?? document.documentElement
    const check = () => setVisible(el.scrollTop > 300 || window.scrollY > 300)
    window.addEventListener('scroll', check, { passive: true })
    el.addEventListener('scroll', check, { passive: true })
    return () => {
      window.removeEventListener('scroll', check)
      el.removeEventListener('scroll', check)
    }
  }, [])

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        ;(document.scrollingElement ?? document.documentElement).scrollTo({ top: 0, behavior: 'smooth' })
      }}
      aria-label={t.backToTop}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.2s',
      }}
      className="flex items-center gap-2 px-4 py-2.5 bg-amber-brand text-bg-dark rounded-full text-sm font-semibold shadow-lg cursor-pointer"
    >
      <ArrowUp className="w-4 h-4" />
      {t.backToTop}
    </button>
  )
}
