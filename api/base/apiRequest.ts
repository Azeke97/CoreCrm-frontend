import { type ApiResponse, isErrorResponse, type SuccessResponse } from '~/types/base'
import type { ApiRequestOptions, HttpMethod } from "~/types/api"
import { httpRequest } from "~/api/base/httpClient"

export const apiRequest = async <T>(
    endpoint: string,
    body?: object | FormData,
    method: HttpMethod = body ? 'post' : 'get',
    options: ApiRequestOptions = {}
): Promise<SuccessResponse<T>> => {
    if (import.meta.server && body instanceof FormData) {
        throw new Error('FormData is not supported on the server side.')
    }

    const isForm = body instanceof FormData

    const response = await httpRequest<ApiResponse<T>>(endpoint, {
        method,
        headers: isForm ? {} : { 'Content-Type': 'application/json' },
        ...options,
        body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    })

    if (isErrorResponse(response)) {
        throw response
    }

    return response
}
