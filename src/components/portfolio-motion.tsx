import type { ComponentPropsWithoutRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { smoothEase } from './motion-utils'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
}

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
}

type MotionSectionProps = ComponentPropsWithoutRef<typeof motion.section>

export function MotionSection({ children, className, ...props }: MotionSectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.22 }}
      variants={sectionVariants}
      {...props}
    >
      {children}
    </motion.section>
  )
}

type StaggerGroupProps = ComponentPropsWithoutRef<typeof motion.div>

export function StaggerGroup({ children, className, ...props }: StaggerGroupProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.18 }}
      variants={staggerVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = ComponentPropsWithoutRef<typeof motion.div>

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div className={className} variants={reduceMotion ? undefined : itemVariants} {...props}>
      {children}
    </motion.div>
  )
}

export function RevealWords({ text, className }: { text: string, className?: string }) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  if (reduceMotion) {
    return <p className={className}>{text}</p>
  }

  return (
    <motion.p className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }} variants={staggerVariants}>
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={itemVariants} className="inline-block">
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.p>
  )
}

export function AnimatedQuote({ quote, author }: { quote: string, author: string }) {
  const reduceMotion = useReducedMotion()
  const words = quote.split(' ')
  const quoteTextClass = 'text-app-text-muted'
  const quoteMarkClass = 'text-app-text-subtle'
  const authorClass = 'text-app-text-muted'

  if (reduceMotion) {
    return (
      <>
        <div className={`text-4xl ${quoteMarkClass}`}>"</div>
        <p className={`max-w-md italic text-lg leading-relaxed ${quoteTextClass}`}>{quote}</p>
        <p className={`text-sm ${authorClass}`}>-- {author} --</p>
      </>
    )
  }

  return (
    <>
      <motion.div
        className={`quote-mark text-4xl ${quoteMarkClass}`}
        initial={{ opacity: 0, scale: 0.45 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: smoothEase }}
        viewport={{ once: true, amount: 0.5 }}
      >
        "
      </motion.div>
      <motion.p
        className={`max-w-md italic text-lg leading-relaxed ${quoteTextClass}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerVariants}
      >
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} variants={itemVariants} className="inline-block">
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </motion.p>
      <motion.p
        className={`text-sm ${authorClass}`}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: smoothEase, delay: 0.15 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        -- {author} --
      </motion.p>
    </>
  )
}
