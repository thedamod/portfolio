import { createFileRoute, Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AnimatedQuote, MotionSection, StaggerGroup, StaggerItem } from '../components/portfolio-motion'
import { GitHubHeatmap } from '../components/github-heatmap'
import { DitherSky } from '../components/dither-sky'
import { SiteMasthead } from '../components/site-masthead'
import { ProjectGallery } from '../components/project-gallery'
import { smoothEase } from '../components/motion-utils'
import { getRecentBlogs } from '../content/blog-metadata'
import { patentWork, profile, homepageProjects, siteDescription, skillGroups, socialLinks, type Project } from '../content/portfolio'
import { getOgImageUrl } from '../lib/og'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Abhiram | Student | Founder' },
      {
        name: 'description',
        content: siteDescription,
      },
      { property: 'og:title', content: 'Abhiram | Student | Founder' },
      {
        property: 'og:description',
        content: siteDescription,
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: getOgImageUrl('Abhiram | Student | Founder', ['Portfolio', 'Avenire']) },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Abhiram | Student | Founder' },
      {
        name: 'twitter:description',
        content: siteDescription,
      },
      { name: 'twitter:image', content: getOgImageUrl('Abhiram | Student | Founder', ['Portfolio', 'Avenire']) },
    ],
  }),
  component: Index,
})

function DitherRule() {
  return <div aria-hidden="true" className="home-dither-rule" />
}

function MarginNote({ children }: { children: string }) {
  return <p className="home-margin-note">{children}<span aria-hidden="true" /></p>
}

