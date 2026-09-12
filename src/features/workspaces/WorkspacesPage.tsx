import { useQuery } from '@tanstack/react-query'
import { PageHeader, Card, Empty, Badge } from '../../components/ui'
import { resourcesApi } from '../../core/api/resources'
import { errorMessage } from '../../core/api/client'

export function WorkspacesPage(){ const q=useQuery({queryKey:['workspaces'],queryFn:resourcesApi.workspaces}); return <><PageHeader title="Workspaces" description="Authoritative workspace records from api.mesthi.com."/>{q.isError?<Empty title="Could not load workspaces" body={errorMessage(q.error)}/>:q.data?.length?<div className="grid gap-3">{q.data.map(w=><Card key={w.id}><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="font-medium">{w.name||w.id}</div><div className="mt-1 font-mono text-xs text-slate-500">{w.id}</div></div><div className="flex items-center gap-2"><Badge>{w.status||'unknown'}</Badge><span className="text-xs text-slate-500">{w.repository_full_name||w.repository||'No repository'}</span></div></div></Card>)}</div>:<Empty title={q.isLoading?'Loading workspaces':'No workspaces'} body="No workspace records were returned by the API."/>}</> }
