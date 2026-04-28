import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: 'Projects | Abhiram' },
      {
        name: 'description',
        content: 'Selected projects from Abhiram across product engineering, AI systems, and interactive tools.',
      },
      { property: 'og:title', content: 'Projects | Abhiram' },
      {
        property: 'og:description',
        content: 'Selected projects from Abhiram across product engineering, AI systems, and interactive tools.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Projects | Abhiram' },
      {
        name: 'twitter:description',
        content: 'Selected projects from Abhiram across product engineering, AI systems, and interactive tools.',
      },
    ],
  }),
})
