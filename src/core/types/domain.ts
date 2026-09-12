export type Workspace = { id: string; name?: string; status?: string; repository?: string; repository_full_name?: string; created_at?: string }
export type Agent = { id: string; workspace_id?: string; name?: string; status?: string; model_id?: string; repository?: string; repository_full_name?: string; default_branch?: string }
export type Task = { id: string; workspace_id?: string; agent_id?: string; title?: string; instructions?: string; priority?: string; status?: string; branch_name?: string; created_at?: string; started_at?: string; completed_at?: string }
export type Reconciliation = { task_status?: string; task_session_status?: string; hermes_status?: string; delivery_status?: string | null; commit_sha?: string | null; remote_sha?: string | null }
