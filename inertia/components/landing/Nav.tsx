import { useState, useEffect, useRef } from 'react'
import { ScanSearch, ChevronDown, Menu, X, Sun, Moon } from 'lucide-react'
import { router, usePage } from '@inertiajs/react'
import { useLocale } from '~/i18n/context'
import { LOCALES, LOCALE_LABELS } from '~/i18n/types'
import { useT } from '~/i18n/context'
import { useTheme } from '~/context/theme'

export default function Nav() {
  const t = useT()
  const locale = useLocale()
  const { component } = usePage()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close lang dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function switchLocale(l: string) {
    setLangOpen(false)
    setMenuOpen(false)
    const pathMap: Record<string, string> = {
      home: '',
      demo: '/demo',
      faq: '/faq',
      community: '/community',
    }
    const suffix = pathMap[component] ?? ''
    router.visit(`/${l}${suffix}`)
  }

  function navigate(path: string) {
    setMenuOpen(false)
    router.visit(path)
  }

  const links = [
    { label: t.nav.faq, path: `/${locale}/faq`, page: 'faq' },
    { label: t.nav.community, path: `/${locale}/community`, page: 'community' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled || menuOpen
            ? 'backdrop-blur-xl bg-bg-dark/90 border-edge shadow-[0_1px_24px_rgba(0,0,0,0.14)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate(`/${locale}`)}
            className="flex items-center gap-2.5 font-mono font-bold text-xl text-cream cursor-pointer"
          >
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-amber-brand to-amber-dim flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <ScanSearch className="w-[18px] h-[18px] text-bg-dark" />
            </div>
            DocHunt
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.path)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  component === link.page ? 'text-cream' : 'text-dim hover:text-cream'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Language switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm font-medium text-dim hover:text-cream transition-colors cursor-pointer"
              >
                <span className="font-mono uppercase">{locale}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-bg-card border border-edge rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] min-w-[140px]">
                  {LOCALES.map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2.5 cursor-pointer ${
                        l === locale
                          ? 'text-amber-brand bg-[rgba(245,158,11,0.08)]'
                          : 'text-dim hover:text-cream hover:bg-bg-card-hover'
                      }`}
                    >
                      <span className="font-mono text-xs uppercase opacity-60 w-6">{l}</span>
                      {LOCALE_LABELS[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-edge hover:border-edge-hover bg-bg-card hover:bg-bg-card-hover text-dim hover:text-cream transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA */}
            <button
              onClick={() => navigate(`/${locale}/demo`)}
              className="px-5 py-2 bg-amber-brand hover:bg-amber-400 text-bg-dark rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:-translate-y-px cursor-pointer"
            >
              {t.nav.analyze}
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-edge bg-bg-card text-dim hover:text-cream transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-9 h-9 flex items-center justify-center text-dim hover:text-cream transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden bg-bg-dark border-b border-edge transition-all duration-300 ${
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
          {/* Nav links */}
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.path)}
              className={`text-left px-3 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                component === link.page
                  ? 'text-cream bg-white/[0.05]'
                  : 'text-dim hover:text-cream hover:bg-white/[0.03]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="border-t border-edge my-2" />

          {/* Language grid */}
          <p className="px-3 text-[11px] font-mono uppercase tracking-widest text-mute mb-1">
            Language
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                  l === locale
                    ? 'bg-amber-brand/10 border border-amber-brand/30 text-amber-brand'
                    : 'text-dim hover:text-cream hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <span className="font-mono uppercase text-[10px] block opacity-60">{l}</span>
                <span className="text-[11px]">{LOCALE_LABELS[l]}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-edge my-2" />

          {/* CTA */}
          <button
            onClick={() => navigate(`/${locale}/demo`)}
            className="w-full py-3 bg-amber-brand hover:bg-amber-400 text-bg-dark rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            {t.nav.analyze}
          </button>
        </div>
      </div>
    </>
  )
}
