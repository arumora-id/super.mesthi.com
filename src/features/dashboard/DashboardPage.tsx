import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Activity, Boxes, Server, ShieldCheck } from 'lucide-react'
import { resourcesApi } from '../../core/api/resources'
import { errorMessage } from '../../core/api/client'
import { Badge, Card, PageHeader } from '../../components/ui'
import { AnimatedNumber } from '../../components/AnimatedNumber'
import { useStaggerEntrance } from '../../hooks/useMotion'

export function DashboardPage() {
  const health = useQuery({
    queryKey: ['health'],
    queryFn: resourcesApi.health,
    refetchInterval: 30_000,
  })
  const workspaces = useQuery({
    queryKey: ['workspaces'],
    queryFn: resourcesApi.workspaces,
  })
  const cardsRef = useRef<HTMLDivElement>(null)

  useStaggerEntrance(cardsRef, '[data-motion-card]', [health.isSuccess, workspaces.isSuccess])

  const stats = [
    {
      label: 'API',
      value: health.isSuccess ? 'Healthy' : health.isLoading ? 'Checking' : 'Unavailable',
      Icon: Server,
    },
    {
      label: 'Workspaces',
      value: workspaces.isSuccess ? (
        <AnimatedNumber value={workspaces.data.length} />
      ) : (
        '—'
      ),
      Icon: Boxes,
    },
    { label: 'Backend', value: '1.12.2', Icon: Activity },
    { label: 'Access', value: 'Authenticated', Icon: ShieldCheck },
  ]

  return (
    <>
      <PageHeader
        title="Platform overview"
        description="Read-mostly operational console for the Mesthi control plane. Runtime and delivery authority remain in api.mesthi.com and its internal services."
      />

      <div ref={cardsRef}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} data-motion-card>
              <Card className="h-full transition-colors duration-150 hover:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{label}</span>
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div className="mt-4 text-2xl font-semibold">{value}</div>
              </Card>
            </div>
          ))}
        </div>

        {health.isError && (
          <div className="mt-4" data-motion-card>
            <Card className="border-red-900/60">
              <Badge tone="red">API error</Badge>
              <p className="mt-3 text-sm text-slate-400">{errorMessage(health.error)}</p>
            </Card>
          </div>
        )}

        <div className="mt-6" data-motion-card>
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold">C4 operational scope</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Task lifecycle, Hermes runtime, Git finalization and remote SHA evidence are authoritative backend concerns.
                </p>
              </div>
              <Badge tone="green">C4 complete</Badge>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
