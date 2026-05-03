import { StrictMode } from 'react'
import { useEffect, useState } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { inject } from '@vercel/analytics'
import { createAppRouter, type AppRouter } from './router'

export function App() {
  const [router] = useState<AppRouter>(() => createAppRouter())

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
