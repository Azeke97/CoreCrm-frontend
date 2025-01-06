<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  label: string
  multiple?: boolean
}>()

const emit = defineEmits(['update:files'])

const files = ref<File[]>([])
const inputId = `file-upload-${Math.random().toString(36).substr(2, 9)}`

const handleFiles = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    if (props.multiple) {
      files.value = [...files.value, ...Array.from(input.files)]
    } else {
      files.value = Array.from(input.files)
    }
    emit('update:files', files.value)
  }
}

const triggerFileSelect = () => {
  const input = document.getElementById(inputId) as HTMLInputElement
  input.click()
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
  emit('update:files', files.value)
}
</script>

<template>
  <div class="file-upload-wrapper">
    <label :for="inputId" class="block text-base mb-2">{{ props.label }}</label>
    <div
      class="file-drop-zone border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer"
      @click="triggerFileSelect"
    >
      <img src="/assets/icons/file-upload.svg" alt="Загрузка файла">
    </div>
    <input
      :id="inputId"
      type="file"
      :multiple="props.multiple"
      class="hidden"
      @change="handleFiles"
    >
    <ul class="mt-2">
      <li v-for="(file, index) in files" :key="index" class="text-sm file-list-item flex justify-between items-center">
        {{ file.name }}
        <button type="button" class="text-red-500" @click="removeFile(index)">
          &times;
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
