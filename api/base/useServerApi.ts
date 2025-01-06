import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

export const useServerApi = async (url: string, options: any = null) => {
  const authStore = useAuthStore()
  const { headers } = storeToRefs(authStore)
  const config = useRuntimeConfig()

  const opts = {
    baseURL: config.public.apiBaseUrl,
    headers: headers.value,
    ...options
  }

  const { data, status, error, refresh, clear } = await useFetch(url, opts)

  return {
    data, status, error, refresh, clear
  }
}
