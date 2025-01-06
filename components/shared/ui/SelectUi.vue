<script lang="ts" setup generic="T extends string | number">
import { ref, onBeforeUnmount } from 'vue'
import type { Nullable, SelectOption } from '~/types/common';

type ModelValue = Nullable<T>

interface Props {
  label: string
  title?: string
  modelValue: ModelValue
  options: SelectOption<T>[]
  disabled?: boolean
  readonly?: boolean
  error?: string
  clearable?: boolean
}

interface Emits {
  (event: 'update:modelValue', value: ModelValue): void,
  (event: 'blur'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isFocused = ref(false)
const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)
const tableContainerRef = ref<HTMLElement | null>(null)

const updateValue = (newValue: ModelValue) => {
  if (!props.readonly) {
    emit('update:modelValue', newValue)
    closeDropdown()
    emit('blur')
  }
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!selectRef.value?.contains(target)) {
    closeDropdown()
  }
}

const openDropdown = () => {
  if (!props.readonly) {
    isOpen.value = true
    if (selectRef.value) {
      const container = findTableContainer(selectRef.value)
      if (container) {
        container.style.overflowX = 'clip'
        tableContainerRef.value = container
      }
    }
  }
}

const closeDropdown = () => {
  isOpen.value = false
  if (tableContainerRef.value) {
    tableContainerRef.value.style.overflowX = 'auto'
  }
  tableContainerRef.value = null
}

const toggleDropdown = () => {
  if (!props.readonly) {
    return isOpen.value ? closeDropdown() : openDropdown()
  }
}

const findTableContainer = (element: HTMLElement): HTMLElement | null => {
  let parent = element.parentElement
  while (parent && !parent.classList.contains('overflow-x-auto')) {
    parent = parent.parentElement
  }
  return parent
}

useEventListener('click', handleClickOutside);

onBeforeUnmount(() => {
  closeDropdown()
})
</script>

<template>
  <div ref="selectRef" class="relative custom-select">
    <label v-if="title && modelValue" class="block w-full cursor-pointer">
      <span class="absolute left-2 px-1 transition-all duration-300 -top-5 text-sm text-primary text-gray-500">
        {{ title }}
      </span>
    </label>
    <label class="block w-full cursor-pointer text-sm">
      <span
        class="text-primary flex justify-between items-center w-full px-[15px] py-[14px] text-[15px] bg-transparent border rounded-md border-gray-600 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
        :class="{
          'cursor-auto': props.readonly,
          'border-red-600 text-red-600': props.error,
        }"
        tabindex="0"
        @click="toggleDropdown"
        @focus="isFocused = true"
        @blur="handleBlur"
      >
        {{ modelValue !== undefined && modelValue !== null && modelValue !== '' ? props.options.find(option => option.value === modelValue)?.text : label }}
        <svg
          class="w-4 h-4 inline-block ml-2 transition-transform"
          :class="{'rotate-180': isOpen, 'hidden': props.readonly}"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </label>
    <ul
      v-if="isOpen"
      class="text-sm absolute z-10 w-full bg-white border border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto"
    >
      <li
        v-if="props.clearable && !props.readonly"
        class="px-[15px] py-[14px] cursor-pointer hover:bg-primary hover:text-primary-gray text-sm"
        @click="updateValue(null)"
      >
        {{ $t('Очистить') }}
      </li>
      <li
        v-for="option in props.options"
        :key="option.value"
        class="px-[15px] py-[14px] cursor-pointer hover:bg-primary hover:text-primary-gray text-sm"
        @click="updateValue(option.value)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
