import { api } from './index'

export function getStatus(sessionId) {
  return api.get(`/api/status/${sessionId}`).then((r) => r.data)
}
