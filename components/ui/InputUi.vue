<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  label?: string
  modelValue: string | number | null
  type?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  autocomplete?: string
  emailVerify?: boolean
  required?: boolean
  id?: string
}

interface Emits {
  (event: 'update:modelValue', newValue: string): void;
  (event: 'blur' | 'sendCode'): void;
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()
const isFocused = ref(false)
const isPasswordVisible = ref(false)
const inputId = ref(props.id ? props.id : useId())

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('update:modelValue', target.value)
  }
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

const handleSendCode = () => {
  emit('sendCode')
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

</script>

<template>
  <div class="relative w-full">
    <label class="block w-full cursor-text" :for="inputId">
      <input
        :id="inputId"
        :type="props.type === 'password' ? (isPasswordVisible ? 'text' : 'password') : props.type"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        class="block w-full px-[15px] py-[14px] text-[15px] bg-transparent border rounded-md border-gray-600 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 readonly:bg-gray-100 readonly:text-gray-500 readonly:border-gray-200"
        :class="{ 'border-red-500 border-[1.5px] focus:border-red-500 focus:border-[1.5px]': error,
        'cursor-default': readonly }"
        :autocomplete="props.autocomplete || 'on'"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="handleBlur"
      >
      <span
        v-if="type === 'date'"
        :class="[
          '-top-5 text-sm text-primary absolute left-2 px-1 transition-all duration-300',
          { 'text-gray-500': disabled || readonly }
        ]"
      >
        {{ label }} <span v-if="required" class="text-red-600">*</span>
      </span>
      <span
        :class="[
          'absolute left-2 px-1 transition-all duration-300',
          {
            '-top-5 text-sm text-primary': (type === 'date' || type === 'datetime-local') || (isFocused || (modelValue !== '' || modelValue !== null) && type !== 'date' && type !== 'datetime-local'),
            'top-4 text-[15px] text-primary': !isFocused && (modelValue === '' || modelValue === null) && type !== 'date' && type !== 'datetime-local',
            'text-gray-500': disabled || readonly
          }
        ]"
      >
        {{ label }} <span v-if="required" class="text-red-600">*</span>
      </span>

      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
        @click="togglePasswordVisibility"
      >
        <span>
          <img v-if="isPasswordVisible" class="w-[30px]" src="/assets/icons/pass-show.svg" alt="Password show">

          <img v-else class="w-[30px]" src="/assets/icons/pass-hide.svg" alt="Password hide">
        </span>
      </button>

      <button
        v-if="emailVerify"
        type="button"
        class="text-xs absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 p-2"
        @click="handleSendCode"
      >
        {{ $t('Отправить код') }}
      </button>

      <slot />
    </label>
  </div>
</template>

<style>
input[list]::-webkit-calendar-picker-indicator {
  display: none;
}

input[list] {
  appearance: none;
}
</style>
