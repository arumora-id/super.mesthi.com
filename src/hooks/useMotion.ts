import type { DependencyList, RefObject } from 'react'
import { useLayoutEffect } from 'react'
import { gsap, motionConfig, prefersReducedMotion } from '../core/motion/gsap'

export function usePageEntrance(
  ref: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: motionConfig.pageDuration,
          ease: motionConfig.ease,
          clearProps: 'transform,opacity,visibility',
        },
      )
    }, element)

    return () => context.revert()
  }, deps)
}

export function useStaggerEntrance(
  ref: RefObject<HTMLElement | null>,
  selector = '[data-motion-item]',
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return

    const items = root.querySelectorAll(selector)
    if (!items.length) return

    const context = gsap.context(() => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: motionConfig.cardDuration,
          stagger: motionConfig.stagger,
          ease: motionConfig.ease,
          clearProps: 'transform,opacity,visibility',
        },
      )
    }, root)

    return () => context.revert()
  }, deps)
}

export function useShellEntrance(
  sidebarRef: RefObject<HTMLElement | null>,
  headerRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const sidebar = sidebarRef.current
    const header = headerRef.current
    const context = gsap.context(() => {
      if (sidebar) {
        gsap.fromTo(
          sidebar,
          { x: -16, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: motionConfig.sidebarDuration,
            ease: motionConfig.ease,
            clearProps: 'transform,opacity,visibility',
          },
        )
      }
      if (header) {
        gsap.fromTo(
          header,
          { y: -8, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: motionConfig.pageDuration,
            delay: 0.04,
            ease: motionConfig.ease,
            clearProps: 'transform,opacity,visibility',
          },
        )
      }
    })

    return () => context.revert()
  }, [])
}
