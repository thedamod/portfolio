export type ProjectScreenshot = {
  src: string
  alt: string
  label: string
}

export type Project = {
  title: string
  icon: string
  image: string
  summary: string
  details: string[]
  tags: string[]
  screenshots?: ProjectScreenshot[]
  liveUrl?: string
}

export const profile = {
  name: 'Abhiram Damodara',
  role: 'Student · Founder',
  image: 'https://github.com/thedamod.png?size=256',
}

export const siteDescription =
  'Abhiram Damodara is a student at the BITS Pilani Hyderabad campus, pursuing a dual degree course in MSc Economics, and a founder and full-stack engineer building Avenire.space, with early work in robotics, product engineering, and an inventor listing.'

export const patentWork = {
  title: 'Patent inventor listing',
  meta: 'AU2021105194A4',
  body:
    'I am listed as an inventor on AU2021105194A4. It was one of my first brushes with taking an idea beyond a prototype and into something formal enough to be documented. That thread still shows up in how I work now: build first, then keep making the system more rigorous.',
  href: 'https://patents.google.com/patent/AU2021105194A4/en',
}

export const heroCopy = {
  intro: 'I’m Abhiram, a full stack developer focused on building precise, high impact products.',
  body1: 'I enjoy working at the intersection of systems, UI, and intelligent tooling, where complex ideas become interactive and usable.',
  body2: 'Currently, I’m building Avenire, an AI powered interactive learning platform that turns static study into something you can explore, question, and truly understand.',
  liveLabel: 'Live at avenire.space',
  liveUrl: 'https://avenire.space',
}

export const socialLinks = [
  { label: 'Email', href: 'mailto:damodara.abhiram@gmail.com', value: 'damodara.abhiram@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/thedamod', value: 'GitHub' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhiram-damodara-699031426/', value: 'LinkedIn' },
]

export const skillGroups = {
  Frontend: ['React', 'Next', 'Tailwind', 'Shadcn', 'Motion', 'Typescript', 'Javascript', 'Zustand'],
  Backend: ['Express', 'Node', 'PostgreSQL', 'Redis', 'Railway', 'AI SDK', 'Codex'],
  Tools: ['Git', 'Github', 'Postman', 'Vercel'],
}

export const projects: Project[] = [
  {
    title: 'Avenire',
    icon: '/projects/icons/avenire.svg',
    image: '/projects/backgrounds/banner1.png',
    summary: 'An interactive learning platform that replaces static notes with living explanations. Students can manipulate graphs, probe formulas, and get contextual reasoning instead of a dead-end answer.',
    details: [
      'AI guided explanations with step-by-step reasoning.',
      'Interactive graphs, whiteboards, and simulations.',
      'Real-time chat with contextual knowledge.',
      'Built to make learning exploratory instead of passive.',
    ],
    tags: ['AI', 'Learning', 'Interaction'],
    screenshots: [
      { src: '/projects/screenshots/avenire/visual-explanations.webp', alt: 'Avenire visualizing a double pendulum', label: 'Interactive visual explanations' },
      { src: '/projects/screenshots/avenire/guided-exploration.webp', alt: 'Avenire guiding a fine-tuning explanation', label: 'Guided exploration' },
      { src: '/projects/screenshots/avenire/source-aware-learning.webp', alt: 'Avenire combining notes, a paper, and a diagram', label: 'Source-aware learning' },
      { src: '/projects/screenshots/avenire/review-and-retention.webp', alt: 'Avenire review dashboard with retention metrics', label: 'Review and retention' },
      { src: '/projects/screenshots/avenire/misconception-checks.webp', alt: 'Avenire surfacing and correcting a misconception', label: 'Misconception checks' },
      { src: '/projects/screenshots/avenire/workspace-library.webp', alt: 'Avenire workspace with a document library', label: 'Workspace library' },
    ],
    liveUrl: 'https://avenire.space',
  },
  {
    title: 'Chromium Tools',
    icon: '/projects/icons/tools.svg',
    image: '/projects/backgrounds/banner1.png',
    summary:
      'A browser-based utility suite for file and text transforms. Each tool is focused so the workflow stays quick and easy to reach.',
    details: [
      'Image ↔ Base64 conversion for quick asset handling.',
      'Image to ICO output for app and favicon workflows.',
      'Markdown to PDF for document export.',
      'Image converter, compressor, and regex DSL tools.',
    ],
    tags: ['Browser', 'Utilities', 'Transforms'],
    screenshots: [
      { src: '/projects/screenshots/tools/image-compression.webp', alt: 'Chromium Tools image compression interface', label: 'Image compression workflow' },
    ],
    liveUrl: 'https://tools.damod.space',
  },
  {
    title: 'Autonomous Rover',
    icon: '/projects/icons/rover.svg',
    image: '/projects/backgrounds/banner1.png',
    summary: 'A custom smart rover designed to operate independently with environmental awareness, telemetry, and live obstacle detection.',
    details: [
      'Internet connected control and telemetry.',
      'Temperature sensing and live monitoring.',
      'Obstacle collision detection system.',
      'Custom frontend dashboard for live interaction.',
    ],
    tags: ['Hardware', 'Control', 'Systems'],
  },
  {
    title: 'Arcaine',
    icon: '/projects/icons/arcaine.svg',
    image: '/projects/backgrounds/banner1.png',
    summary: 'A tool-using cryptanalysis agent that investigates ciphertexts, tests plausible transformations, and verifies candidate plaintexts instead of settling for a plausible guess.',
    details: [
      'Built as a Qwen3.5-4B LoRA fine-tune on agentic, multi-turn cryptanalysis traces.',
      'Pairs model reasoning with bounded Python analysis and a compact cryptography reference search tool.',
      'Uses deterministic probes for signatures such as alphabet shifts, transposition, hexadecimal, Base64, and single-byte XOR.',
      'Run 2 reached a training loss of 0.007 at 1,000 steps; the accompanying comparison contrasts the base and post-trained models on the same cipher-solving prompt.',
    ],
    tags: ['Qwen3.5', 'LoRA', 'Tool Use', 'Cryptanalysis'],
    screenshots: [
      { src: '/projects/screenshots/arcaine/base-vs-post-trained.webp', alt: 'Terminal comparison of the base and post-trained Arcaine models', label: 'Base vs. post-trained model' },
      { src: '/projects/screenshots/arcaine/run-2-metrics.webp', alt: 'Arcaine Run 2 training metrics', label: 'Run 2 training metrics' },
      { src: '/projects/screenshots/arcaine/training-loss.webp', alt: 'Arcaine training loss overview', label: 'Training loss overview' },
    ],
  },
]
