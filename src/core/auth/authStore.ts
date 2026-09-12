import { create } from 'zustand'

const KEY = 'mesthi_super_admin_token'

type AuthState = {
  token: string | null
  signIn: (token: string) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: sessionStorage.getItem(KEY),
  signIn: (token) => {
    sessionStorage.setItem(KEY, token)
    set({ token })
  },
  signOut: () => {
    sessionStorage.removeItem(KEY)
    set({ token: null })
  },
}))
