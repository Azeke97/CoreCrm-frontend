import type {BaseResponse} from "~/types/base";

export interface Registration extends BaseResponse {
    name: string
    email: string
    password: string
}

export interface RegistrationResponse extends BaseResponse {
    name: string
    email: string
    password: string
}