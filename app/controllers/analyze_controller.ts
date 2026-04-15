import { readFile, unlink } from 'node:fs/promises'
import { basename } from 'node:path'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

const PDF_MAGIC = Buffer.from('%PDF')
const MAX_SIZE_BYTES = 20 * 1024 * 1024 // 20 Mo
const MAX_FILENAME_LENGTH = 255
// N'autorise que les caractères sûrs dans les noms de fichiers
const SAFE_FILENAME_RE = /^[a-zA-Z0-9 ._\-()[\]{}àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]+\.pdf$/i

/**
 * Assainit le nom de fichier client :
 * - Supprime les chemins (path traversal : ../../etc/passwd.pdf)
 * - Supprime les null bytes (evil.exe\x00.pdf)
 * - Limite la longueur
 * - Valide les caractères autorisés
 */
function sanitizeFilename(raw: string | undefined): string {
  if (!raw) return 'document.pdf'

  // Suppression des null bytes
  let name = raw.replace(/\0/g, '')

  // Garde uniquement le nom de base (supprime les segments de chemin)
  name = basename(name)

  // Limitation de longueur
  if (name.length > MAX_FILENAME_LENGTH) {
    name = name.slice(0, MAX_FILENAME_LENGTH)
  }

  // Validation des caractères : si le nom ne correspond pas au pattern,
  // on retourne un nom neutre plutôt que de risquer une injection
  if (!SAFE_FILENAME_RE.test(name)) {
    return 'document.pdf'
  }

  return name
}

export default class AnalyzeController {
  async handle({ request, response }: HttpContext) {
    // 1. Récupération et validation AdonisJS (extension + taille)
    const file = request.file('file', {
      size: '20mb',
      extnames: ['pdf'],
    })

    if (!file) {
      return response.badRequest({ error: 'Aucun fichier fourni.' })
    }

    if (file.hasErrors) {
      return response.badRequest({ error: file.errors[0]?.message ?? 'Fichier invalide.' })
    }

    // 2. Vérification du Content-Type déclaré par le client
    //    (non suffisant seul, mais ajoute une couche de filtrage rapide)
    const clientMime = file.type ? `${file.type}/${file.subtype}` : ''
    if (clientMime && clientMime !== 'application/pdf') {
      return response.unsupportedMediaType({ error: 'Type MIME non autorisé. Seuls les PDF sont acceptés.' })
    }

    // 3. Assainissement du nom de fichier
    const safeFilename = sanitizeFilename(file.clientName)

    if (!file.tmpPath) {
      return response.badRequest({ error: 'Fichier temporaire introuvable.' })
    }

    // 4. Lecture en mémoire puis suppression du fichier temporaire
    let data: Buffer
    try {
      data = await readFile(file.tmpPath)
    } catch {
      return response.internalServerError({ error: 'Impossible de lire le fichier uploadé.' })
    } finally {
      // Nettoyage immédiat du fichier temporaire sur disque
      unlink(file.tmpPath).catch(() => {})
    }

    // 5. Double vérification taille (defense in depth)
    if (data.length > MAX_SIZE_BYTES) {
      return response.requestEntityTooLarge({ error: 'Fichier trop volumineux (max 20 Mo).' })
    }

    // 6. Vérification magic bytes réels
    //    %PDF = 0x25 0x50 0x44 0x46
    //    Bloque tout fichier renommé qui ne commence pas par %PDF
    if (data.length < 4 || !data.subarray(0, 4).equals(PDF_MAGIC)) {
      return response.unprocessableEntity({ error: "Le fichier n'est pas un PDF valide." })
    }

    // 7. Forwarding interne vers le micro-service Python
    //    Le nom de fichier assaini est transmis, jamais le nom brut du client
    const form = new FormData()
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer
    form.append('file', new Blob([arrayBuffer], { type: 'application/pdf' }), safeFilename)

    let pyResponse: Response
    try {
      pyResponse = await fetch(`${env.get('ANALYZER_URL')}/analyze`, {
        method: 'POST',
        body: form,
        signal: AbortSignal.timeout(15_000),
      })
    } catch (err) {
      if (err instanceof Error && err.name === 'TimeoutError') {
        return response.gatewayTimeout({ error: "Le service d'analyse a mis trop de temps à répondre." })
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

    const result = await pyResponse.json()
    return response.json(result)
  }
}
