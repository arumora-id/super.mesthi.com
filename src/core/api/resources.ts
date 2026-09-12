import { api } from './client'
import type { Agent, Task, Workspace } from '../types/domain'

const unwrapList = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    for (const key of ['items', 'data', 'workspaces', 'agents', 'tasks']) if (Array.isArray(obj[key])) return obj[key] as T[]
  }
  return []
}

export const resourcesApi = {
  health: async () => (await api.get('/health')).data,
  workspaces: async () => unwrapList<Workspace>((await api.get('/v1/workspaces')).data),
  agents: async (workspaceId: string) => unwrapList<Agent>((await api.get(`/v1/workspaces/${workspaceId}/agents`)).data),
  tasks: async (workspaceId: string) => unwrapList<Task>((await api.get(`/v1/workspaces/${workspaceId}/tasks`)).data),
}
