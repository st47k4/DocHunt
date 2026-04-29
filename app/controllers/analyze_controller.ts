import { readFile, unlink } from 'node:fs/promises'
import { basename } from 'node:path'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import statsService from '#services/stats_service'

const MAX_SIZE_BYTES = 20 * 1024 * 1024 // 20 Mo
const MAX_FILENAME_LENGTH = 255

const PDF_MAGIC = Buffer.from('%PDF')
const OFFICE_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]) // PK\x03\x04 — ZIP local file header

// Magic bytes image
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff])
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
const RIFF_MAGIC = Buffer.from('RIFF')
const WEBP_MAGIC = Buffer.from('WEBP')
const GIF_MAGIC = Buffer.from('GIF8')
const ICO_MAGIC = Buffer.from([0x00, 0x00, 0x01, 0x00])

const SAFE_PDF_RE = /^[a-zA-Z0-9 ._\-()[\]{}àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]+\.pdf$/i
const SAFE_IMAGE_RE =
  /^[a-zA-Z0-9 ._\-()[\]{}àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]+\.(jpg|jpeg|png|webp|gif|ico)$/i
const SAFE_OFFICE_RE =
  /^[a-zA-Z0-9 ._\-()[\]{}àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]+\.(docx|xlsx|pptx)$/i

function sanitizeFilename(raw: string | undefined, fallback: string): string {
  if (!raw) return fallback
  let name = raw.replace(/\0/g, '')
  name = basename(name)
  if (name.length > MAX_FILENAME_LENGTH) name = name.slice(0, MAX_FILENAME_LENGTH)
  return name
}

function isValidImage(data: Buffer): boolean {
  if (data.length >= 3 && data.subarray(0, 3).equals(JPEG_MAGIC)) return true
  if (data.length >= 8 && data.subarray(0, 8).equals(PNG_MAGIC)) return true
  if (
    data.length >= 12 &&
    data.subarray(0, 4).equals(RIFF_MAGIC) &&
    data.subarray(8, 12).equals(WEBP_MAGIC)
  )
    return true
  if (data.length >= 4 && data.subarray(0, 4).equals(GIF_MAGIC)) return true
  if (data.length >= 4 && data.subarray(0, 4).equals(ICO_MAGIC)) return true
  return false
}

async function proxyToPython(
  ctx: HttpContext,
  endpoint: string,
  mime: string,
  data: Buffer,
  filename: string
) {
  const { response } = ctx
  const form = new FormData()
  const arrayBuffer = data.buffer.slice(
    data.byteOffset,
    data.byteOffset + data.byteLength
  ) as ArrayBuffer
  form.append('file', new Blob([arrayBuffer], { type: mime }), filename)

  let pyResponse: Response
  try {
    pyResponse = await fetch(`${env.get('ANALYZER_URL')}${endpoint}`, {
      method: 'POST',
      body: form,
      signal: AbortSignal.timeout(15_000),
    })
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return response.gatewayTimeout({
        error: "Le service d'analyse a mis trop de temps à répondre.",
      })
    }
    return response.serviceUnavailable({ error: "Service d'analyse indisponible." })
  }

  if (!pyResponse.ok) {
    let detail = "Erreur lors de l'analyse."
    try {
      const body = (await pyResponse.json()) as { detail?: string }
      if (body.detail) detail = body.detail
    } catch {}
    return response.status(pyResponse.status).json({ error: detail })
  }

  statsService.increment(data.length).catch(() => {})
  return response.json(await pyResponse.json())
}

export default class AnalyzeController {
  // ── PDF ───────────────────────────────────────────────────────────────────

