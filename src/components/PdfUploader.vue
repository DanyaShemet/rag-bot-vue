<template>
  <div class="pdf-uploader">
    <h2>Завантажити PDF</h2>

    <input type="file" accept="application/pdf" @change="onFileChange" />
    <button :disabled="!file || loadingUpload" @click="handleUpload">
      {{ loadingUpload ? 'Завантаження...' : 'Завантажити PDF' }}
    </button>

    <p v-if="uploadError" style="color: red">❌ {{ uploadError.message }}</p>
    <p v-if="statusError" style="color: red">❌ {{ statusError.message }}</p>

    <p v-if="statusLoading">⏳ Оновлення бази знань...</p>
    <p v-if="statusData">📚 Фрагментів у базі знань: {{ statusData.count }}</p>

    <button @click="resetKnowledge(sessionId)">Скинути базу знань</button>

    <button @click="startNewSession">Почати нову сесію</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/common/use-api.js'
import { uploadPdf } from '@/api/upload'
import { getStatus } from '@/api/status'
import { resetSession } from '@/api/session.js'

const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID()
localStorage.setItem('sessionId', sessionId)

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
  if (!file.value || !sessionId) return
  await upload(file.value, sessionId)
  await fetchStatus(sessionId)
}

async function resetKnowledge() {
  await deleteKnowledge(sessionId)

  statusData.value = { count: 0 }
}

function startNewSession() {
  const newId = crypto.randomUUID()
  localStorage.setItem('sessionId', newId)
  location.reload()
}

onMounted(() => {
  fetchStatus(sessionId)
})
</script>

<style scoped>
.pdf-uploader {
  margin-top: 2rem;
}
input[type='file'] {
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
}
</style>
