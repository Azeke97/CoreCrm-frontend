<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  links: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['updatePage'])

const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const startPage = computed(() => {
  const maxPagesToShow = 10
  const half = Math.floor(maxPagesToShow / 2)
  if (props.page <= half) {
    return 1
  } else if (props.page + half >= totalPages.value) {
    return Math.max(totalPages.value - maxPagesToShow + 1, 1)
  } else {
    return props.page - half
  }
})

const endPage = computed(() => Math.min(startPage.value + 9, totalPages.value))

const pages = computed(() => {
  const pagesArray = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    pagesArray.push({
      number: i,
      current: i === props.page
    })
  }
  return pagesArray
})

const from = computed(() => {
  return props.page && props.perPage && props.page > 0 && props.perPage > 0
    ? (props.page - 1) * props.perPage + 1
    : 0
})

const to = computed(() => {
  return props.page && props.perPage && props.total && props.page > 0 && props.perPage > 0
    ? Math.min(props.page * props.perPage, props.total)
    : 0
})

const isFirstPage = computed(() => props.page === 1)
const isLastPage = computed(() => props.page === Math.ceil(props.total / props.perPage))

const previousPage = () => {
  if (!isFirstPage.value) {
    emits('updatePage', props.page - 1)
  }
}

const nextPage = () => {
  if (!isLastPage.value) {
    emits('updatePage', props.page + 1)
  }
}

const goToPage = (pageNumber) => {
  if (pageNumber !== props.page) {
    emits('updatePage', pageNumber)
  }
}
</script>

<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        :disabled="isFirstPage"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        @click="previousPage"
      >
        Previous
      </button>
      <button
        :disabled="isLastPage"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        @click="nextPage"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          {{ $t('Показано') }}
          <span class="font-medium">{{ from }}</span>
          {{ $t('по') }}
          <span class="font-medium">{{ to }}</span>
          {{ $t('из') }}
          <span class="font-medium">{{ props.total }}</span>
          {{ $t('результатов') }}
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            :disabled="isFirstPage"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            @click="previousPage"
          >
            <span class="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span v-for="pageItem in pages" :key="pageItem.number">
            <button
              :class="[
                pageItem.current
                  ? 'z-10 bg-primary-blue text-white'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              ]"
              @click="goToPage(pageItem.number)"
            >
              {{ pageItem.number }}
            </button>
          </span>
          <button
            :disabled="isLastPage"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            @click="nextPage"
          >
            <span class="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
