import { useEffect, useState } from 'react'

export interface Stats {
  count: number
  totalBytes: number
}

export function useStats(): Stats | null {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats')
        if (res.ok) setStats((await res.json()) as Stats)
      } catch {}
    }

    fetchStats()
    const interval = setInterval(fetchStats, 3_000)
    return () => clearInterval(interval)
  }, [])

  return stats
}
