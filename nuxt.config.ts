// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/eslint'],
  i18n: {
    locales: [
      {
        code: 'ru',
        file: 'ru.ts'
      },
      {
        code: 'en',
        file: 'en.ts'
      },
      {
        code: 'kk',
        file: 'kk.ts'
      }
    ],
    langDir: './lang',
    defaultLocale: 'ru'
  },
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
    // The private keys which are only available server-side

    // Keys within public are also exposed client-side
    public: {
      apiBaseUrl: 'http://localhost',
      cdnUrl: 'https://cdn.qpartners.kz/public'
    }
  }
})