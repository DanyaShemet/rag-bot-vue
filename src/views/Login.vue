<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <button @click="router.push('/register')">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
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
