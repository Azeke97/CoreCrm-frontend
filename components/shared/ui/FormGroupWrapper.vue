<script setup lang="ts">
const props = defineProps<{
  title?: string;
  onSubmit?: () => void;
  actionsClass?: string;
  titleClass?: string;
  withoutMargin?: boolean;
}>()

const emit = defineEmits<{
  (e: 'submit'): void;
}>()

const handleSubmit = (event: Event) => {
  event.preventDefault()
  if (props.onSubmit) {
    props.onSubmit()
  } else {
    emit('submit')
  }
}
</script>

<template>
  <div class="p-8 border border-gray-300 rounded-md bg-white">
    <h2 v-if="title" :class="titleClass">
      {{ title }}
    </h2>
    <form @submit="handleSubmit" @keydown.enter.prevent>
      <div :class="[actionsClass, { 'mt-4': !withoutMargin }]">
        <slot name="actions-top" />
      </div>
      <slot />
      <div :class="[actionsClass, { 'mt-4': !withoutMargin }]">
        <slot name="actions-bottom" />
      </div>
    </form>
  </div>
</template>
