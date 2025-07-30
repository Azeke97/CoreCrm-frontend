<script setup lang="ts">
import { useFileStore } from '~/store/files'
import { useNotification } from '~/composables/useNotification'

const { notification } = useNotification()
const fileStore = useFileStore()
const file = ref<File | null>(null)

// File change handling
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}

// Uploading a file
const uploadFile = async () => {
  if (file.value) {
    await fileStore.uploadFile(file.value)

    if (fileStore.result) {
      notification('File uploaded successfully!', 'success')
    } else if (fileStore.error) {
      notification(fileStore.error, 'error')
    }
  } else {
    notification('Please select a file before uploading.', 'error')
  }
}
</script>

<template>
  <div>
    <h1>
      File Upload
    </h1>
    <input
      type="file"
      @change="handleFileChange"
    >
    <button
      :disabled="fileStore.loading"
      @click="uploadFile"
    >
      Upload
    </button>

    <h2>
      Result:
    </h2>
    <div v-if="fileStore.result">
      <p>
        File uploaded! URL: <a
          :href="fileStore.result.file.url"
          target="_blank"
        >
          {{ fileStore.result.file.url }}
        </a>
      </p>
    </div>
    <div v-else-if="fileStore.error">
      <p>
        Error: {{ fileStore.error }}
      </p>
    </div>
  </div>
</template>
