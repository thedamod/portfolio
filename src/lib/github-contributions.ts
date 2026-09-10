export type ContributionDay = {
  date: string // YYYY-MM-DD
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export type ContributionsYear = {
  year: number
  total: number
  days: ContributionDay[]
}

type ApiResponse = {
  total: Record<string, number>
  contributions: Array<{ date: string; count: number; level: number }>
}

export async function fetchGitHubContributions(
  username: string,
  year: number,
  signal?: AbortSignal,
): Promise<ContributionsYear> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${year}`,
    { signal },
  )
  if (!res.ok) {
    throw new Error(`GitHub contributions request failed (${res.status})`)
  }
  const json = (await res.json()) as ApiResponse
  const days: ContributionDay[] = (json.contributions ?? [])
    .filter((d) => d.date.startsWith(`${year}-`))
    .map((d) => ({
      date: d.date,
      count: d.count ?? 0,
      level: Math.max(0, Math.min(4, d.level ?? 0)) as ContributionDay['level'],
    }))
    .sort((a, b) => (a.date < b.date ? -1 : 1))

  const total =
    typeof json.total?.[String(year)] === 'number'
      ? json.total[String(year)]
      : days.reduce((sum, d) => sum + d.count, 0)

  return { year, total, days }
}
