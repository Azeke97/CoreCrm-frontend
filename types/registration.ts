export interface RegistrationRequest {
    name: string
    email: string
    password: string
}

export interface RegistrationResponse {
    id: number
    name: string
    email: string
    createdAt: string
}