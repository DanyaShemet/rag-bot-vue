import { api } from './index'

export function getStatus() {
  return api.get(`/api/status`).then((r) => r.data)
}
