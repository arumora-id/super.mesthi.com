import { useQuery } from '@tanstack/react-query'
import { Activity, Boxes, Server, ShieldCheck } from 'lucide-react'
import { resourcesApi } from '../../core/api/resources'
import { errorMessage } from '../../core/api/client'
import { Badge, Card, PageHeader } from '../../components/ui'

export function DashboardPage() {
  const health = useQuery({ queryKey:['health'], queryFn: resourcesApi.health, refetchInterval: 30_000 })
  const workspaces = useQuery({ queryKey:['workspaces'], queryFn: resourcesApi.workspaces })
  const stats = [
    ['API', health.isSuccess ? 'Healthy' : health.isLoading ? 'Checking' : 'Unavailable', Server],
    ['Workspaces', workspaces.isSuccess ? String(workspaces.data.length) : '—', Boxes],
    ['Backend', '1.12.2', Activity],
    ['Access', 'Authenticated', ShieldCheck],
  ] as const
  return <><PageHeader title="Platform overview" description="Read-mostly operational console for the Mesthi control plane. Runtime and delivery authority remain in api.mesthi.com and its internal services."/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([k,v,Icon])=><Card key={k}><div className="flex items-center justify-between"><span className="text-sm text-slate-400">{k}</span><Icon size={18} className="text-blue-400"/></div><div className="mt-4 text-2xl font-semibold">{v}</div></Card>)}</div>{health.isError&&<Card className="mt-4 border-red-900/60"><Badge tone="red">API error</Badge><p className="mt-3 text-sm text-slate-400">{errorMessage(health.error)}</p></Card>}<Card className="mt-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold">C4 operational scope</h2><p className="mt-1 text-sm text-slate-500">Task lifecycle, Hermes runtime, Git finalization and remote SHA evidence are authoritative backend concerns.</p></div><Badge tone="green">C4 complete</Badge></div></Card></>
}
