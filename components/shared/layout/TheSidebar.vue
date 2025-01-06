<script setup lang="ts">
import { computed } from 'vue'
import SidebarItems from './SidebarItems.vue'
import { useAuthStore } from '~/store/auth'
import { COMPANY_ROLE, USER_ROLE } from '~/constants/roles'

const authStore = useAuthStore()
const { hasRole, hasPermission, hasAttribute } = authStore

const { $i18n } = useNuxtApp()
const $t = $i18n.t

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['toggle'])

function toggleSidebar () {
  emits('toggle')
}

// debug

const menuItems = computed(() => [
  { name: $t('Мои объявления'), icon: 'buys', to: '/customer/buys', visible: hasPermission(COMPANY_ROLE.ENGINEER) },
  { name: $t('Профиль компании'), icon: 'profile', to: '/cabinet/company', visible: hasPermission(COMPANY_ROLE.EMPLOYEE, COMPANY_ROLE.ADMIN) },
  { name: $t('Мои приглашения'), icon: 'invites', to: '/supplier/invites', visible: hasPermission(COMPANY_ROLE.SUPPLIER) },
  { name: $t('Сотрудники компании'), icon: 'employees', to: '/cabinet/company/employees', visible: hasPermission(COMPANY_ROLE.ADMIN) },
  { name: $t('Мои заявки'), icon: 'supplierOffers', to: '/supplier/offers', visible: hasAttribute('is_supplier', true) && hasPermission(COMPANY_ROLE.SUPPLIER) },
  { name: $t('Комиссии'), icon: 'commissions', to: '/commissions', visible: hasAttribute('is_customer', true) && hasPermission(COMPANY_ROLE.EMPLOYEE) },
  { name: $t('Мои документы'), icon: 'documents', to: '/cabinet/files', visible: hasPermission(COMPANY_ROLE.ADMIN) },
  { name: $t('Объявления (СЭБ)'), icon: 'adminBuys', to: '/admin/buys', visible: hasRole(USER_ROLE.AUDITOR) },
  { name: $t('Админ Компании'), icon: 'adminCompany', to: '/admin/company', visible: hasRole(USER_ROLE.SUPPORT) },
  { name: $t('Админ Пользователи'), icon: 'adminUser', to: '/admin/user', visible: hasRole(USER_ROLE.SUPPORT) },
  { name: $t('Админ Аудит'), icon: 'adminAudit', to: '/admin/audit', visible: hasRole(USER_ROLE.SUPPORT) }
])

const visibleItems = computed(() => menuItems.value.filter(item => item.visible))

function handleLinkClick () {
  if (props.isOpen) {
    toggleSidebar()
  }
}
</script>

<template>
  <div>
    <!-- desktop -->
    <div
      :class="[
        'flex flex-col bg-primary text-background transition-width duration-300 overflow-y-auto overflow-x-hidden fixed md:relative',
        { 'w-14': !props.isOpen, 'w-64': props.isOpen }
      ]"
    >
      <div class="flex justify-start p-2">
        <button
          class="p-2 rounded-full focus:outline-none hover:bg-gray-600 transition-colors duration-300"
          @click="toggleSidebar"
        >
          <svg
            v-if="props.isOpen"
            class="w-6 h-6 transform transition-transform duration-700 icon-color"
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
            class="w-6 h-6 transform rotate-180 transition-transform duration-300 icon-color"
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
      <nav class="flex flex-col mt-4 space-y-2">
        <SidebarItems
          v-for="item in visibleItems"
          :key="item.name"
          :item="item"
          :is-open="props.isOpen"
          @link-click="handleLinkClick"
        />
      </nav>
    </div>
  </div>
</template>

<style scoped>
.transition-width {
  transition-property: width;
}

.icon-color {
  stroke: var(--color-gray);
}

svg {
  transition: transform 0.7s ease;
}
</style>
