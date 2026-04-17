import type { Translations } from './types'

const fr: Translations = {
  nav: {
    features: 'Fonctionnalités',
    howItWorks: 'Comment ça marche',
    faq: 'FAQ',
    analyze: 'Analyser un fichier',
    community: 'Communauté',
    issues: 'Issues',
    pullRequests: 'Pull Requests',
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
    tabs: { pdf: 'PDF', image: 'Image' },
    upload: {
      title: 'Glissez votre fichier ici',
      subtitle: 'ou cliquez pour sélectionner',
      pdfOnly: 'PDF uniquement · max 20 Mo',
      dragging: 'Relâchez pour analyser',
    },
    imageUpload: {
      title: 'Glissez votre image ici',
      subtitle: 'ou cliquez pour sélectionner',
      formats: 'JPEG, PNG, WebP, GIF, ICO · max 20 Mo',
      dragging: 'Relâchez pour analyser',
    },
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
  communityPage: {
    badge: 'Open Source',
    title: 'Construit',
    highlight: 'ensemble.',
    subtitle:
      'DocHunt est un projet open source. Rejoins la communauté : signale des bugs, propose des fonctionnalités, contribue au code.',
    ctaGithub: 'Voir sur GitHub',
    ctaIssue: 'Signaler un bug',
    howTitle: 'Comment contribuer ?',
    howSubtitle: 'Trois façons simples de participer au projet.',
    cards: [
      {
        title: 'Signaler un bug',
        description:
          "Tu as trouvé un problème ? Ouvre une issue GitHub avec le maximum de détails pour qu'on puisse le corriger rapidement.",
        cta: 'Ouvrir une issue',
      },
      {
        title: 'Proposer une idée',
        description:
          'Une fonctionnalité manque ou pourrait être améliorée ? Décris-la dans une issue et la communauté en discutera.',
        cta: 'Faire une suggestion',
      },
      {
        title: 'Soumettre du code',
        description:
          'Fork le dépôt, crée une branche et ouvre une Pull Request. Toutes les contributions sont les bienvenues.',
        cta: 'Voir les PR ouvertes',
      },
    ],
    stackTitle: 'Stack technique',
    stackSubtitle: 'Les technologies qui font tourner DocHunt.',
    openTitle: 'Pourquoi open source ?',
    openSubtitle: 'Transparence, confiance et collaboration.',
    openItems: [
      {
        title: 'Transparence totale',
        description:
          'Audite chaque ligne de code et vérifie par toi-même que tes fichiers ne sont jamais stockés.',
      },
      {
        title: 'Amélioration continue',
        description:
          "Les contributions externes améliorent la détection et permettent d'ajouter de nouveaux formats.",
      },
      {
        title: 'Communauté active',
        description:
          'Issues, discussions, PRs — le projet évolue grâce aux retours des utilisateurs.',
      },
    ],
  },
  privacyPage: {
    badge: 'Légal',
    title: 'Politique de confidentialité',
    subtitle:
      'DocHunt a été conçu avec la vie privée au cœur. Voici exactement ce qui arrive à vos données.',
    lastUpdated: 'Dernière mise à jour : avril 2025',
    sections: [
      {
        title: 'Les fichiers ne sont jamais stockés',
        content:
          'Les fichiers téléversés pour analyse sont traités en mémoire et supprimés immédiatement. Nous ne les écrivons jamais sur disque, ne les enregistrons pas en base de données et ne les transmettons à aucun tiers.',
      },
      {
        title: 'Aucune donnée personnelle collectée',
        content:
          'DocHunt ne collecte ni nom, ni adresse e-mail, ni aucune information personnelle, sauf si vous créez un compte. Les données de compte (e-mail + mot de passe haché) sont stockées uniquement pour vous authentifier.',
      },
      {
        title: 'Cookies et analytics',
        content:
          "Nous utilisons un cookie de session strictement pour gérer l'état d'authentification. Nous n'utilisons pas de cookies publicitaires, de fingerprinting, ni de traceurs analytics tiers.",
      },
      {
        title: 'Services tiers',
        content:
          "Le micro-service Python qui analyse les fichiers s'exécute sur notre propre infrastructure. Aucun contenu ni métadonnée de fichier n'est envoyé à des API externes.",
      },
      {
        title: 'Conservation des données',
        content:
          "Les données de session sont stockées dans un cookie sur votre appareil et expirent à la fermeture du navigateur. Aucun stockage de session côté serveur n'est utilisé au-delà du flux d'authentification.",
      },
      {
        title: 'Contact',
        content:
          'Pour toute question relative à la vie privée, contactez-nous à privacy@dochunt.info ou ouvrez une issue sur notre dépôt GitHub.',
      },
    ],
  },
  termsPage: {
    badge: 'Légal',
    title: "Conditions générales d'utilisation",
    subtitle: 'Des règles simples et équitables pour utiliser DocHunt.',
    lastUpdated: 'Dernière mise à jour : avril 2025',
    sections: [
      {
        title: 'Acceptation',
        content:
          "En utilisant DocHunt, vous acceptez les présentes conditions. Si vous n'êtes pas d'accord avec l'une d'entre elles, veuillez ne pas utiliser le service.",
      },
      {
        title: 'Description du service',
        content:
          "DocHunt est un outil d'analyse de métadonnées qui extrait les informations intégrées dans les documents. Il est proposé gratuitement pendant la phase bêta ouverte. Nous nous réservons le droit de modifier, suspendre ou arrêter le service à tout moment.",
      },
      {
        title: 'Utilisation acceptable',
        content:
          "Vous ne pouvez téléverser que des fichiers vous appartenant ou dont vous êtes autorisé à demander l'analyse. Il est strictement interdit d'utiliser DocHunt pour traiter des fichiers appartenant à des tiers sans leur consentement explicite.",
      },
      {
        title: 'Propriété intellectuelle',
        content:
          'DocHunt est un logiciel open source publié sous licence MIT. Le code source est disponible sur GitHub. Vous êtes libre de le forker, modifier et redistribuer sous la même licence. Le nom et le logo DocHunt restent la propriété des mainteneurs du projet.',
      },
      {
        title: 'Exclusion de garanties',
        content:
          "DocHunt est fourni « en l'état », sans garantie d'aucune sorte. Nous ne garantissons pas que le service sera ininterrompu, exempt d'erreurs, ni que les résultats d'analyse seront complets et précis.",
      },
      {
        title: 'Limitation de responsabilité',
        content:
          "Dans la mesure permise par la loi, DocHunt et ses contributeurs ne sauraient être tenus responsables des dommages directs, indirects, accessoires ou consécutifs découlant de l'utilisation du service.",
      },
      {
        title: 'Modifications des conditions',
        content:
          "Nous pouvons mettre à jour ces conditions à tout moment. La poursuite de l'utilisation de DocHunt après publication d'une modification vaut acceptation des conditions révisées.",
      },
      {
        title: 'Contact',
        content:
          'Des questions sur ces conditions ? Écrivez-nous à legal@sentrak.info ou ouvrez une discussion sur GitHub.',
      },
    ],
  },
  seo: {
    home: {
      title: 'DocHunt',
      description:
        'Analysez vos PDFs et images pour extraire métadonnées, auteur, coordonnées GPS et plus. Gratuit, instantané, respectueux de votre vie privée.',
    },
    demo: {
      title: 'Analyser un fichier · DocHunt',
      description:
        "Déposez un PDF ou une image et découvrez instantanément les métadonnées qu'il expose. Sans inscription.",
    },
    faq: {
      title: 'FAQ · DocHunt',
      description:
        "Tout ce que vous devez savoir sur DocHunt : confidentialité, formats supportés et fonctionnement de l'analyse.",
    },
    community: {
      title: 'Communauté · DocHunt',
      description:
        'DocHunt est open source. Signalez des bugs, proposez des fonctionnalités et contribuez sur GitHub.',
    },
    privacy: {
      title: 'Politique de confidentialité · DocHunt',
      description:
        "Découvrez comment DocHunt traite vos données. Les fichiers ne sont jamais stockés et aucune donnée personnelle n'est collectée.",
    },
    terms: {
      title: "Conditions d'utilisation · DocHunt",
      description: 'Les règles simples et équitables pour utiliser DocHunt.',
    },
  },
  backToTop: 'Haut de page',
}

export default fr
