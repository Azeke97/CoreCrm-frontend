<script setup lang="ts">
import { useNotification } from '~/composables/useNotification'
import { useAuthStore } from '~/store/auth'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema } from '~/features/register/model/registerSchema'
import InputUi from "~/components/shared/ui/InputUi.vue"

const { show } = useNotification()
const authStore = useAuthStore()

const {
  handleSubmit,
  errors,
} = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
})

const handleRegister = async (formData: {
  name: string
  email: string
  password: string
  password_confirmation: string
}) => {
  try {
    await authStore.register(formData)
    show('Регистрация прошла успешно!', 'success')
    await navigateTo('/login')
  } catch (error: any) {
    const serverErrors = error?.errors || {}

    if (serverErrors.credentials) {
      show(serverErrors.credentials[0], 'error')
    } else {
      show(error?.message || 'Произошла ошибка', 'error')
    }
  }
}

const onSubmit = handleSubmit(handleRegister)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white shadow-md p-6 rounded-md">
      <h1 class="text-2xl font-bold mb-6 text-center">
        Регистрация
      </h1>
      <form @submit.prevent="onSubmit">
        <InputUi
          name="name"
          label="Имя"
          :error="errors.name"
        />
        <InputUi
          name="email"
          label="Email"
          type="email"
          :error="errors.email"
        />
        <InputUi
          name="password"
          label="Пароль"
          type="password"
          :error="errors.password"
        />
        <InputUi
          name="password_confirmation"
          label="Подтверждение пароля"
          type="password"
          :error="errors.password_confirmation"
        />
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>
