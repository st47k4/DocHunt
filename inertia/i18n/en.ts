import type { Translations } from './types'

const en: Translations = {
  nav: {
    features: 'Features',
    howItWorks: 'How it works',
    demo: 'Demo',
    faq: 'FAQ',
    analyze: 'Analyze a file',
  },
  hero: {
    badge: 'Open Beta — Get started for free',
    titleStart: 'Track the',
    titleHighlight: 'hidden data',
    titleEnd: 'in your files.',
    subtitle:
      'Metadata, author, GPS location, edit history… DocHunt reveals everything your documents expose without your knowledge.',
    ctaPrimary: 'Start analysis',
    ctaSecondary: 'How it works',
    stats: {
      metadata: 'Metadata',
      format: 'Current format',
      clientSide: 'Client-side',
      stored: 'Data stored',
    },
  },
  features: {
    tag: 'Features',
    title: 'Everything hiding inside your files.',
    subtitle:
      'DocHunt deeply analyses each file to extract sensitive information you never suspected was there.',
    items: [
      {
        title: 'Author identity',
        description:
          "Full name, organisation, software used. Everything that identifies the document's creator.",
      },
      {
        title: 'Geolocation',
        description:
          'GPS coordinates embedded in images and documents. Find out exactly where a file was created.',
      },
      {
        title: 'Full history',
        description:
          'Creation, modification, and last-print dates. Trace the complete chronology of the document.',
      },
      {
        title: 'Security level',
        description:
          'Encryption, permissions, access restrictions. Assess the protection level of your files.',
      },
      {
        title: 'Links & resources',
        description:
          'Embedded URLs, fonts, images, attached files. Discover all hidden dependencies.',
      },
      {
        title: 'Risk score',
        description: 'A global assessment of how much personal data is exposed through the file.',
      },
    ],
  },
  howItWorks: {
    tag: 'Process',
    title: 'Simple. Fast. Private.',
    subtitle: 'Three steps to reveal the sensitive data in any file.',
    steps: [
      {
        title: 'Drop your file',
        description: 'Drag-and-drop or pick a PDF. No account or sign-up required.',
      },
      {
        title: 'Instant analysis',
        description: 'DocHunt scans metadata and embedded data in seconds.',
      },
      {
        title: 'Detailed report',
        description: 'Full report with a risk score and recommendations to protect your data.',
      },
    ],
  },
  demo: {
    tag: 'Try it',
    title: 'See for yourself.',
    subtitle: 'Upload a file and instantly discover the information it exposes.',
    upload: { title: 'Drop your file here', subtitle: 'or click to browse', pdfOnly: 'PDF only · max 20 MB', dragging: 'Drop to analyze' },
    result: {
      status: 'Analysed',
      sensitiveCount: '4 sensitive items detected',
      export: 'Export',
      clean: 'Clean',
      loading: 'Analyzing…',
      errorTitle: 'Analysis failed',
      riskScore: 'Risk score',
      newAnalysis: 'New analysis',
      textContent: 'Text content',
      noText: 'No text detected — scanned PDF (OCR coming soon)',
      textTruncated: 'Truncated to 10,000 characters',
    },
  },
  formats: {
    tag: 'Compatibility',
    title: 'Supported formats',
    subtitle: 'Start with PDFs — more formats coming soon.',
    soon: 'Soon',
    items: [
      { label: 'PDF documents', description: 'Metadata, author, XMP, links' },
      { label: 'Word documents', description: 'Properties, comments, revisions' },
      { label: 'Images', description: 'EXIF, GPS, camera info' },
      { label: 'Excel spreadsheets', description: 'Hidden sheets, macros, author' },
    ],
  },
  faq: {
    tag: 'FAQ',
    title: 'Frequently asked questions',
    items: [
      {
        question: 'Are my files stored?',
        answer: 'No. Analysis is ephemeral — no file is retained after processing.',
      },
      {
        question: 'Is it really free?',
        answer:
          'Yes, DocHunt is free during the beta. A Pro version with advanced features is planned.',
      },
      {
        question: 'Which formats are supported?',
        answer: 'Currently PDF. DOCX, images (EXIF), and XLSX are coming soon.',
      },
      {
        question: 'What counts as sensitive data?',
        answer:
          'Any information that identifies the author, reveals the creation location, or compromises confidentiality.',
      },
      {
        question: 'Can I clean my files?',
        answer: 'The metadata-cleaning feature is under development and will be available soon.',
      },
      {
        question: "What's the tech stack?",
        answer: 'AdonisJS 6, TypeScript, Inertia.js with React — modern and performant.',
      },
    ],
  },
  cta: {
    title: 'Ready to',
    highlight: 'hunt',
    subtitle: 'Discover right now what your documents reveal about you.',
    button: 'Analyze my first file',
  },
  footer: {
    description: 'Reveal the hidden data in your files. Open source, fast, and privacy-friendly.',
    columns: {
      product: { title: 'Product', links: ['Features', 'Demo', 'Formats', 'Changelog'] },
      resources: { title: 'Resources', links: ['Documentation', 'API', 'GitHub'] },
      legal: { title: 'Legal', links: ['Privacy', 'Terms', 'Contact'] },
    },
    builtWith: 'Built with AdonisJS, TypeScript & Inertia.js',
  },
  backToTop: 'Back to top',
}

export default en
