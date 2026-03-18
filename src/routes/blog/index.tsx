import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft } from 'lucide-react'
import { MotionSection, StaggerGroup, StaggerItem } from '../../components/portfolio-motion'
import { smoothEase } from '../../components/motion-utils'

export const Route = createFileRoute('/blog/')({
  component: BlogList,
})

function BlogList() {
  // Load blog posts dynamically
  type BlogFrontmatter = { title?: string, date?: string, tags?: string[] }
  const mdxModules = import.meta.glob('../../content/blog/*.mdx', { eager: true }) as Record<string, { frontmatter?: BlogFrontmatter }>
  const blogs = Object.entries(mdxModules).map(([path, module]) => {
    const slug = path.split('/').pop()?.replace('.mdx', '') || ''
    const frontmatter = module.frontmatter || {}
    return { slug, ...frontmatter }
  })
  const blogCardClass = 'group flex flex-col gap-2 p-4 -mx-4 rounded-xl hover:bg-app-surface-hover transition-colors interact-hover'
  const blogTagClass = 'pill px-2 py-0.5 text-[10px]'

  return (
    <main className="flex flex-col text-sm leading-relaxed pb-12">
      {/* Decorative top dot grid */}
      <div className="w-full h-32 md:h-48 dot-bg shrink-0" />

      <MotionSection className="flex flex-col">
        <div className="dashed-h" />
        <motion.div
          className="flex items-center gap-4 py-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 1 }, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } }}
        >
          <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-app-surface-2 transition-colors interact-hover">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <motion.h1 className="text-2xl font-bold tracking-tight" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>Blogs</motion.h1>
        </motion.div>
        <div className="dashed-h" />

        <StaggerGroup className="flex flex-col gap-4 pt-6">
          {blogs.map((blog) => (
            <StaggerItem key={blog.slug}>
              <Link key={blog.slug} to="/blog/$slug" params={{ slug: blog.slug }} className={blogCardClass}>
                <h3 className="text-base font-semibold group-hover:underline line-clamp-2">{blog.title || blog.slug}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-app-text-subtle">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date || 'Recent'}</span>
                  <div className="flex items-center gap-2">
                    {(blog.tags || []).map((tag: string) => (
                      <span key={tag} className={blogTagClass}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </MotionSection>

      {/* Decorative bottom dot grid */}
      <div className="w-full h-32 md:h-48 dot-bg shrink-0 mt-12" />
    </main>
  )
}
