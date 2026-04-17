import type { Translations } from './types'

const en: Translations = {
  nav: {
    features: 'Features',
    howItWorks: 'How it works',
    faq: 'FAQ',
    analyze: 'Analyze a file',
    community: 'Community',
    issues: 'Issues',
    pullRequests: 'Pull Requests',
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
    tabs: { pdf: 'PDF', image: 'Image' },
    upload: {
      title: 'Drop your file here',
      subtitle: 'or click to browse',
      pdfOnly: 'PDF only · max 20 MB',
      dragging: 'Drop to analyze',
    },
    imageUpload: {
      title: 'Drop your image here',
      subtitle: 'or click to browse',
      formats: 'JPEG, PNG, WebP, GIF, ICO · max 20 MB',
      dragging: 'Drop to analyze',
    },
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
  communityPage: {
    badge: 'Open Source',
    title: 'Built',
    highlight: 'together.',
    subtitle:
      'DocHunt is an open source project. Join the community: report bugs, suggest features, contribute code.',
    ctaGithub: 'View on GitHub',
    ctaIssue: 'Report a bug',
    howTitle: 'How to contribute?',
    howSubtitle: 'Three simple ways to get involved.',
    cards: [
      {
        title: 'Report a bug',
        description:
          'Found an issue? Open a GitHub issue with as much detail as possible so we can fix it quickly.',
        cta: 'Open an issue',
      },
      {
        title: 'Suggest a feature',
        description:
          'Something missing or could be improved? Describe it in an issue and the community will discuss it.',
        cta: 'Make a suggestion',
      },
      {
        title: 'Submit code',
        description:
          'Fork the repo, create a branch and open a Pull Request. All contributions are welcome.',
        cta: 'View open PRs',
      },
    ],
    stackTitle: 'Tech stack',
    stackSubtitle: 'The technologies powering DocHunt.',
    openTitle: 'Why open source?',
    openSubtitle: 'Transparency, trust and collaboration.',
    openItems: [
      {
        title: 'Full transparency',
        description:
          'Audit every line of code and verify for yourself that your files are never stored.',
      },
      {
        title: 'Continuous improvement',
        description:
          'External contributions improve detection accuracy and add support for new file formats.',
      },
      {
        title: 'Active community',
        description: 'Issues, discussions, PRs — the project evolves through user feedback.',
      },
    ],
  },
  privacyPage: {
    badge: 'Legal',
    title: 'Privacy Policy',
    subtitle:
      'We built DocHunt with privacy at its core. Here is exactly what happens to your data.',
    lastUpdated: 'Last updated: April 2025',
    sections: [
      {
        title: 'Files are never stored',
        content:
          'Files uploaded for analysis are processed in memory and discarded immediately after. We never write them to disk, store them in a database, or transmit them to any third party.',
      },
      {
        title: 'No personal data collected',
        content:
          'DocHunt does not collect names, email addresses, or any personally identifiable information unless you create an account. Account data (email + hashed password) is stored solely to authenticate you.',
      },
      {
        title: 'Cookies & analytics',
        content:
          'We use a session cookie strictly to manage authentication state. We do not use advertising cookies, fingerprinting, or third-party analytics trackers.',
      },
      {
        title: 'Third-party services',
        content:
          'The Python micro-service that analyses files runs on our own infrastructure. No file content or metadata is ever sent to external APIs.',
      },
      {
        title: 'Data retention',
        content:
          'Session data is stored in a cookie on your device and expires when you close your browser. No server-side session storage is used beyond the authentication flow.',
      },
      {
        title: 'Contact',
        content:
          'For any privacy-related question, reach us at privacy@dochunt.info or open an issue on our GitHub repository.',
      },
    ],
  },
  termsPage: {
    badge: 'Legal',
    title: 'Terms of Service',
    subtitle: 'Simple, fair rules for using DocHunt.',
    lastUpdated: 'Last updated: April 2025',
    sections: [
      {
        title: 'Acceptance',
        content:
          'By using DocHunt you agree to these Terms of Service. If you disagree with any part of these terms, please do not use the service.',
      },
      {
        title: 'Service description',
        content:
          'DocHunt is a metadata analysis tool that extracts information embedded in documents. It is provided free of charge during the open beta phase. We reserve the right to modify, suspend, or discontinue the service at any time.',
      },
      {
        title: 'Acceptable use',
        content:
          "You may only upload files you own or are authorised to analyse. Do not use DocHunt to process files belonging to others without their explicit consent. Any use intended to harm, deceive, or infringe on others' rights is strictly prohibited.",
      },
      {
        title: 'Intellectual property',
        content:
          'DocHunt is open source and released under the MIT licence. The source code is available on GitHub. You are free to fork, modify, and redistribute it under the same licence. The DocHunt name and logo remain the property of the project maintainers.',
      },
      {
        title: 'Disclaimer of warranties',
        content:
          'DocHunt is provided "as is" without warranty of any kind. We do not guarantee that the service will be uninterrupted, error-free, or that analysis results will be complete and accurate.',
      },
      {
        title: 'Limitation of liability',
        content:
          'To the fullest extent permitted by law, DocHunt and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the service.',
      },
      {
        title: 'Changes to these terms',
        content:
          'We may update these terms at any time. Continued use of DocHunt after a change is posted constitutes acceptance of the revised terms.',
      },
      {
        title: 'Contact',
        content:
          'Questions about these terms? Write to us at legal@sentrak.info or open a discussion on GitHub.',
      },
    ],
  },
  seo: {
    home: {
      title: 'DocHunt | Reveal the Hidden Data in Your Files',
      description:
        'Scan PDFs and images to extract metadata, author identity, GPS location and more. Free, instant, privacy-friendly.',
    },
    demo: {
      title: 'DocHunt | Analyze a File',
      description:
        'Upload a PDF or image and instantly discover what metadata it exposes. No sign-up required.',
    },
    faq: {
      title: 'DocHunt | Frequently Asked Questions',
      description:
        'Everything you need to know about DocHunt: privacy, supported formats, and how the analysis works.',
    },
    community: {
      title: 'DocHunt | Community',
      description:
        'DocHunt is open source. Report bugs, suggest features, and contribute code on GitHub.',
    },
    privacy: {
      title: 'DocHunt | Privacy Policy',
      description:
        'Learn how DocHunt handles your data. Files are never stored and no personal data is collected.',
    },
    terms: {
      title: 'DocHunt | Terms of Service',
      description: 'Simple, fair rules for using DocHunt during the open beta.',
    },
  },
  backToTop: 'Back to top',
}

export default en
