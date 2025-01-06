<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  size: {
    type: String as PropType<'sm' | 'md' | 'lg' | 'xl' | '2xl'>,
    default: 'md',
    validator: (value: string) => {
      return ['sm', 'md', 'lg', 'xl', '2xl'].includes(value)
    }
  }
})

const containerClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-screen-sm mx-auto px-4'
    case 'md':
      return 'max-w-screen-md mx-auto px-4'
    case 'lg':
      return 'max-w-screen-lg mx-auto px-4'
    case 'xl':
      return 'max-w-screen-xl mx-auto px-4'
    case '2xl':
      return 'max-w-screen-xl mx-auto translate-x-0 px-4 custom:translate-x-[-2%]'
    default:
      return 'max-w-screen-lg mx-auto px-4'
  }
})
</script>

<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>
