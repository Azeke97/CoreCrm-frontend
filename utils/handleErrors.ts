import { ApiError } from './ApiError'

export function handleErrors(error: any): Record<string, string> {
    const result: Record<string, string> = {}

    const response = error instanceof ApiError ? error.response : error?.response

    if (response?.status === 422 && response._data?.errors) {
        const errors = response._data.errors as Record<string, unknown>

        for (const [field, messages] of Object.entries(errors)) {
            if (Array.isArray(messages) && typeof messages[0] === 'string') {
                result[field] = messages[0]
            }
        }
    }

    return result
}