  async handlePdf({ request, response }: HttpContext) {
    const file = request.file('file', { size: '20mb', extnames: ['pdf'] })

    if (!file) return response.badRequest({ error: 'Aucun fichier fourni.' })
    if (file.hasErrors)
      return response.badRequest({ error: file.errors[0]?.message ?? 'Fichier invalide.' })

    const clientMime = file.type ? `${file.type}/${file.subtype}` : ''
    if (clientMime && clientMime !== 'application/pdf') {
      return response.unsupportedMediaType({
        error: 'Type MIME non autorisé. Seuls les PDF sont acceptés.',
      })
    }

    const safeFilename = sanitizeFilename(file.clientName, 'document.pdf')
    if (!/\.pdf$/i.test(safeFilename) || !SAFE_PDF_RE.test(safeFilename)) {
      return response.badRequest({ error: 'Nom de fichier non autorisé.' })
    }

    if (!file.tmpPath) return response.badRequest({ error: 'Fichier temporaire introuvable.' })

    let data: Buffer
    try {
      data = await readFile(file.tmpPath)
    } catch {
      return response.internalServerError({ error: 'Impossible de lire le fichier uploadé.' })
    } finally {
      unlink(file.tmpPath).catch(() => {})
    }

    if (data.length > MAX_SIZE_BYTES) {
      return response.requestEntityTooLarge({ error: 'Fichier trop volumineux (max 20 Mo).' })
    }
    if (data.length < 4 || !data.subarray(0, 4).equals(PDF_MAGIC)) {
      return response.unprocessableEntity({ error: "Le fichier n'est pas un PDF valide." })
    }

    return proxyToPython(
      { request, response } as HttpContext,
      '/analyze/pdf',
      'application/pdf',
      data,
      safeFilename
    )
  }

  // ── Image ─────────────────────────────────────────────────────────────────

  async handleImage({ request, response }: HttpContext) {
    const ALLOWED_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'ico']
    const file = request.file('file', { size: '20mb', extnames: ALLOWED_EXTS })

    if (!file) return response.badRequest({ error: 'Aucun fichier fourni.' })
    if (file.hasErrors)
      return response.badRequest({ error: file.errors[0]?.message ?? 'Fichier invalide.' })

    const safeFilename = sanitizeFilename(file.clientName, 'image.jpg')
    if (!SAFE_IMAGE_RE.test(safeFilename)) {
      return response.badRequest({ error: 'Nom de fichier non autorisé.' })
    }

    if (!file.tmpPath) return response.badRequest({ error: 'Fichier temporaire introuvable.' })

    let data: Buffer
    try {
      data = await readFile(file.tmpPath)
    } catch {
      return response.internalServerError({ error: 'Impossible de lire le fichier uploadé.' })
    } finally {
      unlink(file.tmpPath).catch(() => {})
    }

    if (data.length > MAX_SIZE_BYTES) {
      return response.requestEntityTooLarge({ error: 'Fichier trop volumineux (max 20 Mo).' })
    }
    if (!isValidImage(data)) {
      return response.unprocessableEntity({
        error: 'Le fichier ne correspond à aucun format image valide.',
      })
    }

    return proxyToPython(
      { request, response } as HttpContext,
      '/analyze/image',
      'image/jpeg',
      data,
      safeFilename
    )
  }

  // ── Office ────────────────────────────────────────────────────────────────

  async handleOffice({ request, response }: HttpContext) {
    const ALLOWED_EXTS = ['docx', 'xlsx', 'pptx']
    const file = request.file('file', { size: '20mb', extnames: ALLOWED_EXTS })

    if (!file) return response.badRequest({ error: 'Aucun fichier fourni.' })
    if (file.hasErrors)
      return response.badRequest({ error: file.errors[0]?.message ?? 'Fichier invalide.' })

    const safeFilename = sanitizeFilename(file.clientName, 'document.docx')
    if (!SAFE_OFFICE_RE.test(safeFilename)) {
      return response.badRequest({ error: 'Nom de fichier non autorisé.' })
    }

    if (!file.tmpPath) return response.badRequest({ error: 'Fichier temporaire introuvable.' })

    let data: Buffer
    try {
      data = await readFile(file.tmpPath)
    } catch {
      return response.internalServerError({ error: 'Impossible de lire le fichier uploadé.' })
    } finally {
      unlink(file.tmpPath).catch(() => {})
    }

    if (data.length > MAX_SIZE_BYTES) {
      return response.requestEntityTooLarge({ error: 'Fichier trop volumineux (max 20 Mo).' })
    }
    if (data.length < 4 || !data.subarray(0, 4).equals(OFFICE_MAGIC)) {
      return response.unprocessableEntity({
        error: "Le fichier n'est pas un document Office valide.",
      })
    }

    return proxyToPython(
      { request, response } as HttpContext,
      '/analyze/office',
      'application/octet-stream',
      data,
      safeFilename
    )
  }
}
