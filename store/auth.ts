import { defineStore } from 'pinia'
import { useUserStore } from '~/store/user'
import type { LoginRequest, LoginResponse } from "~/types/auth"
import { useAuthRepository } from "~/repositories/authRepository"
import type { RegistrationRequest, RegistrationResponse } from "~/types/registration"

export const useAuthStore = defineStore('auth', () => {
  const { login: loginApi } = useAuthRepository()
  const { register: registerApi } = useAuthRepository()
  const userStore = useUserStore()

  const authenticated = computed(() => !!token.value)

  const token = ref<string | null>(null)

  const setToken = (newToken: string | null) => {
    if (import.meta.client) {
      token.value = newToken
      localStorage.setItem('auth_token', newToken ?? '')
    }
  }

  const loadToken = () => {
    if (import.meta.client) {
      token.value = localStorage.getItem('auth_token')
    }
  }

  const sync = async (newToken: string) => {
    setToken(newToken)
    await userStore.fetchUserProfile()
  }

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await loginApi(credentials)

    if (isSuccessResponse(response)) {
      await sync(response.data.token)
      return response.data
    }

    throw response
  }

  const register = async (payload: RegistrationRequest): Promise<RegistrationResponse> => {
    const response = await registerApi(payload)

    if (isSuccessResponse(response)) {
      return response.data
    }

    throw response
  }

  const logout = () => {
    setToken(null)
    userStore.reset()
    navigateTo('/login')
  }

  const headers = computed(() => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  })

  if (import.meta.client) {
    token.value = localStorage.getItem('auth_token')
  }

  return {
    token,
    authenticated,
    headers,
    loadToken,
    sync,
    login,
    register,
    logout,
  }
})
