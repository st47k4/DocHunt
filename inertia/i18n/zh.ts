import type { Translations } from './types'

const zh: Translations = {
  nav: {
    features: '功能',
    howItWorks: '工作原理',
    faq: '常见问题',
    analyze: '分析文件',
    community: '社区',
    issues: 'Issues',
    pullRequests: 'Pull Requests',
  },
  hero: {
    badge: '公开测试版 — 免费开始',
    titleStart: '追踪',
    titleHighlight: '隐藏数据',
    titleEnd: '在你的文件中。',
    subtitle: '元数据、作者、GPS位置、编辑历史……DocHunt揭示你的文档在不知情的情况下所暴露的一切。',
    ctaPrimary: '开始分析',
    ctaSecondary: '工作原理',
    stats: { metadata: '元数据', format: '当前格式', clientSide: '客户端', stored: '已存储数据' },
  },
  features: {
    tag: '功能',
    title: '隐藏在文件中的一切。',
    subtitle: 'DocHunt深度分析每个文件，提取你从未想到存在的敏感信息。',
    items: [
      { title: '作者身份', description: '全名、组织、使用的软件。一切能识别文档创建者的信息。' },
      { title: '地理定位', description: '嵌入图像和文档中的GPS坐标。准确了解文件的创建地点。' },
      { title: '完整历史', description: '创建、修改和最后打印日期。追踪文档的完整时间线。' },
      { title: '安全级别', description: '加密、权限、访问限制。评估文件的保护级别。' },
      { title: '链接与资源', description: '嵌入的URL、字体、图像、附件。发现所有隐藏的依赖项。' },
      { title: '风险评分', description: '对文件中个人数据暴露程度的综合评估。' },
    ],
  },
  howItWorks: {
    tag: '流程',
    title: '简单。快速。私密。',
    subtitle: '三步揭示任何文件中的敏感数据。',
    steps: [
      { title: '上传文件', description: '拖放或选择PDF文件。无需账号或注册。' },
      { title: '即时分析', description: 'DocHunt在几秒内扫描元数据和嵌入数据。' },
      { title: '详细报告', description: '包含风险评分和数据保护建议的完整报告。' },
    ],
  },
  demo: {
    tag: '试用',
    title: '亲自体验。',
    subtitle: '上传文件，立即发现它所暴露的信息。',
    upload: { title: '将文件拖到此处', subtitle: '或点击浏览', pdfOnly: '仅限PDF · 最大20 MB', dragging: '释放以分析' },
    result: { status: '已分析', sensitiveCount: '检测到4个敏感项', export: '导出', clean: '清除', loading: '分析中…', errorTitle: '分析失败', riskScore: '风险评分', newAnalysis: '新的分析', textContent: '文本内容', noText: '未检测到文本 — 扫描版PDF（OCR即将推出）', textTruncated: '截断至10,000字符' },
  },
  formats: {
    tag: '兼容性',
    title: '支持的格式',
    subtitle: '从PDF开始——更多格式即将推出。',
    soon: '即将推出',
    items: [
      { label: 'PDF文档', description: '元数据、作者、XMP、链接' },
      { label: 'Word文档', description: '属性、注释、修订' },
      { label: '图像', description: 'EXIF、GPS、相机信息' },
      { label: 'Excel表格', description: '隐藏工作表、宏、作者' },
    ],
  },
  faq: {
    tag: '常见问题',
    title: '常见问题解答',
    items: [
      { question: '我的文件会被存储吗？', answer: '不会。分析是临时的——处理后不会保留任何文件。' },
      {
        question: '真的免费吗？',
        answer: '是的，DocHunt在测试期间免费。计划推出具有高级功能的专业版。',
      },
      { question: '支持哪些格式？', answer: '目前支持PDF。DOCX、图像（EXIF）和XLSX即将推出。' },
      { question: '什么算敏感数据？', answer: '任何能识别作者、揭示创建地点或损害保密性的信息。' },
      { question: '我可以清理文件吗？', answer: '元数据清理功能正在开发中，即将推出。' },
      {
        question: '技术栈是什么？',
        answer: 'AdonisJS 6、TypeScript、Inertia.js配React——现代且高性能。',
      },
    ],
  },
  cta: {
    title: '准备好',
    highlight: '探索',
    subtitle: '立即发现你的文档透露了哪些关于你的信息。',
    button: '分析我的第一个文件',
  },
  footer: {
    description: '揭示文件中的隐藏数据。开源、快速、注重隐私。',
    columns: {
      product: { title: '产品', links: ['功能', '演示', '格式', '更新日志'] },
      resources: { title: '资源', links: ['文档', 'API', 'GitHub'] },
      legal: { title: '法律', links: ['隐私', '条款', '联系我们'] },
    },
    builtWith: '基于AdonisJS、TypeScript和Inertia.js构建',
  },
  communityPage: {
    badge: '开源',
    title: '共同',
    highlight: '构建。',
    subtitle: 'DocHunt 是一个开源项目。加入社区：报告错误、建议功能、贡献代码。',
    ctaGithub: '在 GitHub 上查看',
    ctaIssue: '报告错误',
    howTitle: '如何贡献？',
    howSubtitle: '三种简单的参与方式。',
    cards: [
      { title: '报告错误', description: '发现问题了吗？在 GitHub 上提交 issue，并提供尽可能多的细节。', cta: '提交 issue' },
      { title: '建议功能', description: '有什么缺失的功能吗？在 issue 中描述它，社区会讨论。', cta: '提出建议' },
      { title: '提交代码', description: 'Fork 仓库，创建分支并提交 Pull Request。欢迎所有贡献。', cta: '查看开放的 PR' },
    ],
    stackTitle: '技术栈',
    stackSubtitle: '驱动 DocHunt 的技术。',
    openTitle: '为什么开源？',
    openSubtitle: '透明、信任与协作。',
    openItems: [
      { title: '完全透明', description: '审查每一行代码，亲自验证您的文件从不被存储。' },
      { title: '持续改进', description: '外部贡献提升检测精度并支持更多文件格式。' },
      { title: '活跃社区', description: 'Issues、讨论、PR — 项目通过用户反馈不断进化。' },
    ],
  },
  backToTop: '返回顶部',
}

export default zh
