// ~/composables/useNotification.ts
type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface Notification {
  id: number
  message: string
  type: NotificationType
  time: number
}

export const useNotification = () => {
  const notifications = useState<Notification[]>('notifications', () => [])

  const show = (message: string, type: NotificationType = 'info', time = 5000) => {
    const exists = notifications.value.some(n => n.message === message && n.type === type)
    if (exists) return

    const id = Date.now() + Math.floor(Math.random() * 1000)
    notifications.value.push({ id, message, type, time })

    setTimeout(() => {
      const index = notifications.value.findIndex(n => n.id === id)
      if (index !== -1) notifications.value.splice(index, 1)
    }, time)
  }

  const remove = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) notifications.value.splice(index, 1)
  }
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
    show,
    success: (msg: string, time?: number) => show(msg, 'success', time),
    error: (msg: string, time?: number) => show(msg, 'error', time),
    info: (msg: string, time?: number) => show(msg, 'info', time),
    warning: (msg: string, time?: number) => show(msg, 'warning', time),
    remove,
    typeClass,
  }
}
