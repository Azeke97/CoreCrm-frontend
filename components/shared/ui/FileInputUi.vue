<script setup lang="ts">
import { ref, watch } from 'vue'

interface FileInputProps {
  label: string
  subLabel?: string
  id: string
  error?: string
  multiple?: boolean
  accept?: string
  required?: boolean
}

defineProps<FileInputProps>()
const emit = defineEmits(['update:files'])

const selectedFiles = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length) {
    selectedFiles.value = Array.from(target.files)
    emit('update:files', selectedFiles.value)
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
  emit('update:files', selectedFiles.value)
}

watch(() => selectedFiles.value, (newFiles) => {
  emit('update:files', newFiles)
})
</script>

<template>
  <div>
    <label :for="id">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
      <span v-if="subLabel" class="text-xs text-gray-500"> {{ subLabel }} </span>
    </label>
    <div class="border-2 border-dashed border-gray-400 p-5 text-center cursor-pointer rounded-xl flex items-center justify-center" @click="triggerFileInput">
      <svg width="41" height="28" viewBox="0 0 41 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.3632 12.2847C35.5624 11.5154 35.6781 10.7102 35.6781 9.87924C35.6781 4.6534 31.3443 0.415527 26.0063 0.415527C19.8313 0.424499 19.0069 5.02571 19.0069 5.02571C19.0069 5.02571 16.4124 1.88908 11.837 2.42849C7.71727 3.23255 5.02768 6.86149 5.02768 10.5633C5.02768 11.2003 5.11928 11.8092 5.28988 12.4013C2.20068 13.5059 0 16.4149 0 19.8173C0 24.1808 3.61132 27.7178 8.06878 27.7178H16.7192V17.0642H13.0312L20.5939 9.83439L27.9688 17.2403H24.2808V27.7189H32.9289C37.3898 27.7189 41 24.1819 41 19.8184C41.0011 16.2792 38.6276 13.2895 35.3632 12.2847Z" fill="#01BB6D" />
      </svg>
    </div>
    <input
      :id="id"
      ref="fileInput"
      type="file"
      style="display: none;"
      :multiple="multiple"
      :accept="accept"
      @change="onChange"
    >

    <table v-if="selectedFiles.length > 0" class="mt-4 bg-white border border-gray-200">
      <tbody>
        <tr v-for="(file, index) in selectedFiles" :key="index">
          <td class="px-2 py-1 border-b truncate max-w-[153px] w-full text-sm" title="{{ file.name }}">
            {{ file.name }}
          </td>
          <td class="px-2 py-1 border-b text-center">
            <button class="text-red-600 hover:text-red-800" @click="removeFile(index)">
              х
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
  </div>
</template>
