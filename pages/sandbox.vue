<script setup lang="ts">
import { ref } from 'vue'
import { useFileStore } from '~/store/files'

const fileStore = useFileStore()
const file = ref<File | null>(null)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}

const uploadFile = async () => {
  if (file.value) {
    await fileStore.uploadFile(file.value)
  }
}

</script>

<template>
  <div>
    <h1>Загрузка файла</h1>
    <input type="file" @change="handleFileChange" >
    <button @click="uploadFile">Загрузить</button>

    <h2>Результат:</h2>

    <div v-if="fileStore.result">

      <p v-if="fileStore.result">Файл загружен! URL: <a :href="fileStore.result.file.url" target="_blank">{{ fileStore.result.file.url }}</a></p>
      <p v-else>Ошибка: {{ fileStore.result.error }}</p>
    </div>
  </div>
</template>