<template>
  <div class="chat-form">
    <h2>Постав запитання до PDF</h2>

    <textarea v-model="question" rows="4" placeholder="Ваше питання..." />
    <button :disabled="!question || loading" @click="handleAsk">
      {{ loading ? 'Очікуйте...' : 'Надіслати' }}
    </button>

    <p v-if="error" style="color: red">❌ {{ error.message }}</p>

    <div v-if="data" class="response">
      <strong>🤖 Відповідь:</strong>
      <p>{{ data.reply }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/common/use-api.js'
import { askChat } from '@/api/chat'

const sessionId = localStorage.getItem('sessionId')
const question = ref('')

const { call: ask, loading, error, data } = useApi(askChat)

async function handleAsk() {
  if (!question.value || !sessionId) return
  await ask(question.value, sessionId)
}
</script>

<style scoped>
.chat-form {
  margin-top: 2rem;
}
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.response {
  margin-top: 1rem;
  background: #f4f4f4;
  padding: 1rem;
  color: #333;
  border-radius: 8px;
}
</style>
