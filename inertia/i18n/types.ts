export const LOCALES = ['en', 'fr', 'es', 'de'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
}

export interface Translations {
  nav: {
    features: string
    howItWorks: string
    faq: string
    analyze: string
    community: string
    issues: string
    pullRequests: string
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
    tabs: { pdf: string; image: string }
    upload: { title: string; subtitle: string; pdfOnly: string; dragging: string }
    imageUpload: { title: string; subtitle: string; formats: string; dragging: string }
    result: {
      status: string
      sensitiveCount: string
      export: string
      clean: string
      loading: string
      errorTitle: string
      riskScore: string
      newAnalysis: string
      textContent: string
      noText: string
      textTruncated: string
    }
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
  communityPage: {
    badge: string
    title: string
    highlight: string
    subtitle: string
    ctaGithub: string
    ctaIssue: string
    howTitle: string
    howSubtitle: string
    cards: Array<{ title: string; description: string; cta: string }>
    stackTitle: string
    stackSubtitle: string
    openTitle: string
    openSubtitle: string
    openItems: Array<{ title: string; description: string }>
  }
  privacyPage: {
    badge: string
    title: string
    subtitle: string
    lastUpdated: string
    sections: Array<{ title: string; content: string }>
  }
  termsPage: {
    badge: string
    title: string
    subtitle: string
    lastUpdated: string
    sections: Array<{ title: string; content: string }>
  }
  seo: {
    home: { title: string; description: string }
    demo: { title: string; description: string }
    faq: { title: string; description: string }
    community: { title: string; description: string }
    privacy: { title: string; description: string }
    terms: { title: string; description: string }
  }
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
