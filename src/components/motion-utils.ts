import { cubicBezier } from 'framer-motion'
import { useEffect, useState } from 'react'

export const smoothEase = cubicBezier(0.16, 1, 0.3, 1)

export function usePointerFine() {
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const update = () => setIsFinePointer(media.matches)

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  return isFinePointer
}

