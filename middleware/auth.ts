import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $i18n, runWithContext } = useNuxtApp()
  const $t = $i18n.t
  const { sync } = useAuthStore()
  const { authenticated, token } = storeToRefs(useAuthStore())

  if (token.value) {
    // sync storage

    const status = await sync(token.value)

    if (status) {
      authenticated.value = true
    } else {
      authenticated.value = false
      throw createError({
        statusCode: 401,
        statusMessage: $t('Ошибка 401: Недействительный или просроченный токен.')
      })
    }
  } else {
    authenticated.value = false
    // Если токена нет, выбрасываем ошибку 401
    throw createError({
      statusCode: 401,
      statusMessage: $t('Ошибка 401: Для доступа необходимо войти в систему.')
    })
  }

  if (token.value && to?.name === 'login') {
    return runWithContext(() => navigateTo('/'))
  }
})
