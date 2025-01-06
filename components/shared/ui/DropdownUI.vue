<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  modelValue: string;
  options: Option[];
  disabled?: boolean;
  error?: string;
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'blur'])

const isFocused = ref(false)
const selectedValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue
})

const updateValue = (newValue: string) => {
  emit('update:modelValue', newValue)
}

const handleSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
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
  <div class="relative w-full">
    <label class="block w-full cursor-pointer">
      <select
        :value="selectedValue"
        :disabled="disabled"
        class="block w-full px-[15px] py-[14px] text-[15px] bg-transparent border rounded-md border-gray-600 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
        @change="handleSelect"
        @focus="isFocused = true"
        @blur="handleBlur"
      >
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span
        :class="[
          'absolute left-2 px-1 transition-all duration-300',
          { '-top-5 text-sm text-primary': isFocused || selectedValue,
            'top-4 text-[15px] text-primary': !isFocused && !selectedValue,
            'text-gray-500': disabled }
        ]"
      >
        {{ label }}
      </span>
    </label>
    <p v-if="props.error" class="mt-2 text-sm text-red-600">
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped>
</style>
