import { StrictMode } from 'react'
import { useEffect, useState } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { inject } from '@vercel/analytics'
import { createAppRouter, createServerRouter, type AppRouter } from './router'

type AppProps = {
  initialUrl?: string
  router?: AppRouter
}

export function App({ initialUrl = '/', router: providedRouter }: AppProps) {
  const [router] = useState<AppRouter>(() => {
    if (providedRouter) {
      return providedRouter
    }

    if (typeof window === 'undefined') {
      return createServerRouter(initialUrl)
    }

    return createAppRouter()
  })

  useEffect(() => {
    inject()
  }, [])

  return (
    <StrictMode>
      <RouterProvider router={router} />
      <SpeedInsights />
    </StrictMode>
  )
}
