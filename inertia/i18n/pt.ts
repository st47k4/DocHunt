import type { Translations } from './types'

const pt: Translations = {
  nav: {
    features: 'Funcionalidades',
    howItWorks: 'Como funciona',
    faq: 'FAQ',
    analyze: 'Analisar um arquivo',
    community: 'Comunidade',
    issues: 'Issues',
    pullRequests: 'Pull Requests',
  },
  hero: {
    badge: 'Beta aberta — Comece gratuitamente',
    titleStart: 'Rastreie os',
    titleHighlight: 'dados ocultos',
    titleEnd: 'nos seus arquivos.',
    subtitle:
      'Metadados, autor, geolocalização, histórico de edições… DocHunt revela tudo o que seus documentos expõem sem que você saiba.',
    ctaPrimary: 'Iniciar análise',
    ctaSecondary: 'Como funciona',
    stats: {
      metadata: 'Metadados',
      format: 'Formato atual',
      clientSide: 'Lado cliente',
      stored: 'Dados armazenados',
    },
  },
  features: {
    tag: 'Funcionalidades',
    title: 'Tudo que se esconde nos seus arquivos.',
    subtitle:
      'DocHunt analisa profundamente cada arquivo para extrair informações sensíveis que você nunca imaginou existirem.',
    items: [
      {
        title: 'Identidade do autor',
        description:
          'Nome completo, organização, software utilizado. Tudo que identifica o criador do documento.',
      },
      {
        title: 'Geolocalização',
        description:
          'Coordenadas GPS em imagens e documentos. Descubra exatamente onde um arquivo foi criado.',
      },
      {
        title: 'Histórico completo',
        description:
          'Datas de criação, modificação e impressão. Reconstrua a cronologia completa do documento.',
      },
      {
        title: 'Nível de segurança',
        description:
          'Criptografia, permissões, restrições de acesso. Avalie o nível de proteção dos seus arquivos.',
      },
      {
        title: 'Links e recursos',
        description:
          'URLs embutidas, fontes, imagens, arquivos anexados. Descubra todas as dependências ocultas.',
      },
      {
        title: 'Pontuação de risco',
        description: 'Avaliação global do nível de exposição dos seus dados pessoais no arquivo.',
      },
    ],
  },
  howItWorks: {
    tag: 'Processo',
    title: 'Simples. Rápido. Privado.',
    subtitle: 'Três etapas para revelar os dados sensíveis de qualquer arquivo.',
    steps: [
      {
        title: 'Envie seu arquivo',
        description: 'Arraste e solte ou selecione um PDF. Sem conta ou cadastro.',
      },
      {
        title: 'Análise instantânea',
        description: 'DocHunt escaneia metadados e dados embutidos em segundos.',
      },
      {
        title: 'Relatório detalhado',
        description:
          'Relatório completo com pontuação de risco e recomendações para proteger seus dados.',
      },
    ],
  },
  demo: {
    tag: 'Experimente',
    title: 'Veja por si mesmo.',
    subtitle: 'Faça upload de um arquivo e descubra imediatamente as informações que ele expõe.',
    upload: { title: 'Arraste seu arquivo aqui', subtitle: 'ou clique para selecionar', pdfOnly: 'Apenas PDF · máx 20 MB', dragging: 'Solte para analisar' },
    result: {
      status: 'Analisado',
      sensitiveCount: '4 dados sensíveis detectados',
      export: 'Exportar',
      clean: 'Limpar',
      loading: 'A analisar…',
      errorTitle: 'Falha na análise',
      riskScore: 'Pontuação de risco',
      newAnalysis: 'Nova análise',
      textContent: 'Conteúdo textual',
      noText: 'Nenhum texto detectado — PDF digitalizado (OCR em breve)',
      textTruncated: 'Truncado a 10.000 caracteres',
    },
  },
  formats: {
    tag: 'Compatibilidade',
    title: 'Formatos suportados',
    subtitle: 'Comece com PDFs — mais formatos em breve.',
    soon: 'Em breve',
    items: [
      { label: 'Documentos PDF', description: 'Metadados, autor, XMP, links' },
      { label: 'Documentos Word', description: 'Propriedades, comentários, revisões' },
      { label: 'Imagens', description: 'EXIF, GPS, câmera' },
      { label: 'Planilhas Excel', description: 'Folhas ocultas, macros, autor' },
    ],
  },
  faq: {
    tag: 'FAQ',
    title: 'Perguntas frequentes',
    items: [
      {
        question: 'Meus arquivos são armazenados?',
        answer: 'Não. A análise é efêmera — nenhum arquivo é mantido após o processamento.',
      },
      {
        question: 'É realmente gratuito?',
        answer:
          'Sim, DocHunt é gratuito durante a beta. Uma versão Pro com recursos avançados está planejada.',
      },
      {
        question: 'Quais formatos são suportados?',
        answer: 'Atualmente PDF. DOCX, imagens (EXIF) e XLSX chegam em breve.',
      },
      {
        question: 'O que são dados sensíveis?',
        answer:
          'Qualquer informação que identifique o autor, revele o local de criação ou comprometa a confidencialidade.',
      },
      {
        question: 'Posso limpar meus arquivos?',
        answer:
          'A função de limpeza de metadados está em desenvolvimento e estará disponível em breve.',
      },
      {
        question: 'Qual é a stack técnica?',
        answer: 'AdonisJS 6, TypeScript, Inertia.js com React — moderno e performático.',
      },
    ],
  },
  cta: {
    title: 'Pronto para',
    highlight: 'caçar',
    subtitle: 'Descubra agora o que seus documentos revelam sobre você.',
    button: 'Analisar meu primeiro arquivo',
  },
  footer: {
    description:
      'Revele os dados ocultos dos seus arquivos. Open source, rápido e respeitoso com sua privacidade.',
    columns: {
      product: { title: 'Produto', links: ['Funcionalidades', 'Demo', 'Formatos', 'Changelog'] },
      resources: { title: 'Recursos', links: ['Documentação', 'API', 'GitHub'] },
      legal: { title: 'Legal', links: ['Privacidade', 'Termos', 'Contato'] },
    },
    builtWith: 'Construído com AdonisJS, TypeScript & Inertia.js',
  },
  communityPage: {
    badge: 'Open Source',
    title: 'Construído',
    highlight: 'juntos.',
    subtitle: 'DocHunt é um projeto open source. Junte-se à comunidade: reporte bugs, sugira funcionalidades, contribua com código.',
    ctaGithub: 'Ver no GitHub',
    ctaIssue: 'Reportar um bug',
    howTitle: 'Como contribuir?',
    howSubtitle: 'Três formas simples de participar do projeto.',
    cards: [
      { title: 'Reportar um bug', description: 'Encontrou um problema? Abra uma issue no GitHub com o máximo de detalhes possível.', cta: 'Abrir uma issue' },
      { title: 'Sugerir uma ideia', description: 'Algo está faltando? Descreva em uma issue e a comunidade irá discutir.', cta: 'Fazer uma sugestão' },
      { title: 'Enviar código', description: 'Faça um fork, crie uma branch e abra um Pull Request. Todas as contribuições são bem-vindas.', cta: 'Ver PRs abertas' },
    ],
    stackTitle: 'Stack técnico',
    stackSubtitle: 'As tecnologias que fazem o DocHunt funcionar.',
    openTitle: 'Por que open source?',
    openSubtitle: 'Transparência, confiança e colaboração.',
    openItems: [
      { title: 'Transparência total', description: 'Audite cada linha de código e verifique que seus arquivos nunca são armazenados.' },
      { title: 'Melhoria contínua', description: 'Contribuições externas melhoram a detecção e adicionam novos formatos de arquivo.' },
      { title: 'Comunidade ativa', description: 'Issues, discussões, PRs — o projeto evolui com o feedback dos usuários.' },
    ],
  },
  backToTop: 'Voltar ao topo',
}

export default pt
