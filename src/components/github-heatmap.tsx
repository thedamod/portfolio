import { useEffect, useState } from 'react'
import { Heatmap } from '@/components/dithercn/heatmap'
import { fetchGitHubContributions, type ContributionsYear } from '@/lib/github-contributions'
import { cn } from '@/lib/utils'

type Props = {
  username?: string
  year?: number
  className?: string
}

const contributionUnit = { one: 'contribution', other: 'contributions' }
const dayMs = 86_400_000

function ContributionCalendar({ report }: { report: ContributionsYear }) {
  const today = new Date().toISOString().slice(0, 10)
  const yearEnd = `${report.year}-12-31`
  const end = today.startsWith(`${report.year}-`) ? today : yearEnd
  const start = new Date(Date.UTC(report.year, 0, 1))
  const daysUntilEnd = (Date.parse(end) - start.getTime()) / dayMs
  const weeks = Math.max(1, Math.floor((daysUntilEnd + (start.getUTCDay() + 6) % 7) / 7) + 1)
  const data = report.days
    .filter(({ date }) => date <= end)
    .map(({ date, count }) => ({ date, value: count }))
  if (data[data.length - 1]?.date !== end) data.push({ date: end, value: 0 })

  return <Heatmap data={data} weeks={weeks} cell={2} animate={false} weekStart={1} unit={contributionUnit} color="--dither-chart" />
}

export function GitHubHeatmap({ username = 'thedamod', year, className }: Props) {
  const activeYear = year ?? new Date().getUTCFullYear()
  const [report, setReport] = useState<ContributionsYear>()
  const [error, setError] = useState(false)
  const [retryKey, setRetryKey] = useState(0)
  const profileUrl = `https://github.com/${encodeURIComponent(username)}`

  useEffect(() => {
    const controller = new AbortController()
    setReport(undefined)
    setError(false)
    fetchGitHubContributions(username, activeYear, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setReport(result)
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true)
      })
    return () => controller.abort()
  }, [username, activeYear, retryKey])

  return (
    <div className={cn('flex min-w-0 flex-col gap-3', className)}>
      <div className="grid min-h-10 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2 sm:min-h-5">
        <p className="text-sm text-app-text-muted" role="status">
          {report ? (
            <>
              <strong className="text-app-heading">{report.total.toLocaleString()}</strong> contributions in {report.year}
            </>
          ) : error ? 'Could not load contributions.' : 'Loading contributions…'}
        </p>
        <a href={profileUrl} target="_blank" rel="noreferrer" className="text-xs text-app-accent hover:underline">
          @{username} ↗
        </a>
      </div>

      <div className="min-h-32">
        {report ? <ContributionCalendar report={report} /> : error ? (
          <button type="button" className="btn-secondary self-start text-xs" onClick={() => setRetryKey((key) => key + 1)}>
            Retry
          </button>
        ) : (
          <div className="heatmap-placeholder h-32" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}
