import { useRef } from 'react'
import { Badge, Card, PageHeader } from '../../components/ui'
import { CapacityMeter } from '../../components/CapacityMeter'
import { useStaggerEntrance } from '../../hooks/useMotion'

export function CapacityPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  useStaggerEntrance(contentRef)

  return (
    <>
      <PageHeader
        title="Capacity"
        description="Capacity enforcement remains server-side. This screen is prepared for the dedicated platform capacity/admin endpoint planned in C4.5/C4.6."
      />

      <div ref={contentRef} className="space-y-4">
        <div data-motion-item>
          <Card>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="font-medium">Current runtime capacity</div>
                  <p className="mt-2 max-w-3xl text-sm text-slate-500">
                    C4 currently enforces the authoritative runtime limit in the backend. A global admin read endpoint is required before this panel can safely show live aggregate values.
                  </p>
                </div>
                <Badge tone="amber">Backend endpoint pending</Badge>
              </div>
              <CapacityMeter label="Global runtime utilization" />
            </div>
          </Card>
        </div>

        <div data-motion-item>
          <Card>
            <div className="text-sm text-slate-400">
              Once C4.5 exposes authoritative <span className="text-slate-200">active</span>,{' '}
              <span className="text-slate-200">limit</span>, and{' '}
              <span className="text-slate-200">remaining</span> values, this meter will animate only when those server values are present. No capacity value is inferred in the browser.
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
