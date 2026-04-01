import { createFileRoute, notFound } from '@tanstack/react-router'
import { getBlogBySlug } from '../../content/blog-metadata'

type BlogFrontmatter = { title?: string; date?: string; tags?: string[]; description?: string }

export const Route = createFileRoute('/blog/$slug')({
  head: ({ loaderData }) => {
    const data = (loaderData || {}) as BlogFrontmatter
    const title = data?.title || 'Blog Post'
    const tags = data?.tags || []
    const description = data?.description || `Read ${title} by Abhiram.`
    const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&tags=${encodeURIComponent(tags.join(','))}`
    return {
      meta: [
        { title: `${title} | Abhiram` },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: ogImageUrl },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImageUrl },
      ],
    }
  },
  loader: ({ params }) => {
    const blog = getBlogBySlug(params.slug)

    if (!blog) {
      throw notFound()
    }

    return blog
  },
})
