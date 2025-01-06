<script setup lang="ts">
import { computed } from 'vue'
import { getIconPath } from '~/utils/icon'

interface MenuItem {
  name: string;
  icon?: string;
  to?: string;
}

const props = defineProps<{
  item: MenuItem;
  isOpen: boolean;
}>()

const emits = defineEmits(['link-click'])

const iconPath = computed(() => {
  return getIconPath(props.item.icon)
})

function handleClick () {
  if (props.isOpen) {
    emits('link-click')
  }
}
</script>

<template>
  <nuxt-link-locale
    :to="item.to ? item.to : '/'"
    class="grid items-center p-2 cursor-pointer hover:bg-gray-700 w-full gap-3 sidebar-link"
    @click="handleClick"
  >
    <img
      v-if="item.icon"
      :src="iconPath"
      alt="icon"
      class="w-6 h-6 ml-[8px]"
      :title="item.name"
    >
    <span :class="`text-primary-gray w-max transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`">{{ item.name }}</span>
  </nuxt-link-locale>
</template>~

<style scoped>
.sidebar-link {
  grid-template-columns: max-content 1fr;
}
</style>
