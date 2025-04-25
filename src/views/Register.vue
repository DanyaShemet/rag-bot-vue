<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
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
