<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

defineProps<{
  name: string,
}>()

const router = useRouter()
const { $i18n } = useNuxtApp()
const $t = $i18n.t
const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore)
const localePath = useLocalePath()

const userOptions = [
  { label: $t('Личный кабинет'), value: 'profile' },
  { label: $t('Компания'), value: 'company' },
  { label: $t('Выход'), value: 'logout' }
]

const selectedOption = ref('')
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

watch(authenticated, (newVal) => {
  if (!newVal) {
    isOpen.value = false // Закрываем dropdown, если пользователь больше не аутентифицирован
  }
})
const routeMap: Record<string, string> = {
  profile: localePath('/cabinet/user'),
  company: localePath('/cabinet/company')
}

const logout = () => {
  authStore.logout()
}
const handleUpdate = (value: string) => {
  selectedOption.value = value
  isOpen.value = false

  if (value === 'logout') {
    logout()
  }

  const route = routeMap[value] || '/'
  router.push(route)
}

const handleSelect = (value: string) => {
  handleUpdate(value)
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown-container')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative user-component dropdown-container" @click="toggleDropdown">
    <div class="flex items-center space-x-4 cursor-pointer">
      <img
        src="/assets/images/user.svg"
        alt="user"
        class="w-10 h-10 rounded-full"
      >
      <p v-if="authenticated" class="text-sm md:flex hidden">
        {{ name }}
      </p>
    </div>
    <div v-if="isOpen" class="absolute right-0 mt-44 w-48 bg-white rounded-md shadow-lg z-10">
      <div
        v-for="option in userOptions"
        :key="option.value"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
        @click="handleSelect(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
