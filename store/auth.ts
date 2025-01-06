import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserProfile, FetchUserProfileResponse } from '~/types/users'
import { useNotification } from '~/composables/useNotification'
import { useClientApi } from '~/api/base/useClientApi'


export const useAuthStore = defineStore('auth', () => {
  const { addNotification } = useNotification()

  const authenticated = ref<boolean>(false)
  const profile = ref({} as UserProfile)
  const token = ref<string | null>(null)

  const sync = async (newToken: string): Promise<boolean> => {
    try {
      authenticated.value = true
      token.value = newToken

      if (import.meta.client) {
        localStorage.setItem('token', newToken)
      }

      const profileSynced = await fetchUserProfile()
      if (profileSynced) {
        return true
      }
      logout()
      return false
    } catch (error: any) {
      console.error('Ошибка при синхронизации токена:', error)
      logout()
      return false
    }
  }

  const fetchUserProfile = async (): Promise<boolean> => {
    try {
      const response = await useClientApi('/api/user') as FetchUserProfileResponse

      if (response.success) {
        profile.value = response.data as UserProfile
        return true
      } else {
        console.error('Не удалось загрузить профиль: ', response.message)
        return false
      }
    } catch (error) {
      const status = (error as any)?.response?.status
      if (status === 401) {
        addNotification('Вы не авторизованы. Токен истек или недействителен.', 'error')
      } else {
        console.error('Ошибка при загрузке профиля пользователя:', error)
      }
      return false
    }
  };



  const loadToken = async () => {
    if (import.meta.client) {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        token.value = savedToken
        authenticated.value = true

        const profileLoaded = await fetchUserProfile()
        if (!profileLoaded) {
          console.warn('Профиль не загружен. Выполняется логаут.')
          logout()
        }
      }
    }
  }

  const logout = (redirect: boolean = false) => {
    console.log('Выполняется логаут. Токен удален.');
    token.value = null
    authenticated.value = false

    profile.value = {} as UserProfile

    if (import.meta.client) {
      localStorage.removeItem('token')
      navigateTo('/login')
    }

    if (redirect) {
      console.log(redirect)
    }
  }



  const hasAttribute = (attribute: string, value: string | number | boolean): boolean => {
    // @ts-ignore
    return company.value && company.value[attribute] && company.value[attribute] === value
  }

  onMounted(() => {
    loadToken().catch((error) => {
      console.error('Ошибка при загрузке токена:', error)
    })
  })

  return {
    sync,
    authenticated,
    profile,
    token,
    logout,
    hasAttribute
  }
})
