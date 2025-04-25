import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/Login.vue'
import RegisterPage from '@/views/Register.vue'
import HomePage from '@/views/BotHome.vue'

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: true },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})
