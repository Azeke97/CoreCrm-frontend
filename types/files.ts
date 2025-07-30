export interface UploadFileResponse {
    file: {
        id: number
        filename: string
        url: string
        size: number
        mime_type: string
        uploaded_by: number
        created_at: string
        updated_at: string
    }
}