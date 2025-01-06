<script setup lang="ts">
import NotificationManager from "~/components/shared/layout/NotificationManager.vue";
</script>

<template>
  <div class="flex flex-nowrap">
    <div class="grid grid-rows-layout min-h-screen flex-1">
      <NotificationManager />
      <NuxtPage />
    </div>
  </div>
</template>

