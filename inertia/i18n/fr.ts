import type { Translations } from './types'

const fr: Translations = {
  nav: {
    features: 'Fonctionnalités',
    howItWorks: 'Comment ça marche',
    demo: 'Démo',
    faq: 'FAQ',
    analyze: 'Analyser un fichier',
  },
  hero: {
    badge: 'Bêta ouverte — Commencez gratuitement',
    titleStart: 'Traquez les',
    titleHighlight: 'données cachées',
    titleEnd: 'de vos fichiers.',
    subtitle:
      'Métadonnées, auteur, géolocalisation, historique de modifications… DocHunt révèle tout ce que vos documents exposent à votre insu.',
    ctaPrimary: 'Lancer une analyse',
    ctaSecondary: 'Comment ça marche',
    stats: {
      metadata: 'Métadonnées',
      format: 'Format actuel',
      clientSide: 'Côté client',
      stored: 'Données stockées',
    },
  },
  features: {
    tag: 'Fonctionnalités',
    title: 'Tout ce qui se cache dans vos fichiers.',
    subtitle:
      'DocHunt analyse en profondeur chaque fichier pour extraire les informations sensibles que vous ne soupçonnez même pas.',
    items: [
      {
        title: "Identité de l'auteur",
        description:
          "Nom complet, organisation, logiciel utilisé. Tout ce qui permet d'identifier le créateur du document.",
      },
      {
        title: 'Géolocalisation',
        description:
          'Coordonnées GPS intégrées dans les images et documents. Retrouvez exactement où un fichier a été créé.',
      },
      {
        title: 'Historique complet',
        description:
          'Dates de création, modification, dernière impression. Retracez la chronologie complète du document.',
      },
      {
        title: 'Niveau de sécurité',
        description:
          "Chiffrement, permissions, restrictions d'accès. Évaluez le niveau de protection de vos fichiers.",
      },
      {
        title: 'Liens & Ressources',
        description:
          'URLs embarquées, polices, images, fichiers attachés. Découvrez toutes les dépendances cachées.',
      },
      {
        title: 'Score de risque',
        description:
          "Évaluation globale du niveau d'exposition de vos données personnelles à travers le fichier.",
      },
    ],
  },
  howItWorks: {
    tag: 'Processus',
    title: 'Simple. Rapide. Privé.',
    subtitle: 'Trois étapes pour révéler les données sensibles de vos fichiers.',
    steps: [
      {
        title: 'Déposez votre fichier',
        description: 'Glissez-déposez ou sélectionnez un PDF. Aucun compte requis.',
      },
      {
        title: 'Analyse instantanée',
        description: 'DocHunt scanne les métadonnées et données embarquées en quelques secondes.',
      },
      {
        title: 'Rapport détaillé',
        description:
          'Rapport complet avec score de risque et recommandations pour protéger vos données.',
      },
    ],
  },
  demo: {
    tag: 'Essayer',
    title: 'Voyez par vous-même.',
    subtitle: "Uploadez un fichier et découvrez instantanément les informations qu'il expose.",
    upload: { title: 'Glissez votre fichier ici', subtitle: 'ou cliquez pour sélectionner', pdfOnly: 'PDF uniquement · max 20 Mo', dragging: 'Relâchez pour analyser' },
    result: {
      status: 'Analysé',
      sensitiveCount: '4 données sensibles détectées',
      export: 'Exporter',
      clean: 'Nettoyer',
      loading: 'Analyse en cours…',
      errorTitle: "Échec de l'analyse",
      riskScore: 'Score de risque',
      newAnalysis: 'Nouvelle analyse',
      textContent: 'Contenu textuel',
      noText: 'Aucun texte détecté — PDF scanné (OCR bientôt disponible)',
      textTruncated: 'Tronqué à 10 000 caractères',
    },
  },
  formats: {
    tag: 'Compatibilité',
    title: 'Formats supportés',
    subtitle: "Commencez avec les PDF, d'autres formats arrivent bientôt.",
    soon: 'Bientôt',
    items: [
      { label: 'Documents PDF', description: 'Métadonnées, auteur, XMP, liens' },
      { label: 'Documents Word', description: 'Propriétés, commentaires, révisions' },
      { label: 'Images', description: 'EXIF, GPS, appareil photo' },
      { label: 'Tableurs Excel', description: 'Feuilles masquées, macros, auteur' },
    ],
  },
  faq: {
    tag: 'FAQ',
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Mes fichiers sont-ils stockés ?',
        answer: "Non. L'analyse est éphémère. Aucun fichier n'est conservé après l'analyse.",
      },
      {
        question: "C'est vraiment gratuit ?",
        answer: 'Oui, DocHunt est gratuit pendant la bêta. Une version Pro est prévue.',
      },
      {
        question: 'Quels formats sont supportés ?',
        answer: 'Actuellement les fichiers PDF. DOCX, images et XLSX arrivent prochainement.',
      },
      {
        question: "Qu'est-ce qu'une donnée sensible ?",
        answer:
          "Toute information permettant d'identifier l'auteur ou de compromettre la confidentialité du document.",
      },
      {
        question: 'Puis-je nettoyer mes fichiers ?',
        answer: 'La fonctionnalité de nettoyage est en cours de développement.',
      },
      {
        question: 'Quelle est la stack technique ?',
        answer:
          'AdonisJS 6, TypeScript, Inertia.js avec React. Architecture moderne et performante.',
      },
    ],
  },
  cta: {
    title: 'Prêt à',
    highlight: 'chasser',
    subtitle: 'Découvrez maintenant ce que vos documents révèlent sur vous.',
    button: 'Analyser mon premier fichier',
  },
  footer: {
    description:
      'Révélez les données cachées de vos fichiers. Open source, rapide, et respectueux de votre vie privée.',
    columns: {
      product: { title: 'Produit', links: ['Fonctionnalités', 'Démo', 'Formats', 'Changelog'] },
      resources: { title: 'Ressources', links: ['Documentation', 'API', 'GitHub'] },
      legal: { title: 'Légal', links: ['Confidentialité', 'CGU', 'Contact'] },
    },
    builtWith: 'Construit avec AdonisJS, TypeScript & Inertia.js',
  },
  backToTop: 'Haut de page',
}

export default fr
