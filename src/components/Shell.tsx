import { useRef } from 'react'
import { Activity, Bot, Boxes, CreditCard, Gauge, LayoutDashboard, LogOut, PackageOpen, Server, Users } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { API_URL } from '../core/api/client'
import { useAuthStore } from '../core/auth/authStore'
import { usePageEntrance, useShellEntrance } from '../hooks/useMotion'

const nav = [
  ['/', 'Overview', LayoutDashboard],
  ['/workspaces', 'Workspaces', Boxes],
  ['/agents', 'Agents', Bot],
  ['/tasks', 'Tasks', Activity],
  ['/capacity', 'Capacity', Gauge],
  ['/plans', 'Plans', PackageOpen],
  ['/subscriptions', 'Subscriptions', CreditCard],
  ['/system', 'System', Server],
] as const

export function Shell() {
  const signOut = useAuthStore((state) => state.signOut)
  const location = useLocation()
  const sidebarRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  useShellEntrance(sidebarRef, headerRef)
  usePageEntrance(pageRef, [location.pathname])

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <aside
        ref={sidebarRef}
        className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-slate-950/90 lg:block"
      >
        <div className="border-b border-slate-800 p-5">
          <div className="text-xs uppercase tracking-[.28em] text-blue-400">Mesthi</div>
          <div className="mt-1 text-lg font-semibold">Super Admin</div>
        </div>
        <nav className="space-y-1 p-3">
          {nav.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`
              }
              end={to === '/'}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
          <div className="mb-3 truncate text-xs text-slate-500">{API_URL}</div>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-300 transition-colors duration-150 hover:bg-slate-900"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-64">
        <header
          ref={headerRef}
          className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/75 px-5 backdrop-blur"
        >
          <div>
            <span className="font-medium">Platform Control Plane</span>
            <span className="ml-2 text-xs text-slate-500">API 1.12.2</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Users size={15} /> super_admin
          </div>
        </header>
        <div ref={pageRef} className="mx-auto max-w-7xl p-5 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
