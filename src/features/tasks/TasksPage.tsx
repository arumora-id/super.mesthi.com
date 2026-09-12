import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { PageHeader, Card, Empty, Badge } from '../../components/ui'
import { resourcesApi } from '../../core/api/resources'

const tone = (status?: string): 'slate' | 'green' | 'blue' | 'amber' | 'red' => {
  if (status === 'completed') return 'green'
  if (status === 'failed') return 'red'
  if (status === 'running') return 'blue'
  if (status === 'queued') return 'amber'
  return 'slate'
}

export function TasksPage() {
  const workspaces = useQuery({
    queryKey: ['workspaces'],
    queryFn: resourcesApi.workspaces,
  })
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState('')
  const workspaceId = selectedWorkspaceId || workspaces.data?.[0]?.id || ''

  const tasks = useQuery({
    queryKey: ['tasks', workspaceId],
    queryFn: () => resourcesApi.tasks(workspaceId),
    enabled: Boolean(workspaceId),
    refetchInterval: 5000,
  })

  return (
    <>
      <PageHeader
        title="Tasks"
        description="Live task lifecycle view. Active records refresh every five seconds."
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

      {tasks.data?.length ? (
        <div className="space-y-3">
          {tasks.data.map((task) => (
            <Card key={task.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium">{task.title || task.id}</div>
                  <div className="mt-1 font-mono text-xs text-slate-500">{task.id}</div>
                </div>
                <Badge tone={tone(task.status)}>{task.status || 'unknown'}</Badge>
              </div>
              <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
                <span>Agent: {task.agent_id || '—'}</span>
                <span>Priority: {task.priority || '—'}</span>
                <span>Branch: {task.branch_name || '—'}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Empty
          title="No tasks to display"
          body={
            workspaceId
              ? 'No task records were returned for this workspace.'
              : 'Create or select a workspace first.'
          }
        />
      )}
    </>
  )
}
