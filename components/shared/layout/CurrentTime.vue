<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { $i18n } = useNuxtApp()
const $t = $i18n.t

const currentTime = ref<string>('')
const currentDate = ref<string>('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
  currentDate.value = now.toLocaleDateString()
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <div>
    <span>{{ currentDate }} {{ currentTime }}</span>
    <div>{{ $t('Казахстан, Астана') }} GMT+05:00</div>
  </div>
</template>
