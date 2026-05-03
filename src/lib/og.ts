const fallbackOrigin = 'https://damod.space'

export function getSiteOrigin() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  if (process.env.SITE_URL) {
    return process.env.SITE_URL
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return fallbackOrigin
}

export function getOgImageUrl(title: string, tags: string[] = []) {
  const params = new URLSearchParams({ title })

  if (tags.length > 0) {
    params.set('tags', tags.join(','))
  }

  return `${getSiteOrigin()}/api/og?${params.toString()}`
}
