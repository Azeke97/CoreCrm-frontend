<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  modelValue: number
  option: { value: string; text: string }
  name: string
  disabled?: boolean
  error?: string
  groupClass?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
})

watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})

const updateValue = () => {
  value.value = value.value === 1 ? 0 : 1
}
</script>

<template>
  <div :class="props.groupClass">
    <div class="checkbox-item">
      <label class="cursor-pointer text-primary text-[15px] flex items-center w-fit">
        <input
          :name="props.name"
          type="checkbox"
          :checked="value === 1"
          :disabled="props.disabled"
          class="mr-2 text-primary-blue"
          @change="updateValue"
        >
        {{ props.option.text }}
      </label>
    </div>
    <p v-if="props.error" class="text-red-500 text-sm">
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped>
.checkbox-item input[type='checkbox']:disabled + label {
  color: #9ca3af;
  cursor: not-allowed;
}
</style>
