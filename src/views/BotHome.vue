<template>
  <main class="p-6 max-w-4xl mx-auto space-y-6">
    <AppHeader />

    <section class="bg-white p-6 rounded-md shadow-md space-y-4">
      <ChatForm />
    </section>

    <section class="bg-white p-6 rounded-md shadow-md space-y-4">
      <PdfUploader />
    </section>
  </main>
</template>

<script setup lang="ts">
import PdfUploader from '@/components/PdfUploader.vue'
import ChatForm from '@/components/ChatForm.vue'

import AppHeader from '@/components/AppHeader.vue'
</script>
