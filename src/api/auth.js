import { api } from './index'

export function login({ email, password }) {
  return api.post('/auth/login/', { email, password }).then((r) => r.data)
}

export function register({ email, password }) {
  return api.post('/auth/register/', { email, password }).then((r) => r.data)
}

export function getMe() {
  return api.get('auth/me').then((r) => r.data)
}
