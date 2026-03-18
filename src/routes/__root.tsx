import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import React, { useEffect, useState } from 'react'
import 'katex/dist/katex.min.css'
import { CursorTrail } from '../components/portfolio-motion'
import { ThemeContext } from '../context/theme'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <ScrollRestoration />
      <CursorTrail />
      <div className="min-h-screen selection:bg-app-accent/30 selection:text-brand max-w-2xl mx-auto px-6 dashed-v-container relative isolate">
        <div className="grain-overlay" />
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  ),
})

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const storedTheme = window.localStorage.getItem('theme')
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark'
  })

  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    document.body.classList.toggle('dark', isDark)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const isDark = theme === 'dark'
    setTheme(isDark ? 'light' : 'dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    }
  }

  return (
    // Pass the toggle down or keep it global. Since it's a small app, we can just put the toggle button in the header.
    // For simplicity without context API, we'll just expose it via a custom event or let the page component handle it if needed.
    // Actually, looking at the design, the "Toggle theme" button is right below the name and "Freelancer" tag.
    // Let's just create a global context.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
