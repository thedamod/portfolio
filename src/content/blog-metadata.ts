export type BlogMetadata = {
  slug: string
  title: string
  date: string
  tags: string[]
  description?: string
  readTime?: number
}

export const blogMetadata: BlogMetadata[] = [
  {
    slug: 'misconception-engine',
    title: "How Avenire Knows When You're Wrong Before You Do",
    date: '2026-04-03',
    tags: ['engineering', 'ai', 'learning-science'],
    description: "A deep dive into the misconception detection engine powering Apollo — from passive session inference to real-time signal interception.",
  },
  {
    slug: 'algorithm-that-never-forgets',
    title: 'The Algorithm That Never Forgets',
    date: '2026-03-29',
    tags: ['engineering', 'memory', 'spaced-repetition', 'learning-science'],
    description:
      "A deep dive into the spaced repetition engine powering Avenire's memory infrastructure — from the mathematics of forgetting to a living, closed-loop study system.",
  },
  {
    slug: 'retrieval-infrastructure',
    title: 'How Apollo Searches Your Mind',
    date: '2026-03-26',
    tags: ['engineering', 'avenire', 'retrieval', 'postgres'],
  },
  {
    slug: 'ai-visualization-layer',
    title: 'Building an AI Visualization Layer from Scratch (and What I Stole from Claude)',
    date: '2026-03-18',
    tags: ['Avenire', 'AI', 'Visualization', 'Engineering', 'Design'],
  },
  {
    slug: 'search-retrieval-system',
    title: "How I Built Avenire's Search Retrieval System (Multimodal Embeddings, PDF Pipelines, Video Ingestion)",
    date: '2026-03-13',
    tags: ['Avenire', 'RAG', 'AI', 'Engineering', 'Search'],
  },
  {
    slug: 'learning-itself',
    title: 'What Building Avenire Taught Me About Learning Itself',
    date: '2026-03-09',
    tags: ['Avenire', 'Learning', 'AI', 'Education'],
  },
  {
    slug: 'naming-avenire',
    title: "Why I Named My Startup Avenire — A Word That Doesn't Exist in English",
    date: '2026-03-05',
    tags: ['Avenire', 'Startups', 'Naming', 'Philosophy'],
  },
  {
    slug: 'study-tool-jee',
    title: "Why I'm Building a Study Tool While Preparing for the Hardest Exam of My Life",
    date: '2026-03-01',
    tags: ['Avenire', 'Learning', 'JEE', 'Startups'],
  },
]

function parseBlogDate(date: string) {
  const timestamp = Date.parse(date)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

export function getSortedBlogs() {
  return [...blogMetadata].sort((a, b) => parseBlogDate(b.date) - parseBlogDate(a.date))
}

export function getRecentBlogs(limit = 3) {
  return getSortedBlogs().slice(0, limit)
}

export function getBlogBySlug(slug: string) {
  return blogMetadata.find((blog) => blog.slug === slug)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
