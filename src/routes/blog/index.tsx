import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: [
      { title: 'Blog | Abhiram' },
      {
        name: 'description',
        content: 'Technical writing from Abhiram on retrieval systems, learning, and product engineering.',
      },
      { property: 'og:title', content: 'Blog | Abhiram' },
      {
        property: 'og:description',
        content: 'Technical writing from Abhiram on retrieval systems, learning, and product engineering.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Blog | Abhiram' },
      {
        name: 'twitter:description',
        content: 'Technical writing from Abhiram on retrieval systems, learning, and product engineering.',
      },
    ],
  }),
})
