import type { BaseResponse } from '~/types/base'

export interface Profile {
    id: number,
    first_name: string,
    middle_name?: string,
    last_name: string,
    identifier: string,
    email: string,
    ref_countries_code: string,
    addressTypes: string
}

export interface FetchProfileResponse extends BaseResponse {
    data: Profile
}

export interface Role {
    id: number;
    code: string;
    name: string;
}
export interface Permission {
    id: number;
    name: string;
    roles: Role[];
}

export interface UserCompany {
    id: number
    is_active: number
    position: number | null
    sys_companies_id: number
    sys_companies_units_id: number |null
    sys_users_id: number
}

export interface UserProfile {
    id: number
    first_name: string
    middle_name: string
    last_name: string
    identifier: string
    email: string
    phone: string
    created_at: string
    permissions: Permission[];
    roles: Role[];
    userCompany: UserCompany[];
}

export interface FetchUserProfileResponse extends BaseResponse {
    data: UserProfile
}
