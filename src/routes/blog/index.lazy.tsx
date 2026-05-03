import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Calendar, ArrowLeft, Clock } from 'lucide-react'
import { getSortedBlogs, formatDate } from '../../content/blog-metadata'

export const Route = createLazyFileRoute('/blog/')({
  component: BlogList,
})

function BlogList() {
  const sortedBlogs = getSortedBlogs().map((blog) => ({
    ...blog,
    readTime: blog.readTime || Math.ceil((blog.slug.length / 100) + 3),
  }))
  const blogCardClass = 'group flex flex-col gap-2 p-4 -mx-4 rounded-xl hover:bg-app-surface-hover transition-colors interact-hover'
  const blogTagClass = 'pill px-2 py-0.5 text-[10px]'

  return (
    <main className="flex flex-col text-sm leading-relaxed pb-12 scroll-top-mask">
      <div className="w-full h-10 md:h-14 dot-bg shrink-0" />

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
          <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
        </div>
        <div className="dashed-h" />

        <div className="flex flex-col gap-4 pt-6">
          {sortedBlogs.map((blog) => (
            <Link
              key={blog.slug}
              to="/blog/$slug"
              params={{ slug: blog.slug }}
              viewTransition={{ types: ['route-forward'] }}
              className={blogCardClass}
            >
              <h3 className="text-base font-semibold group-hover:underline line-clamp-2">{blog.title || blog.slug}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-app-text-subtle">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(blog.date)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}m</span>
                <div className="flex items-center gap-2 overflow-hidden min-w-0">
                  {(blog.tags || []).map((tag: string) => (
                    <span key={tag} className={blogTagClass}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="w-full h-10 md:h-14 dot-bg shrink-0 mt-10" />
    </main>
  )
}
