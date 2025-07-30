<script setup>

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isActive: { type: Boolean, default: true }
})

const emits = defineEmits(['click'])

const onClick = (event) => {
  if (!props.disabled) {
    emits('click', event)
  }
}

// классы стилей, вызывать как variant
const variantClasses = {
  primary: 'bg-primary border-primary text-primary-gray hover:border-[#105781] hover:bg-[#105781] focus:bg-[#105781] focus:border-[#105781] disabled:bg-gray-600',
  secondary: 'bg-primary-blue text-primary-gray hover:bg-blue-700 focus:bg-primary-blue disabled:bg-blue-400',
  outline: 'text-primary border border-primary hover:bg-primary-blue hover:border-primary-blue hover:text-primary-gray focus:bg-primary-blue focus:border-primary-blue focus:text-primary-gray',
  green: 'bg-[#01BB6D] text-white hover:bg-[#019E60] focus:bg-[#019E60]',
  gray: 'bg-[#E5E4E5] text-black hover:bg-gray-300 focus:ring-gray-100',
  orange: 'bg-[#EF7F1A] text-white hover:bg-[#a75103] focus:ring-[#a75103]',
  warning: 'bg-red-500 text-white hover:bg-red-700 focus:ring-red-700',
  dark: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-800',
  black: 'bg-[#0D2533] text-white hover:bg-[#0A1D26] focus:bg-[#0A1D26] border-black rounded-[5px]'
}

// классы для размеров, вызывать как size
const sizeClasses = {
  sm: 'text-[14px] px-[18] py-[10px]',
  md: 'text-[16px] px-[22px] py-[16px] min-w-[200px]',
  lg: 'text-lg px-6 py-3',
  xl: 'text-xl px-[25px] py-[30px] min-w-[280px] min-h-[120px]'
}

const variantClass = computed(() => variantClasses[props.variant] || variantClasses.primary)
const sizeClass = computed(() => sizeClasses[props.size] || sizeClasses.md)
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center tex-center py-2 px-4 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#105781] ring-offset-primary-gray focus:ring-offset-2',
      variantClass,
      sizeClass,
      fullWidth ? 'w-full' : 'w-auto',
      customClass,
    ]"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>
