<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-6">
      <h1 class="text-2xl font-bold text-center text-indigo-600">Вхід</h1>

      <form class="space-y-4" @submit.prevent="handleLogin">
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
          class="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          {{ loading ? 'Вхід...' : 'Увійти' }}
        </button>

        <button
          type="button"
          class="w-full bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400 transition"
          @click="router.push('/register')"
        >
          Зареєструватися
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
import { login } from '@/api/auth'
import { useApi } from '@/composables/common/use-api.js'

const email = ref('')
const password = ref('')
const router = useRouter()

const { call, loading, error } = useApi(login, {
  notifySuccess: true,
  successMessage: 'Вхід успішний! Тепер ви можете користуватися додатком',
})

const handleLogin = async () => {
  const { token } = await call({
    email: email.value,
    password: password.value,
  })

  localStorage.setItem('token', token)

  await router.push('/')
}
</script>
