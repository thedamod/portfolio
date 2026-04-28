import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { projects } from '../../content/portfolio'

export const Route = createLazyFileRoute('/projects/')({
  component: ProjectsList,
})

function ProjectIcon({ icon, title }: { icon: string, title: string }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-app-border/80 bg-app-surface-2 text-app-text-muted">
      <img src={icon} alt={`${title} icon`} className="h-4 w-4 object-contain" />
    </div>
  )
}

function ProjectsList() {
  const projectCardClass = 'group flex flex-col gap-3 p-4 -mx-4 rounded-xl hover:bg-app-surface-hover transition-colors interact-hover'
  const projectTagClass = 'pill px-2 py-0.5 text-[10px]'

  return (
    <main className="flex flex-col text-sm leading-relaxed pb-12">
      <div className="w-full h-32 md:h-48 dot-bg shrink-0" />

      <section className="flex flex-col">
        <div className="dashed-h" />
        <div className="flex items-center gap-4 py-6">
          <Link
            to="/"
            viewTransition={{ types: ['route-back'] }}
            className="p-2 -ml-2 rounded-full hover:bg-app-surface-2 transition-colors interact-hover"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        </div>
        <div className="dashed-h" />

        <div className="flex flex-col gap-4 pt-6">
          {projects.map((project) => (
            <article key={project.title} className={projectCardClass}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex items-center gap-2">
                  <ProjectIcon icon={project.icon} title={project.title} />
                  <h3 className="text-base font-semibold text-app-heading">{project.title}</h3>
                </div>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-app-text-muted hover:text-app-heading transition-colors"
                  >
                    Open <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : null}
              </div>

              <p className="text-sm text-app-text-muted leading-relaxed">{project.summary}</p>

              <div className="flex flex-wrap items-center gap-2 text-xs text-app-text-subtle">
                {project.tags.map((tag) => (
                  <span key={tag} className={projectTagClass}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="w-full h-32 md:h-48 dot-bg shrink-0 mt-12" />
    </main>
  )
}
