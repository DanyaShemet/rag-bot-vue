import { api } from './index'

export function resetSession() {
  return api.delete(`/api/reset`).then((r) => r.data)
}
