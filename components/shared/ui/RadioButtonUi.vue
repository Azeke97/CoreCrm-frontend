<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  modelValue: string;
  options: Array<{ value: string; text: string }>;
  name: string;
  disabled?: boolean;
  error?: string;
  itemClass?: string;
  radioClass?: string;
  labelClass?: string;
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
</script>

<template>
  <div class="radio-button-group">
    <div v-for="option in props.options" :key="option.value" :class="['radio-button-item flex gap-2', props.itemClass]">
      <input
        :id="option.value"
        v-model="value"
        type="radio"
        :name="props.name"
        :value="option.value"
        :disabled="props.disabled"
        :class="['mr-2', props.radioClass]"
      >
      <label
        :for="option.value"
        :class="props.labelClass"
      >
        {{ option.text }}
      </label>
    </div>
    <p v-if="props.error" class="text-red-500 text-sm">
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped>
.radio-button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-button-item input[type='radio']:disabled + label {
  color: #9ca3af;
  cursor: not-allowed;
}

.radio-button-item input[type='radio'] {
  color: var(--color-blue);
}
</style>
