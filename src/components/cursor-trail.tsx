import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePointerFine } from './motion-utils'

export function CursorTrail() {
  const reduceMotion = useReducedMotion()
  const isFinePointer = usePointerFine()
  const [isInteractive, setIsInteractive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.25 })
  const ringY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.25 })
  const dotX = useSpring(x, { stiffness: 300, damping: 24, mass: 0.15 })
  const dotY = useSpring(y, { stiffness: 300, damping: 24, mass: 0.15 })

  useEffect(() => {
    if (!isFinePointer || reduceMotion) {
      return
    }

    const move = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, summary'

    const over = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      setIsInteractive(Boolean(target.closest(interactiveSelector)))
    }

    const out = (event: PointerEvent) => {
      const target = event.target
      const relatedTarget = event.relatedTarget

      if (!(target instanceof Element)) {
        return
      }

      const wasInteractive = Boolean(target.closest(interactiveSelector))
      const stillInteractive = relatedTarget instanceof Element && Boolean(relatedTarget.closest(interactiveSelector))
      if (wasInteractive && !stillInteractive) {
        setIsInteractive(false)
      }
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerout', out, { passive: true })

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerout', out)
    }
  }, [isFinePointer, reduceMotion, x, y])

  if (!isFinePointer || reduceMotion) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <motion.div
        className={`absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-[1px] ${
          isInteractive ? 'cursor-ring-interactive' : 'cursor-ring-idle'
        }`}
        animate={{ scale: isInteractive ? 1.45 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        style={{
          left: ringX,
          top: ringY,
        }}
      />
      <motion.div
        className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isInteractive ? 'cursor-dot-interactive' : 'cursor-dot-idle'
        }`}
        animate={{
          scale: isInteractive ? 0.7 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{
          left: dotX,
          top: dotY,
        }}
      />
    </div>
  )
}
