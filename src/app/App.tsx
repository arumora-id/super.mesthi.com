import { Navigate, Route, Routes } from 'react-router-dom'
import { Shell } from '../components/Shell'
import { useAuthStore } from '../core/auth/authStore'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { WorkspacesPage } from '../features/workspaces/WorkspacesPage'
import { AgentsPage } from '../features/agents/AgentsPage'
import { TasksPage } from '../features/tasks/TasksPage'
import { CapacityPage } from '../features/capacity/CapacityPage'
import { PlansPage } from '../features/plans/PlansPage'
import { SubscriptionsPage } from '../features/subscriptions/SubscriptionsPage'
import { LoginPage } from '../features/system/LoginPage'
import { SystemPage } from '../features/system/SystemPage'

export function App(){ const token=useAuthStore(s=>s.token); if(!token) return <LoginPage/>; return <Routes><Route element={<Shell/>}><Route index element={<DashboardPage/>}/><Route path="workspaces" element={<WorkspacesPage/>}/><Route path="agents" element={<AgentsPage/>}/><Route path="tasks" element={<TasksPage/>}/><Route path="capacity" element={<CapacityPage/>}/><Route path="plans" element={<PlansPage/>}/><Route path="subscriptions" element={<SubscriptionsPage/>}/><Route path="system" element={<SystemPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes> }
