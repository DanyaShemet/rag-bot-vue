<template>
  <main class="p-6 max-w-2xl mx-auto">
    <AppHeader />

    <section class="bg-white p-6 rounded-md shadow-md space-y-4">
      <h1 class="text-2xl font-bold mb-4">Мій профіль</h1>

      <div v-if="loading">Завантаження...</div>

      <div v-else-if="user" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="user.email"
            type="text"
            disabled
            class="w-full p-2 border rounded bg-gray-100 mt-1"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMe } from '@/api/auth'
import { useApi } from '@/composables/common/use-api.js'
import AppHeader from '@/components/AppHeader.vue'

const editMode = ref(false)

const { call: fetchProfile, loading, error, data: user } = useApi(getMe)

onMounted(fetchProfile)
</script>
