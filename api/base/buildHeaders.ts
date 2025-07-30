import { useAuthStore } from '~/store/auth'

export const buildApiHeaders = (locale?: string): Record<string, string> => {
    const authStore = useAuthStore()

    const token = authStore.token
    const headers: Record<string, string> = {
        Accept: 'application/json',
        'X-API-REQUEST': '1',
    }

    if (locale) {
        headers['X-API-LOCALE'] = locale
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    } else {
        console.warn('No token — Authorization header not added')
    }

    console.log(111, headers)

    return headers
}