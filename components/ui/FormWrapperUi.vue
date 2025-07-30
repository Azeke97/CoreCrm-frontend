<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  error?: string | null;
  disabled?: boolean;
}>()

const hasDisabledInput = computed(() => props.disabled)
</script>

<template>
  <div :class="['relative', { 'mb-8': !hasDisabledInput, 'mb-0': hasDisabledInput }]">
    <slot />
    <div class="absolute right-0">
      <p v-if="error" class="text-[12px] text-red-600 leading-4 text-right">
        {{ error }}
      </p>
    </div>
  </div>
</template>
