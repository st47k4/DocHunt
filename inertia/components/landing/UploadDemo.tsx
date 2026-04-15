import { useCallback, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { AlertCircle, Download, FileUp, Loader2, ShieldAlert, ShieldCheck, TriangleAlert } from 'lucide-react'
import { useT } from '~/i18n/context'

// ── Types ────────────────────────────────────────────────────────────────────

interface MetadataField {
  key: string
  label: string
  value: string
  sensitive: boolean
}

interface SensitiveMatch {
  type: string
  label: string
  value: string
}

interface AnalysisResult {
  filename: string
  file_size: number
  page_count: number
  pdf_version: string
  encrypted: boolean
  risk_score: number
  fields: MetadataField[]
  warnings: string[]
  has_javascript: boolean
  has_embedded_files: boolean
  embedded_urls: string[]
  sensitive_matches: SensitiveMatch[]
}

type State =
  | { status: 'idle' }
  | { status: 'dragging' }
  | { status: 'uploading' }
  | { status: 'success'; result: AnalysisResult }
  | { status: 'error'; message: string }

// ── Helpers ──────────────────────────────────────────────────────────────────

const MAX_SIZE = 20 * 1024 * 1024 // 20 Mo

function getCsrfToken(): string {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function riskColor(score: number): string {
  if (score < 30) return 'text-green-400'
  if (score < 60) return 'text-amber-brand'
  return 'text-red-500'
}

function riskBg(score: number): string {
  if (score < 30) return 'bg-green-500/10 border-green-500/30 text-green-400'
  if (score < 60) return 'bg-amber-500/10 border-amber-500/30 text-amber-brand'
  return 'bg-red-500/10 border-red-500/30 text-red-500'
}

// ── Component ────────────────────────────────────────────────────────────────

export default function UploadDemo() {
  const t = useT()
  const [state, setState] = useState<State>({ status: 'idle' })
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounter = useRef(0)

  // ── Upload ────────────────────────────────────────────────────────────────

  const analyze = useCallback(async (file: File) => {
    // Validation côté client (defense in depth)
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setState({ status: 'error', message: 'Seuls les fichiers PDF sont acceptés.' })
      return
    }
    if (file.size > MAX_SIZE) {
      setState({ status: 'error', message: 'Fichier trop volumineux (max 20 Mo).' })
      return
    }

    setState({ status: 'uploading' })

    try {
      const form = new FormData()
      form.append('file', file)

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': getCsrfToken() },
        body: form,
      })

      const json = await res.json()

      if (!res.ok) {
        setState({ status: 'error', message: json.error ?? "Erreur lors de l'analyse." })
        return
      }

      setState({ status: 'success', result: json as AnalysisResult })
    } catch {
      setState({ status: 'error', message: 'Impossible de contacter le service.' })
    }
  }, [])

  // ── Drag & Drop ───────────────────────────────────────────────────────────

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current++
    if (state.status !== 'uploading') setState({ status: 'dragging' })
  }, [state.status])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current--
    if (dragCounter.current === 0) setState({ status: 'idle' })
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current = 0
    const file = e.dataTransfer.files[0]
    if (file) analyze(file)
  }, [analyze])

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) analyze(file)
    e.target.value = ''
  }, [analyze])

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section id="demo" className="py-[120px] bg-bg-secondary border-t border-b border-edge">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-4">{t.demo.tag}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.demo.title}</h2>
          <p className="text-dim text-[17px] max-w-[560px] mx-auto">{t.demo.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          {/* ── Ligne haute : upload + métadonnées ── */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Upload */}
            <div
              onDragEnter={onDragEnter}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => state.status !== 'uploading' && inputRef.current?.click()}
              className={`group rounded-[20px] px-10 py-16 text-center transition-all border-2 border-dashed cursor-pointer select-none ${
                state.status === 'dragging'
                  ? 'border-amber-brand bg-[rgba(245,158,11,0.06)] scale-[1.01]'
                  : state.status === 'uploading'
                    ? 'border-edge bg-bg-card cursor-wait'
                    : 'border-edge bg-bg-card hover:border-amber-brand hover:bg-[rgba(245,158,11,0.02)]'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={onFileChange}
              />

              {state.status === 'uploading' ? (
                <>
                  <Loader2 className="w-12 h-12 text-amber-brand animate-spin mx-auto mb-4" />
                  <p className="text-lg font-semibold">{t.demo.result.loading}</p>
                </>
              ) : state.status === 'success' ? (
                <>
                  <ShieldCheck className="w-12 h-12 text-amber-brand mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-1">{state.result.filename}</p>
                  <p className="text-dim text-sm mb-5">
                    {formatBytes(state.result.file_size)} · {state.result.page_count} pages · PDF {state.result.pdf_version}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setState({ status: 'idle' }) }}
                    className="px-5 py-2 bg-amber-brand hover:bg-amber-400 text-bg-dark rounded-full text-sm font-semibold transition-all cursor-pointer"
                  >
                    {t.demo.result.newAnalysis}
                  </button>
                </>
              ) : state.status === 'error' ? (
                <>
                  <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-red-500 mb-1">{t.demo.result.errorTitle}</p>
                  <p className="text-dim text-sm mb-5">{state.message}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setState({ status: 'idle' }) }}
                    className="px-5 py-2 bg-bg-secondary border border-edge hover:border-edge-hover rounded-full text-sm font-medium text-dim hover:text-cream transition-all cursor-pointer"
                  >
                    {t.demo.result.newAnalysis}
                  </button>
                </>
              ) : (
                <>
                  <FileUp className={`w-12 h-12 mx-auto mb-4 transition-all ${
                    state.status === 'dragging'
                      ? 'text-amber-brand -translate-y-1'
                      : 'text-mute group-hover:text-amber-brand group-hover:-translate-y-1'
                  }`} />
                  <h3 className="text-lg font-semibold mb-2">
                    {state.status === 'dragging' ? t.demo.upload.dragging : t.demo.upload.title}
                  </h3>
                  <p className="text-dim text-sm mb-2">{t.demo.upload.subtitle}</p>
                  <p className="font-mono text-[11px] text-mute">{t.demo.upload.pdfOnly}</p>
                </>
              )}
            </div>

            {/* Métadonnées */}
            <div className="bg-bg-card border border-edge rounded-[14px] overflow-hidden">
              {state.status === 'success' ? (
                <MetaCard result={state.result} t={t} />
              ) : (
                <MockPanel t={t} />
              )}
            </div>
          </div>

          {/* ── Ligne basse : données détectées pleine largeur ── */}
          {state.status === 'success' && <DetectedCard result={state.result} />}
        </motion.div>
      </div>
    </section>
  )
}

// ── Panneau mock (avant analyse) ─────────────────────────────────────────────

const MOCK_ROWS = [
  { label: 'AUTEUR', value: 'Jean-Marc Dupont', sensitive: true },
  { label: 'ORGANISATION', value: 'Acme Corp.', sensitive: true },
  { label: 'LOGICIEL', value: 'Microsoft Word 2021', sensitive: false },
  { label: 'CRÉÉ LE', value: '2024-11-03 09:14:22', sensitive: false },
  { label: 'MODIFIÉ LE', value: '2025-01-18 16:42:07', sensitive: false },
  { label: 'GPS', value: '48.8566°N, 2.3522°E', sensitive: true },
]

function MockPanel({ t }: { t: ReturnType<typeof useT> }) {
  return (
    <>
      <div className="px-5 py-4 flex items-center justify-between border-b border-edge">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">PDF</div>
          <div>
            <div className="text-sm font-semibold">rapport-confidentiel.pdf</div>
            <div className="text-xs text-mute">2.4 MB · 24 pages</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-brand">
          <span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse" />
          {t.demo.result.status}
        </div>
      </div>

      <div>
        {MOCK_ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3 border-b border-edge last:border-b-0 hover:bg-white/[0.02]">
            <span className="font-mono text-[11px] text-mute">{row.label}</span>
            <span className={`text-sm font-medium text-right max-w-[60%] break-all flex items-center gap-1.5 ${row.sensitive ? 'text-red-500' : 'text-blue-400'}`}>
              {row.sensitive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />}
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 py-4 border-t border-edge flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-xs font-semibold text-red-500">
          <AlertCircle className="w-3 h-3" />
          {t.demo.result.sensitiveCount}
        </div>
      </div>
    </>
  )
}

// ── Panneau résultats réels ──────────────────────────────────────────────────

const SENSITIVE_TYPE_COLOR: Record<string, string> = {
  // Identité
  person:   'text-pink-400',
  handle:   'text-fuchsia-400',
  // Contact
  email:    'text-red-400',
  phone:    'text-orange-400',
  // Entreprise
  siret:    'text-amber-400',
  siren:    'text-amber-300',
  tva_fr:   'text-yellow-500',
  // Finances
  iban:     'text-red-500',
  // Réseau
  ip_v4:    'text-purple-400',
  uuid:     'text-violet-400',
  url:      'text-cyan-400',
  // Localisation
  gps_text: 'text-green-400',
  postal_fr:'text-lime-400',
  plate_fr: 'text-teal-400',
  // Documents
  ssn_fr:   'text-rose-600',
  date:     'text-blue-400',
  // NER spaCy
  ner_person: 'text-pink-300',
  ner_loc:    'text-emerald-400',
  ner_org:    'text-sky-400',
}

// ── Export JSON ──────────────────────────────────────────────────────────────

function exportJson(result: AnalysisResult) {
  const payload = {
    export_date: new Date().toISOString(),
    file: {
      name: result.filename,
      size_bytes: result.file_size,
      size_human: formatBytes(result.file_size),
      pages: result.page_count,
      pdf_version: result.pdf_version,
      encrypted: result.encrypted,
    },
    risk_score: result.risk_score,
    flags: {
      has_javascript: result.has_javascript,
      has_embedded_files: result.has_embedded_files,
    },
    warnings: result.warnings,
    metadata: result.fields.map((f) => ({
      key: f.key,
      label: f.label,
      value: f.value,
      sensitive: f.sensitive,
    })),
    embedded_urls: result.embedded_urls,
    sensitive_matches: (result.sensitive_matches ?? []).map((m) => ({
      type: m.type,
      label: m.label,
      value: m.value,
    })),
  }

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dochunt-${result.filename.replace(/\.pdf$/i, '')}-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Carte métadonnées ────────────────────────────────────────────────────────

function MetaCard({ result, t }: { result: AnalysisResult; t: ReturnType<typeof useT> }) {
  const sensitiveMetaCount = result.fields.filter((f) => f.sensitive).length
  return (
    <div className="bg-bg-card border border-edge rounded-[14px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-edge">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">PDF</div>
          <div>
            <div className="text-sm font-semibold truncate max-w-[160px]">{result.filename}</div>
            <div className="text-xs text-mute">
              {formatBytes(result.file_size)} · {result.page_count} pages · v{result.pdf_version}
            </div>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-bold ${riskBg(result.risk_score)}`}>
          {result.risk_score}/100
        </div>
      </div>

      {/* Badges */}
      {(result.encrypted || result.has_javascript || result.has_embedded_files) && (
        <div className="px-5 py-3 flex flex-wrap gap-2 border-b border-edge">
          {result.encrypted && (
            <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-[11px] font-medium text-blue-400">Chiffré</span>
          )}
          {result.has_javascript && (
            <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-[11px] font-medium text-red-400">JavaScript</span>
          )}
          {result.has_embedded_files && (
            <span className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-[11px] font-medium text-orange-400">Fichiers embarqués</span>
          )}
        </div>
      )}

      {/* Champs de métadonnées */}
      <div className="max-h-52 overflow-y-auto">
        {result.fields.length === 0 ? (
          <div className="px-5 py-6 text-center text-dim text-sm">Aucune métadonnée trouvée.</div>
        ) : (
          result.fields.map((field) => (
            <div key={field.key} className="flex items-center justify-between px-5 py-3 border-b border-edge last:border-b-0 hover:bg-white/[0.02]">
              <span className="font-mono text-[11px] text-mute uppercase">{field.label}</span>
              <span className={`text-sm font-medium text-right max-w-[60%] break-all flex items-center gap-1.5 ${field.sensitive ? 'text-red-500' : 'text-blue-400'}`}>
                {field.sensitive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />}
                {field.value}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Avertissements */}
      {result.warnings.length > 0 && (
        <div className="px-5 py-3 border-t border-edge space-y-1.5">
          {result.warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-amber-brand">
              <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 border-t border-edge flex items-center justify-between">
        <div>
          <span className={`text-xs font-bold ${riskColor(result.risk_score)}`}>
            {t.demo.result.riskScore} : {result.risk_score}/100
          </span>
          {sensitiveMetaCount > 0 && (
            <span className="ml-3 text-xs text-mute">
              · {sensitiveMetaCount} champ{sensitiveMetaCount > 1 ? 's' : ''} sensible{sensitiveMetaCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button
          onClick={() => exportJson(result)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary border border-edge hover:border-amber-brand hover:text-amber-brand rounded-lg text-xs font-medium text-mute transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          Exporter JSON
        </button>
      </div>
    </div>
  )
}

// ── Carte données détectées ──────────────────────────────────────────────────

// Regroupe les matches par catégorie pour l'affichage en colonnes
const TYPE_GROUP: Record<string, string> = {
  person: 'Identité', ner_person: 'Identité', handle: 'Identité',
  email: 'Contact', phone: 'Contact',
  siret: 'Entreprise', siren: 'Entreprise', tva_fr: 'Entreprise', ner_org: 'Entreprise',
  iban: 'Finances',
  ip_v4: 'Réseau', uuid: 'Réseau', url: 'Réseau',
  gps_text: 'Localisation', postal_fr: 'Localisation', plate_fr: 'Localisation',
  ner_loc: 'Localisation',
  ssn_fr: 'Documents', date: 'Documents',
}

function DetectedCard({ result }: { result: AnalysisResult }) {
  const matches = result.sensitive_matches ?? []
  const urls = result.embedded_urls ?? []

  // Construire une liste unifiée avec les URLs comme matches
  const allItems: { label: string; value: string; type: string }[] = [
    ...matches.map((m) => ({ label: m.label, value: m.value, type: m.type })),
    ...urls.map((u) => ({ label: 'Lien', value: u, type: 'url' })),
  ]

  const total = allItems.length

  // Grouper par catégorie
  const grouped = allItems.reduce<Record<string, typeof allItems>>((acc, item) => {
    const group = TYPE_GROUP[item.type] ?? 'Autres'
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})

  const groups = Object.entries(grouped)

  return (
    <div className="bg-bg-card border border-edge rounded-[14px] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-edge">
        <span className="font-mono text-[11px] text-mute uppercase tracking-wider">Données détectées</span>
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[11px] font-semibold ${total > 0 ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
          <AlertCircle className="w-3 h-3" />
          {total}
        </div>
      </div>

      {total === 0 ? (
        <div className="px-6 py-8 text-center text-dim text-sm">
          Aucune donnée sensible détectée dans le contenu.
        </div>
      ) : (
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {groups.map(([groupName, items]) => (
            <div key={groupName}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute mb-2">{groupName}</p>
              <div className="flex flex-col gap-1.5">
                {items.map((item, i) => (
                  <div key={i} className="group flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px] ${SENSITIVE_TYPE_COLOR[item.type] ?? 'text-red-400'} bg-current`} />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-mute leading-none mb-0.5">{item.label}</p>
                      <p className={`text-sm font-medium break-all leading-snug ${SENSITIVE_TYPE_COLOR[item.type] ?? 'text-red-400'}`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

