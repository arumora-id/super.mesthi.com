import type { ReactNode } from 'react'

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-panel backdrop-blur ${className}`}>{children}</div>
)

export const Badge = ({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'green' | 'blue' | 'amber' | 'red' }) => {
  const tones = { slate: 'bg-slate-800 text-slate-300', green: 'bg-emerald-500/15 text-emerald-300', blue: 'bg-blue-500/15 text-blue-300', amber: 'bg-amber-500/15 text-amber-300', red: 'bg-red-500/15 text-red-300' }
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>
}

export const PageHeader = ({ title, description, action }: { title: string; description: string; action?: ReactNode }) => (
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-semibold text-white">{title}</h1><p className="mt-1 max-w-3xl text-sm text-slate-400">{description}</p></div>{action}</div>
)

export const Empty = ({ title, body }: { title: string; body: string }) => <Card><div className="py-10 text-center"><p className="font-medium text-slate-200">{title}</p><p className="mt-2 text-sm text-slate-500">{body}</p></div></Card>
