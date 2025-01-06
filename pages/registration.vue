<script lang="ts" setup>
import { ref } from 'vue'
import { useRegistrationStore } from '~/store/registration'
import { register } from '~/api/endpoints/user'
import { useNotification } from '~/composables/useNotification'
import type {Registration, RegistrationResponse} from '~/types/registration'

const router = useRouter()
const registrationStore = useRegistrationStore()
const { addNotification } = useNotification()

const formData = ref<Registration>({
  name: '',
  email: '',
  password: '',
})

const fieldErrors = ref<{ [key: string]: string }>({})

const handleRegister = async () => {
  try {
    fieldErrors.value = {}
    const response = await register(formData.value)

    if (response.success) {
      response.data && registrationStore.setUserData(response.data)
      addNotification(response.message || 'Регистрация прошла успешно!', 'success')
      await navigateTo('/login')
      return
    }

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        fieldErrors.value[field] = messages[0]
      })
    }

    addNotification(response.message || 'Ошибки валидации', 'error')

  } catch (error: any) {
    console.error('Ошибка:', error)
    addNotification('Произошла ошибка. Попробуйте позже', 'error')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white shadow-md p-6 rounded-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
              v-model="formData.name"
              type="text"
              id="name"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <p v-if="fieldErrors.name" class="text-red-500 text-sm mt-1">{{ fieldErrors.name }}</p>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
              v-model="formData.email"
              type="email"
              id="email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <p v-if="fieldErrors.email" class="text-red-500 text-sm mt-1">{{ fieldErrors.email }}</p>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
              v-model="formData.password"
              type="password"
              id="password"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <p v-if="fieldErrors.password" class="text-red-500 text-sm mt-1">{{ fieldErrors.password }}</p>
        </div>

        <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
