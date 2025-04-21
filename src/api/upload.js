import { api } from './index'

export function uploadPdf(file, sessionId) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('sessionId', sessionId)

  return api
    .post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((r) => r.data)
}
