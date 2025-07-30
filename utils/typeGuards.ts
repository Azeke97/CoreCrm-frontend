import type { ApiResponse, SuccessResponse } from '~/types/base'

/**
 * Type guard to check if an API response is a successful response.
 * Ensures the response has a `success` value of 1, indicating a successful operation.
 *
 * @param response - The API response to be checked.
 * @returns `true` if the response is a success, otherwise `false`.
 */

export const isSuccessResponse = <T>(response: ApiResponse<T>): response is SuccessResponse<T> => {
    return response.success === 1
}