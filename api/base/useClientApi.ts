import { useAuthStore } from '~/store/auth'

export const useClientApi = async <T>(
    url: string,
    options: any = null,
    intercept: boolean = true
) => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()
  const { $i18n: { locale } } = useNuxtApp()


  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-API-REQUEST': '1',
    'X-API-LOCALE': locale.value,
  }

  if (authStore.token) {
    headers.Authorization = `Bearer ${authStore.token}`
  }

  const opts = {
    baseURL: config.public.apiBase,
    headers,
    server: false,
    ignoreResponseError: intercept,
    ...options,
  }

  return await $fetch<T>(url, opts)
}