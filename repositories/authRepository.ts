import type {LoginRequest, LoginResponse} from '~/types/auth'
import type {RegistrationRequest, RegistrationResponse} from '~/types/registration'
import {apiRequest} from '~/api/base/apiRequest'
import type {ErrorResponse, SuccessResponse} from "~/types/base";

export const useAuthRepository = () => {
    const register = async (data: RegistrationRequest): Promise<SuccessResponse<RegistrationResponse> | ErrorResponse> => {
        return await apiRequest<RegistrationResponse>('/auth/register', data, 'post')
    }

    const login = async (data: LoginRequest): Promise<SuccessResponse<LoginResponse> | ErrorResponse> => {
        return await apiRequest<LoginResponse>('/auth/login', data, 'post')
    }

    return {
        register,
        login,
    }
}
