import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
import type {BaseResponse} from "~/types/base";

export const useClientApi = async <T>(url: string, options: any = null, intercept: boolean = true): Promise<BaseResponse<T>> => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()
  const { $i18n: { locale } } = useNuxtApp();

  const headers = {
    Accept: 'application/json',
    'X-API-REQUEST': 1,
    'X-API-LOCALE': locale.value,
    Authorization: `Bearer ${authStore.token}`
  }

  const opts = {
    baseURL: config.public.apiBaseUrl,
    headers,
    server: false,
    ignoreResponseError: intercept,
    ...options
  }

  return await $fetch<BaseResponse>(url, opts)
}
