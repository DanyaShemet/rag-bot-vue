<template>
  <main class="p-6 max-w-4xl mx-auto">
    <AppHeader />

    <section class="bg-white p-6 rounded-md shadow-md">
      <h1 class="text-2xl font-bold mb-6">Мої документи</h1>

      <div v-if="loading">Завантаження...</div>

      <div v-else>
        <div v-if="documents?.length === 0" class="text-gray-500">
          Немає документів
        </div>
        <ul class="space-y-4">
          <li
            v-for="doc in documents"
            :key="doc._id"
            class="flex justify-between items-center border-b pb-2"
          >
            <div>
              <div class="font-semibold">{{ doc.fileName }}</div>
              <div class="text-sm text-gray-500">
                {{ new Date(doc.createdAt).toLocaleString() }}
              </div>
            </div>
            <div class="flex space-x-4">
              <button
                class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                @click="downloadDocument(doc._id)"
              >
                📥 Завантажити
              </button>
              <button
                class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                @click="deleteDocument(doc._id)"
              >
                🗑️ Видалити
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
import { useApi } from '@/composables/common/use-api.js'
import { getDocuments, deleteDocument } from '@/api/documents'

const {
  call: getDocs,
  data: documents,
  loading,
  error: loadingError,
} = useApi(getDocuments, {
  notifySuccess: false,
})

const {
  call: deleteDoc,
  loading: loadingDelete,
  error: deleteError,
} = useApi(deleteDocument, {
  notifySuccess: false,
})

async function downloadDocument(url) {
  window.open(url, '_blank')
}

async function deleteDocumentById(id) {
  await deleteDoc(id)
  await getDocs()
}

onMounted(getDocs)
</script>

<style scoped lang="scss">
.btn-primary {
  @apply bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition;
}
.btn-danger {
  @apply bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition;
}
</style>
