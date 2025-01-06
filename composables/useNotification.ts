import { ref } from 'vue'

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    message: string;
    type: NotificationType;
}

const notifications = ref<Notification[]>([])

export const useNotification = () => {
  const addNotification = (message: string, type: NotificationType = 'info', time: number = 5000) => {
    // здесь есть проверка на дублирующиеся уведомления. Если есть дубликаты то показываю только одно
    const exists = notifications.value.some(notification => notification.message === message && notification.type === type)
    if (exists) return

    notifications.value.push({ message, type })

    setTimeout(() => {
      notifications.value.shift()
    }, time)
  }

  const removeNotification = (index: number) => {
    notifications.value.splice(index, 1)
  }

  const typeClass = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'border-green-500'
      case 'error':
        return 'border-red-500'
      case 'info':
        return 'border-blue-500'
      case 'warning':
        return 'border-yellow-500'
      default:
        return 'border-gray-500'
    }
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    typeClass
  }
}
