export default defineI18nLocale((locale) => {
  const runtimeConfig = useRuntimeConfig()
  // for example, fetch locale messages from nuxt server
  return $fetch(`${runtimeConfig.public.apiBaseUrl}/api/locales/${locale}.json`)
})
