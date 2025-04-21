import { api } from './index'

export function resetSession(sessionId) {
  return api.delete(`/api/reset/${sessionId}`).then((r) => r.data)
}
