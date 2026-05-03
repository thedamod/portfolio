import { createFileRoute, Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Moon, Sun, ArrowRight } from 'lucide-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { AnimatedQuote, MotionSection, StaggerGroup, StaggerItem } from '../components/portfolio-motion'
import { smoothEase } from '../components/motion-utils'
import { getRecentBlogs } from '../content/blog-metadata'
import { profile, projects, skillGroups, socialLinks, type Project } from '../content/portfolio'
import { ThemeContext } from '../context/theme'
import { getOgImageUrl } from '../lib/og'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Abhiram | Student | Founder' },
      {
        name: 'description',
        content: 'Student, physics enthusiast, and full-stack engineer building Avenire.space. Currently exploring ML, crypto puzzles, and building rovers.',
      },
      { property: 'og:title', content: 'Abhiram | Student | Founder' },
      {
        property: 'og:description',
        content: 'Student, physics enthusiast, and full-stack engineer building Avenire.space. Currently exploring ML, crypto puzzles, and building rovers.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: getOgImageUrl('Abhiram | Student | Founder', ['Portfolio', 'Avenire']) },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Abhiram | Student | Founder' },
      {
        name: 'twitter:description',
        content: 'Student, physics enthusiast, and full-stack engineer building Avenire.space. Currently exploring ML, crypto puzzles, and building rovers.',
      },
      { name: 'twitter:image', content: getOgImageUrl('Abhiram | Student | Founder', ['Portfolio', 'Avenire']) },
    ],
  }),
  component: Index,
})

