<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  label: string
  modelValue: string
  options: Array<{ value: string; text: string }>;
  disabled?: boolean
  error?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const { $i18n } = useNuxtApp()
const $t = $i18n.t

const isFocused = ref(false)
const isOpen = ref(false)
const searchQuery = ref('')

const value = ref(props.modelValue)

const filteredOptions = computed(() => {
  return props.options
})

const selectedOption = computed(() => {
  return props.options.find(option => option.text === searchQuery.value)
})

const handleBlur = () => {
  isFocused.value = false
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.custom-select')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const updateValue = (newValue: string, newText: string, closeDropdown = true) => {
  value.value = newValue
  searchQuery.value = newText
  emit('update:modelValue', newValue)
  if (closeDropdown) {
    isOpen.value = false
  }
}

const clearValue = () => {
  updateValue('', '', false)
}

watch(searchQuery, (newQuery) => {
  if (!selectedOption.value) {
    emit('update:modelValue', newQuery)
  }
})

watch(() => props.modelValue, (newValue) => {
  if (newValue !== value.value) {
    value.value = newValue
    searchQuery.value = newValue ? String(newValue) : ''
  }
})

</script>

<template>
  <div class="relative custom-select w-full">
    <label class="block w-full cursor-text relative">
      <input
        v-model="searchQuery"
        class="text-primary flex justify-between w-full items-center px-[15px] py-[14px] text-base bg-transparent border rounded-md border-gray-600 focus:outline-none focus:ring-0 focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
        type="text"
        :disabled="props.disabled"
        @blur="handleBlur"
        @focus="isFocused = true; isOpen = true"
        @input="isOpen = true"
      >
      <span
        :class="[
          'absolute left-2 px-1 transition-all duration-300',
          { '-top-5 text-sm text-primary': isFocused || searchQuery,
            'top-4 text-base text-primary': !isFocused && !searchQuery,
            'text-gray-500': disabled }
        ]"
      >
        {{ props.label }}
      </span>
    </label>

    <ul v-if="isOpen" class="text-sm absolute z-10 w-full bg-white border border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto">
      <li
        class="px-4 py-3 cursor-pointer hover:bg-primary hover:text-primary-gray"
        @click="clearValue"
      >
        {{ $t('Очистить') }}
      </li>
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        class="px-4 py-3 cursor-pointer hover:bg-primary hover:text-primary-gray flex justify-between items-center gap-2"
        @click="updateValue(option.value, option.text)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>
