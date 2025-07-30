<script setup lang="ts">
import { useUserStore } from '~/store/user'
import type { User } from '~/types/users'
import AvatarUploader from '~/components/layout/profile/AvatarUploader.vue'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const userStore = useUserStore()

const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')
const user = ref<User | null>(null)
const formErrors = ref<Record<string, string>>({})

const fetchProfile = async () => {
  try {
    await userStore.fetchUserProfile()
    user.value = userStore.user
    hasError.value = false
    formErrors.value = {}
  } catch (error: any) {
    hasError.value = true
    errorMessage.value = error.message || 'Не удалось загрузить профиль'
    formErrors.value = handleErrors(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})

const formattedDate = (date: string) => dayjs(date).format('DD.MM.YYYY')

const userStatus = computed(() =>
    user.value?.is_active ? 'Активен' : 'Неактивен'
)
</script>


<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto bg-white shadow rounded-lg">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          Профиль пользователя
        </h1>

        <div
          v-if="isLoading"
          class="text-center py-8"
        >
          <p class="text-gray-600">
            Загрузка данных...
          </p>
        </div>

        <div
          v-else-if="hasError"
          class="text-red-500"
        >
          <p>
            Ошибка: {{ errorMessage }}
          </p>
        </div>

        <div v-else-if="user">
          <div class="flex items-center space-x-4 mb-6">
            <div class="flex items-center space-x-4 mb-6">
              <!-- Текущий аватар -->
              <AvatarUploader />
            </div>
            <div>
              <p class="text-lg font-semibold text-gray-700">
                {{ user.name }}
              </p>
              <p class="text-sm text-gray-500">
                {{ user.email }}
              </p>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-500">
              ID: {{ user.id }}
            </p>
            <p class="text-sm text-gray-500">
              Статус: {{ userStatus }}
            </p>
            <p class="text-sm text-gray-500">
              Дата регистрации: {{ formattedDate(user.created_at) }}
            </p>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-gray-700 mb-2">
              Роли
            </h2>
            <ul class="space-y-2">
              <li
                v-for="role in user.roles"
                :key="role.id"
                class="px-4 py-2 bg-gray-100 rounded-lg"
              >
                <p class="text-sm font-medium text-gray-600">
                  {{ role.name }}
                </p>
                <p class="text-xs text-gray-500">
                  Создана: {{ formattedDate(role.created_at) }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
