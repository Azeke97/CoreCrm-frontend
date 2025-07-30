<script setup lang="ts">
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const user = userStore.user

// Загрузка аватара
const uploadAvatar = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  try {
    await userStore.uploadAvatar(file)
    alert('Аватар успешно загружен!')
  } catch (error) {
    console.error('Ошибка загрузки аватара:', error)
    alert('Не удалось загрузить аватар.')
  }
}

// Удаление аватара
const deleteAvatar = async () => {
  try {
    await userStore.deleteAvatar()
    alert('Аватар успешно удалён!')
  } catch (error) {
    console.error('Ошибка удаления аватара:', error)
    alert('Не удалось удалить аватар.')
  }
}
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
    <!-- Текущий аватар -->
    <div class="w-24 h-24 rounded-full overflow-hidden border">
      <img
        v-if="user?.avatar_url"
        :src="user.avatar_url"
        alt="Avatar"
        class="w-full h-full object-cover"
      >
      <div
        v-else
        class="w-full h-full bg-gray-200 flex items-center justify-center"
      >
        <span class="text-gray-500">
          Нет аватара
        </span>
      </div>
    </div>

    <!-- Загрузка аватара -->
    <label
      for="avatar"
      class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    >
      Загрузить аватар
    </label>
    <input
      id="avatar"
      type="file"
      class="hidden"
      @change="uploadAvatar"
    >

    <!-- Удаление аватара -->
    <button
      v-if="user?.avatar_url"
      class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      @click="deleteAvatar"
    >
      Удалить аватар
    </button>
  </div>
</template>
