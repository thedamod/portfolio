export type Project = {
  title: string
  icon: string
  image: string
  summary: string
  details: string[]
  tags: string[]
  liveUrl?: string
}

export const profile = {
  name: 'Abhiram Damodara',
  role: 'Student · Founder',
  image: 'https://github.com/thedamod.png?size=256',
}

export const siteDescription =
  'Abhiram Damodara is a student, founder, physics enthusiast, and full-stack engineer building Avenire.space, with early work in robotics, autonomous security prototypes, and an inventor listing.'

export const earlyWork = [
  {
    title: 'Night Rider',
    meta: 'Scientia 2022 · First Prize',
    body:
      'An access-card-detected autonomous robot built for smart security and automated navigation systems. The project won first prize at Scientia 2022, held by Youth Cross, NSS, and Care University.',
  },
  {
    title: 'Inventor listing',
    meta: 'AU2021105194A4',
    body:
      'I am listed as an inventor on AU2021105194A4. It sits in the same thread as the rest of my work: building things first, then learning how to make the systems around them more serious.',
    href: 'https://patents.google.com/patent/AU2021105194A4/en',
  },
]

export const heroCopy = {
  intro: 'I’m Abhiram, a full stack developer focused on building precise, high impact products.',
  body1: 'I enjoy working at the intersection of systems, UI, and intelligent tooling, where complex ideas become interactive and usable.',
  body2: 'Currently, I’m building Avenire, an AI powered interactive learning platform that turns static study into something you can explore, question, and truly understand.',
  liveLabel: 'Live at avenire.space',
  liveUrl: 'https://avenire.space',
}

export const socialLinks = [
  { label: 'Github', href: 'https://github.com/thedamod' },
  { label: 'Twitter', href: 'https://x.com/thedamod' },
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
    summary: 'Arcaine is an AI model I am fine-tuning and running RL on, trained on curated and generated datasets of famous ciphers and their solutions.',
    details: [
      'Focused on puzzle solving and cryptographic challenge reasoning.',
      'Fine-tuning plus RL on curated datasets and synthetic generated datasets.',
      'Primary model tracks are Gemma 4 and Qwen 3.5.',
      'Training workflow is being built on Unsloth with an accompanying research paper.',
    ],
    tags: ['ML', 'Research', 'Cryptography'],
  },
]
