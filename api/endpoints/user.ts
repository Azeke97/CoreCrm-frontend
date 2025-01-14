import {useClientApi} from '~/api/base/useClientApi'
import type {Login, LoginResponse} from '~/types/auth'
import type {Registration, RegistrationResponse} from '~/types/registration'
import type {BaseResponse} from "~/types/base";
import type {FetchUserProfileResponse} from "~/types/users";
export const register = async (request: Registration): Promise<RegistrationResponse> => {
  return await useClientApi<RegistrationResponse>(`/auth/register`, {
    method: 'POST',
    body: request,
  })
}

export const login = async (request: Login): Promise<BaseResponse<LoginResponse>> => {
  return await useClientApi<BaseResponse<LoginResponse>>(`/auth/login`, {
    method: 'POST',
    body: request,
  })
}

export const fetchUserProfileApi = async (): Promise<FetchUserProfileResponse> => {
  return await useClientApi<FetchUserProfileResponse>(`/user`, {
    method: 'GET',
  })
}
