import { createLazyFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Calendar } from 'lucide-react'
import { MDXProvider } from '@mdx-js/react'
import { lazy, Suspense, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { MermaidDiagram } from '../../components/mdx/MermaidDiagram'
import 'katex/dist/katex.min.css'

type BlogFrontmatter = { title?: string; date?: string; tags?: string[]; description?: string }
type BlogModule = { default: React.ComponentType; frontmatter?: BlogFrontmatter }

const katexFonts = `
/* Override KaTeX default fonts to load from CDN with font-display: swap */
@font-face { font-family: 'KaTeX_Main'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-main-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Main'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-main-bold.woff2') format('woff2'); font-weight: bold; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Main'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-main-italic.woff2') format('woff2'); font-weight: normal; font-style: italic; font-display: swap; }
@font-face { font-family: 'KaTeX_Main'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-main-bolditalic.woff2') format('woff2'); font-weight: bold; font-style: italic; font-display: swap; }
@font-face { font-family: 'KaTeX_Math'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-math-italic.woff2') format('woff2'); font-weight: normal; font-style: italic; font-display: swap; }
@font-face { font-family: 'KaTeX_Math'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-math-bold-italic.woff2') format('woff2'); font-weight: bold; font-style: italic; font-display: swap; }
@font-face { font-family: 'KaTeX_Size1'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-size1-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Size2'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-size2-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Size3'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-size3-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Size4'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-size4-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Caligraphic'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-caligraphic-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Caligraphic'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-caligraphic-bold.woff2') format('woff2'); font-weight: bold; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Fraktur'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-fraktur-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Fraktur'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-fraktur-bold.woff2') format('woff2'); font-weight: bold; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_SansSerif'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-sansserif-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_SansSerif'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-sansserif-bold.woff2') format('woff2'); font-weight: bold; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_SansSerif'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-sansserif-italic.woff2') format('woff2'); font-weight: normal; font-style: italic; font-display: swap; }
@font-face { font-family: 'KaTeX_SansSerif'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-sansserif-bolditalic.woff2') format('woff2'); font-weight: bold; font-style: italic; font-display: swap; }
@font-face { font-family: 'KaTeX_Script'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-script-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Script'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-script-bold.woff2') format('woff2'); font-weight: bold; font-style: normal; font-display: swap; }
@font-face { font-family: 'KaTeX_Typewriter'; src: url('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/katex-typewriter-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }
`

const mdxModules = import.meta.glob('../../content/blog/*.mdx') as Record<string, () => Promise<BlogModule>>

function getBlogImporter(slug: string) {
  const decodedSlug = decodeURIComponent(slug)
  const blogPath = `../../content/blog/${decodedSlug}.mdx`
  return mdxModules[blogPath]
}

const mdxComponents = {
  table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-6">
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
  tr: ({ children, ...props }: ComponentPropsWithoutRef<'tr'>) => <tr {...props}>{children}</tr>,
  th: ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-app-heading uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-3 text-sm text-app-text" {...props}>
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

  if (!importer) {
    throw notFound()
  }

  const Post = useMemo(
    () =>
      lazy(async () => {
        const blog = await importer()
        return { default: blog.default }
      }),
    [importer],
  )

  return (
    <main className="flex flex-col text-sm leading-relaxed pb-12">
      <style>{katexFonts}</style>
      <div className="w-full h-32 md:h-48 dot-bg shrink-0" />

      <section className="flex flex-col">
        <div className="dashed-h" />
        <div className="flex flex-col gap-6 py-6">
          <Link to="/blog" viewTransition={{ types: ['route-back'] }} className="btn-secondary rounded-full self-start">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to blogs</span>
          </Link>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{frontmatter.title || slug}</h1>
            <div className="flex items-center gap-4 text-sm text-app-text-muted">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {frontmatter.date || 'Recent'}</span>
            </div>
          </div>
        </div>
        <div className="dashed-h" />

        <article className="blog-content prose max-w-none rounded-xl prose-p:leading-relaxed prose-headings:font-bold prose-headings:tracking-tight pt-6 pb-12">
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
      </section>

      <div className="w-full h-32 md:h-48 dot-bg shrink-0" />
    </main>
  )
}
