<script setup lang="ts">
import ButtonUi from "~/components/shared/ui/ButtonUi.vue"
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const handleLogout = () => {
  authStore.logout()
}

</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="max-w-7xl mx-auto">
      <div class="mr-auto w-full mb-10">
        <button-ui @click="handleLogout">
          Выйти
        </button-ui>
      </div>

      Главная

    </div>
  </div>
</template>

<style scoped>
</style>
