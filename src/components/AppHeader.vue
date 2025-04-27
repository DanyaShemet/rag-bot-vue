<template>
  <header
    class="flex flex-col md:flex-row justify-between items-center p-4 mb-6 bg-white shadow-md rounded-md"
  >
    <div
      class="text-2xl font-bold text-indigo-600 mb-2 md:mb-0 cursor-pointer"
      @click="goTo('/')"
    >
      🧠 GPT RAG Бот
    </div>

    <nav
      class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center"
    >
      <button
        class="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
        @click="goTo('/profile')"
      >
        Мій профіль
      </button>
      <button
        class="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
        @click="goTo('/documents')"
      >
        Мої документи
      </button>
      <button
        class="text-blue-600 hover:text-blue-800 font-medium transition-colors text-red-500 hover:text-red-600 cursor-pointer"
        @click="logout"
      >
        Вийти
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (path) => {
  router.push(path)
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
