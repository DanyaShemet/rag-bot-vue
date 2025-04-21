<template>
  <main>
    <h1>🧠 GPT RAG Бот</h1>

    <ChatForm />

    <PdfUploader />
  </main>
</template>

<script setup>
import PdfUploader from '@/components/PdfUploader.vue'
import ChatForm from '@/components/ChatForm.vue'

function resetSession() {
  localStorage.removeItem('sessionId')
  location.reload()
}
</script>
