import { MDXProvider } from '@mdx-js/react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Feather } from 'lucide-react'
import { lazy, Suspense, useMemo } from 'react'

type StoryFrontmatter = {
  title?: string
  author?: string[]
}

export const Route = createLazyFileRoute('/stories/draft')({
  component: StoryDraftPage,
})

function StoryDraftPage() {
  const { frontmatter } = Route.useLoaderData() as { frontmatter?: StoryFrontmatter }
  const title = frontmatter?.title || 'The weight of the soul'
  const authors = frontmatter?.author || []

  const Story = useMemo(
    () =>
      lazy(async () => {
        const story = await import('../../content/Stories/Draft.md')
        return { default: story.default }
      }),
    [],
  )

  return (
    <main className="flex flex-col text-sm leading-relaxed pb-12">
      <div className="w-full h-32 md:h-48 dot-bg shrink-0" />

      <section className="flex flex-col">
        <div className="dashed-h" />
        <div className="flex flex-col gap-6 py-6">
          <Link to="/" viewTransition={{ types: ['route-back'] }} className="btn-secondary rounded-full self-start">
            <ArrowLeft className="w-4 h-4" />
            <span>Back home</span>
          </Link>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <div className="flex items-center gap-4 text-sm text-app-text-muted">
              <span className="flex items-center gap-1.5">
                <Feather className="w-4 h-4" /> {authors.join(', ') || 'Abhiram'}
              </span>
            </div>
          </div>
        </div>
        <div className="dashed-h" />

        <article className="blog-content prose max-w-none rounded-xl prose-p:leading-relaxed prose-headings:font-bold prose-headings:tracking-tight pt-6 pb-12">
          <Suspense fallback={null}>
            <MDXProvider>
              <Story />
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
