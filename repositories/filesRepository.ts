import type { UploadFileResponse } from '~/types/files'
import { apiRequest } from '~/api/base/apiRequest'

export const useFilesRepository = () => {
    /**
     * Uploads a file to the server.
     * @param file - The file to upload.
     * @returns A promise with the API response.
     */
    const uploadFile = async (file: File): Promise<UploadFileResponse> => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await apiRequest<UploadFileResponse>(
            '/files/upload',
            formData,
            'post'
        )

        return response.data
    }

    /**
     * Deletes a file from the server.
     * @param fileId - The ID of the file to delete.
     * @returns A promise with the API response.
     */
    const deleteFile = async (fileId: number): Promise<void> => {
        await apiRequest<null>(`/files/${fileId}`, undefined, 'delete')
        return
    }

    return {
        uploadFile,
        deleteFile,
    }
}
