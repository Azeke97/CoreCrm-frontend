<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Заголовок'
    }
  },
  emits: ['close', 'submit'],
  methods: {
    closeModal () {
      this.$emit('close')
    },
    handleSubmit () {
      this.$emit('submit')
    }
  }
}
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600" @click="closeModal">
        &times;
      </button>
      <h2 class="text-xl font-semibold mb-4">
        {{ title }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <slot />
        <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          {{ $t('Сохранить') }}
        </button>
      </form>
    </div>
  </div>
</template>
