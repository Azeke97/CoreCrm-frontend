<script lang="ts" setup>
import { ref } from 'vue'
import { useNotification } from '~/composables/useNotification'
import { register } from '~/api/endpoints/user'
import type { Registration } from '~/types/registration'

const { notification } = useNotification()

const formData = ref<Registration>({
  name: '',
  email: '',
  password: '',
})

const fieldErrors = ref<{ [key: string]: string }>({})

const handleRegister = async () => {
  try {
    // Сбрасываем ошибки полей
    fieldErrors.value = {}

    // Отправляем запрос на регистрацию
    const response = await register(formData.value)

    if (response.success) {
      notification(response.message || 'Регистрация прошла успешно!', 'success')
      await navigateTo('/login')
      return
    }

    // Обрабатываем ошибки валидации
    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        fieldErrors.value[field] = messages[0]
      })
    }

    notification(response.message || 'Ошибки валидации', 'error')
  } catch (error: any) {
    console.error('Ошибка:', error)
    notification('Произошла ошибка. Попробуйте позже', 'error')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white shadow-md p-6 rounded-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Регистрация</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
          <p v-if="fieldErrors.name" class="text-red-500 text-sm mt-1">{{ fieldErrors.name }}</p>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
          <p v-if="fieldErrors.email" class="text-red-500 text-sm mt-1">{{ fieldErrors.email }}</p>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
          <p v-if="fieldErrors.password" class="text-red-500 text-sm mt-1">{{ fieldErrors.password }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Регистрация
        </button>
      </form>
    </div>
  </div>
</template>
