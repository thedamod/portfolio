import { useEffect, useState } from 'react'
import type { ProjectScreenshot } from '@/content/portfolio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

export function ProjectGallery({ screenshots, projectTitle }: { screenshots: ProjectScreenshot[]; projectTitle: string }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  const activeScreenshot = screenshots[current] ?? screenshots[0]

  return (
    <div className="space-y-3">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full" aria-label={`${projectTitle} screenshots`}>
        <CarouselContent className="ml-0">
          {screenshots.map((screenshot, index) => (
            <CarouselItem key={screenshot.src} className="pl-0">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-app-border bg-app-surface-2 project-modal-item">
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 border-app-border bg-app-bg/90 text-app-heading hover:bg-app-surface-hover hover:text-app-heading" />
        <CarouselNext className="right-3 border-app-border bg-app-bg/90 text-app-heading hover:bg-app-surface-hover hover:text-app-heading" />
      </Carousel>

      <div className="flex items-center justify-between gap-4 text-xs text-app-text-muted">
        <p aria-live="polite">{activeScreenshot.label}</p>
        <div className="flex items-center gap-1.5" aria-label="Choose screenshot">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.src}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${index === current ? 'bg-app-heading' : 'bg-app-border-strong hover:bg-app-text-muted'}`}
              aria-label={`Show ${screenshot.label}`}
              aria-current={index === current ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
