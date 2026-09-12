import { FormEvent, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useAuthStore } from '../../core/auth/authStore'

export function LoginPage() {
  const [token, setToken] = useState('')
  const signIn = useAuthStore((s) => s.signIn)
  const submit = (e: FormEvent) => { e.preventDefault(); const value = token.trim(); if (value) signIn(value) }
  return <div className="grid min-h-screen place-items-center px-4"><div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl backdrop-blur"><div className="mb-6 inline-flex rounded-2xl bg-blue-500/15 p-3 text-blue-300"><ShieldCheck size={28}/></div><h1 className="text-2xl font-semibold">Mesthi Super Admin</h1><p className="mt-2 text-sm leading-6 text-slate-400">Sign in with an authenticated Mesthi API bearer token. The token is stored only in this browser tab via sessionStorage and all authorization remains enforced by api.mesthi.com.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm text-slate-300">Admin access token<input value={token} onChange={(e)=>setToken(e.target.value)} type="password" autoComplete="off" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Bearer token"/></label><button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold hover:bg-blue-500">Continue</button></form><p className="mt-4 text-xs text-amber-300/80">Interim C4.5 authentication adapter. Replace with server-managed super-admin session/MFA when RBAC endpoints are added.</p></div></div>
}
