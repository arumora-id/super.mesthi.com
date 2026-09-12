import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { PageHeader, Card, Empty, Badge } from '../../components/ui'
import { resourcesApi } from '../../core/api/resources'

export function AgentsPage() {
  const workspaces = useQuery({
    queryKey: ['workspaces'],
    queryFn: resourcesApi.workspaces,
  })
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState('')
  const workspaceId = selectedWorkspaceId || workspaces.data?.[0]?.id || ''

  const agents = useQuery({
    queryKey: ['agents', workspaceId],
    queryFn: () => resourcesApi.agents(workspaceId),
    enabled: Boolean(workspaceId),
  })

  return (
    <>
      <PageHeader
        title="Agents"
        description="Inspect persistent agent definitions per workspace."
        action={
          <select
            value={workspaceId}
            onChange={(event) => setSelectedWorkspaceId(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
          >
            {workspaces.data?.map((workspace) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.name || workspace.id}
              </option>
            ))}
          </select>
        }
      />

      {agents.data?.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {agents.data.map((agent) => (
            <Card key={agent.id}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{agent.name || agent.id}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {agent.model_id || 'model not exposed'}
                  </div>
                </div>
                <Badge tone={agent.status === 'active' ? 'green' : 'slate'}>
                  {agent.status || 'unknown'}
                </Badge>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                {agent.repository_full_name || agent.repository || 'No repository'} ·{' '}
                {agent.default_branch || '—'}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Empty
          title="No agents to display"
          body={
            workspaceId
              ? 'No agents were returned for this workspace.'
              : 'Create or select a workspace first.'
          }
        />
      )}
    </>
  )
}
