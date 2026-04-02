import { createFileRoute } from '@tanstack/react-router'

type StoryFrontmatter = {
  title?: string
  tags?: string[]
  author?: string[]
}

export const Route = createFileRoute('/stories/draft')({
  loader: async () => {
    const module = await import('../../content/Stories/Draft.md')
    return {
      frontmatter: (module as { frontmatter?: StoryFrontmatter }).frontmatter ?? {},
    }
  },
  head: () => {
    const title = 'The weight of the soul'
    const description = 'A prose draft from the Stories folder.'

    return {
      meta: [
        { title: `${title} | Stories` },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    }
  },
})
