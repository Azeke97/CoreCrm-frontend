import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uploadFileApi } from '~/api/endpoints/files'

export const useFileStore = defineStore('file', () => {
    const result = ref<any>(null)
    const loading = ref<boolean>(false)

    const uploadFile = async (file: File) => {
        if (!file) {
            alert('Please select a file!')
            return
        }

        try {
            loading.value = true
            result.value = await uploadFileApi(file)
        } catch (error: any) {
            console.error('Error:', error)
            result.value = { success: false, error: error.message }
        } finally {
            loading.value = false
        }
    }

    const uploadMultipleFiles = async (files: FileList) => {
        if (!files || files.length === 0) {
            alert('Please select files!')
            return
        }

        try {
            loading.value = true
            const responses = []

            for (const file of Array.from(files)) {
                const response = await uploadFileApi(file)
                responses.push(response)
            }

            result.value = responses
        } catch (error: any) {
            console.error('Error:', error)
            result.value = { success: false, error: error.message }
        } finally {
            loading.value = false
        }
    }

    return {
        result,
        loading,
        uploadFile,
        uploadMultipleFiles,
    }
})