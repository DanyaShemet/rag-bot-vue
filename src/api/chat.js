import { api } from './index'

export function askChat(question) {
  return api.post('/api/chat', { question }).then((r) => r.data)
}
