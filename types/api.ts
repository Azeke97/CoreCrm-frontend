export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options'

export interface ApiRequestOptions extends Omit<RequestInit, 'method'> {
    method?: HttpMethod
    intercept401?: boolean
    locale?: string
    server?: boolean
}