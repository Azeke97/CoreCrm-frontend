import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  authStore.loadToken()

  if (!authStore.authenticated && !['login', 'registration'].includes(to.name as string)) {
    return navigateTo('/login')
  }

  if (authStore.authenticated && ['login', 'registration'].includes(to.name as string)) {
    return navigateTo('/')
  }
})
