// ~/utils/extractMessage.ts
export function extractMessage(error: any): string {
    const fullMessage = (
        error?.response?._data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        ''
    )

    const stripped = fullMessage.split(':').pop()?.trim()

    return stripped || 'Неизвестная ошибка'
}