import { EventEmitter } from 'node:events'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const FILE = join(process.cwd(), 'tmp', 'stats.json')

export interface Stats {
  count: number
  totalBytes: number
}

class StatsService extends EventEmitter {
  #cache: Stats = { count: 0, totalBytes: 0 }
  #flushTimer: NodeJS.Timeout | null = null
  #ready: Promise<void>

  constructor() {
    super()
    this.setMaxListeners(0)
    this.#ready = this.#load()
  }

  async #load(): Promise<void> {
    try {
      const raw = await readFile(FILE, 'utf-8')
      const parsed = JSON.parse(raw)
      this.#cache = {
        count: Number.isFinite(parsed?.count) && parsed.count >= 0 ? Math.floor(parsed.count) : 0,
        totalBytes:
          Number.isFinite(parsed?.totalBytes) && parsed.totalBytes >= 0
            ? Math.floor(parsed.totalBytes)
            : 0,
      }
    } catch {
      this.#cache = { count: 0, totalBytes: 0 }
    }
  }

  #scheduleFlush(): void {
    if (this.#flushTimer) return
    this.#flushTimer = setTimeout(async () => {
      this.#flushTimer = null
      try {
        await writeFile(FILE, JSON.stringify(this.#cache), 'utf-8')
      } catch (err) {
        console.error('[stats] write failed:', err)
      }
    }, 500)
  }

  async increment(bytes: number): Promise<void> {
    await this.#ready
    this.#cache.count += 1
    this.#cache.totalBytes += bytes
    this.#scheduleFlush()
    this.emit('update', { ...this.#cache })
  }

  async getStats(): Promise<Stats> {
    await this.#ready
    return { ...this.#cache }
  }
}

export default new StatsService()
