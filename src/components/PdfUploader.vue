<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-indigo-700">Завантажити PDF</h2>

    <input
      type="file"
      accept="application/pdf"
      class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
      @change="onFileChange"
    />

    <button
      :disabled="!file || loadingUpload"
      class="px-6 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      @click="handleUpload"
    >
      {{ loadingUpload ? 'Завантаження...' : 'Завантажити PDF' }}
    </button>

    <div v-if="uploadError" class="text-red-500">
      ❌ {{ uploadError.message }}
    </div>
    <div v-if="statusError" class="text-red-500">
      ❌ {{ statusError.message }}
    </div>

    <div v-if="statusLoading" class="text-gray-600">
      ⏳ Оновлення бази знань...
    </div>
    <div v-if="statusData" class="text-green-700 font-medium">
      📚 Фрагментів у базі знань: {{ statusData.count }}
    </div>

    <button
      :disabled="loadingDelete"
      class="px-6 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      @click="resetKnowledge"
    >
      {{ loadingDelete ? 'Очікуйте...' : 'Скинути базу знань' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/common/use-api.js'
import { uploadPdf } from '@/api/upload'
import { getStatus } from '@/api/status'
import { resetSession } from '@/api/session.js'

const file = ref(null)

const {
  call: upload,
  loading: loadingUpload,
  error: uploadError,
} = useApi(uploadPdf, {
  notifySuccess: true,
  successMessage: '📎 PDF успішно завантажено!',
})

const {
  call: deleteKnowledge,
  loading: loadingDelete,
  error: errorDelete,
} = useApi(resetSession, {
  notifySuccess: true,
  successMessage: 'Базу знань оновлено',
})

const {
  call: fetchStatus,
  loading: statusLoading,
  error: statusError,
  data: statusData,
} = useApi(getStatus)

function onFileChange(e) {
  file.value = e.target.files[0]
}

async function handleUpload() {
  if (!file.value) return
  await upload(file.value)
  await fetchStatus()
}

async function resetKnowledge() {
  await deleteKnowledge()

  statusData.value = { count: 0 }
}

onMounted(() => {
  fetchStatus()
})
</script>
