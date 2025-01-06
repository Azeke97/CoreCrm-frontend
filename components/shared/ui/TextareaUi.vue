<script lang="ts" setup>
import { ref, watch } from 'vue'
interface Props {
  label?: string
  modelValue: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  rows?: number
  minHeight?: string
  maxHeight?: string
  placeholder?: string
  autocomplete?: string
  id?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'blur'])
const inputId = ref(props.id ? props.id : useId())
const isFocused = ref(false)
const value = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
})

const updateValue = (newValue: string) => {
  emit('update:modelValue', newValue)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  if (target) {
    updateValue(target.value)
  }
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}
</script>

<template>
  <div class="relative">
    <label class="block w-full cursor-text"  :for="inputId">
      <textarea
        :id="inputId"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="props.readonly"
        :rows="props.rows || 3"
        :style="{ minHeight: props.minHeight || '0', maxHeight: props.maxHeight || 'none' }"
        :class="[
          'h-full block w-full px-[15px] py-[14px] text-[15px] bg-transparent border rounded-md border-gray-600 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200'
        ]"
        :autocomplete="props.autocomplete || 'on'"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="handleBlur"
      />
      <span
        :class="[
          'absolute left-2 px-1 transition-all duration-300',
          { '-top-5 text-sm text-primary': isFocused || value,
            'top-4 text-[15px] text-primary': !isFocused && !value,
            'text-primary': disabled }
        ]"
      >
        {{ label }} <span v-if="required" class="text-red-600">*</span>
      </span>
    </label>
  </div>
</template>
