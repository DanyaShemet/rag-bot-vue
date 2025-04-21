import { api } from './index'

export function askChat(question, sessionId) {
  return api.post('/api/chat', { question, sessionId }).then((r) => r.data)
}
