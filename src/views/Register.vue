<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-6">
      <h1 class="text-2xl font-bold text-center text-indigo-600">Реєстрація</h1>

      <form class="space-y-4" @submit.prevent="handleRegister">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          required
          class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Реєстрація...' : 'Зареєструватися' }}
        </button>

        <p v-if="error" class="text-red-500 text-center mt-4">
          ❌ {{ error.message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'
import { useApi } from '@/composables/common/use-api.js'

const email = ref('')
const password = ref('')
const router = useRouter()

const { call, loading, error } = useApi(register, {
  notifySuccess: true,
  successMessage: 'Реєстрація успішна! Тепер ви можете увійти',
})

const handleRegister = async () => {
  await call({
    email: email.value,
    password: password.value,
  })

  await router.push('/login')
}
</script>