function Index() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const blogCardClass = 'group flex flex-col gap-2 p-4 -mx-4 rounded-xl hover:bg-app-surface-hover transition-colors interact-hover'
  const blogTagClass = 'pill px-2 py-0.5 text-[10px]'
  const recentBlogs = getRecentBlogs(3)

  useEffect(() => {
    if (!selectedProject) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedProject])

  return (
    <main className="flex flex-col text-sm leading-relaxed">
      <div className="w-full h-10 md:h-14 dot-bg shrink-0" />

      <MotionSection className="home-intro-shell flex flex-col justify-start">
        <div className="flex flex-col gap-9">
          <motion.header
            className="flex items-start justify-between gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
            }}
          >
            <motion.div className="flex items-center gap-4" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              <img
                src={profile.image}
                alt={profile.name}
                width="48"
                height="48"
                loading="eager"
                decoding="async"
                className="h-12 w-12 rounded-lg border border-app-border object-cover object-center shadow-app-image"
              />
              <div>
                <h1 className="text-base font-semibold leading-tight text-app-heading">{profile.name}</h1>
                <p className="mt-1 text-sm text-app-text-muted">{profile.role}</p>
              </div>
            </motion.div>
            <motion.nav className="flex items-center gap-5 text-sm font-semibold text-app-heading" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              <Link to="/" className="hover:text-app-text transition-colors">Home</Link>
              <a href="#crafts" className="hover:text-app-text transition-colors">Crafts</a>
              <Link to="/blog" viewTransition={{ types: ['route-forward'] }} className="hover:text-app-text transition-colors">Writing</Link>
              <button
                onClick={toggleTheme}
                className="rounded-full p-1.5 text-app-text-muted hover:bg-app-surface-2 hover:text-app-heading transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </motion.nav>
          </motion.header>

          <motion.div
            className="flex max-w-[38rem] flex-col gap-6 text-[0.95rem] leading-7 text-app-text-muted"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.26 } },
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              <p>
                Hey, I'm{' '}
                <span className="hand-link group/link relative">
                  {profile.name}
                  <svg className="hand-link-svg" viewBox="0 0 140 9" aria-hidden="true">
                    <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294c5.5 2.5 12.5 3.0 18.5 1.5c6.5-1.5 15.5-3.0 22.5-1.0" pathLength="1" />
                  </svg>
                </span>
                , a student who loves{' '}
                <em className="text-app-heading">physics</em> and builds things at the intersection of{' '}
                <em className="text-app-heading">machine learning</em> and{' '}
                <em className="text-app-heading">engineering</em>.
              </p>
            </motion.div>
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              I'm a <em className="text-app-heading">full-stack engineer</em> and founder building{' '}
              <span className="hand-link group/link relative">
                <a href="https://avenire.space" className="text-app-heading font-semibold">Avenire</a>
                <svg className="hand-link-svg" viewBox="0 0 140 9" aria-hidden="true">
                  <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294c5.5 2.5 12.5 3.0 18.5 1.5c6.5-1.5 15.5-3.0 22.5-1.0" pathLength="1" />
                </svg>
              </span>{' '}
              — a learning platform I genuinely believe in. Currently reading the <em className="text-app-heading">Deep Residual Learning</em> paper by ResNet and post-training a model to get better at <em className="text-app-heading">crypto puzzles</em>.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              When I'm not coding, I'm building a <em className="text-app-heading">rover</em>, geeking out over <em className="text-app-heading">Koenigseggs</em>, or playing the{' '}
              <span className="word-guitar inline-block" style={{ animationDelay: '3.1s' }}>guitar</span>.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              You can reach me at{' '}
              <span className="hand-link group/link relative">
                <a href={socialLinks[1]?.href} className="text-app-heading font-semibold">@thedamod</a>
                <svg className="hand-link-svg" viewBox="0 0 140 9" aria-hidden="true">
                  <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294c5.5 2.5 12.5 3.0 18.5 1.5c6.5-1.5 15.5-3.0 22.5-1.0" pathLength="1" />
                </svg>
              </span>{' '}
              and via{' '}
              <span className="hand-link group/link relative">
                <a href="mailto:abhiram@damod.space" className="text-app-heading font-semibold">email</a>
                <svg className="hand-link-svg" viewBox="0 0 140 9" aria-hidden="true">
                  <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294c5.5 2.5 12.5 3.0 18.5 1.5c6.5-1.5 15.5-3.0 22.5-1.0" pathLength="1" />
                </svg>
              </span>{' '}
              or see my code on{' '}
              <span className="hand-link group/link relative">
                <a href={socialLinks[0]?.href} className="text-app-heading font-semibold">GitHub</a>
                <svg className="hand-link-svg" viewBox="0 0 140 9" aria-hidden="true">
                  <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294c5.5 2.5 12.5 3.0 18.5 1.5c6.5-1.5 15.5-3.0 22.5-1.0" pathLength="1" />
                </svg>
              </span>.
            </motion.p>
          </motion.div>
        </div>
      </MotionSection>

      <div className="w-full h-8 md:h-10 dot-bg shrink-0" />

      <MotionSection id="crafts" className="flex flex-col pt-6">
        <div className="dashed-h" />
        <h2 className="text-xl font-bold py-6">Projects</h2>
        <div className="dashed-h" />
        <StaggerGroup className="flex flex-col gap-1 pt-6">
          {projects.map((project) => (
            <ProjectRow
              key={project.title}
              project={project}
              isSelected={selectedProject?.title === project.title}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </StaggerGroup>
        <div className="flex justify-center mt-6">
          <Link to="/projects" viewTransition={{ types: ['route-forward'] }} className="btn-secondary rounded-full">
            View all ↗
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="flex flex-col pt-12">
        <div className="dashed-h" />
        <h2 className="text-xl font-bold py-6">Skills & Technology</h2>
        <div className="dashed-h" />
        <StaggerGroup className="flex flex-col gap-4 pt-6">
          {Object.entries(skillGroups).map(([group, skills]) => (
            <TickerRow key={group} label={group} skills={skills} reverse={group === 'Backend'} />
          ))}
        </StaggerGroup>
      </MotionSection>

      <MotionSection className="flex flex-col pt-12">
        <div className="dashed-h" />
        <div className="flex items-center justify-between py-6">
          <h2 className="text-xl font-bold">Blogs</h2>
          <Link
            to="/blog"
            viewTransition={{ types: ['route-forward'] }}
            className="p-2 -mr-2 rounded-full hover:bg-app-surface-2 transition-colors interact-hover"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="dashed-h" />
        <StaggerGroup className="flex flex-col gap-4 pt-6">
          {recentBlogs.map((blog) => (
            <StaggerItem key={blog.slug}>
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
            </StaggerItem>
          ))}
        </StaggerGroup>
      </MotionSection>

      <motion.footer
        className="pt-24 pb-24 text-center flex flex-col items-center justify-center text-app-text-muted gap-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: smoothEase }}
        viewport={{ once: true, amount: 0.45 }}
      >
        <AnimatedQuote
          quote="Doubt is a fog of your own making; the path becomes clear the moment you take the first step."
          author="Abhiram Damodara"
        />
      </motion.footer>

      <div className="w-full h-10 md:h-14 dot-bg shrink-0" />

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        ) : null}
      </AnimatePresence>
    </main>
  )
}

