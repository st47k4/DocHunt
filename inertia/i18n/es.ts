import type { Translations } from './types'

const es: Translations = {
  nav: {
    features: 'Funcionalidades',
    howItWorks: 'Cómo funciona',
    faq: 'FAQ',
    analyze: 'Analizar un archivo',
    community: 'Comunidad',
    issues: 'Issues',
    pullRequests: 'Pull Requests',
  },
  hero: {
    badge: 'Beta abierta — Empieza gratis',
    titleStart: 'Rastrea los',
    titleHighlight: 'datos ocultos',
    titleEnd: 'de tus archivos.',
    subtitle:
      'Metadatos, autor, geolocalización, historial de cambios… DocHunt revela todo lo que tus documentos exponen sin que lo sepas.',
    ctaPrimary: 'Iniciar análisis',
    ctaSecondary: 'Cómo funciona',
    stats: {
      metadata: 'Metadatos',
      format: 'Formato actual',
      clientSide: 'Lado cliente',
      stored: 'Datos guardados',
    },
  },
  features: {
    tag: 'Funcionalidades',
    title: 'Todo lo que se esconde en tus archivos.',
    subtitle:
      'DocHunt analiza en profundidad cada archivo para extraer la información sensible que jamás sospechaste.',
    items: [
      {
        title: 'Identidad del autor',
        description:
          'Nombre completo, organización, software utilizado. Todo lo que identifica al creador del documento.',
      },
      {
        title: 'Geolocalización',
        description:
          'Coordenadas GPS integradas en imágenes y documentos. Descubre exactamente dónde se creó el archivo.',
      },
      {
        title: 'Historial completo',
        description:
          'Fechas de creación, modificación y última impresión. Reconstruye la cronología completa del documento.',
      },
      {
        title: 'Nivel de seguridad',
        description:
          'Cifrado, permisos, restricciones de acceso. Evalúa el nivel de protección de tus archivos.',
      },
      {
        title: 'Enlaces y recursos',
        description:
          'URLs embebidas, fuentes, imágenes, archivos adjuntos. Descubre todas las dependencias ocultas.',
      },
      {
        title: 'Puntuación de riesgo',
        description:
          'Evaluación global del nivel de exposición de tus datos personales en el archivo.',
      },
    ],
  },
  howItWorks: {
    tag: 'Proceso',
    title: 'Simple. Rápido. Privado.',
    subtitle: 'Tres pasos para revelar los datos sensibles de cualquier archivo.',
    steps: [
      {
        title: 'Sube tu archivo',
        description: 'Arrastra y suelta o selecciona un PDF. Sin cuenta ni registro.',
      },
      {
        title: 'Análisis instantáneo',
        description: 'DocHunt escanea los metadatos y datos embebidos en segundos.',
      },
      {
        title: 'Informe detallado',
        description:
          'Informe completo con puntuación de riesgo y recomendaciones para proteger tus datos.',
      },
    ],
  },
  demo: {
    tag: 'Pruébalo',
    title: 'Compruébalo tú mismo.',
    subtitle: 'Sube un archivo y descubre al instante la información que expone.',
    tabs: { pdf: 'PDF', image: 'Imagen' },
    upload: {
      title: 'Arrastra tu archivo aquí',
      subtitle: 'o haz clic para seleccionar',
      pdfOnly: 'Solo PDF · máx 20 MB',
      dragging: 'Suelta para analizar',
    },
    imageUpload: {
      title: 'Arrastra tu imagen aquí',
      subtitle: 'o haz clic para seleccionar',
      formats: 'JPEG, PNG, WebP, GIF, ICO · máx 20 MB',
      dragging: 'Suelta para analizar',
    },
    result: {
      status: 'Analizado',
      sensitiveCount: '4 datos sensibles detectados',
      export: 'Exportar',
      clean: 'Limpiar',
      loading: 'Analizando…',
      errorTitle: 'Error de análisis',
      riskScore: 'Puntuación de riesgo',
      newAnalysis: 'Nuevo análisis',
      textContent: 'Contenido textual',
      noText: 'Sin texto detectado — PDF escaneado (OCR próximamente)',
      textTruncated: 'Truncado a 10.000 caracteres',
    },
  },
  formats: {
    tag: 'Compatibilidad',
    title: 'Formatos soportados',
    subtitle: 'Empieza con PDFs — más formatos próximamente.',
    soon: 'Pronto',
    items: [
      { label: 'Documentos PDF', description: 'Metadatos, autor, XMP, enlaces' },
      { label: 'Documentos Word', description: 'Propiedades, comentarios, revisiones' },
      { label: 'Imágenes', description: 'EXIF, GPS, cámara' },
      { label: 'Hojas de cálculo Excel', description: 'Hojas ocultas, macros, autor' },
    ],
  },
  faq: {
    tag: 'FAQ',
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Se guardan mis archivos?',
        answer: 'No. El análisis es efímero — ningún archivo se conserva tras el procesamiento.',
      },
      {
        question: '¿Es realmente gratis?',
        answer:
          'Sí, DocHunt es gratuito durante la beta. Se planea una versión Pro con funciones avanzadas.',
      },
      {
        question: '¿Qué formatos están soportados?',
        answer: 'Actualmente PDF. DOCX, imágenes (EXIF) y XLSX llegarán pronto.',
      },
      {
        question: '¿Qué es un dato sensible?',
        answer:
          'Cualquier información que identifique al autor, revele la ubicación de creación o comprometa la confidencialidad.',
      },
      {
        question: '¿Puedo limpiar mis archivos?',
        answer:
          'La función de limpieza de metadatos está en desarrollo y estará disponible pronto.',
      },
      {
        question: '¿Cuál es la tecnología utilizada?',
        answer: 'AdonisJS 6, TypeScript, Inertia.js con React — moderno y eficiente.',
      },
    ],
  },
  cta: {
    title: 'Listo para',
    highlight: 'cazar',
    subtitle: 'Descubre ahora mismo lo que tus documentos revelan sobre ti.',
    button: 'Analizar mi primer archivo',
  },
  footer: {
    description:
      'Revela los datos ocultos de tus archivos. Open source, rápido y respetuoso con tu privacidad.',
    columns: {
      product: { title: 'Producto', links: ['Funcionalidades', 'Demo', 'Formatos', 'Changelog'] },
      resources: { title: 'Recursos', links: ['Documentación', 'API', 'GitHub'] },
      legal: { title: 'Legal', links: ['Privacidad', 'Términos', 'Contacto'] },
    },
    builtWith: 'Una herramienta de',
  },
  communityPage: {
    badge: 'Open Source',
    title: 'Construido',
    highlight: 'juntos.',
    subtitle:
      'DocHunt es un proyecto open source. Únete a la comunidad: reporta bugs, sugiere funcionalidades, contribuye con código.',
    ctaGithub: 'Ver en GitHub',
    ctaIssue: 'Reportar un bug',
    howTitle: '¿Cómo contribuir?',
    howSubtitle: 'Tres formas sencillas de participar en el proyecto.',
    cards: [
      {
        title: 'Reportar un bug',
        description:
          '¿Encontraste un problema? Abre una issue en GitHub con todos los detalles posibles.',
        cta: 'Abrir una issue',
      },
      {
        title: 'Sugerir una idea',
        description: '¿Falta algo? Descríbelo en una issue y la comunidad lo discutirá.',
        cta: 'Hacer una sugerencia',
      },
      {
        title: 'Enviar código',
        description:
          'Haz un fork, crea una rama y abre un Pull Request. Todas las contribuciones son bienvenidas.',
        cta: 'Ver PRs abiertas',
      },
    ],
    stackTitle: 'Stack técnico',
    stackSubtitle: 'Las tecnologías que hacen funcionar DocHunt.',
    openTitle: '¿Por qué open source?',
    openSubtitle: 'Transparencia, confianza y colaboración.',
    openItems: [
      {
        title: 'Transparencia total',
        description: 'Audita cada línea de código y verifica que tus archivos nunca se almacenan.',
      },
      {
        title: 'Mejora continua',
        description: 'Las contribuciones externas mejoran la detección y añaden nuevos formatos.',
      },
      {
        title: 'Comunidad activa',
        description: 'Issues, debates, PRs — el proyecto evoluciona gracias a los usuarios.',
      },
    ],
  },
  privacyPage: {
    badge: 'Legal',
    title: 'Política de privacidad',
    subtitle:
      'DocHunt fue creado con la privacidad en su núcleo. Aquí está exactamente lo que pasa con tus datos.',
    lastUpdated: 'Última actualización: abril 2025',
    sections: [
      {
        title: 'Los archivos nunca se almacenan',
        content:
          'Los archivos subidos se procesan en memoria y se descartan inmediatamente. Nunca los escribimos en disco, los guardamos en una base de datos ni los transmitimos a terceros.',
      },
      {
        title: 'No se recopilan datos personales',
        content:
          'DocHunt no recopila nombres, correos ni información personal, salvo que crees una cuenta. Los datos de cuenta (correo + contraseña hasheada) se almacenan únicamente para autenticarte.',
      },
      {
        title: 'Cookies y analítica',
        content:
          'Usamos una cookie de sesión estrictamente para gestionar el estado de autenticación. No utilizamos cookies publicitarias, fingerprinting ni rastreadores de terceros.',
      },
      {
        title: 'Servicios de terceros',
        content:
          'El micro-servicio Python que analiza archivos se ejecuta en nuestra propia infraestructura. Ningún contenido ni metadato de archivo se envía a APIs externas.',
      },
      {
        title: 'Retención de datos',
        content:
          'Los datos de sesión se almacenan en una cookie en tu dispositivo y expiran al cerrar el navegador. No se utiliza almacenamiento de sesión en el servidor más allá del flujo de autenticación.',
      },
      {
        title: 'Contacto',
        content:
          'Para cualquier pregunta sobre privacidad, escríbenos a privacy@dochunt.info o abre un issue en GitHub.',
      },
    ],
  },
  termsPage: {
    badge: 'Legal',
    title: 'Términos de servicio',
    subtitle: 'Reglas simples y justas para usar DocHunt.',
    lastUpdated: 'Última actualización: abril 2025',
    sections: [
      {
        title: 'Aceptación',
        content:
          'Al usar DocHunt aceptas estos Términos de Servicio. Si no estás de acuerdo, por favor no uses el servicio.',
      },
      {
        title: 'Descripción del servicio',
        content:
          'DocHunt es una herramienta de análisis de metadatos que se ofrece de forma gratuita durante la beta abierta. Nos reservamos el derecho de modificar o interrumpir el servicio en cualquier momento.',
      },
      {
        title: 'Uso aceptable',
        content:
          'Solo puedes subir archivos que te pertenezcan o que estés autorizado a analizar. Está prohibido procesar archivos de terceros sin su consentimiento explícito.',
      },
      {
        title: 'Propiedad intelectual',
        content:
          'DocHunt es open source bajo licencia MIT. El código está en GitHub. Puedes hacer fork, modificarlo y redistribuirlo bajo la misma licencia. El nombre y el logo pertenecen a los mantenedores del proyecto.',
      },
      {
        title: 'Exclusión de garantías',
        content:
          'DocHunt se proporciona "tal cual", sin garantía de ningún tipo. No garantizamos que el servicio sea ininterrumpido ni que los resultados del análisis sean completos y precisos.',
      },
      {
        title: 'Limitación de responsabilidad',
        content:
          'En la medida permitida por la ley, DocHunt y sus colaboradores no serán responsables de ningún daño derivado del uso del servicio.',
      },
      {
        title: 'Cambios en los términos',
        content:
          'Podemos actualizar estos términos en cualquier momento. El uso continuado del servicio tras un cambio constituye la aceptación de los nuevos términos.',
      },
      {
        title: 'Contacto',
        content: '¿Preguntas? Escríbenos a legal@sentrak.info o abre una discusión en GitHub.',
      },
    ],
  },
  liveStats: {
    analyses: 'Análisis realizados',
    totalData: 'Datos analizados',
  },
  seo: {
    home: {
      title: 'DocHunt',
      description:
        'Analiza PDFs e imágenes para extraer metadatos, identidad del autor, ubicación GPS y más. Gratuito, instantáneo, respetuoso con tu privacidad.',
    },
    demo: {
      title: 'Analizar un archivo · DocHunt',
      description:
        'Sube un PDF o imagen y descubre al instante los metadatos que expone. Sin registro.',
    },
    faq: {
      title: 'FAQ · DocHunt',
      description:
        'Todo lo que necesitas saber sobre DocHunt: privacidad, formatos compatibles y cómo funciona el análisis.',
    },
    community: {
      title: 'Comunidad · DocHunt',
      description:
        'DocHunt es de código abierto. Reporta errores, sugiere funciones y contribuye en GitHub.',
    },
    privacy: {
      title: 'Política de privacidad · DocHunt',
      description:
        'Descubre cómo DocHunt gestiona tus datos. Los archivos nunca se almacenan y no se recopilan datos personales.',
    },
    terms: {
      title: 'Términos de servicio · DocHunt',
      description: 'Reglas simples y justas para usar DocHunt.',
    },
  },
  backToTop: 'Volver arriba',
}

export default es