function Index() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const blogCardClass = 'group flex flex-col gap-2 p-4 -mx-4 dither-card'
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
      <div className="home-hero">
        <DitherSky />
        <SiteMasthead home />
        <div className="home-identity">
          <img
            src={profile.image}
            alt=""
            width="48"
            height="48"
            decoding="async"
            className="h-12 w-12 rounded-md border border-app-border object-cover"
          />
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.role}</p>
          </div>
        </div>
      </div>

      <MotionSection className="home-intro-shell">
        <div>
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
                I’m a student who loves <em className="text-app-heading">physics</em> and builds at the intersection of{' '}
                <em className="text-app-heading">machine learning</em> and{' '}
                <em className="text-app-heading">engineering</em>.
              </p>
            </motion.div>
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              I'm studying <em className="text-app-heading">MSc Economics</em> at the{' '}
              <em className="text-app-heading">BITS Pilani Hyderabad campus</em>, and I'm a{' '}
              <em className="text-app-heading">full-stack engineer</em> and founder building{' '}
              <a href="https://avenire.space" className="site-text-link">Avenire</a>
              .
            </motion.p>
            <motion.div className="home-annotated" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              <p>
                I’m reading the <em className="text-app-heading">Deep Residual Learning</em> paper and working on a model for{' '}
                <em className="text-app-heading">crypto puzzles</em>.
              </p>
              <MarginNote>On my desk right now</MarginNote>
            </motion.div>
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              Off the clock: a <em className="text-app-heading">rover</em>, Koenigseggs, and the{' '}
              guitar.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
              <a href={socialLinks[0]?.href} className="site-text-link">{socialLinks[0]?.value}</a>{' '}
              ·{' '}
              <a href={socialLinks[1]?.href} className="site-text-link">{socialLinks[1]?.value}</a>{' '}
              ·{' '}
              <a href={socialLinks[2]?.href} className="site-text-link">{socialLinks[2]?.value}</a>
            </motion.p>
          </motion.div>
        </div>
      </MotionSection>

      <MotionSection id="crafts" className="flex flex-col pt-6">
        <DitherRule />
        <h2 className="text-xl font-bold py-6">Projects</h2>
        <DitherRule />
        <StaggerGroup className="flex flex-col gap-1 pt-6">
          {homepageProjects.map((project) => (
            <ProjectRow
              key={project.title}
              project={project}
              isSelected={selectedProject?.title === project.title}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </StaggerGroup>
        <div className="flex justify-center mt-6">
          <Link to="/projects" viewTransition={{ types: ['route-forward'] }} className="btn-secondary">
            View all ↗
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="flex flex-col pt-12">
        <DitherRule />
        <h2 className="text-xl font-bold py-6">GitHub Activity</h2>
        <DitherRule />
        <div className="home-annotated pt-6">
          <GitHubHeatmap username="thedamod" />
          <MarginNote>Each square is a day</MarginNote>
        </div>
      </MotionSection>

      <MotionSection className="flex flex-col pt-12">
        <DitherRule />
        <div className="flex flex-col gap-5 py-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-app-text-subtle">{patentWork.meta}</span>
            <h2 className="mt-2 text-xl font-bold text-app-heading">{patentWork.title}</h2>
          </div>
        </div>
        <DitherRule />
        <div className="flex max-w-[38rem] flex-col gap-4 pt-6 text-sm leading-7 text-app-text-muted">
          <p>{patentWork.body}</p>
          <a
            href={patentWork.href}
            className="inline-flex w-fit text-xs font-semibold uppercase tracking-[0.18em] text-app-heading transition-colors hover:text-app-text"
          >
            View patent record ↗
          </a>
        </div>
      </MotionSection>

      <MotionSection className="flex flex-col pt-12">
        <DitherRule />
        <h2 className="text-xl font-bold py-6">Skills & Technology</h2>
        <DitherRule />
        <StaggerGroup className="flex flex-col gap-4 pt-6">
          {Object.entries(skillGroups).map(([group, skills]) => (
            <TickerRow key={group} label={group} skills={skills} reverse={group === 'Backend'} />
          ))}
        </StaggerGroup>
      </MotionSection>

      <MotionSection className="flex flex-col pt-12">
        <DitherRule />
        <div className="flex items-center justify-between py-6">
          <h2 className="text-xl font-bold">Blogs</h2>
          <Link
            to="/blog"
            viewTransition={{ types: ['route-forward'] }}
            className="p-2 -mr-2 rounded-sm hover:bg-app-surface-2 transition-colors interact-hover"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <DitherRule />
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

      <DitherRule />

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
        aria-haspopup="dialog"
        disabled={isSelected}
        aria-hidden={isSelected}
        className="relative z-10 group flex w-full items-start sm:items-center gap-4 dither-card p-3 text-left disabled:pointer-events-none disabled:opacity-0"
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
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-app-border/80 bg-app-surface-2 text-app-text-muted">
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative z-[80] w-full max-w-6xl max-h-[88vh] overflow-hidden rounded-lg bg-app-modal-surface shadow-2xl project-modal-surface"
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
                  <motion.h3 id="project-modal-title" layout className="text-3xl font-bold tracking-tight text-app-heading">
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
                className="dither-control relative overflow-hidden rounded-full border border-app-modal-border bg-app-surface-2 px-3 py-2 text-xs text-app-text-muted transition-colors hover:bg-app-surface-hover hover:text-app-heading"
              >
                Close
              </button>
            </motion.div>

            {project.screenshots?.length ? (
              <div className="space-y-3">
                <ProjectGallery screenshots={project.screenshots} projectTitle={project.title} />
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.22em] text-app-accent hover:text-app-heading transition-colors"
                    >
                      Visit site <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {project.sourceUrl ? (
                    <a
                      href={project.sourceUrl}
                      className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.22em] text-app-accent hover:text-app-heading transition-colors"
                    >
                      Source <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-app-surface-2 project-modal-item">
                <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-app-bg/55 via-app-bg/10 to-transparent" />
              </div>
            )}

            <ol className="project-modal-divider relative list-decimal space-y-3 pl-5 pt-5 text-sm leading-6 text-app-text-muted marker:text-app-accent-soft">
              {project.details.map((item) => (
                <li key={item} className="pl-2">
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <motion.div layout className="project-modal-divider relative flex flex-wrap gap-2 pt-5">
              {project.tags.map((tag) => (
                <motion.span layout key={tag} className="pill border border-app-accent-soft/25 bg-app-surface-2 text-app-accent-soft">
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
