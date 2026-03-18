import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import Post from '../../content/blog/schema-first-form-builder.mdx'
import { MDXProvider } from '@mdx-js/react'
import { MermaidDiagram } from '../../components/mdx/MermaidDiagram'
import { MotionSection } from '../../components/portfolio-motion'
import { smoothEase } from '../../components/motion-utils'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

const mdxComponents = {
  // rehype-pretty-code wraps the whole thing in a figure
  figure: ({ children, ...props }: ComponentPropsWithoutRef<'figure'> & { 'data-rehype-pretty-code-figure'?: unknown }) => {
    if ('data-rehype-pretty-code-figure' in props) {
      // Find the deeply nested mermaid code block
      let isMermaid = false;
      let rawCode = '';

      // Traverse children to find mermaid code block and extract its text
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

        const nextProps = (node as { props?: { ['data-language']?: string, children?: ReactNode } }).props
        if (nextProps?.['data-language'] === 'mermaid') {
          isMermaid = true;
        }

        // Extract text from the deeply nested spans that shiki generates
        if (nextProps?.children) {
          traverse(nextProps.children);
        }
      };

      traverse(children);

      if (isMermaid) {
        return <MermaidDiagram code={rawCode.trim()} />
      }

      // If it's a regular code block, render the figure (which handles the background/border styling nicely)
      return <figure {...props}>{children}</figure>
    }
    return <figure {...props}>{children}</figure>
  }
}

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
})

function BlogPost() {
  // const { slug } = Route.useParams()

  // For this clone, we'll just demonstrate rendering the MDX directly.
  return (
    <main className="flex flex-col text-sm leading-relaxed pb-12">
      {/* Decorative top dot grid */}
      <div className="w-full h-32 md:h-48 dot-bg shrink-0" />

      <MotionSection className="flex flex-col">
        <div className="dashed-h" />
        <motion.div
          className="flex flex-col gap-6 py-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 1 }, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } }}
        >
          <Link to="/blog" className="btn-secondary rounded-full self-start">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to blogs</span>
          </Link>

          <motion.div className="flex flex-col gap-3" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: smoothEase } } }}>
            <h1 className="text-3xl font-bold tracking-tight">Building a Schema-First Collaborative Form Builder</h1>
            <div className="flex items-center gap-4 text-sm text-app-text-muted">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Feb 2026</span>
            </div>
          </motion.div>
        </motion.div>
        <div className="dashed-h" />

        <article className="blog-content prose max-w-none rounded-xl prose-p:leading-relaxed prose-headings:font-bold prose-headings:tracking-tight pt-6 pb-12">
          <MDXProvider components={mdxComponents}>
            <Post />
          </MDXProvider>
        </article>
      </MotionSection>

      {/* Decorative bottom dot grid */}
      <div className="w-full h-32 md:h-48 dot-bg shrink-0" />
    </main>
  )
}
