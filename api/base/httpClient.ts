import { buildApiHeaders } from './buildHeaders'
import { handleApiError } from './handleApiError'
import type { ApiRequestOptions } from "~/types/api"

export const httpRequest = async <T>(
    url: string,
    {
        intercept401 = true,
        server = import.meta.server,
        locale,
        ...options
    }: ApiRequestOptions = {}
): Promise<T> => {
    const config = useRuntimeConfig()

    const headers = {
        ...buildApiHeaders(locale),
        ...(options.headers || {}),
    }

    try {
        return await $fetch<T>(url, {
            baseURL: config.public.apiBase,
            headers,
            ...options,
        })
    } catch (error: any) {
        await handleApiError(error, { intercept401, server })
        throw error
    }
}
