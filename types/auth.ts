/**
 * Request type for user login.
 * Contains the user's email and password.
 */
export type LoginRequest = {
    email: string
    password: string
}

/**
 * Successful response type for user login.
 * Returns an authentication token for the user.
 */
export type LoginResponse = {
    token: string
}