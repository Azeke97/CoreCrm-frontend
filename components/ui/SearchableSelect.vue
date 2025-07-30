<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'

interface Props {
  label: string;
  modelValue: string | number;
  options: Array<{ value: string | number; text: string }>;
  disabled?: boolean;
  readonly?: boolean
  required?: boolean
  error?: string;
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'blur', 'clear-select'])

const isFocused = ref(false)
const isOpen = ref(false)
const value = ref(props.modelValue)
const searchQuery = ref('')

const filteredOptions = computed(() => {
  return props.options.filter(option => option.text.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const updateValue = (newValue: string | number, newText: string, closeDropdown = true) => {
  value.value = newValue
  searchQuery.value = newText
  emit('update:modelValue', newValue)
  if (closeDropdown) {
    isOpen.value = false
  }
  emit('blur')
}

const clearValue = () => {
  updateValue('', '', false)
  emit('clear-select')
}

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
  const selectedOption = props.options.find(option => String(option.value) === String(newValue))
  searchQuery.value = selectedOption ? selectedOption.text : ''
}, { immediate: true })

onMounted(() => {
  const selectedOption = props.options.find(option => option.value === props.modelValue)
  searchQuery.value = selectedOption ? selectedOption.text : ''

  document.addEventListener('click', handleClickOutside)
})

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.custom-select')) {
    isOpen.value = false
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative custom-select">
    <label class="block w-full cursor-text relative">
      <input
        v-model="searchQuery"
        class="text-primary flex justify-between items-center w-full px-[15px] py-[14px] text-[15px] bg-transparent border rounded-md border-gray-600 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
        type="text"
        :disabled="props.disabled"
        :readonly="props.readonly"
        @focus="isFocused = true; isOpen = true"
        @blur="handleBlur"
        @input="isOpen = true"
      >
      <span
        :class="[
          'absolute left-2 px-1 transition-all duration-300',
          { '-top-5 text-sm text-primary': isFocused || value,
            'top-4 text-[15px] text-primary': !isFocused && !value,
            'text-gray-500': disabled || readonly }
        ]"
      >
        {{ props.label }} <span v-if="required" class="text-red-600">*</span>
      </span>
    </label>
    <ul v-if="isOpen && !readonly" class="text-sm absolute z-10 w-full bg-white border border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto">
      <li
        class="px-4 py-3 cursor-pointer hover:bg-primary hover:text-primary-gray"
        @click="clearValue"
      >
        {{ $t('Очистить') }}
      </li>
      <li
        v-for="option in filteredOptions"
        :key="option.value"
        class="px-4 py-3 cursor-pointer hover:bg-primary hover:text-primary-gray"
        @click="updateValue(option.value, option.text)"
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

.custom-select ul {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}

.text-xs {
  font-size: 0.75rem;
}

.text-base {
  font-size: 1rem;
}

.top-1 {
  top: 0.25rem;
}
</style>
