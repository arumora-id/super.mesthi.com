import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap, motionConfig, prefersReducedMotion } from '../core/motion/gsap'

type CapacityMeterProps = {
  label: string
  value?: number | null
  max?: number | null
  unit?: string
}

export function CapacityMeter({ label, value, max, unit = '' }: CapacityMeterProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const hasLiveValue = value != null && max != null && max > 0
  const percentage = useMemo(() => {
    if (!hasLiveValue) return null
    return Math.max(0, Math.min(100, (value / max) * 100))
  }, [hasLiveValue, max, value])

  useLayoutEffect(() => {
    const bar = barRef.current
    if (!bar || percentage == null) return

    const targetScale = percentage / 100
    if (prefersReducedMotion()) {
      gsap.set(bar, { scaleX: targetScale })
      return
    }

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: targetScale,
        duration: motionConfig.cardDuration + 0.14,
        ease: motionConfig.ease,
      },
    )

    return () => {
      tween.kill()
    }
  }, [percentage])

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-xs text-slate-500">
          {hasLiveValue ? `${value}${unit} / ${max}${unit}` : 'Live value unavailable'}
        </span>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"
        aria-label={label}
        aria-valuemin={hasLiveValue ? 0 : undefined}
        aria-valuemax={hasLiveValue ? max ?? undefined : undefined}
        aria-valuenow={hasLiveValue ? value ?? undefined : undefined}
        role={hasLiveValue ? 'progressbar' : undefined}
      >
        {hasLiveValue ? (
          <div
            ref={barRef}
            className="h-full w-full origin-left rounded-full bg-blue-500"
            style={{ transform: 'scaleX(0)' }}
          />
        ) : (
          <div className="h-full w-full border border-dashed border-slate-700 bg-slate-900/60" />
        )}
      </div>
    </div>
  )
}
