import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [
      tailwindcss(),
      {
        ...mdx({
          remarkPlugins: [
            remarkFrontmatter,
            remarkMdxFrontmatter,
            remarkGfm,
            remarkMath,
          ],
          rehypePlugins: [
            rehypeKatex,
            [rehypePrettyCode, {
              theme: {
                light: 'github-light',
                dark: 'github-dark-dimmed',
              },
              keepBackground: false,
            }],
          ],
          providerImportSource: '@mdx-js/react',
        }),
        enforce: 'pre',
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
