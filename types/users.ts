import type { Role } from "~/types/roles"

/**
 * User interface representing the structure of a user object returned from the API.
 */
export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    is_active: number
    is_verified: number
    created_at: string
    updated_at: string
    roles: Role[]
    avatar_url: string | null
}
