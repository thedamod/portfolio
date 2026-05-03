import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

export default function handler(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')?.slice(0, 100) || 'Blog Post'
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#111312',
            backgroundImage:
              'radial-gradient(circle at 18% 18%, rgba(216,221,212,0.08) 0 1px, transparent 1px), radial-gradient(circle at 70% 58%, rgba(216,221,212,0.05) 0 1px, transparent 1px)',
            backgroundSize: '18px 18px, 26px 26px',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '58px 66px',
            color: '#d8ddd4',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 28,
              border: '1px solid #2a302b',
              borderRadius: 20,
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 24,
              color: '#888e87',
              width: '100%',
              marginBottom: 76,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: '1px solid #3a413a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d8ddd4',
                  fontWeight: 800,
                }}
              >
                A
              </div>
              <span>Abhiram Damodara</span>
            </div>
            <span>damod.space</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <h1
              style={{
                fontSize: title.length > 72 ? 54 : 64,
                fontWeight: 760,
                color: '#d8ddd4',
                lineHeight: 1.08,
                margin: 0,
                maxWidth: 980,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>
            {tags.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  marginTop: 34,
                  flexWrap: 'wrap',
                }}
              >
                {tags.slice(0, 5).map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 20,
                      color: '#a2a7a1',
                      backgroundColor: '#1e211f',
                      border: '1px solid #343a34',
                      padding: '9px 15px',
                      borderRadius: 8,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#626760',
              fontSize: 22,
              marginTop: 52,
            }}
          >
            <span>Writing, projects, and experiments around Avenire.</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    console.log(message)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}
