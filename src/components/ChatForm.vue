<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-indigo-700">
      Постав запитання до PDF
    </h2>

    <textarea
      v-model="question"
      rows="4"
      placeholder="Ваше питання..."
      class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
    />

    <button
      :disabled="!question || loading"
      class="px-6 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      @click="handleAsk"
    >
      {{ loading ? 'Очікуйте...' : 'Надіслати' }}
    </button>

    <p v-if="error" class="text-red-500">❌ {{ error.message }}</p>

    <div v-if="data" class="bg-gray-100 p-4 rounded-md shadow-sm">
      <strong class="text-gray-700 block mb-2">🤖 Відповідь:</strong>
      <p class="text-gray-800 whitespace-pre-line">{{ data.reply }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/common/use-api.js'
import { askChat } from '@/api/chat'

const question = ref('')

const { call: ask, loading, error, data } = useApi(askChat)

async function handleAsk() {
  if (!question.value) return
  await ask(question.value)
}
</script>
