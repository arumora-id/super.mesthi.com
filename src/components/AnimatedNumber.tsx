import { useLayoutEffect, useRef } from 'react'
import { gsap, motionConfig, prefersReducedMotion } from '../core/motion/gsap'

type AnimatedNumberProps = {
  value?: number | null
  fallback?: string
  formatter?: (value: number) => string
}

export function AnimatedNumber({
  value,
  fallback = '—',
  formatter = (current) => Math.round(current).toLocaleString(),
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || value == null) return

    if (prefersReducedMotion()) {
      element.textContent = formatter(value)
      return
    }

    const state = { current: 0 }
    const tween = gsap.to(state, {
      current: value,
      duration: motionConfig.cardDuration + 0.18,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = formatter(state.current)
      },
    })

    return () => tween.kill()
  }, [formatter, value])

  return <span ref={ref}>{value == null ? fallback : formatter(value)}</span>
}
