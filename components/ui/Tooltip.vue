<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  content: string
  width?: number
}>()

const visible = ref(false)
const tooltipWidth = props.width || 150

const showTooltip = () => {
  visible.value = true
}

const hideTooltip = () => {
  visible.value = false
}
</script>

<template>
  <span class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot />
    <div
      v-if="visible"
      :style="{ width: `${tooltipWidth}px` }"
      class="absolute z-50 p-2 text-xs text-white bg-gray-700 rounded shadow-lg mt-2 right-0"
    >
      {{ content }}
    </div>
  </span>
</template>
