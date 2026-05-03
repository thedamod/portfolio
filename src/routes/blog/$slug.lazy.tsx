import { createLazyFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Menu } from 'lucide-react'
import { MDXProvider } from '@mdx-js/react'
import { motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from 'react'
import { MermaidDiagram } from '../../components/mdx/MermaidDiagram'
import { smoothEase } from '../../components/motion-utils'
import { formatDate } from '../../content/blog-metadata'
import 'katex/dist/katex.min.css'

type BlogFrontmatter = { title?: string; date?: string; tags?: string[]; description?: string }
type BlogModule = { default: React.ComponentType; frontmatter?: BlogFrontmatter }

const katexFonts = `
/* Match KaTeX to blog's monospace typography */
.katex {
  font-family: var(--font-mono) !important;
  font-weight: inherit !important;
  font-size: 1em !important;
  line-height: inherit !important;
  color: inherit !important;
}
.katex * {
  font-family: var(--font-mono) !important;
  font-weight: inherit !important;
}
.katex .mord,
.katex .mbin,
.katex .mrel,
.katex .mopen,
.katex .mclose,
.katex .mpunct,
.katex .minner {
  font-weight: inherit !important;
}
`

const mdxModules = import.meta.glob('../../content/blog/*.mdx') as Record<string, () => Promise<BlogModule>>
const eagerMdxModules = import.meta.env.SSR
  ? import.meta.glob('../../content/blog/*.mdx', { eager: true }) as Record<string, BlogModule>
  : {}

type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

function getBlogImporter(slug: string) {
  const decodedSlug = decodeURIComponent(slug)
  const blogPath = `../../content/blog/${decodedSlug}.mdx`
  return mdxModules[blogPath]
}

function getEagerBlogModule(slug: string) {
  const decodedSlug = decodeURIComponent(slug)
  const blogPath = `../../content/blog/${decodedSlug}.mdx`
  return eagerMdxModules[blogPath]
}

function slugifyHeading(value: ReactNode) {
  const flatten = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') {
      return String(node)
    }

    if (Array.isArray(node)) {
      return node.map(flatten).join(' ')
    }

    if (!node || typeof node !== 'object') {
      return ''
    }

    return flatten((node as { props?: { children?: ReactNode } }).props?.children)
  }

  return flatten(value)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const mdxComponents = {
  h2: ({ children, id, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 id={id || slugifyHeading(children)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 id={id || slugifyHeading(children)} {...props}>
      {children}
    </h3>
  ),
  table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-app-border">
      <table className="min-w-full divide-y divide-app-border" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-app-surface-2" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className="divide-y divide-app-border bg-app-surface" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="even:bg-app-surface odd:bg-app-surface/80" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-app-heading uppercase tracking-wider border-b border-app-border" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-3 text-sm text-app-text whitespace-normal" {...props}>
      {children}
    </td>
  ),
  figure: ({ children, ...props }: ComponentPropsWithoutRef<'figure'> & { 'data-rehype-pretty-code-figure'?: unknown }) => {
    if ('data-rehype-pretty-code-figure' in props) {
      let isMermaid = false
      let rawCode = ''

      const traverse = (node: ReactNode) => {
        if (typeof node === 'string') {
          rawCode += node
          return
        }

        if (Array.isArray(node)) {
          node.forEach(traverse)
          return
        }

        if (!node || typeof node !== 'object') {
          return
        }

        const nextProps = (node as { props?: { ['data-language']?: string; children?: ReactNode } }).props
        if (nextProps?.['data-language'] === 'mermaid') {
          isMermaid = true
        }

        if (nextProps?.children) {
          traverse(nextProps.children)
        }
      }

      traverse(children)

      if (isMermaid) {
        return <MermaidDiagram code={rawCode.trim()} />
      }

      return <figure {...props}>{children}</figure>
    }

    return <figure {...props}>{children}</figure>
  },
}

export const Route = createLazyFileRoute('/blog/$slug')({
  component: BlogPost,
})

function BlogPost() {
  const { slug } = Route.useParams()
  const frontmatter = (Route.useLoaderData() || {}) as BlogFrontmatter
  const importer = getBlogImporter(slug)
  const eagerPost = getEagerBlogModule(slug)?.default
  const articleRef = useRef<HTMLElement>(null)
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeHeadingId, setActiveHeadingId] = useState('')

  if (!importer) {
    throw notFound()
  }

  const Post = useMemo(
    () =>
      eagerPost || lazy(async () => {
        const blog = await importer()
        return { default: blog.default }
      }),
    [eagerPost, importer],
  )

  useEffect(() => {
    const article = articleRef.current
    if (!article) {
      return
    }

    const collectHeadings = () => {
      const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]'))
      setTocItems(headings.map((heading) => ({
        id: heading.id,
        text: heading.textContent?.trim() || heading.id,
        level: heading.tagName === 'H3' ? 3 : 2,
      })))
    }

    collectHeadings()
    const observer = new MutationObserver(collectHeadings)
    observer.observe(article, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [slug])

  useEffect(() => {
    const article = articleRef.current
    if (!article || tocItems.length === 0) {
      return
    }

    const headingElements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (headingElements.length === 0) {
      return
    }

    const updateActiveHeading = () => {
      const targetLine = window.innerHeight * 0.28
      const current = headingElements.reduce((best, heading) => {
        const distance = heading.getBoundingClientRect().top - targetLine
        if (distance <= 0 && distance > best.distance) {
          return { id: heading.id, distance }
        }
        return best
      }, { id: headingElements[0].id, distance: Number.NEGATIVE_INFINITY })

      if (current.distance === Number.NEGATIVE_INFINITY) {
        const upcoming = headingElements.find((heading) => heading.getBoundingClientRect().top > 0)
        setActiveHeadingId(upcoming?.id || headingElements[0].id)
        return
      }

      setActiveHeadingId(current.id)
    }

    updateActiveHeading()
    const observer = new IntersectionObserver(updateActiveHeading, {
      rootMargin: '-18% 0px -62% 0px',
      threshold: [0, 0.25, 0.6, 1],
    })

    headingElements.forEach((heading) => observer.observe(heading))
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    window.addEventListener('resize', updateActiveHeading)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateActiveHeading)
      window.removeEventListener('resize', updateActiveHeading)
    }
  }, [tocItems])

  return (
    <main className="flex flex-col text-sm leading-relaxed pb-12 scroll-top-mask">
      <style>{katexFonts}</style>
      <div className="w-full h-10 md:h-14 dot-bg shrink-0" />

      <section className="mx-auto flex w-full max-w-6xl flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_12rem_minmax(0,39rem)_12rem_minmax(0,1fr)]">
        <div className="dashed-v-container mx-auto w-full max-w-[39rem] px-5 sm:px-6 lg:col-start-3 lg:row-start-1">
          <div className="dashed-h-local" />
          <div className="flex flex-col gap-6 py-5 md:py-6">
            <Link to="/blog" viewTransition={{ types: ['route-back'] }} className="btn-secondary rounded-full self-start">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to blogs</span>
            </Link>

            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{frontmatter.title || slug}</h1>
              <div className="flex items-center gap-4 text-sm text-app-text-muted">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(frontmatter.date || '')}</span>
              </div>
            </div>
          </div>
          <div className="dashed-h-local" />

          <article ref={articleRef} className="blog-content prose max-w-none rounded-xl prose-p:leading-relaxed prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight pt-6 pb-12">
            <Suspense fallback={null}>
              <MDXProvider components={mdxComponents}>
                <Post />
              </MDXProvider>
            </Suspense>
          </article>

          <div className="flex justify-between items-center text-sm text-app-text-muted pt-4 pb-8">
            <span>- Abhiram</span>
            <span>--- fin ---</span>
          </div>
        </div>
        <TableOfContents items={tocItems} activeHeadingId={activeHeadingId} />
      </section>

      <div className="w-full h-10 md:h-14 dot-bg shrink-0" />
    </main>
  )
}

function TableOfContents({ items, activeHeadingId }: { items: TocItem[], activeHeadingId: string }) {
  if (items.length === 0) {
    return null
  }

  return (
    <motion.aside
      className="toc-rail order-first border-b border-app-border px-5 py-5 sm:px-6 lg:order-none lg:sticky lg:top-8 lg:col-start-4 lg:row-start-1 lg:h-fit lg:w-48 lg:border-b-0 lg:px-0 lg:pl-8 lg:pt-7"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: smoothEase }}
    >
      <motion.div className="mb-4 flex items-center gap-3 text-xs font-semibold text-app-heading" layout>
        <Menu className="h-4 w-4" />
        <span>On this page</span>
      </motion.div>
      <nav aria-label="On this page" className="flex flex-col">
        {items.map((item, index) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            className={`toc-link ${item.level === 3 ? 'ml-4 text-app-text-subtle' : ''}`}
            data-active={activeHeadingId === item.id}
            style={{ '--toc-line-width': item.level === 3 ? '0.82rem' : '1.35rem' } as CSSProperties}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.025, ease: smoothEase }}
          >
            {item.text}
          </motion.a>
        ))}
      </nav>
    </motion.aside>
  )
}
