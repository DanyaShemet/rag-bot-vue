import { api } from './index'

export function getDocuments() {
  return api.get(`/documents`).then((r) => r.data)
}

export function deleteDocument(id) {
  return api.delete(`/documents/${id}`).then((r) => r.data)
}
