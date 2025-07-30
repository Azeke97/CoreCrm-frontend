<script setup lang="ts">
interface Column {
  key: string;
  label: string;
}

defineProps<{
  rows: Record<string, any>[]
  columns: Column[]
}>()

const getValueByPath = (obj: any, path: string) => {
  // Разделяем путь по точкам
  const keys = path.split('.')

  // Итерируем по ключам и углубляемся в объект
  return keys.reduce((acc, key) => {
    if (acc && acc[key] !== undefined) {
      return acc[key]
    }
    return undefined // Если одного из ключей нет, возвращаем undefined
  }, obj)
}

</script>

<template>
  <table class="min-w-full bg-white text-left">
    <tbody>
      <tr v-for="(column) in columns" :key="column.key">
        <td class="py-2 text-left w-1/3 font-bold">
          {{ column.label }}
        </td>
        <td class="w-2/3">
          {{ getValueByPath(rows[0], column.key) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
