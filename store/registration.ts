import { defineStore } from 'pinia'
import type { RegistrationResponse } from '~/types/registration'

export const useRegistrationStore = defineStore('registration', () => {
  const userData = ref<RegistrationResponse | null>(null)
  const registrationStep = ref(1)
  const errors = ref<string[]>([])

  const setUserData = (data: RegistrationResponse) => {
    userData.value = data
  }

  const setRegistrationStep = (step: number) => {
    registrationStep.value = step
  }

  const addError = (error: string) => {
    errors.value.push(error)
  }

  const clearErrors = () => {
    errors.value = []
  }

  return {
    userData,
    registrationStep,
    errors,
    setUserData,
    setRegistrationStep,
    addError,
    clearErrors,
  }
})
