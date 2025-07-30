<script setup lang="ts">
import { useNotification } from '~/composables/useNotification'

const { notifications, remove, typeClass } = useNotification()
</script>

<template>
  <div class="fixed top-20 right-4 z-[2000]">
    <transition-group
      name="notification"
      tag="div"
      class="flex flex-col gap-4"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="relative p-4 rounded shadow-lg border-l-4 bg-white overflow-hidden"
        :class="typeClass(notification.type)"
        role="alert"
      >
        <p>
          {{ notification.message }}
        </p>

        <button
          class="bg-none border-none cursor-pointer absolute top-0 right-1 text-black"
          @click="remove(notification.id)"
        >
          &times;
        </button>

        <div
          class="absolute bottom-0 left-0 h-1 bg-opacity-50"
          :class="typeClass(notification.type)"
          :style="{ width: '100%', animation: `progress ${notification.time}ms linear` }"
        />
      </div>
    </transition-group>
  </div>
</template>



<style scoped>
/* Добавляем плавные переходы */
.notification-enter-active,
.notification-leave-active {
  transition: opacity 0.6s, transform 0.6s;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-20px); /* Плавный подъем при появлении */
}

.notification-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.notification-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* Плавный уход вверх */
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
