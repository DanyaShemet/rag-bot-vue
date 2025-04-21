import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export function useApi(
  requestFn,
  { notifySuccess = false, successMessage = '✅ Готово' } = {}
) {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const call = async (...args) => {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const result = await requestFn(...args)
      data.value = result

      if (notifySuccess) {
        toast.success(successMessage)
      }

      return result
    } catch (err) {
      const message = err?.response?.data?.message || err?.message
      error.value = message
      toast.error(message || '❌ Сталася помилка')
      throw message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    call,
  }
}
