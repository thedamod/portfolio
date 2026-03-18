import { compile } from '@mdx-js/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import fs from 'fs'

const mdx = fs.readFileSync('./src/content/blog/schema-first-form-builder.mdx', 'utf8')

compile(mdx, {
  remarkPlugins: [remarkMath],
  rehypePlugins: [
    rehypeKatex,
    [rehypePrettyCode, {
      theme: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      keepBackground: false,
    }]
  ]
}).then(result => {
  console.log(result.value)
})
