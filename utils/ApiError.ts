export class ApiError extends Error {
    response: unknown

    constructor(message: string, response: unknown) {
        super(message)
        this.name = 'ApiError'
        this.response = response
    }
}