import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserProfile } from '~/types/users'
import { fetchUserProfileApi } from '~/api/endpoints/user'
import {useNotification} from "~/composables/useNotification";

export const useAuthStore = defineStore('auth', () => {

  const { notification } = useNotification()
  const tokenCookie = useCookie<string | null>('auth_token')
  const token = ref<string | null>(tokenCookie.value)
  const profile = ref<UserProfile | null>(null)
  const authenticated = computed(() => !!token.value)

  const headers = computed(() => {
    if (token.value) {
      return { Authorization: `Bearer ${token.value}` }
    }
    return {}
  })

  const loadToken = () => {
    token.value = tokenCookie.value
  }

  const sync = async (newToken: string) => {
    token.value = newToken
    tokenCookie.value = newToken
    await fetchUserProfile()
  }

  const fetchUserProfile = async () => {
    try {
      const response = await fetchUserProfileApi()
      if (response.success) {
        profile.value = response.data
        return true
      } else {
        notification('Ошибка загрузки профиля', 'error')
      }
    } catch (e) {
      console.error(e)
      logout()
      return false
    }
  }

  const logout = () => {
    token.value = null
    profile.value = null
    tokenCookie.value = null
    navigateTo('/login')
  }

  return {
    token,
    headers,
    profile,
    authenticated,
    loadToken,
    sync,
    logout,
  }
})
