import { defineStore } from 'pinia'
import { useAuthStore } from '~/store/auth'
import { useUserRepository } from '~/repositories/userRepository'
import { useFilesRepository } from '~/repositories/filesRepository'
import type { User } from '~/types/users'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const authStore = useAuthStore()
    const { getUser } = useUserRepository()
    const { uploadFile, deleteFile } = useFilesRepository()

    // Fetch user profile
    const fetchUserProfile = async () => {
        try {
            user.value = await getUser()
        } catch (error: any) {
            if (error?.response?.status === 401) {
                console.error('Unauthorized. Redirecting to login.')
                authStore.logout()
            } else {
                console.error('Error fetching user profile:', error)
            }
        }
    }

    const reset = () => {
        user.value = null
    }

    // Upload avatar
    const uploadAvatar = async (file: File) => {
        if (!user.value) throw new Error('Пользователь не найден')

        const uploadResult = await uploadFile(file)
        user.value.avatar_url = uploadResult.file.url
    }

    // Delete avatar
    const deleteAvatar = async () => {
        if (!user.value?.avatar_url) throw new Error('Аватар не найден')

        const avatarId = parseInt(user.value.avatar_url.split('/').pop() || '', 10)
        if (isNaN(avatarId)) throw new Error('Некорректный ID аватара')

        await deleteFile(avatarId)
        user.value.avatar_url = null
    }

    return {
        user,
        reset,
        fetchUserProfile,
        uploadAvatar,
        deleteAvatar,
    }
})
