import { ReactNode } from 'react'
import { usePage } from '@inertiajs/react'
import { Toaster } from 'sonner'
import { I18nProvider } from '~/i18n/context'
import { getTranslations, type Locale } from '~/i18n'
import Footer from '~/components/landing/Footer'
import Nav from '~/components/landing/Nav'

export default function LandingLayout({ children }: { children: ReactNode }) {
  const { props } = usePage()
  const locale = ((props as Record<string, unknown>).locale as Locale) ?? 'en'
  const t = getTranslations(locale)

  return (
    <I18nProvider t={t} locale={locale}>
      <div className="noise-overlay dark-scroll min-h-screen bg-bg-dark text-cream font-sans antialiased">
        <Nav />
        {children}
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </I18nProvider>
  )
}
