import type { User } from '~/types/users'
import { apiRequest } from '~/api/base/apiRequest'

export const useUserRepository = () => {
    /**
     * Fetches the current user's profile.
     * @returns A promise with the user profile data.
     */
    const getUser = async (): Promise<User> => {
        const response = await apiRequest<User>('/user', undefined, 'get')

        if (isSuccessResponse(response)) {
            return response.data
        }

        throw response
    }

    return {
        getUser,
    }
}
