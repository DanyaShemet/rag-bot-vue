import axios from 'axios'
import { router } from '@/router'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    }

    return Promise.reject(err)
  }
)
