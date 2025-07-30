import { defineStore } from 'pinia'
import { useFilesRepository } from '~/repositories/filesRepository'
import type { UploadFileResponse } from '~/types/files'

export const useFileStore = defineStore('file', () => {
    const result = ref<UploadFileResponse | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const { uploadFile: uploadFileApi } = useFilesRepository()

    const uploadFile = async (file: File) => {
        if (!file) {
            error.value = 'Please select a file!'
            return
        }

        loading.value = true
        error.value = null

        try {
            result.value = await uploadFileApi(file)
        } catch (err: any) {
            console.error('Error uploading file:', err)
            error.value = err.message || 'An unexpected error occurred.'
        } finally {
            loading.value = false
        }
    }

    const reset = () => {
        result.value = null
        error.value = null
    }

    return {
        reset,
        result,
        loading,
        error,
        uploadFile,
    }
})
