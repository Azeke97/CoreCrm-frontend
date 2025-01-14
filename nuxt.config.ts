// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/eslint'],
  // i18n: {
  //   locales: [
  //     {
  //       code: 'ru',
  //       file: 'ru.ts'
  //     },
  //     {
  //       code: 'en',
  //       file: 'en.ts'
  //     },
  //     {
  //       code: 'kk',
  //       file: 'kk.ts'
  //     }
  //   ],
  //   langDir: './lang',
  //   defaultLocale: 'ru'
  // },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/fonts.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
    }
  }
})