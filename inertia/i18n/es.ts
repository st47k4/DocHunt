import type { Translations } from './types'

const es: Translations = {
  nav: {
    features: 'Funcionalidades',
    howItWorks: 'Cómo funciona',
    demo: 'Demo',
    faq: 'FAQ',
    analyze: 'Analizar un archivo',
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
    upload: { title: 'Arrastra tu archivo aquí', subtitle: 'o haz clic para seleccionar', pdfOnly: 'Solo PDF · máx 20 MB', dragging: 'Suelta para analizar' },
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
    builtWith: 'Construido con AdonisJS, TypeScript & Inertia.js',
  },
  backToTop: 'Volver arriba',
}

export default es
