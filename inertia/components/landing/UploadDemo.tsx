import { useCallback, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  AlertCircle,
  Download,
  FileImage,
  FileText,
  FileUp,
  Loader2,
  MapPin,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
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

interface PdfResult {
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

interface ImageResult {
  filename: string
  file_size: number
  format: string
  width: number | null
  height: number | null
  mode: string | null
  risk_score: number
  fields: MetadataField[]
  warnings: string[]
  has_gps: boolean
  gps_latitude: number | null
  gps_longitude: number | null
  sensitive_matches: SensitiveMatch[]
}

interface OfficeComment {
  author: string
  date: string | null
  text: string
}

interface OfficeResult {
  filename: string
  file_size: number
  file_type: string
  risk_score: number
  fields: MetadataField[]
  warnings: string[]
  has_tracked_changes: boolean
  deleted_text_snippets: string[]
  comments: OfficeComment[]
  embedded_urls: string[]
  sensitive_matches: SensitiveMatch[]
}

type TabState<R> =
  | { status: 'idle' }
  | { status: 'dragging' }
  | { status: 'uploading' }
  | { status: 'success'; result: R }
  | { status: 'error'; message: string }

// ── Helpers ──────────────────────────────────────────────────────────────────

const MAX_SIZE = 20 * 1024 * 1024

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
  if (score < 60) return 'bg-green-500/10 border-green-500/30 text-amber-brand'
  return 'bg-red-500/10 border-red-500/30 text-red-500'
}

const FORMAT_COLOR: Record<string, string> = {
  JPEG: 'bg-orange-500',
  PNG: 'bg-blue-500',
  WEBP: 'bg-green-600',
  GIF: 'bg-purple-500',
  ICO: 'bg-slate-500',
}

const OFFICE_TYPE_COLOR: Record<string, string> = {
  docx: 'bg-blue-600',
  xlsx: 'bg-green-600',
  pptx: 'bg-orange-500',
}

// ── Main component ────────────────────────────────────────────────────────────

export default function UploadDemo() {
  const t = useT()
  const [activeTab, setActiveTab] = useState<'pdf' | 'image' | 'office'>('pdf')
  const [pdfState, setPdfState] = useState<TabState<PdfResult>>({ status: 'idle' })
  const [imageState, setImageState] = useState<TabState<ImageResult>>({ status: 'idle' })
  const [officeState, setOfficeState] = useState<TabState<OfficeResult>>({ status: 'idle' })
  const pdfInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const officeInputRef = useRef<HTMLInputElement>(null)

  // ── PDF upload ─────────────────────────────────────────────────────────────

  const analyzePdf = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setPdfState({ status: 'error', message: 'Seuls les fichiers PDF sont acceptés.' })
      return
    }
    if (file.size > MAX_SIZE) {
      setPdfState({ status: 'error', message: 'Fichier trop volumineux (max 20 Mo).' })
      return
    }
    setPdfState({ status: 'uploading' })
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/analyze/pdf', {
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': getCsrfToken() },
        body: form,
      })
      const json = await res.json()
      if (!res.ok) {
        setPdfState({ status: 'error', message: json.error ?? "Erreur lors de l'analyse." })
        return
      }
      setPdfState({ status: 'success', result: json as PdfResult })
    } catch {
      setPdfState({ status: 'error', message: 'Impossible de contacter le service.' })
    }
  }, [])

  // ── Image upload ───────────────────────────────────────────────────────────

  const analyzeImage = useCallback(async (file: File) => {
    const ext = file.name.toLowerCase().split('.').pop() ?? ''
    if (!['jpg', 'jpeg', 'png', 'webp', 'gif', 'ico'].includes(ext)) {
      setImageState({
        status: 'error',
        message: 'Format non supporté. Acceptés : JPEG, PNG, WebP, GIF, ICO.',
      })
      return
    }
    if (file.size > MAX_SIZE) {
      setImageState({ status: 'error', message: 'Fichier trop volumineux (max 20 Mo).' })
      return
    }
    setImageState({ status: 'uploading' })
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/analyze/image', {
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': getCsrfToken() },
        body: form,
      })
      const json = await res.json()
      if (!res.ok) {
        setImageState({ status: 'error', message: json.error ?? "Erreur lors de l'analyse." })
        return
      }
      setImageState({ status: 'success', result: json as ImageResult })
    } catch {
      setImageState({ status: 'error', message: 'Impossible de contacter le service.' })
    }
  }, [])

  // ── Office upload ──────────────────────────────────────────────────────────

  const analyzeOffice = useCallback(async (file: File) => {
    const ext = file.name.toLowerCase().split('.').pop() ?? ''
    if (!['docx', 'xlsx', 'pptx'].includes(ext)) {
      setOfficeState({
        status: 'error',
        message: 'Format non supporté. Acceptés : DOCX, XLSX, PPTX.',
      })
      return
    }
    if (file.size > MAX_SIZE) {
      setOfficeState({ status: 'error', message: 'Fichier trop volumineux (max 20 Mo).' })
      return
    }
    setOfficeState({ status: 'uploading' })
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/analyze/office', {
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': getCsrfToken() },
        body: form,
      })
      const json = await res.json()
      if (!res.ok) {
        setOfficeState({ status: 'error', message: json.error ?? "Erreur lors de l'analyse." })
        return
      }
      setOfficeState({ status: 'success', result: json as OfficeResult })
    } catch {
      setOfficeState({ status: 'error', message: 'Impossible de contacter le service.' })
    }
  }, [])

  // ── Wire file inputs ───────────────────────────────────────────────────────

  const onPdfChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) analyzePdf(file)
      e.target.value = ''
    },
    [analyzePdf]
  )

  const onImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) analyzeImage(file)
      e.target.value = ''
    },
    [analyzeImage]
  )

  const onOfficeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) analyzeOffice(file)
      e.target.value = ''
    },
    [analyzeOffice]
  )

  const attachPdfDrop = useCallback((file: File) => analyzePdf(file), [analyzePdf])
  const attachImageDrop = useCallback((file: File) => analyzeImage(file), [analyzeImage])
  const attachOfficeDrop = useCallback((file: File) => analyzeOffice(file), [analyzeOffice])

  return (
    <section id="demo" className="py-[120px] bg-bg-secondary border-t border-b border-edge">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-4">
            {t.demo.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.demo.title}</h2>
          <p className="text-dim text-[17px] max-w-[560px] mx-auto">{t.demo.subtitle}</p>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-bg-card border border-edge rounded-full">
            <TabButton
              label={t.demo.tabs.pdf}
              icon={<span className="text-[10px] font-black">PDF</span>}
              active={activeTab === 'pdf'}
              color="text-red-400"
              onClick={() => setActiveTab('pdf')}
            />
            <TabButton
              label={t.demo.tabs.image}
              icon={<FileImage className="w-3.5 h-3.5" />}
              active={activeTab === 'image'}
              color="text-blue-400"
              onClick={() => setActiveTab('image')}
            />
            <TabButton
              label={t.demo.tabs.office}
              icon={<FileText className="w-3.5 h-3.5" />}
              active={activeTab === 'office'}
              color="text-violet-400"
              onClick={() => setActiveTab('office')}
            />
          </div>
        </motion.div>

        {/* ── Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          {activeTab === 'pdf' ? (
            <>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={onPdfChange}
                  />
                  <PdfDropZone
                    state={pdfState}
                    setState={setPdfState}
                    inputRef={pdfInputRef}
                    onFile={attachPdfDrop}
                    t={t}
                  />
                </div>
                <div className="bg-bg-card border border-edge rounded-[14px] overflow-hidden">
                  {pdfState.status === 'success' ? (
                    <PdfMetaCard result={pdfState.result} t={t} />
                  ) : (
                    <PdfMockPanel t={t} />
                  )}
                </div>
              </div>
              {pdfState.status === 'success' && (
                <DetectedCard
                  matches={pdfState.result.sensitive_matches ?? []}
                  urls={pdfState.result.embedded_urls ?? []}
                />
              )}
            </>
          ) : activeTab === 'image' ? (
            <>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.gif,.ico,image/*"
                    className="hidden"
                    onChange={onImageChange}
                  />
                  <ImageDropZone
                    state={imageState}
                    setState={setImageState}
                    inputRef={imageInputRef}
                    onFile={attachImageDrop}
                    t={t}
                  />
                </div>
                <div className="bg-bg-card border border-edge rounded-[14px] overflow-hidden">
                  {imageState.status === 'success' ? (
                    <ImageMetaCard result={imageState.result} t={t} />
                  ) : (
                    <ImageMockPanel t={t} />
                  )}
                </div>
              </div>
              {imageState.status === 'success' && (
                <DetectedCard matches={imageState.result.sensitive_matches ?? []} urls={[]} />
              )}
            </>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <input
                    ref={officeInputRef}
                    type="file"
                    accept=".docx,.xlsx,.pptx"
                    className="hidden"
                    onChange={onOfficeChange}
                  />
                  <OfficeDropZone
                    state={officeState}
                    setState={setOfficeState}
                    inputRef={officeInputRef}
                    onFile={attachOfficeDrop}
                    t={t}
                  />
                </div>
                <div className="bg-bg-card border border-edge rounded-[14px] overflow-hidden">
                  {officeState.status === 'success' ? (
                    <OfficeMetaCard result={officeState.result} t={t} />
                  ) : (
                    <OfficeMockPanel t={t} />
                  )}
                </div>
              </div>
              {officeState.status === 'success' && (
                <DetectedCard
                  matches={officeState.result.sensitive_matches ?? []}
                  urls={officeState.result.embedded_urls ?? []}
                />
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// ── Tab button ────────────────────────────────────────────────────────────────

function TabButton({
  label,
  icon,
  active,
  color,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  active: boolean
  color: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
        active
          ? 'bg-amber-brand text-bg-dark shadow-[0_0_16px_rgba(34,197,94,0.35)]'
          : 'text-dim hover:text-cream'
      }`}
    >
      <span className={active ? '' : color}>{icon}</span>
      {label}
    </button>
  )
}

// ── PDF Drop Zone ─────────────────────────────────────────────────────────────

function PdfDropZone({
  state,
  setState,
  inputRef,
  onFile,
  t,
}: {
  state: TabState<PdfResult>
  setState: (s: TabState<PdfResult>) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  onFile: (f: File) => void
  t: ReturnType<typeof useT>
}) {
  const dragCounter = useRef(0)
  const isDragging = state.status === 'dragging'
  const isUploading = state.status === 'uploading'

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault()
        dragCounter.current++
        if (!isUploading) setState({ status: 'dragging' })
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => {
        e.preventDefault()
        dragCounter.current--
        if (dragCounter.current === 0) setState({ status: 'idle' })
      }}
      onDrop={(e) => {
        e.preventDefault()
        dragCounter.current = 0
        const f = e.dataTransfer.files[0]
        if (f) onFile(f)
      }}
      onClick={() => !isUploading && inputRef.current?.click()}
      className={`group rounded-[20px] px-10 py-16 text-center transition-all border-2 border-dashed cursor-pointer select-none ${
        isDragging
          ? 'border-amber-brand bg-[rgba(34,197,94,0.06)] scale-[1.01]'
          : isUploading
            ? 'border-edge bg-bg-card cursor-wait'
            : 'border-edge bg-bg-card hover:border-amber-brand hover:bg-[rgba(34,197,94,0.02)]'
      }`}
    >
      {isUploading ? (
        <>
          <Loader2 className="w-12 h-12 text-amber-brand animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold">{t.demo.result.loading}</p>
        </>
      ) : state.status === 'success' ? (
        <>
          <ShieldCheck className="w-12 h-12 text-amber-brand mx-auto mb-4" />
          <p className="text-lg font-semibold mb-1">{state.result.filename}</p>
          <p className="text-dim text-sm mb-4">
            {formatBytes(state.result.file_size)} · {state.result.page_count}p · PDF{' '}
            {state.result.pdf_version}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setState({ status: 'idle' })
            }}
            className="px-5 py-2 bg-amber-brand hover:bg-green-400 text-bg-dark rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            {t.demo.result.newAnalysis}
          </button>
        </>
      ) : state.status === 'error' ? (
        <>
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-semibold text-red-500 mb-1">{t.demo.result.errorTitle}</p>
          <p className="text-dim text-sm mb-4">{state.message}</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setState({ status: 'idle' })
            }}
            className="px-5 py-2 bg-bg-secondary border border-edge rounded-full text-sm font-medium text-dim hover:text-cream transition-all cursor-pointer"
          >
            {t.demo.result.newAnalysis}
          </button>
        </>
      ) : (
        <>
          <FileUp
            className={`w-12 h-12 mx-auto mb-4 transition-all ${isDragging ? 'text-amber-brand -translate-y-1' : 'text-mute group-hover:text-amber-brand group-hover:-translate-y-1'}`}
          />
          <h3 className="text-lg font-semibold mb-2">
            {isDragging ? t.demo.upload.dragging : t.demo.upload.title}
          </h3>
          <p className="text-dim text-sm mb-2">{t.demo.upload.subtitle}</p>
          <p className="font-mono text-[11px] text-mute">{t.demo.upload.pdfOnly}</p>
        </>
      )}
    </div>
  )
}

// ── Image Drop Zone ───────────────────────────────────────────────────────────

function ImageDropZone({
  state,
  setState,
  inputRef,
  onFile,
  t,
}: {
  state: TabState<ImageResult>
  setState: (s: TabState<ImageResult>) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  onFile: (f: File) => void
  t: ReturnType<typeof useT>
}) {
  const dragCounter = useRef(0)
  const isDragging = state.status === 'dragging'
  const isUploading = state.status === 'uploading'

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault()
        dragCounter.current++
        if (!isUploading) setState({ status: 'dragging' })
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => {
        e.preventDefault()
        dragCounter.current--
        if (dragCounter.current === 0) setState({ status: 'idle' })
      }}
      onDrop={(e) => {
        e.preventDefault()
        dragCounter.current = 0
        const f = e.dataTransfer.files[0]
        if (f) onFile(f)
      }}
      onClick={() => !isUploading && inputRef.current?.click()}
      className={`group rounded-[20px] px-10 py-16 text-center transition-all border-2 border-dashed cursor-pointer select-none ${
        isDragging
          ? 'border-blue-500 bg-[rgba(59,130,246,0.06)] scale-[1.01]'
          : isUploading
            ? 'border-edge bg-bg-card cursor-wait'
            : 'border-edge bg-bg-card hover:border-blue-500 hover:bg-[rgba(59,130,246,0.02)]'
      }`}
    >
      {isUploading ? (
        <>
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold">{t.demo.result.loading}</p>
        </>
      ) : state.status === 'success' ? (
        <>
          <ShieldCheck className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-lg font-semibold mb-1">{state.result.filename}</p>
          <p className="text-dim text-sm mb-4">
            {formatBytes(state.result.file_size)} · {state.result.width}×{state.result.height} ·{' '}
            {state.result.format}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setState({ status: 'idle' })
            }}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            {t.demo.result.newAnalysis}
          </button>
        </>
      ) : state.status === 'error' ? (
        <>
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-semibold text-red-500 mb-1">{t.demo.result.errorTitle}</p>
          <p className="text-dim text-sm mb-4">{state.message}</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setState({ status: 'idle' })
            }}
            className="px-5 py-2 bg-bg-secondary border border-edge rounded-full text-sm font-medium text-dim hover:text-cream transition-all cursor-pointer"
          >
            {t.demo.result.newAnalysis}
          </button>
        </>
      ) : (
        <>
          <FileImage
            className={`w-12 h-12 mx-auto mb-4 transition-all ${isDragging ? 'text-blue-400 -translate-y-1' : 'text-mute group-hover:text-blue-400 group-hover:-translate-y-1'}`}
          />
          <h3 className="text-lg font-semibold mb-2">
            {isDragging ? t.demo.imageUpload.dragging : t.demo.imageUpload.title}
          </h3>
          <p className="text-dim text-sm mb-2">{t.demo.imageUpload.subtitle}</p>
          <p className="font-mono text-[11px] text-mute">{t.demo.imageUpload.formats}</p>
        </>
      )}
    </div>
  )
}

// ── Office Drop Zone ──────────────────────────────────────────────────────────

function OfficeDropZone({
  state,
  setState,
  inputRef,
  onFile,
  t,
}: {
  state: TabState<OfficeResult>
  setState: (s: TabState<OfficeResult>) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  onFile: (f: File) => void
  t: ReturnType<typeof useT>
}) {
  const dragCounter = useRef(0)
  const isDragging = state.status === 'dragging'
  const isUploading = state.status === 'uploading'

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault()
        dragCounter.current++
        if (!isUploading) setState({ status: 'dragging' })
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => {
        e.preventDefault()
        dragCounter.current--
        if (dragCounter.current === 0) setState({ status: 'idle' })
      }}
      onDrop={(e) => {
        e.preventDefault()
        dragCounter.current = 0
        const f = e.dataTransfer.files[0]
        if (f) onFile(f)
      }}
      onClick={() => !isUploading && inputRef.current?.click()}
      className={`group rounded-[20px] px-10 py-16 text-center transition-all border-2 border-dashed cursor-pointer select-none ${
        isDragging
          ? 'border-violet-500 bg-[rgba(139,92,246,0.06)] scale-[1.01]'
          : isUploading
            ? 'border-edge bg-bg-card cursor-wait'
            : 'border-edge bg-bg-card hover:border-violet-500 hover:bg-[rgba(139,92,246,0.02)]'
      }`}
    >
      {isUploading ? (
        <>
          <Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold">{t.demo.result.loading}</p>
        </>
      ) : state.status === 'success' ? (
        <>
          <ShieldCheck className="w-12 h-12 text-violet-400 mx-auto mb-4" />
          <p className="text-lg font-semibold mb-1">{state.result.filename}</p>
          <p className="text-dim text-sm mb-4">
            {formatBytes(state.result.file_size)} · {state.result.file_type.toUpperCase()}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setState({ status: 'idle' })
            }}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            {t.demo.result.newAnalysis}
          </button>
        </>
      ) : state.status === 'error' ? (
        <>
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-semibold text-red-500 mb-1">{t.demo.result.errorTitle}</p>
          <p className="text-dim text-sm mb-4">{state.message}</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setState({ status: 'idle' })
            }}
            className="px-5 py-2 bg-bg-secondary border border-edge rounded-full text-sm font-medium text-dim hover:text-cream transition-all cursor-pointer"
          >
            {t.demo.result.newAnalysis}
          </button>
        </>
      ) : (
        <>
          <FileText
            className={`w-12 h-12 mx-auto mb-4 transition-all ${isDragging ? 'text-violet-400 -translate-y-1' : 'text-mute group-hover:text-violet-400 group-hover:-translate-y-1'}`}
          />
          <h3 className="text-lg font-semibold mb-2">
            {isDragging ? t.demo.officeUpload.dragging : t.demo.officeUpload.title}
          </h3>
          <p className="text-dim text-sm mb-2">{t.demo.officeUpload.subtitle}</p>
          <p className="font-mono text-[11px] text-mute">{t.demo.officeUpload.formats}</p>
        </>
      )}
    </div>
  )
}

// ── Mock panels ───────────────────────────────────────────────────────────────

const PDF_MOCK_ROWS = [
  { label: 'AUTEUR', value: 'Jean-Marc Dupont', sensitive: true },
  { label: 'ORGANISATION', value: 'Acme Corp.', sensitive: true },
  { label: 'LOGICIEL', value: 'Microsoft Word 2021', sensitive: false },
  { label: 'CRÉÉ LE', value: '2024-11-03 09:14:22', sensitive: false },
  { label: 'MODIFIÉ LE', value: '2025-01-18 16:42:07', sensitive: false },
  { label: 'GPS', value: '48.8566°N, 2.3522°E', sensitive: true },
]

const IMAGE_MOCK_ROWS = [
  { label: 'MARQUE', value: 'Apple', sensitive: true },
  { label: 'MODÈLE APPAREIL', value: 'iPhone 15 Pro', sensitive: true },
  { label: 'LOGICIEL', value: 'iOS 17.2', sensitive: true },
  { label: 'DATE PRISE DE VUE', value: '2024-08-15 14:32:07', sensitive: true },
  { label: 'GPS — LATITUDE', value: '48.858600°', sensitive: true },
  { label: 'GPS — LONGITUDE', value: '2.352200°', sensitive: true },
]

const OFFICE_MOCK_ROWS = [
  { label: 'AUTEUR', value: 'Jean-Marc Dupont', sensitive: true },
  { label: 'SOCIÉTÉ', value: 'Acme Corp.', sensitive: true },
  { label: 'DERNIÈRE MODIF. PAR', value: 'Marie Martin', sensitive: true },
  { label: 'TEMPLATE', value: 'Modèle Confidentiel.dotx', sensitive: true },
  { label: 'RÉVISIONS', value: '47', sensitive: true },
  { label: 'DATE DE CRÉATION', value: '2024-11-03', sensitive: false },
]

function MockPanel({
  rows,
  badge,
  badgeColor,
  t,
  extra,
}: {
  rows: typeof PDF_MOCK_ROWS
  badge: string
  badgeColor: string
  t: ReturnType<typeof useT>
  extra?: React.ReactNode
}) {
  return (
    <>
      <div className="px-5 py-4 flex items-center justify-between border-b border-edge">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 ${badgeColor} rounded-lg flex items-center justify-center font-bold text-white text-xs`}
          >
            {badge}
          </div>
          <div>
            <div className="text-sm font-semibold">
              {badge === 'PDF'
                ? 'rapport-confidentiel.pdf'
                : badge === 'IMG'
                  ? 'photo-vacances.jpg'
                  : 'contrat-nda.docx'}
            </div>
            <div className="text-xs text-mute">
              {badge === 'PDF'
                ? '2.4 MB · 24 pages'
                : badge === 'IMG'
                  ? '3.1 MB · 4032×3024'
                  : '1.8 MB · DOCX'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-brand">
          <span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse" />
          {t.demo.result.status}
        </div>
      </div>
      {extra}
      <div>
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-5 py-3 border-b border-edge last:border-b-0 hover:bg-white/[0.02]"
          >
            <span className="font-mono text-[11px] text-mute">{row.label}</span>
            <span
              className={`text-sm font-medium text-right max-w-[60%] break-all flex items-center gap-1.5 ${row.sensitive ? 'text-red-500' : 'text-blue-400'}`}
            >
              {row.sensitive && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              )}
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-edge">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-xs font-semibold text-red-500">
          <AlertCircle className="w-3 h-3" />
          {t.demo.result.sensitiveCount}
        </div>
      </div>
    </>
  )
}

function PdfMockPanel({ t }: { t: ReturnType<typeof useT> }) {
  return <MockPanel rows={PDF_MOCK_ROWS} badge="PDF" badgeColor="bg-red-500" t={t} />
}

function ImageMockPanel({ t }: { t: ReturnType<typeof useT> }) {
  return <MockPanel rows={IMAGE_MOCK_ROWS} badge="IMG" badgeColor="bg-blue-500" t={t} />
}

function OfficeMockPanel({ t }: { t: ReturnType<typeof useT> }) {
  return (
    <MockPanel
      rows={OFFICE_MOCK_ROWS}
      badge="DOC"
      badgeColor="bg-violet-600"
      t={t}
      extra={
        <div className="px-5 py-2 flex flex-wrap gap-2 border-b border-edge">
          <span className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-[11px] font-medium text-orange-400">
            3 tracked changes
          </span>
          <span className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-[11px] font-medium text-violet-400">
            2 commentaires
          </span>
        </div>
      }
    />
  )
}

// ── Result cards ──────────────────────────────────────────────────────────────

const SENSITIVE_TYPE_COLOR: Record<string, string> = {
  person: 'text-pink-400',
  handle: 'text-fuchsia-400',
  email: 'text-red-400',
  phone: 'text-orange-400',
  siret: 'text-green-400',
  siren: 'text-green-300',
  tva_fr: 'text-yellow-500',
  iban: 'text-red-500',
  ip_v4: 'text-purple-400',
  uuid: 'text-violet-400',
  url: 'text-cyan-400',
  gps_text: 'text-green-400',
  postal_fr: 'text-lime-400',
  plate_fr: 'text-teal-400',
  ssn_fr: 'text-rose-600',
  ssn_us: 'text-rose-500',
  username: 'text-indigo-400',
  password: 'text-red-600',
  date: 'text-blue-400',
  ner_person: 'text-pink-300',
  ner_loc: 'text-emerald-400',
  ner_org: 'text-sky-400',
}

function FieldsTable({ fields }: { fields: MetadataField[] }) {
  return (
    <div className="max-h-52 overflow-y-auto">
      {fields.length === 0 ? (
        <div className="px-5 py-6 text-center text-dim text-sm">Aucune métadonnée trouvée.</div>
      ) : (
        fields.map((field) => (
          <div
            key={field.key}
            className="flex items-center justify-between px-5 py-3 border-b border-edge last:border-b-0 hover:bg-white/[0.02]"
          >
            <span className="font-mono text-[11px] text-mute uppercase">{field.label}</span>
            <span
              className={`text-sm font-medium text-right max-w-[60%] break-all flex items-center gap-1.5 ${field.sensitive ? 'text-red-500' : 'text-blue-400'}`}
            >
              {field.sensitive && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              )}
              {field.value}
            </span>
          </div>
        ))
      )}
    </div>
  )
}

function WarningsAndFooter({
  warnings,
  riskScore,
  onExport,
  t,
}: {
  warnings: string[]
  riskScore: number
  onExport: () => void
  t: ReturnType<typeof useT>
}) {
  return (
    <>
      {warnings.length > 0 && (
        <div className="px-5 py-3 border-t border-edge space-y-1.5">
          {warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-amber-brand">
              <TriangleAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}
      <div className="px-5 py-3 border-t border-edge flex items-center justify-between">
        <span className={`text-xs font-bold ${riskColor(riskScore)}`}>
          {t.demo.result.riskScore} : {riskScore}/100
        </span>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary border border-edge hover:border-amber-brand hover:text-amber-brand rounded-lg text-xs font-medium text-mute transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          {t.demo.result.export} JSON
        </button>
      </div>
    </>
  )
}

function PdfMetaCard({ result, t }: { result: PdfResult; t: ReturnType<typeof useT> }) {
  const sensitiveCount = result.fields.filter((f) => f.sensitive).length
  return (
    <>
      <div className="px-5 py-4 flex items-center justify-between border-b border-edge">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">
            PDF
          </div>
          <div>
            <div className="text-sm font-semibold truncate max-w-[160px]">{result.filename}</div>
            <div className="text-xs text-mute">
              {formatBytes(result.file_size)} · {result.page_count}p · v{result.pdf_version}
            </div>
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-bold ${riskBg(result.risk_score)}`}
        >
          {result.risk_score}/100
        </div>
      </div>
      {(result.encrypted || result.has_javascript || result.has_embedded_files) && (
        <div className="px-5 py-3 flex flex-wrap gap-2 border-b border-edge">
          {result.encrypted && (
            <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-[11px] font-medium text-blue-400">
              Chiffré
            </span>
          )}
          {result.has_javascript && (
            <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-[11px] font-medium text-red-400">
              JavaScript
            </span>
          )}
          {result.has_embedded_files && (
            <span className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-[11px] font-medium text-orange-400">
              Fichiers embarqués
            </span>
          )}
        </div>
      )}
      <FieldsTable fields={result.fields} />
      <WarningsAndFooter
        warnings={result.warnings}
        riskScore={result.risk_score}
        onExport={() => exportPdfJson(result)}
        t={t}
      />
      {sensitiveCount > 0 && (
        <div className="px-5 pb-3 text-xs text-mute">
          · {sensitiveCount} champ{sensitiveCount > 1 ? 's' : ''} sensible
          {sensitiveCount > 1 ? 's' : ''}
        </div>
      )}
    </>
  )
}

function ImageMetaCard({ result, t }: { result: ImageResult; t: ReturnType<typeof useT> }) {
  const fmtColor = FORMAT_COLOR[result.format.toUpperCase()] ?? 'bg-gray-500'
  return (
    <>
      <div className="px-5 py-4 flex items-center justify-between border-b border-edge">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 ${fmtColor} rounded-lg flex items-center justify-center font-bold text-white text-[9px] text-center leading-tight`}
          >
            {result.format.slice(0, 4)}
          </div>
          <div>
            <div className="text-sm font-semibold truncate max-w-[160px]">{result.filename}</div>
            <div className="text-xs text-mute">
              {formatBytes(result.file_size)}
              {result.width && result.height ? ` · ${result.width}×${result.height}` : ''}
              {result.mode ? ` · ${result.mode}` : ''}
            </div>
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-bold ${riskBg(result.risk_score)}`}
        >
          {result.risk_score}/100
        </div>
      </div>
      {result.has_gps && (
        <div className="px-5 py-2 border-b border-edge">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-[11px] font-medium text-green-400">
            <MapPin className="w-3 h-3" />
            GPS · {result.gps_latitude?.toFixed(4)}°, {result.gps_longitude?.toFixed(4)}°
          </div>
        </div>
      )}
      <FieldsTable fields={result.fields} />
      <WarningsAndFooter
        warnings={result.warnings}
        riskScore={result.risk_score}
        onExport={() => exportImageJson(result)}
        t={t}
      />
    </>
  )
}

function OfficeMetaCard({ result, t }: { result: OfficeResult; t: ReturnType<typeof useT> }) {
  const badgeColor = OFFICE_TYPE_COLOR[result.file_type] ?? 'bg-violet-600'
  return (
    <>
      <div className="px-5 py-4 flex items-center justify-between border-b border-edge">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 ${badgeColor} rounded-lg flex items-center justify-center font-bold text-white text-[9px] uppercase`}
          >
            {result.file_type}
          </div>
          <div>
            <div className="text-sm font-semibold truncate max-w-[160px]">{result.filename}</div>
            <div className="text-xs text-mute">{formatBytes(result.file_size)}</div>
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-bold ${riskBg(result.risk_score)}`}
        >
          {result.risk_score}/100
        </div>
      </div>
      {(result.has_tracked_changes || result.comments.length > 0) && (
        <div className="px-5 py-2 flex flex-wrap gap-2 border-b border-edge">
          {result.has_tracked_changes && (
            <span className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-[11px] font-medium text-orange-400">
              {result.deleted_text_snippets.length} tracked change
              {result.deleted_text_snippets.length > 1 ? 's' : ''}
            </span>
          )}
          {result.comments.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-[11px] font-medium text-violet-400">
              <MessageSquare className="w-3 h-3" />
              {result.comments.length} commentaire{result.comments.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}
      <FieldsTable fields={result.fields} />
      <WarningsAndFooter
        warnings={result.warnings}
        riskScore={result.risk_score}
        onExport={() => exportOfficeJson(result)}
        t={t}
      />
    </>
  )
}

// ── Detected card (shared) ────────────────────────────────────────────────────

const TYPE_GROUP: Record<string, string> = {
  person: 'Identité',
  ner_person: 'Identité',
  handle: 'Identité',
  email: 'Contact',
  phone: 'Contact',
  siret: 'Entreprise',
  siren: 'Entreprise',
  tva_fr: 'Entreprise',
  ner_org: 'Entreprise',
  iban: 'Finances',
  ip_v4: 'Réseau',
  uuid: 'Réseau',
  url: 'Réseau',
  gps_text: 'Localisation',
  postal_fr: 'Localisation',
  plate_fr: 'Localisation',
  ner_loc: 'Localisation',
  ssn_fr: 'Documents',
  ssn_us: 'Documents',
  username: 'Identité',
  password: 'Identité',
  date: 'Documents',
}

function DetectedCard({ matches, urls }: { matches: SensitiveMatch[]; urls: string[] }) {
  const allItems = [
    ...matches.map((m) => ({ label: m.label, value: m.value, type: m.type })),
    ...urls.map((u) => ({ label: 'Lien', value: u, type: 'url' })),
  ]
  const total = allItems.length
  const grouped = allItems.reduce<Record<string, typeof allItems>>((acc, item) => {
    const group = TYPE_GROUP[item.type] ?? 'Autres'
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})

  return (
    <div className="bg-bg-card border border-edge rounded-[14px] overflow-hidden">
      <div className="px-6 py-3 flex items-center justify-between border-b border-edge">
        <span className="font-mono text-[11px] text-mute uppercase tracking-wider">
          Données détectées
        </span>
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[11px] font-semibold ${total > 0 ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}
        >
          <AlertCircle className="w-3 h-3" />
          {total}
        </div>
      </div>
      {total === 0 ? (
        <div className="px-6 py-8 text-center text-dim text-sm">
          Aucune donnée sensible détectée.
        </div>
      ) : (
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(grouped).map(([groupName, items]) => (
            <div key={groupName}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute mb-2">
                {groupName}
              </p>
              <div className="flex flex-col gap-1.5">
                {items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px] ${SENSITIVE_TYPE_COLOR[item.type] ?? 'text-red-400'} bg-current`}
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-mute leading-none mb-0.5">
                        {item.label}
                      </p>
                      <p
                        className={`text-sm font-medium break-all leading-snug ${SENSITIVE_TYPE_COLOR[item.type] ?? 'text-red-400'}`}
                      >
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

// ── JSON export ───────────────────────────────────────────────────────────────

function downloadJson(payload: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function exportPdfJson(result: PdfResult) {
  downloadJson(
    {
      export_date: new Date().toISOString(),
      type: 'pdf',
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
      metadata: result.fields,
      embedded_urls: result.embedded_urls,
      sensitive_matches: result.sensitive_matches,
    },
    `dochunt-${result.filename.replace(/\.pdf$/i, '')}-${Date.now()}.json`
  )
}

function exportImageJson(result: ImageResult) {
  downloadJson(
    {
      export_date: new Date().toISOString(),
      type: 'image',
      file: {
        name: result.filename,
        size_bytes: result.file_size,
        size_human: formatBytes(result.file_size),
        format: result.format,
        width: result.width,
        height: result.height,
        mode: result.mode,
      },
      risk_score: result.risk_score,
      gps: result.has_gps
        ? { latitude: result.gps_latitude, longitude: result.gps_longitude }
        : null,
      warnings: result.warnings,
      metadata: result.fields,
      sensitive_matches: result.sensitive_matches,
    },
    `dochunt-${result.filename.replace(/\.[^.]+$/, '')}-${Date.now()}.json`
  )
}

function exportOfficeJson(result: OfficeResult) {
  downloadJson(
    {
      export_date: new Date().toISOString(),
      type: result.file_type,
      file: {
        name: result.filename,
        size_bytes: result.file_size,
        size_human: formatBytes(result.file_size),
        file_type: result.file_type,
      },
      risk_score: result.risk_score,
      flags: {
        has_tracked_changes: result.has_tracked_changes,
        comments_count: result.comments.length,
      },
      warnings: result.warnings,
      metadata: result.fields,
      deleted_text_snippets: result.deleted_text_snippets,
      comments: result.comments,
      embedded_urls: result.embedded_urls,
      sensitive_matches: result.sensitive_matches,
    },
    `dochunt-${result.filename.replace(/\.[^.]+$/, '')}-${Date.now()}.json`
  )
}
