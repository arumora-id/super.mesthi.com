import { gsap } from 'gsap'

export const motionConfig = {
  pageDuration: 0.28,
  cardDuration: 0.32,
  sidebarDuration: 0.32,
  stagger: 0.055,
  ease: 'power2.out',
} as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap }
