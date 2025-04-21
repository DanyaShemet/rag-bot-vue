import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error:', err)
    return Promise.reject(err)
  }
)
