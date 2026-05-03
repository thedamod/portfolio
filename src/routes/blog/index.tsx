import { createFileRoute } from '@tanstack/react-router'
import { getOgImageUrl } from '../../lib/og'

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
      { property: 'og:image', content: getOgImageUrl('Blog | Abhiram', ['Writing', 'Engineering']) },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Blog | Abhiram' },
      {
        name: 'twitter:description',
        content: 'Technical writing from Abhiram on retrieval systems, learning, and product engineering.',
      },
      { name: 'twitter:image', content: getOgImageUrl('Blog | Abhiram', ['Writing', 'Engineering']) },
    ],
  }),
})
