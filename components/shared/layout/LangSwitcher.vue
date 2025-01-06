<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, setLocale } = useI18n()
const isOpen = ref(false)

interface Locales {
  [key: string]: string;
}

const locales: Locales = {
  ru: 'RU',
  en: 'EN',
  kk: 'KZ'
}

const currentLocale = computed<string>(() => locale.value)

const currentLocaleLabel = computed(() => locales[currentLocale.value])

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = (code: string) => {
  setLocale(code)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.dropdown')
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isOpen.value = false
  }
}

useHead({
  htmlAttrs: {
    lang: currentLocale
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative inline-block dropdown">
    <button
      class="px-1 py-1 text-primary bg-transparent border-none rounded cursor-pointer text-sm flex items-center justify-between w-11"
      @click="toggleDropdown"
    >
      {{ currentLocaleLabel }}
      <img
        src="~/assets/icons/header-arrow.svg"
        alt="arrow"
        :class="{'rotate-180': isOpen, 'rotate-0': !isOpen}"
        class="w-2 transition-transform duration-300 ml-1"
      >
    </button>
    <ul v-if="isOpen" class="absolute top-full left-0 bg-primary text-white rounded shadow-md mt-1 w-12 z-10 p-0 overflow-hidden">
      <li
        v-for="(label, code) in locales"
        :key="code"
        :class="{'font-bold bg-primary-blue text-primary-gray': code === currentLocale, 'text-primary-gray': code !== currentLocale}"
        class="flex text-sm items-center justify-center p-1 cursor-pointer bg-primary hover:bg-primary-blue hover:text-white"
        @click="() => switchLanguage(code as string)"
      >
        {{ label }}
      </li>
    </ul>
  </div>
</template>
