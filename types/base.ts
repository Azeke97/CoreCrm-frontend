export interface BaseResponse<T = any> {
    success: number;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
}
