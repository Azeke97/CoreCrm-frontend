import { useClientApi } from '~/api/base/useClientApi'
import { createFormData } from '~/utils/formData'

export const uploadFileApi = async (file: File): Promise<any> => {
    const formData = createFormData(file)

    return await useClientApi(`/files/upload`, {
        method: 'POST',
        body: formData,
    })
}