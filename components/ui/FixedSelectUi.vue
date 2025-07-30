<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  label: string
  title?: string
  modelValue: string | number
  options: Array<{ value: any; text: string }>
  disabled?: boolean
  readonly?: boolean
  error?: string
  clearable?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'blur'])

const isFocused = ref(false)
const isOpen = ref(false)
const value = ref(props.modelValue)
const selectRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref({})

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
})

const updateValue = (newValue: string | number) => {
  if (!props.readonly) {
    value.value = newValue
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
    updateDropdownPosition()
  }
}

const closeDropdown = () => {
  isOpen.value = false
}

const toggleDropdown = () => {
  if (!props.readonly) {
    isOpen.value ? closeDropdown() : openDropdown()
  }
}

const updateDropdownPosition = () => {
  if (isOpen.value && selectRef.value) {

    requestAnimationFrame(() => {
      const rect = selectRef.value!.getBoundingClientRect()
      dropdownStyle.value = {
        position: 'fixed',
        top: `${rect.top + rect.height + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`
      }
    })
  }
}


onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updateDropdownPosition)
  window.addEventListener('resize', updateDropdownPosition)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updateDropdownPosition)
  window.removeEventListener('resize', updateDropdownPosition)
})
</script>

<template>
  <div ref="selectRef" class="relative custom-select">
    <label v-if="title && value" class="block w-full cursor-pointer">
      <span class="absolute left-2 px-1 transition-all duration-300 -top-5 text-sm text-primary text-gray-500">
        {{ title }}
      </span>
    </label>
    <label class="block w-full cursor-pointer">
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
        {{ value !== undefined && value !== null && value !== '' ? props.options.find(option => option.value === value)?.text : label }}
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
      :style="dropdownStyle"
      class="text-sm fixed z-10 bg-white border border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto"
    >
      <li
        v-if="props.clearable && !props.readonly"
        class="px-[15px] py-[14px] cursor-pointer hover:bg-primary hover:text-primary-gray"
        @click="updateValue('')"
      >
        {{ $t('Очистить') }}
      </li>
      <li
        v-for="option in props.options"
        :key="option.value"
        class="px-[15px] py-[14px] cursor-pointer hover:bg-primary hover:text-primary-gray"
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
