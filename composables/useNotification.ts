import { ref } from 'vue'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface Notification {
  message: string
  type: NotificationType
  time: number
}

const notifications = ref<Notification[]>([])

export const useNotification = () => {
  // Добавление уведомления
  const notification = (message: string, type: NotificationType = 'info', time: number = 5000) => {
    const exists = notifications.value.some(notification => notification.message === message && notification.type === type)
    if (exists) return

    notifications.value.push({ message, type, time })

    setTimeout(() => {
      notifications.value.shift()
    }, time)
  }

  // Удаление уведомления
  const removeNotification = (index: number) => {
    notifications.value.splice(index, 1)
  }

  // Генерация CSS-классов
  const typeClass = (type: NotificationType) => {
    const classes = {
      success: 'border-green-500',
      error: 'border-red-500',
      info: 'border-blue-500',
      warning: 'border-yellow-500',
    }
    return classes[type] || 'border-gray-500'
  }


  return {
    notifications,
    notification,
    removeNotification,
    typeClass,
  }
}