export const getFriendlyMessage = (status: number, fallback = ''): string => {
    switch (status) {
        case 401: return 'Ошибка авторизации (401)'
        case 403: return 'Доступ запрещен (403)'
        case 404: return 'Ресурс не найден (404)'
        case 500: return 'Ошибка сервера (500)'
        default: return fallback || `Произошла ошибка (${status})`
    }
}
