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
    tabs: { pdf: 'PDF', image: 'Bild' },
    upload: {
      title: 'Datei hier ablegen',
      subtitle: 'oder klicken zum Auswählen',
      pdfOnly: 'Nur PDF · max 20 MB',
      dragging: 'Loslassen zum Analysieren',
    },
    imageUpload: {
      title: 'Bild hier ablegen',
      subtitle: 'oder klicken zum Auswählen',
      formats: 'JPEG, PNG, WebP, GIF, ICO · max 20 MB',
      dragging: 'Loslassen zum Analysieren',
    },
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
    builtWith: 'Ein Tool von',
  },
  communityPage: {
    badge: 'Open Source',
    title: 'Gemeinsam',
    highlight: 'gebaut.',
    subtitle:
      'DocHunt ist ein Open-Source-Projekt. Werde Teil der Community: melde Bugs, schlage Funktionen vor, trage Code bei.',
    ctaGithub: 'Auf GitHub ansehen',
    ctaIssue: 'Bug melden',
    howTitle: 'Wie beitragen?',
    howSubtitle: 'Drei einfache Wege, um mitzumachen.',
    cards: [
      {
        title: 'Bug melden',
        description: 'Problem gefunden? Öffne ein GitHub Issue mit möglichst vielen Details.',
        cta: 'Issue öffnen',
      },
      {
        title: 'Idee vorschlagen',
        description:
          'Etwas fehlt? Beschreibe es in einem Issue und die Community diskutiert darüber.',
        cta: 'Vorschlag machen',
      },
      {
        title: 'Code einreichen',
        description:
          'Fork das Repo, erstelle einen Branch und öffne einen Pull Request. Alle Beiträge sind willkommen.',
        cta: 'Offene PRs ansehen',
      },
    ],
    stackTitle: 'Tech-Stack',
    stackSubtitle: 'Die Technologien hinter DocHunt.',
    openTitle: 'Warum Open Source?',
    openSubtitle: 'Transparenz, Vertrauen und Zusammenarbeit.',
    openItems: [
      {
        title: 'Volle Transparenz',
        description:
          'Prüfe jede Codezeile und verifiziere, dass deine Dateien niemals gespeichert werden.',
      },
      {
        title: 'Kontinuierliche Verbesserung',
        description: 'Externe Beiträge verbessern die Erkennung und ermöglichen neue Dateiformate.',
      },
      {
        title: 'Aktive Community',
        description:
          'Issues, Diskussionen, PRs — das Projekt entwickelt sich durch Nutzerfeedback weiter.',
      },
    ],
  },
  privacyPage: {
    badge: 'Rechtliches',
    title: 'Datenschutzerklärung',
    subtitle:
      'DocHunt wurde mit Datenschutz als Kernprinzip entwickelt. Hier ist genau, was mit deinen Daten passiert.',
    lastUpdated: 'Zuletzt aktualisiert: April 2025',
    sections: [
      {
        title: 'Dateien werden niemals gespeichert',
        content:
          'Hochgeladene Dateien werden im Arbeitsspeicher verarbeitet und sofort verworfen. Wir schreiben sie nie auf Disk, speichern sie nicht in einer Datenbank und übertragen sie nicht an Dritte.',
      },
      {
        title: 'Keine persönlichen Daten erfasst',
        content:
          'DocHunt erfasst keine Namen, E-Mail-Adressen oder persönlich identifizierbare Informationen, es sei denn, du erstellst ein Konto. Kontodaten (E-Mail + gehashtes Passwort) werden nur zur Authentifizierung gespeichert.',
      },
      {
        title: 'Cookies & Analysen',
        content:
          'Wir verwenden ein Session-Cookie ausschließlich zur Verwaltung des Authentifizierungsstatus. Wir nutzen keine Werbe-Cookies, Fingerprinting oder Drittanbieter-Tracker.',
      },
      {
        title: 'Drittanbieter-Dienste',
        content:
          'Der Python-Mikrodienst, der Dateien analysiert, läuft auf unserer eigenen Infrastruktur. Kein Dateiinhalt oder Metadaten werden an externe APIs gesendet.',
      },
      {
        title: 'Datenspeicherung',
        content:
          'Sitzungsdaten werden in einem Cookie auf deinem Gerät gespeichert und verfallen, wenn du den Browser schließt. Es wird kein serverseitiger Sitzungsspeicher verwendet.',
      },
      {
        title: 'Kontakt',
        content:
          'Bei Datenschutzfragen erreichst du uns unter privacy@dochunt.info oder über ein GitHub-Issue.',
      },
    ],
  },
  termsPage: {
    badge: 'Rechtliches',
    title: 'Nutzungsbedingungen',
    subtitle: 'Einfache, faire Regeln für die Nutzung von DocHunt.',
    lastUpdated: 'Zuletzt aktualisiert: April 2025',
    sections: [
      {
        title: 'Akzeptanz',
        content:
          'Mit der Nutzung von DocHunt stimmst du diesen Nutzungsbedingungen zu. Falls du nicht einverstanden bist, nutze den Dienst bitte nicht.',
      },
      {
        title: 'Dienstbeschreibung',
        content:
          'DocHunt ist ein Metadaten-Analysetool, das kostenlos während der offenen Beta-Phase bereitgestellt wird. Wir behalten uns das Recht vor, den Dienst jederzeit zu ändern, auszusetzen oder einzustellen.',
      },
      {
        title: 'Zulässige Nutzung',
        content:
          'Du darfst nur Dateien hochladen, die dir gehören oder die du analysieren darfst. Die Verarbeitung fremder Dateien ohne ausdrückliche Genehmigung ist streng verboten.',
      },
      {
        title: 'Geistiges Eigentum',
        content:
          'DocHunt ist Open Source unter der MIT-Lizenz. Der Quellcode ist auf GitHub verfügbar. Du kannst ihn forken, ändern und unter derselben Lizenz weiterverteilen. Name und Logo gehören den Projektbetreuern.',
      },
      {
        title: 'Gewährleistungsausschluss',
        content:
          'DocHunt wird "wie besehen" ohne jegliche Gewährleistung bereitgestellt. Wir garantieren nicht, dass der Dienst unterbrechungsfrei oder fehlerfrei ist.',
      },
      {
        title: 'Haftungsbeschränkung',
        content:
          'Soweit gesetzlich zulässig, haftet DocHunt und seine Mitwirkenden nicht für direkte oder indirekte Schäden aus der Nutzung des Dienstes.',
      },
      {
        title: 'Änderungen der Bedingungen',
        content:
          'Wir können diese Bedingungen jederzeit aktualisieren. Die weitere Nutzung von DocHunt nach einer Änderung gilt als Akzeptanz der neuen Bedingungen.',
      },
      {
        title: 'Kontakt',
        content:
          'Fragen zu diesen Bedingungen? Schreib uns an legal@sentrak.info oder eröffne eine Diskussion auf GitHub.',
      },
    ],
  },
  liveStats: {
    analyses: 'Analysen durchgeführt',
    totalData: 'Daten analysiert',
  },
  seo: {
    home: {
      title: 'DocHunt',
      description:
        'Analysieren Sie PDFs und Bilder, um Metadaten, Autorenidentität, GPS-Standort und mehr zu extrahieren. Kostenlos, sofort, datenschutzfreundlich.',
    },
    demo: {
      title: 'Datei analysieren · DocHunt',
      description:
        'Laden Sie ein PDF oder Bild hoch und entdecken Sie sofort die preisgegebenen Metadaten. Ohne Anmeldung.',
    },
    faq: {
      title: 'FAQ · DocHunt',
      description:
        'Alles, was Sie über DocHunt wissen müssen: Datenschutz, unterstützte Formate und wie die Analyse funktioniert.',
    },
    community: {
      title: 'Community · DocHunt',
      description:
        'DocHunt ist Open Source. Melden Sie Fehler, schlagen Sie Funktionen vor und tragen Sie auf GitHub bei.',
    },
    privacy: {
      title: 'Datenschutzrichtlinie · DocHunt',
      description:
        'Erfahren Sie, wie DocHunt mit Ihren Daten umgeht. Dateien werden niemals gespeichert und keine personenbezogenen Daten erhoben.',
    },
    terms: {
      title: 'Nutzungsbedingungen · DocHunt',
      description: 'Einfache und faire Regeln für die Nutzung von DocHunt.',
    },
  },
  backToTop: 'Nach oben',
}

export default de
