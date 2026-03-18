declare module 'beautiful-mermaid' {
  export interface RenderOptions {
    bg?: string
    fg?: string
    transparent?: boolean
    font?: string
    line?: string
    accent?: string
    muted?: string
    surface?: string
    border?: string
  }
  export function renderMermaidSVG(text: string, options?: RenderOptions): string
  export function renderMermaidSVGAsync(text: string, options?: RenderOptions): Promise<string>
}
