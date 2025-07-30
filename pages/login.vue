<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { useNotification } from '~/composables/useNotification'
import { loginSchema } from '~/features/auth/login/model/loginSchema'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import InputUi from "~/components/shared/ui/InputUi.vue"

const authStore = useAuthStore()
const { show } = useNotification()

const {
  handleSubmit,
  errors,
} = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

// Login

const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    await authStore.login(formData)
    show('Успешно вошли', 'success')
    await navigateTo('/')
  } catch (error: any) {
    show(error?.errors?.credentials?.[0] || 'Произошла ошибка', 'error')
  }
}
const onSubmit = handleSubmit(handleLogin)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white shadow-md p-6 rounded-md">
      <h1 class="text-2xl font-bold mb-6 text-center">
        Логин
      </h1>
      <form @submit.prevent="onSubmit">
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
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Войти
        </button>
      </form>
    </div>
  </div>
</template>
