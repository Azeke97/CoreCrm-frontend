<script setup lang="ts">
import NotificationManager from "~/components/layout/NotificationManager.vue"
import { useAuthStore } from '~/store/auth'
import { useUserStore } from '~/store/user'

const authStore = useAuthStore()
const userStore = useUserStore()

/**
 * Automatically fetches the user profile if an authentication token is present.
 * Ensures the user profile is available after page reloads or app initialization.
 */
if (authStore.token) {
  userStore.fetchUserProfile()
}

</script>

<template>
  <div class="flex flex-nowrap">
    <div class="grid grid-rows-layout min-h-screen flex-1">
      <NotificationManager />
      <NuxtPage />
    </div>
  </div>
</template>

