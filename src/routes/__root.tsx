import { createRootRoute, Outlet, Link, useLocation } from '@tanstack/react-router'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { getSortedBlogs } from '../content/blog-metadata'
import { ThemeContext } from '../context/theme'
import { smoothEase } from '../components/motion-utils'

const allBlogs = getSortedBlogs()
const DeferredToaster = lazy(async () => {
  const module = await import('sonner')
  return { default: module.Toaster }
})

function NotFoundComponent() {
  const blogCardClass = 'group flex flex-col gap-2 p-4 -mx-4 rounded-xl hover:bg-app-surface-hover transition-colors interact-hover'
  const blogTagClass = 'pill px-2 py-0.5 text-[10px]'

  return (
    <main className="flex flex-col items-center text-center px-6 py-12">
      <motion.pre
        className="text-[0.45rem] sm:text-[0.55rem] md:text-xs font-mono text-app-heading leading-tight overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      >
{`█████╗ ██████╗ ██╗  ██╗██╗██████╗  █████╗ ███╗   ███╗
██╔══██╗██╔══██╗██║  ██║██║██╔══██╗██╔══██╗████╗ ████║
███████║██████╔╝███████║██║██████╔╝███████║██╔████╔██║
██╔══██║██╔══██╗██╔══██║██║██╔══██╗██╔══██║██║╚██╔╝██║
██║  ██║██████╔╝██║  ██║██║██║  ██║██║  ██║██║ ╚═╝ ██║
╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝`}
      </motion.pre>
      <motion.p
        className="mt-6 text-lg text-app-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        --- 404 - Not Found ---
      </motion.p>
      <motion.div
        className="flex gap-4 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3, ease: smoothEase }}
      >
        <Link to="/" className="btn-secondary rounded-full">
          Go home
        </Link>
        <Link to="/blog" className="btn-secondary rounded-full">
          View blogs
        </Link>
      </motion.div>

      {allBlogs.length > 0 && (
        <motion.div
          className="w-full mt-12 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: smoothEase }}
        >
          <h2 className="text-lg font-bold mb-4 text-center">Or check out these posts:</h2>
          <div className="flex flex-col gap-4">
            {allBlogs.map((blog) => (
              <Link key={blog.slug} to="/blog/$slug" params={{ slug: blog.slug }} className={blogCardClass}>
                <h3 className="text-base font-semibold group-hover:underline line-clamp-2">{blog.title || blog.slug}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-app-text-subtle">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {blog.date || 'Recent'}
                  </span>
                  <div className="flex items-center gap-2 overflow-hidden min-w-0">
                    {(blog.tags || []).map((tag: string) => (
                      <span key={tag} className={blogTagClass}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </main>
  )
}

export const Route = createRootRoute({
  notFoundComponent: NotFoundComponent,
  component: () => (
    <ThemeProvider>
      <RootShell>
        <div className="grain-overlay" />
        <div className="relative z-10">
          <Outlet />
        </div>
        <ClientEnhancements />
      </RootShell>
    </ThemeProvider>
  ),
})

function RootShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const shellWidthClass = pathname.startsWith('/stories/') ? 'max-w-4xl' : 'max-w-2xl'

  return (
    <div className={`min-h-screen selection:bg-app-accent/30 selection:text-brand mx-auto px-6 dashed-v-container relative isolate ${shellWidthClass}`}>
      {children}
    </div>
  )
}

function ClientEnhancements() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const schedule = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 1))
    const cancel = window.cancelIdleCallback ?? window.clearTimeout
    const handle = schedule(() => {
      setReady(true)
    })

    return () => {
      cancel(handle)
    }
  }, [])

  if (!ready) {
    return null
  }

  return (
    <>
      <Suspense fallback={null}>
        <DeferredToaster richColors position="top-center" />
      </Suspense>
    </>
  )
}

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
