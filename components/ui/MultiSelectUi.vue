<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  label: string;
  modelValue: string[];
  options: Array<{ value: string; text: string }>;
  disabled?: boolean;
  error?: string;
  listDirection?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'blur'])

const isFocused = ref(false)
const isOpen = ref(false)
const values = ref([...props.modelValue])
let selectDirection = 'custom-multi-select'

watch(() => props.modelValue, (newValue) => {
  values.value = [...newValue]
})

const updateValues = (newValue: string) => {
  if (newValue === '') {
    values.value = []
  } else if (values.value.includes(newValue)) {
    values.value = values.value.filter(value => value !== newValue)
  } else {
    values.value.push(newValue)
  }
  emit('update:modelValue', values.value)
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.' + selectDirection)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (!props.listDirection) {
    selectDirection = 'custom-multi-select-top'
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative" :class="selectDirection">
    <label class="block w-full cursor-pointer">
      <span
        class="text-primary flex justify-between items-center w-full px-[15px] py-[14px] text-[15px] bg-transparent border rounded-md border-gray-600 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
        tabindex="0"
        @click="isOpen = !isOpen"
        @focus="isFocused = true"
        @blur="handleBlur"
      >
        {{ values.length ? values.map(value => props.options.find(option => option.value === value)?.text).join(', ') : label }}
        <svg
          class="w-4 h-4 inline-block ml-2 transition-transform"
          :class="{'rotate-180': isOpen}"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </label>
    <ul v-if="isOpen" class="absolute z-10 w-full bg-primary-gray border border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto">
      <li
        class="px-4 py-3 cursor-pointer hover:bg-primary hover:text-primary-gray"
        @click="updateValues('')"
      >
        {{ $t('Очистить') }}
      </li>
      <li
        v-for="option in props.options"
        :key="option.value"
        class="px-4 py-3 flex justify-between cursor-pointer hover:bg-primary hover:text-primary-gray"
        @click="updateValues(option.value)"
      >
        {{ option.text }}
        <span v-if="values.includes(option.value)">✔</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.custom-multi-select {
  position: relative;
}

.custom-multi-select ul {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
}

.custom-multi-select-top {
  position: relative;
}

.custom-multi-select-top ul {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
}
</style>
