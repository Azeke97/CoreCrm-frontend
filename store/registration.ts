import { defineStore } from 'pinia'
import type {Registration} from '~/types/registration'

export const useRegistrationStore = defineStore('registration', () => {
  const userData = ref<Registration | null>(null)
  const registrationStep = ref<number>(1)
  const errors = ref<string[]>([])

  function setUserData (data: Registration) {
    userData.value = data
  }

  function setRegistrationStep (step: number) {
    registrationStep.value = step
  }

  function addError (error: string) {
    errors.value.push(error)
  }

  function clearErrors () {
    errors.value = []
  }

  return {
    userData,
    registrationStep,
    errors,
    setUserData,
    addError,
    setRegistrationStep,
    clearErrors
  }
})
