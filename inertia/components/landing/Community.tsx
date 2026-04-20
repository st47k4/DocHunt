import { motion } from 'motion/react'
import {
  GitBranch,
  CircleDot,
  GitPullRequest,
  Eye,
  GitFork,
  Layers,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useT } from '~/i18n/context'

const GITHUB_REPO = 'https://github.com/Sentrak/DocHunt'
const GITHUB_ISSUES = 'https://github.com/Sentrak/DocHunt/issues'
const GITHUB_PRS = 'https://github.com/Sentrak/DocHunt/pulls'
const GITHUB_FORK = 'https://github.com/Sentrak/DocHunt/fork'

const STACK = [
  {
    name: 'AdonisJS 6',
    role: 'Backend / API',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    name: 'TypeScript',
    role: 'Langage',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    name: 'React 19',
    role: 'Frontend',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    name: 'Inertia.js',
    role: 'SSR/CSR hybride',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    name: 'TailwindCSS 4',
    role: 'Styles',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    name: 'FastAPI',
    role: 'Micro-service Python',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    name: 'pikepdf',
    role: 'Analyse PDF',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    name: 'spaCy',
    role: 'NER / NLP',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    name: 'Docker',
    role: 'Infrastructure',
    color: 'text-blue-300',
    bg: 'bg-blue-400/10 border-blue-400/20',
  },
  {
    name: 'SQLite',
    role: 'Base de données',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
]

const CARD_ICONS = [CircleDot, GitPullRequest, GitFork]
const CARD_LINKS = [GITHUB_ISSUES, GITHUB_PRS, GITHUB_FORK]
const CARD_COLORS = ['text-green-400', 'text-purple-400', 'text-green-400']

const OPEN_ICONS = [Eye, Layers, Users]

export default function Community() {
  const t = useT()
  const c = t.communityPage

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-6">
              {c.badge}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              {c.title} <span className="text-amber-brand">{c.highlight}</span>
            </h1>
            <p className="text-dim text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{c.subtitle}</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-brand hover:bg-green-400 text-bg-dark rounded-full font-semibold transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:-translate-y-px"
              >
                <GitBranch className="w-5 h-5" />
                {c.ctaGithub}
              </a>
              <a
                href={GITHUB_ISSUES}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-edge hover:border-amber-brand text-dim hover:text-cream rounded-full font-semibold transition-all"
              >
                <CircleDot className="w-5 h-5" />
                {c.ctaIssue}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Comment contribuer ── */}
      <section className="py-24 px-6 bg-bg-secondary border-t border-b border-edge">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{c.howTitle}</h2>
            <p className="text-dim text-lg">{c.howSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {c.cards.map((card, i) => {
              const Icon = CARD_ICONS[i]
              return (
                <motion.a
                  key={i}
                  href={CARD_LINKS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-bg-card border border-edge hover:border-amber-brand/50 rounded-[16px] p-7 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-bg-secondary border border-edge flex items-center justify-center ${CARD_COLORS[i]}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream mb-2">{card.title}</h3>
                    <p className="text-dim text-sm leading-relaxed">{card.description}</p>
                  </div>
                  <span
                    className={`text-sm font-medium mt-auto group-hover:underline ${CARD_COLORS[i]}`}
                  >
                    {card.cta} →
                  </span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stack technique ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{c.stackTitle}</h2>
            <p className="text-dim text-lg">{c.stackSubtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {STACK.map((tech) => (
              <div
                key={tech.name}
                className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-sm font-medium ${tech.bg}`}
              >
                <span className={`w-2 h-2 rounded-full bg-current ${tech.color}`} />
                <span className="text-cream">{tech.name}</span>
                <span className="text-mute text-xs">{tech.role}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pourquoi open source ── */}
      <section className="py-24 px-6 bg-bg-secondary border-t border-b border-edge">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{c.openTitle}</h2>
            <p className="text-dim text-lg">{c.openSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {c.openItems.map((item, i) => {
              const Icon = OPEN_ICONS[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-bg-card border border-edge rounded-[16px] p-7"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-amber-brand mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-cream mb-2">{item.title}</h3>
                  <p className="text-dim text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-amber-brand mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">DocHunt × GitHub</h2>
            <p className="text-dim mb-8">
              Le code source complet est disponible sur GitHub. Fork, étoile, contribue.
            </p>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-amber-brand hover:bg-green-400 text-bg-dark rounded-full font-bold text-lg transition-all hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] hover:-translate-y-px"
            >
              <GitBranch className="w-5 h-5" />
              Sentrak/DocHunt
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
