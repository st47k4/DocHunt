import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useT } from '~/i18n/context'
import { useStats } from '~/hooks/use_stats'

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, i)
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[i]}`
}

function AnimatedNumber({
  value,
  format = (n: number) => n.toLocaleString(),
}: {
  value: number
  format?: (n: number) => string
}) {
  const [displayed, setDisplayed] = useState(format(value))
  const prevRef = useRef(value)
  const rafRef = useRef<number | null>(null)
  const isFirst = useRef(true)

  useEffect(() => {
    // Premier rendu : affiche directement sans animation
    if (isFirst.current) {
      isFirst.current = false
      prevRef.current = value
      setDisplayed(format(value))
      return
    }

    const prev = prevRef.current
    prevRef.current = value
    if (prev === value) return

    const start = performance.now()
    const duration = 900

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayed(format(Math.round(prev + (value - prev) * eased)))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value])

  return <span>{displayed}</span>
}

export default function LiveStats() {
  const t = useT()
  const stats = useStats()

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-10"
    >
      <div className="max-w-2xl mx-auto px-6">
        <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-edge">
          <div className="bg-bg-secondary px-8 py-8 text-center border-r border-edge">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400 uppercase tracking-widest font-medium">
                live
              </span>
            </div>
            <div className="font-mono text-[36px] font-bold text-amber-brand leading-none mt-2">
              {stats === null ? (
                <span className="text-mute">—</span>
              ) : (
                <AnimatedNumber value={stats.count} />
              )}
            </div>
            <div className="text-[11px] text-mute uppercase tracking-widest mt-2">
              {t.liveStats.analyses}
            </div>
          </div>

          <div className="bg-bg-secondary px-8 py-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400 uppercase tracking-widest font-medium">
                live
              </span>
            </div>
            <div className="font-mono text-[36px] font-bold text-amber-brand leading-none mt-2">
              {stats === null ? (
                <span className="text-mute">—</span>
              ) : (
                <AnimatedNumber value={stats.totalBytes} format={formatBytes} />
              )}
            </div>
            <div className="text-[11px] text-mute uppercase tracking-widest mt-2">
              {t.liveStats.totalData}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
