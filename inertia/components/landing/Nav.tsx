import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Menu, X, Sun, Moon } from 'lucide-react'
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
            <img src="/logo.png" alt="DocHunt" className="w-9 h-9 object-contain" />
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

            {/* GitHub */}
            <a
              href="https://github.com/Sentrak/DocHunt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-edge hover:border-edge-hover bg-bg-card hover:bg-bg-card-hover text-dim hover:text-cream transition-all text-sm font-medium"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>

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
                          ? 'text-amber-brand bg-[rgba(34,197,94,0.08)]'
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
              className="px-5 py-2 bg-amber-brand hover:bg-green-400 text-bg-dark rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:-translate-y-px cursor-pointer"
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

          {/* GitHub */}
          <a
            href="https://github.com/Sentrak/DocHunt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium text-dim hover:text-cream hover:bg-white/[0.03] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </a>

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
            className="w-full py-3 bg-amber-brand hover:bg-green-400 text-bg-dark rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            {t.nav.analyze}
          </button>
        </div>
      </div>
    </>
  )
}
