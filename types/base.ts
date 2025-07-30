// base.ts
export interface SuccessResponse<T = any> {
    success: 1
    data: T
    message?: string
}

export interface ErrorResponse {
    success: 0
    message?: string
    errors?: Record<string, string[]>
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse

export function isSuccessResponse<T = any>(res: ApiResponse<T>): res is SuccessResponse<T> {
    return res.success === 1
}

export function isErrorResponse<T = any>(res: ApiResponse<T>): res is ErrorResponse {
    return res.success === 0
}
