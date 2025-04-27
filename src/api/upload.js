import { api } from './index'

export function uploadPdf(file) {
  const formData = new FormData()
  formData.append('file', file)

  return api
    .post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((r) => r.data)
}
