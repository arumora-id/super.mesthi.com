import axios from 'axios'
import { useAuthStore } from '../auth/authStore'

export const API_URL = import.meta.env.VITE_MESTHI_API_URL || 'https://api.mesthi.com'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) useAuthStore.getState().signOut()
    return Promise.reject(error)
  },
)

export const errorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail || error.response?.data?.message || error.message
  }
  return error instanceof Error ? error.message : 'Unknown error'
}
