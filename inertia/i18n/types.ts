export const LOCALES = ['en', 'fr', 'es', 'de', 'pt', 'ar', 'zh', 'ja', 'hi'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  pt: 'Português',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語',
  hi: 'हिन्दी',
}

export interface Translations {
  nav: {
    features: string
    howItWorks: string
    demo: string
    faq: string
    analyze: string
  }
  hero: {
    badge: string
    titleStart: string
    titleHighlight: string
    titleEnd: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    stats: { metadata: string; format: string; clientSide: string; stored: string }
  }
  features: {
    tag: string
    title: string
    subtitle: string
    items: Array<{ title: string; description: string }>
  }
  howItWorks: {
    tag: string
    title: string
    subtitle: string
    steps: Array<{ title: string; description: string }>
  }
  demo: {
    tag: string
    title: string
    subtitle: string
    upload: { title: string; subtitle: string }
    result: { status: string; sensitiveCount: string; export: string; clean: string }
  }
  formats: {
    tag: string
    title: string
    subtitle: string
    soon: string
    items: Array<{ label: string; description: string }>
  }
  faq: {
    tag: string
    title: string
    items: Array<{ question: string; answer: string }>
  }
  cta: { title: string; highlight: string; subtitle: string; button: string }
  backToTop: string
  footer: {
    description: string
    columns: {
      product: { title: string; links: string[] }
      resources: { title: string; links: string[] }
      legal: { title: string; links: string[] }
    }
    builtWith: string
  }
}