function TickerRow({ label, skills, reverse }: { label: string, skills: string[], reverse?: boolean }) {
  const [contentWidth, setContentWidth] = useState(0)
  const [setCount, setSetCount] = useState(6)
  const [offset, setOffset] = useState(0)
  const [initialized, setInitialized] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    if (contentRef.current) {
      const firstSet = contentRef.current.querySelector('[data-set="0"]')
      if (firstSet) {
        const width = firstSet.getBoundingClientRect().width
        setContentWidth(width)
        const viewportWidth = window.innerWidth
        const neededSets = Math.ceil(viewportWidth / width) + 2
        setSetCount(Math.max(neededSets, 4))
        if (reverse) {
          setOffset(-width)
        }
        setInitialized(true)
      }
    }
  }, [skills, reverse])

  useEffect(() => {
    if (contentWidth === 0 || !initialized) return

    const speed = 50
    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp
      }
      const delta = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      const distance = (speed * delta) / 1000
      setOffset((prev) => {
        if (reverse) {
          const next = prev + distance
          if (next >= 0) {
            return next - contentWidth
          }
          return next
        } else {
          const next = prev - distance
          if (next <= -contentWidth) {
            return next + contentWidth
          }
          return next
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [contentWidth, reverse, initialized])

  return (
    <StaggerItem>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[10px] uppercase tracking-[0.28em] text-app-text-subtle">{label}</h3>
          <span className="h-px flex-1 bg-app-border" />
        </div>
        <div className="ticker-track py-1">
          <div
            ref={contentRef}
            className="ticker-row"
            style={{ transform: `translate3d(${offset}px, 0, 0)` }}
          >
            {Array.from({ length: setCount }, (_, setIndex) => (
              <span key={setIndex} data-set={setIndex} className="ticker-set">
                {skills.map((skill, index) => (
                  <span key={`${setIndex}-${index}`} className="ticker-item text-sm whitespace-nowrap tracking-tight text-app-text-muted">
                    {skill}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </StaggerItem>
  )
}

function ProjectRow({
  project,
  isSelected,
  onSelect,
}: {
  project: Project
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <StaggerItem>
      <motion.button
        type="button"
        onClick={onSelect}
        layoutId={!isSelected ? `project-trigger-${project.title}` : undefined}
        layout
        disabled={isSelected}
        aria-hidden={isSelected}
        className="relative z-10 group flex w-full items-start sm:items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-app-surface-hover disabled:pointer-events-none disabled:opacity-0"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <motion.div layout className="flex items-center gap-2">
            <ProjectIcon icon={project.icon} title={project.title} />
            <motion.h3
              layout
              className="font-bold text-base text-app-heading"
            >
              {project.title}
            </motion.h3>
          </motion.div>
          <motion.p layout className="text-xs text-app-text-muted truncate">
            {project.summary}
          </motion.p>
        </div>
        <motion.div layout className="hidden sm:flex shrink-0 flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span layout key={tag} className="text-[10px] uppercase tracking-[0.18em] text-app-text-subtle">
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.button>
    </StaggerItem>
  )
}

function ProjectIcon({ icon, title }: { icon: string, title: string }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-app-border/80 bg-app-surface-2 text-app-text-muted">
      <img src={icon} alt={`${title} icon`} className="project-icon-img h-4 w-4 object-contain" />
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project, onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close project modal"
        className="absolute inset-0 bg-app-modal-backdrop"
        onClick={onClose}
      />
      <motion.div
        className="relative z-[80] w-full max-w-6xl max-h-[88vh] overflow-hidden rounded-lg bg-app-bg shadow-2xl project-modal-surface"
        layoutId={`project-trigger-${project.title}`}
        layout
        transition={{ layout: { duration: 0.22, ease: smoothEase } }}
      >
        <motion.div layout className="grid max-h-[88vh] lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div layout className="flex max-h-[88vh] flex-col gap-6 overflow-y-auto p-6 sm:p-8 lg:p-8 lg:col-span-2">
            <motion.div layout className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <motion.div layout className="mt-3 flex items-center gap-3">
                  <ProjectIcon icon={project.icon} title={project.title} />
                  <motion.h3 layout className="text-3xl font-bold tracking-tight text-app-heading">
                    {project.title}
                  </motion.h3>
                </motion.div>
                <motion.p layout className="mt-4 text-sm leading-7 text-app-text-muted">
                  {project.summary}
                </motion.p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-app-modal-border bg-app-surface-2 px-3 py-2 text-xs text-app-text-muted transition-colors hover:bg-app-surface-hover hover:text-app-heading"
              >
                Close
              </button>
            </motion.div>

            {project.liveUrl ? (
              <div className="space-y-3">
                <div className="relative w-full max-w-4xl aspect-[16/10] overflow-hidden rounded-lg bg-app-surface-2 project-modal-item">
                  <iframe
                    src={project.liveUrl}
                    title={`${project.title} preview`}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                  />
                </div>
                <a
                  href={project.liveUrl}
                  className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.22em] text-app-text-muted hover:text-app-heading transition-colors"
                >
                  Open preview <span aria-hidden="true">↗</span>
                </a>
              </div>
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-app-surface-2 project-modal-item">
                <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-app-bg/55 via-app-bg/10 to-transparent" />
              </div>
            )}

            <ol className="list-decimal space-y-3 border-t border-app-border pl-5 pt-5 text-sm leading-6 text-app-text-muted marker:text-app-accent-soft">
              {project.details.map((item) => (
                <li key={item} className="pl-2">
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <motion.div layout className="flex flex-wrap gap-2 border-t border-app-border pt-5">
              {project.tags.map((tag) => (
                <motion.span layout key={tag} className="pill rounded-full border border-app-accent-soft/25 bg-app-surface-2 text-app-accent-soft">
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
