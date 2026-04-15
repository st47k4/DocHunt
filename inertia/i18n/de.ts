import type { Translations } from './types'

const de: Translations = {
  nav: {
    features: 'Funktionen',
    howItWorks: 'So funktioniert es',
    faq: 'FAQ',
    analyze: 'Datei analysieren',
    community: 'Community',
    issues: 'Issues',
    pullRequests: 'Pull Requests',
  },
  hero: {
    badge: 'Offene Beta — Kostenlos starten',
    titleStart: 'Verfolge die',
    titleHighlight: 'verborgenen Daten',
    titleEnd: 'in deinen Dateien.',
    subtitle:
      'Metadaten, Autor, GPS-Standort, Bearbeitungsverlauf… DocHunt enthüllt alles, was deine Dokumente ohne dein Wissen preisgeben.',
    ctaPrimary: 'Analyse starten',
    ctaSecondary: 'So funktioniert es',
    stats: {
      metadata: 'Metadaten',
      format: 'Aktuelles Format',
      clientSide: 'Clientseitig',
      stored: 'Gespeicherte Daten',
    },
  },
  features: {
    tag: 'Funktionen',
    title: 'Alles, was sich in deinen Dateien versteckt.',
    subtitle:
      'DocHunt analysiert jede Datei tiefgehend, um sensible Informationen zu extrahieren, die du nie vermutet hättest.',
    items: [
      {
        title: 'Autorenidentität',
        description:
          'Vollständiger Name, Organisation, verwendete Software. Alles, was den Ersteller des Dokuments identifiziert.',
      },
      {
        title: 'Geolokalisierung',
        description:
          'GPS-Koordinaten in Bildern und Dokumenten. Finde heraus, wo genau eine Datei erstellt wurde.',
      },
      {
        title: 'Vollständiger Verlauf',
        description:
          'Erstellungs-, Änderungs- und Druckdaten. Verfolge die gesamte Chronologie des Dokuments.',
      },
      {
        title: 'Sicherheitsstufe',
        description:
          'Verschlüsselung, Berechtigungen, Zugriffsbeschränkungen. Bewerte den Schutzgrad deiner Dateien.',
      },
      {
        title: 'Links & Ressourcen',
        description:
          'Eingebettete URLs, Schriften, Bilder, angehängte Dateien. Entdecke alle versteckten Abhängigkeiten.',
      },
      {
        title: 'Risikobewertung',
        description:
          'Gesamtbewertung, wie stark deine persönlichen Daten in der Datei exponiert sind.',
      },
    ],
  },
  howItWorks: {
    tag: 'Prozess',
    title: 'Einfach. Schnell. Privat.',
    subtitle: 'Drei Schritte, um die sensiblen Daten in jeder Datei aufzudecken.',
    steps: [
      {
        title: 'Datei hochladen',
        description: 'Drag & Drop oder PDF auswählen. Kein Konto erforderlich.',
      },
      {
        title: 'Sofortige Analyse',
        description: 'DocHunt scannt Metadaten und eingebettete Daten in Sekunden.',
      },
      {
        title: 'Detaillierter Bericht',
        description:
          'Vollständiger Bericht mit Risikobewertung und Empfehlungen zum Schutz deiner Daten.',
      },
    ],
  },
  demo: {
    tag: 'Ausprobieren',
    title: 'Überzeug dich selbst.',
    subtitle: 'Lade eine Datei hoch und entdecke sofort die Informationen, die sie preisgibt.',
    upload: { title: 'Datei hier ablegen', subtitle: 'oder klicken zum Auswählen', pdfOnly: 'Nur PDF · max 20 MB', dragging: 'Loslassen zum Analysieren' },
    result: {
      status: 'Analysiert',
      sensitiveCount: '4 sensible Daten gefunden',
      export: 'Exportieren',
      clean: 'Bereinigen',
      loading: 'Wird analysiert…',
      errorTitle: 'Analyse fehlgeschlagen',
      riskScore: 'Risikobewertung',
      newAnalysis: 'Neue Analyse',
      textContent: 'Textinhalt',
      noText: 'Kein Text erkannt — gescanntes PDF (OCR folgt)',
      textTruncated: 'Auf 10.000 Zeichen gekürzt',
    },
  },
  formats: {
    tag: 'Kompatibilität',
    title: 'Unterstützte Formate',
    subtitle: 'Starte mit PDFs — weitere Formate folgen bald.',
    soon: 'Bald',
    items: [
      { label: 'PDF-Dokumente', description: 'Metadaten, Autor, XMP, Links' },
      { label: 'Word-Dokumente', description: 'Eigenschaften, Kommentare, Revisionen' },
      { label: 'Bilder', description: 'EXIF, GPS, Kamerainfo' },
      { label: 'Excel-Tabellen', description: 'Versteckte Blätter, Makros, Autor' },
    ],
  },
  faq: {
    tag: 'FAQ',
    title: 'Häufig gestellte Fragen',
    items: [
      {
        question: 'Werden meine Dateien gespeichert?',
        answer:
          'Nein. Die Analyse ist flüchtig — nach der Verarbeitung wird keine Datei aufbewahrt.',
      },
      {
        question: 'Ist es wirklich kostenlos?',
        answer:
          'Ja, DocHunt ist während der Beta kostenlos. Eine Pro-Version mit erweiterten Funktionen ist geplant.',
      },
      {
        question: 'Welche Formate werden unterstützt?',
        answer: 'Derzeit PDF. DOCX, Bilder (EXIF) und XLSX kommen bald.',
      },
      {
        question: 'Was sind sensible Daten?',
        answer:
          'Alle Informationen, die den Autor identifizieren, den Erstellungsort enthüllen oder die Vertraulichkeit gefährden.',
      },
      {
        question: 'Kann ich meine Dateien bereinigen?',
        answer:
          'Die Bereinigungsfunktion für Metadaten ist in Entwicklung und wird bald verfügbar sein.',
      },
      {
        question: 'Was ist der Tech-Stack?',
        answer: 'AdonisJS 6, TypeScript, Inertia.js mit React — modern und leistungsstark.',
      },
    ],
  },
  cta: {
    title: 'Bereit zum',
    highlight: 'Jagen',
    subtitle: 'Entdecke jetzt, was deine Dokumente über dich verraten.',
    button: 'Meine erste Datei analysieren',
  },
  footer: {
    description:
      'Enthülle die verborgenen Daten in deinen Dateien. Open Source, schnell und datenschutzfreundlich.',
    columns: {
      product: { title: 'Produkt', links: ['Funktionen', 'Demo', 'Formate', 'Changelog'] },
      resources: { title: 'Ressourcen', links: ['Dokumentation', 'API', 'GitHub'] },
      legal: { title: 'Rechtliches', links: ['Datenschutz', 'AGB', 'Kontakt'] },
    },
    builtWith: 'Gebaut mit AdonisJS, TypeScript & Inertia.js',
  },
  communityPage: {
    badge: 'Open Source',
    title: 'Gemeinsam',
    highlight: 'gebaut.',
    subtitle: 'DocHunt ist ein Open-Source-Projekt. Werde Teil der Community: melde Bugs, schlage Funktionen vor, trage Code bei.',
    ctaGithub: 'Auf GitHub ansehen',
    ctaIssue: 'Bug melden',
    howTitle: 'Wie beitragen?',
    howSubtitle: 'Drei einfache Wege, um mitzumachen.',
    cards: [
      { title: 'Bug melden', description: 'Problem gefunden? Öffne ein GitHub Issue mit möglichst vielen Details.', cta: 'Issue öffnen' },
      { title: 'Idee vorschlagen', description: 'Etwas fehlt? Beschreibe es in einem Issue und die Community diskutiert darüber.', cta: 'Vorschlag machen' },
      { title: 'Code einreichen', description: 'Fork das Repo, erstelle einen Branch und öffne einen Pull Request. Alle Beiträge sind willkommen.', cta: 'Offene PRs ansehen' },
    ],
    stackTitle: 'Tech-Stack',
    stackSubtitle: 'Die Technologien hinter DocHunt.',
    openTitle: 'Warum Open Source?',
    openSubtitle: 'Transparenz, Vertrauen und Zusammenarbeit.',
    openItems: [
      { title: 'Volle Transparenz', description: 'Prüfe jede Codezeile und verifiziere, dass deine Dateien niemals gespeichert werden.' },
      { title: 'Kontinuierliche Verbesserung', description: 'Externe Beiträge verbessern die Erkennung und ermöglichen neue Dateiformate.' },
      { title: 'Aktive Community', description: 'Issues, Diskussionen, PRs — das Projekt entwickelt sich durch Nutzerfeedback weiter.' },
    ],
  },
  backToTop: 'Nach oben',
}

export default de
