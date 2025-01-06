<script setup lang="ts">
import { ref, computed } from 'vue'
import SidebarItems from './SidebarItems.vue'
import { useAuthStore } from '~/store/auth'
import { COMPANY_ROLE, USER_ROLE } from '~/constants/roles'
const authStore = useAuthStore()
const { hasRole, hasPermission, hasAttribute, logout } = authStore
const { authenticated } = storeToRefs(authStore)

const { $i18n } = useNuxtApp()
const $t = $i18n.t

const isOpen = ref(false)
const router = useRouter()
const localePath = useLocalePath()

function toggleMobileMenu () {
  isOpen.value = !isOpen.value
}

const handleLogout = async () => {
  logout()
  await router.push('/')
}

const menuItems = computed(() => [
  { name: $t('Войти'), icon: 'star', visible: !authenticated.value, route: '/user/login' },
  { name: $t('Зарегистрироваться'), icon: 'star', visible: !authenticated.value, route: '/user/registration' },
  { name: $t('Личный кабинет'), icon: 'cabinetUser', route: '/cabinet/user', visible: authenticated.value },
  { name: $t('Профиль компании'), icon: 'profile', route: '/cabinet/company', visible: hasPermission(COMPANY_ROLE.EMPLOYEE, COMPANY_ROLE.ADMIN) },
  { name: $t('Мои объявления'), icon: 'buys', route: '/customer/buys', visible: hasPermission(COMPANY_ROLE.ENGINEER) },
  { name: $t('Мои приглашения'), icon: 'invites', route: '/supplier/invites' },
  { name: $t('Сотрудники компании'), icon: 'employees', route: '/cabinet/company/employees', visible: hasPermission(COMPANY_ROLE.ADMIN) },
  { name: $t('Мои заявки'), icon: 'supplierOffers', route: '/supplier/offers', visible: hasAttribute('is_supplier', true) && hasPermission(COMPANY_ROLE.SUPPLIER) },
  { name: $t('Комиссии'), icon: 'commissions', route: '/commissions', visible: hasAttribute('is_customer', true) && hasPermission(COMPANY_ROLE.EMPLOYEE) },
  { name: $t('Мои документы'), icon: 'documents', route: '/cabinet/files', visible: hasPermission(COMPANY_ROLE.ADMIN) },
  { name: $t('Объявления (СЭБ)'), icon: 'adminBuys', route: '/admin/buys', visible: hasRole(USER_ROLE.AUDITOR) },
  { name: $t('Админ Компании'), icon: 'adminCompany', route: '/admin/company', visible: hasRole(USER_ROLE.SUPPORT) },
  { name: $t('Админ Пользователи'), icon: 'adminUser', route: '/admin/user', visible: hasRole(USER_ROLE.SUPPORT) },
  { name: $t('Админ Аудит'), icon: 'adminAudit', route: '/admin/audit', visible: hasRole(USER_ROLE.SUPPORT) },
  { name: $t('Выход'), icon: 'logout', route: '/', action: handleLogout, visible: authenticated.value }
])

const visibleItems = computed(() => menuItems.value.filter(item => item.visible))

const handleNavigation = async (route?: string, action?: () => void) => {
  isOpen.value = false
  if (typeof action === 'function') {
    action()
  } else if (route) {
    await router.push(localePath(route))
  }
}
</script>

<template>
  <!-- mobile -->
  <div class="md:hidden">
    <div class="flex items-center">
      <button class="rounded-md focus:outline-none" @click="toggleMobileMenu">
        <svg
          v-if="isOpen"
          class="w-6 h-6 transform transition-transform duration-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6 transform rotate-180 transition-transform duration-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12h18M3 6h18M3 18h18"
          />
        </svg>
      </button>
    </div>

    <transition name="slide-fade">
      <div v-if="isOpen" class="fixed inset-0 z-40 flex flex-col bg-primary text-background overflow-y-auto">
        <div class="flex justify-end p-2">
          <button class="p-2 rounded-full focus:outline-none hover:bg-gray-600 transition-colors duration-300" @click="toggleMobileMenu">
            <svg class="w-6 h-6 transform transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke="#E5E4E5" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav class="flex flex-col mt-4 space-y-2 items-center w-full">
          <SidebarItems
            v-for="item in visibleItems"
            :key="item.name"
            :item="item"
            :is-open="true"
            @click="handleNavigation(item.route, item.action)"
          />
        </nav>
      </div>
    </transition>
  </div>
</template>
