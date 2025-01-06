import {useClientApi} from '~/api/base/useClientApi'
import type {Login, LoginResponse} from '~/types/auth'
import type {Registration, RegistrationResponse} from '~/types/registration'
import type {BaseResponse} from "~/types/base";

export const register = async (request: Registration): Promise<BaseResponse<RegistrationResponse>> => {
  return await useClientApi<RegistrationResponse>('/api/register', {
    method: 'POST',
    body: request,
  })
}

export const login = async (request: Login): Promise<BaseResponse<LoginResponse>> => {
  return await useClientApi('/api/login', {
    method: 'POST',
    body: request
  })
}
