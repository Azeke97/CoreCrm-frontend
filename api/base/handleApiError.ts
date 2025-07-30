export const handleApiError = async (
    error: any,
    { intercept401 = true, server = false }: { intercept401: boolean; server: boolean }
) => {
    const status = error?.response?.status || error?.status
    const data = error?.response?._data || error?.data || {}
    const message = data?.message || error?.message || 'Unknown error'

    // Handle 401 Unauthorized
    if (status === 401) {
        console.error('[401 Unauthorized]', message)

        if (intercept401 && !server) {
            const { useAuthStore } = await import('~/store/auth')
            useAuthStore().logout()
        }
    }

    // Handle 422 Validation Error (e.g., Laravel validation failure)
    else if (status === 422 && data.errors) {
        const allErrors = Object.entries(data.errors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join(' | ')
        console.error('[422 Validation Error]', allErrors)
    }

    // Handle 403 Forbidden
    else if (status === 403) {
        console.error('[403 Forbidden]', message)
    }

    // Handle 400 Bad Request
    else if (status === 400) {
        console.error('[400 Bad Request]', message)
    }

    // Handle 500+ Server Errors
    else if (status >= 500) {
        console.error('[500+ Server Error]', message)
    }

    // Handle all other errors
    else {
        console.error(`[${status || 'Unknown'} Error]`, message)
    }

    // Additional logging in development mode
    if (import.meta.dev) {
        console.error('[API Error Details]', {
            status,
            data,
            fullError: error,
        })
    }

    throw data
}
