import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { fetchGitHubContributions, type ContributionDay } from '@/lib/github-contributions'

type Props = {
  username?: string
  year?: number
  className?: string
}

const CELL = 12
const GAP = 3
const WEEK_STARTS_ON = 1 // Monday, like the shadcn heatmap default
const WEEKDAY_INDICES = [1, 3, 5] // Tue / Thu / Sat

// Intensity scale derived from the app theme (neutral base + accent ramp)
const LEVEL_CLASSES = [
  'bg-app-surface-2',
  'bg-app-accent/25',
  'bg-app-accent/45',
  'bg-app-accent/70',
  'bg-app-accent',
]

function toKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function addDays(d: Date, days: number): Date {
  const x = new Date(d)
  x.setDate(x.getDate() + days)
  return x
}

function startOfWeek(d: Date, weekStartsOn: 0 | 1): Date {
  const x = startOfDay(d)
  const diff = (x.getDay() - weekStartsOn + 7) % 7
  x.setDate(x.getDate() - diff)
  return x
}

function weekdayLabel(index: number): string {
  const actualDay = (WEEK_STARTS_ON + index) % 7
  const base = new Date(Date.UTC(2024, 0, 7 + actualDay))
  return base.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase()
}

function formatLong(date: Date): string {
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function GitHubHeatmap({ username = 'thedamod', year, className }: Props) {
  const currentYear = new Date().getFullYear()
  const activeYear = year ?? currentYear

  const [days, setDays] = useState<ContributionDay[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetchGitHubContributions(username, activeYear, controller.signal)
      .then((res) => {
        setDays(res.days)
        setTotal(res.total)
        setLoading(false)
      })
      .catch((err) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Failed to load contributions')
        setLoading(false)
      })
    return () => controller.abort()
  }, [username, activeYear, retryKey])

  const { columns, monthLabels } = useMemo(() => {
    const valueMap = new Map(days.map((d) => [d.date, d]))
    const start = new Date(activeYear, 0, 1)
    const end = new Date(activeYear, 11, 31)
    const today = startOfDay(new Date())
    const firstWeek = startOfWeek(start, WEEK_STARTS_ON)
    const totalDays = Math.ceil((end.getTime() - firstWeek.getTime()) / 86400000) + 1
    const weekCount = Math.ceil(totalDays / 7)

    const cols: Array<
      Array<{ date: Date; key: string; inRange: boolean; future: boolean; day?: ContributionDay }>
    > = []
    for (let w = 0; w < weekCount; w++) {
      const col = []
      for (let d = 0; d < 7; d++) {
        const date = addDays(firstWeek, w * 7 + d)
        const key = toKey(date)
        const inRange = date >= start && date <= end
        col.push({
          date,
          key,
          inRange,
          future: inRange && date > today,
          day: inRange ? valueMap.get(key) : undefined,
        })
      }
      cols.push(col)
    }

    const labels: Array<{ colIndex: number; text: string }> = []
    let lastLabeled = -99
    cols.forEach((col, i) => {
      const first = col.find((c) => c.inRange)?.date ?? col[0].date
      const prev = i > 0 ? (cols[i - 1].find((c) => c.inRange)?.date ?? cols[i - 1][0].date) : null
      const changed = !prev || prev.getMonth() !== first.getMonth()
      if (changed && i - lastLabeled >= 3) {
        labels.push({ colIndex: i, text: first.toLocaleDateString(undefined, { month: 'short' }) })
        lastLabeled = i
      }
    })

    return { columns: cols, monthLabels: labels }
  }, [days, activeYear])

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-app-text-muted">
          {loading ? (
            'Loading contributions…'
          ) : error ? (
            'Could not load contributions'
          ) : (
            <>
              <span className="font-semibold text-app-heading">{total ?? 0}</span> contributions in{' '}
              {activeYear}
            </>
          )}
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-app-text-muted transition-colors hover:text-app-heading"
        >
          @{username} ↗
        </a>
      </div>

      {error ? (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-app-border bg-app-surface p-4 text-sm">
          <p className="text-app-text-muted">
            Couldn&apos;t fetch live data from GitHub ({error}). Your contributions are still on your
            profile.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="btn-secondary rounded-full text-xs"
            >
              Retry
            </button>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary rounded-full text-xs"
            >
              View profile ↗
            </a>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-1">
          <div className="w-max">
            {/* Month labels */}
            <div className="flex items-end" style={{ paddingLeft: 44 }}>
              <div
                className="relative"
                style={{ height: 18, width: columns.length * (CELL + GAP) - GAP }}
              >
                {loading
                  ? null
                  : monthLabels.map((m) => (
                      <div
                        key={m.colIndex}
                        className="absolute top-0 text-xs text-app-text-subtle"
                        style={{ left: m.colIndex * (CELL + GAP) }}
                      >
                        {m.text}
                      </div>
                    ))}
              </div>
            </div>

            <div className="flex">
              {/* Weekday labels */}
              <div className="mr-2 flex flex-col" style={{ gap: GAP }} aria-hidden="true">
                {Array.from({ length: 7 }).map((_, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex items-center justify-end text-[10px] text-app-text-subtle"
                    style={{ width: 36, height: CELL }}
                  >
                    {WEEKDAY_INDICES.includes(rowIdx) ? weekdayLabel(rowIdx) : ''}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div
                className="flex"
                style={{ gap: GAP }}
                role="grid"
                aria-label={`GitHub contributions ${activeYear}`}
              >
                {loading
                  ? Array.from({ length: 53 }).map((_, i) => (
                      <div key={i} className="flex flex-col" style={{ gap: GAP }}>
                        {Array.from({ length: 7 }).map((_, j) => (
                          <div
                            key={j}
                            className="animate-pulse rounded-[3px] bg-app-surface-2"
                            style={{ width: CELL, height: CELL }}
                          />
                        ))}
                      </div>
                    ))
                  : columns.map((col, i) => (
                      <div key={i} className="flex flex-col" style={{ gap: GAP }} role="rowgroup">
                        {col.map((cell) => {
                          const level = cell.day?.level ?? 0
                          const count = cell.day?.count ?? 0
                          const inert = !cell.inRange || cell.future
                          const tooltip = !cell.inRange
                            ? 'Outside range'
                            : cell.future
                              ? `${formatLong(cell.date)} — upcoming`
                              : `${count} contribution${count === 1 ? '' : 's'} on ${formatLong(cell.date)}`
                          return (
                            <div key={cell.key} className="group relative">
                              <div
                                role="gridcell"
                                aria-label={tooltip}
                                title={tooltip}
                                className={cn(
                                  'rounded-[3px] border border-app-border',
                                  LEVEL_CLASSES[level],
                                  inert && 'cursor-default opacity-30',
                                )}
                                style={{ width: CELL, height: CELL }}
                              />
                              {!inert && (
                                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 rounded-md border border-app-border bg-app-modal-surface px-2 py-1 text-[11px] whitespace-nowrap text-app-heading shadow-lg group-hover:block">
                                  <span className="font-semibold">{count}</span>{' '}
                                  <span className="text-app-text-muted">
                                    contribution{count === 1 ? '' : 's'}
                                  </span>
                                  <div className="text-app-text-subtle">{formatLong(cell.date)}</div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-app-text-subtle">
              <span>Less</span>
              {LEVEL_CLASSES.map((cls, i) => (
                <div
                  key={i}
                  className={cn('rounded-[3px] border border-app-border', cls)}
                  style={{ width: 10, height: 10 }}
                  aria-hidden="true"
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
