<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Column {
  key: string;
  label: string;
  editable?: boolean;
  width?: string;
  class?: string;
  format?: string;
}

const props = defineProps<{
  rows: Record<string, any>[]
  columns: Column[]
  selectable?: boolean
  sortable?: boolean
  selectionKey?: string
  emptyText?: string
}>()

const selectedRows = ref<number[]>([])
defineExpose({ selectedRows })

const emit = defineEmits(['update:selectedRows'])

const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value) {
    return props.rows
  }

  return [...props.rows].sort((a, b) => {
    const aValue = a[sortKey.value!]
    const bValue = b[sortKey.value!]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue
    } else if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder.value === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime()
    } else {
      return sortOrder.value === 'asc' ? 1 : -1
    }
  })
})

watch(selectedRows, (newSelectedRows) => {
  emit('update:selectedRows', newSelectedRows)
})

const areAllSelected = computed(() => selectedRows.value.length === props.rows.length)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectAll = () => {
  selectedRows.value = props.selectionKey
    ? props.rows.map(row => row[props.selectionKey!])
    : props.rows.map((_, index) => index)
  dropdownOpen.value = false
}

const deselectAll = () => {
  selectedRows.value = []
  dropdownOpen.value = false
}

const invert = () => {
  selectedRows.value = props.selectionKey
    ? props.rows.map(row => row[props.selectionKey!]).filter(id => !selectedRows.value.includes(id))
    : props.rows.map((_, index) => index).filter(i => !selectedRows.value.includes(i))
  dropdownOpen.value = false
}

</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 text-sm">
      <thead>
        <tr>
          <th
            v-if="selectable"
            class="px-5 py-4 text-left font-medium border-b border-gray-200 bg-gray-100 relative max-w-[30px]"
          >
            <div class="relative inline-block text-left">
              <div>
                <button
                  class="inline-flex w-full font-medium text-left"
                  aria-haspopup="true"
                  aria-expanded="true"
                  @click="toggleDropdown"
                >
                  <input
                    type="checkbox"
                    :checked="areAllSelected"
                    class="form-checkbox h-4 w-4 text-blue-600 pointer-events-none"
                    readonly
                  >
                </button>
              </div>

              <div
                v-if="dropdownOpen"
                ref="dropdownRef"
                class="origin-top-left absolute z-[100] left-5 top-[-5px] mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    role="menuitem"
                    @click="selectAll"
                  >
                    {{ $t('Выбрать все') }}
                  </a>
                  <a
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    role="menuitem"
                    @click="deselectAll"
                  >
                    {{ $t('Отменить все') }}
                  </a>
                  <a
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    role="menuitem"
                    @click="invert"
                  >
                    {{ $t('Инвертировать') }}
                  </a>
                </div>
              </div>
            </div>
          </th>

          <th
            v-for="(column, index) in columns"
            :key="index"
            :style="{ width: column.width || 'auto' }"
            :class="['px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm text-primary cursor-pointer', column.class]"
            @click="sortable && toggleSort(column.key)"
          >
            <div class="flex items-center font-bold">
              {{ column.label }}
              <span v-if="sortable && sortKey === column.key">
                <svg
                  v-if="sortOrder === 'asc'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="sortedRows.length > 0">
        <tr
          v-for="(row, rowIndex) in sortedRows"
          :key="rowIndex"
          :class="row.hasOwnProperty('bg_err') && typeof row.bg_err === 'boolean' ? 'bg-red-100' : 'hover:bg-gray-100' "
        >
          <td v-if="selectable" class="px-5 py-4 border-b border-gray-200 max-w-[30px] whitespace-nowrap">
            <input
              v-model="selectedRows"
              type="checkbox"
              :value="props.selectionKey ? row[props.selectionKey] : rowIndex"
              class="form-checkbox h-4 w-4 text-blue-600"
            >
          </td>
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :style="{ width: column.width || 'auto' }"
            :class="['px-6 py-4 text-sm font-medium text-gray-900 border-b border-gray-200', column.class]"
          >
            <slot :name="`data-${column.key}`" :data="{ item: row, index: rowIndex }">
              <p v-if="column.format === 'raw'" v-html="row[column.key]" />
              <p v-else>
                {{ row[column.key] }}
              </p>
            </slot>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="sortedRows.length === 0 && props.emptyText">
        <tr>
          <td :colspan="columns.length" class="py-4 text-center text-sm text-gray-700">
            {{ props.emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
