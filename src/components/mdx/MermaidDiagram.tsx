import { useMemo } from 'react'
import { renderMermaidSVG } from 'beautiful-mermaid'

export function MermaidDiagram({ code }: { code: string }) {
  const { svg, error } = useMemo(() => {
    try {
      return {
        svg: renderMermaidSVG(code, {
          bg: 'var(--background, transparent)',
          fg: 'var(--foreground, currentColor)',
          transparent: true,
        }),
        error: null,
      }
    } catch (err) {
      return { svg: null, error: err instanceof Error ? err : new Error(String(err)) }
    }
  }, [code])

  if (error) return <pre className="text-red-500 overflow-x-auto text-xs p-4 bg-red-500/10 rounded-md">Error compiling mermaid: {error.message}</pre>

  return <div dangerouslySetInnerHTML={{ __html: svg! }} className="flex justify-center my-8 overflow-x-auto" />
}
