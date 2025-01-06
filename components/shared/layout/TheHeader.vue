<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ContainerUi from '~/components/shared/ui/ContainerUi.vue'
import LangSwitcher from '~/components/shared/layout/LangSwitcher.vue'
import CurrentTime from '~/components/shared/layout/CurrentTime.vue'
import ButtonUi from '~/components/shared/ui/ButtonUi.vue'
import MobileMenu from '~/components/shared/layout/MobileMenu.vue'
import { useAuthStore } from '~/store/auth'
import ProfileUserDropdown from '~/components/shared/layout/ProfileUserDropdown.vue'

const { $i18n } = useNuxtApp()
const $t = $i18n.t
const { authenticated, profile } = storeToRefs(useAuthStore())
const config = useRuntimeConfig()

const formatLastName = (name: string): string => {
  if (!name) { return '' }
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

const shortName = computed((): string => {
  if (authenticated.value && profile.value) {
    return formatLastName(profile.value.last_name || '') + ' ' + `${profile.value.first_name?.[0] || ''}.${profile.value.middle_name?.[0] || ''}.`.trim()
  } else {
    return ''
  }
})

const showHeaderNotice = config.public.apiBaseUrl !== 'https://api.qpartners.kz'

</script>

<template>
  <header class="text-primary bg-primary-dark-gray">
    <div v-if="showHeaderNotice" class="py-3 px-4 md:px-0" :class="[{'bg-red-900 md:bg-red-400' : showHeaderNotice, 'bg-primary-dark-gray': !showHeaderNotice}]">
      <div class="text-center text-white text-xs">
        {{ $t('Данная система предназначена для только внутреннего тестирования.') }}
      </div>
      <div class="text-center text-white text-xs">
        {{ $t('Для проведения закупок перейдите на сайт') }} <a class="underline" href="https://qpartners.kz" :title="$t('Перейти на сайт')">{{ $t('QPartners.kz') }} &rarr;</a>
      </div>
    </div>
    <ContainerUi size="xl" class="py-4">
      <div class="md:grid grid-cols-3 flex justify-between items-center">
        <div class="hidden md:flex gap-12">
          <CurrentTime />
          <div class="flex justify-center items-center">
            <nuxt-link-locale to="/" class="text-center">
              {{ $t('FAQ') }}
            </nuxt-link-locale>
          </div>
        </div>
        <div class="flex md:justify-center">
          <nuxt-link-locale to="/">
            <img src="/assets/icons/logo.svg" alt="Qarmet logo" class="w-[80%]">
          </nuxt-link-locale>
        </div>
        <div class="flex justify-end md:gap-4 gap-2 items-center flex-nowrap">
          <div v-if="!authenticated" class="md:flex hidden gap-2 items-center">
            <nuxt-link-locale to="/user/login">
              <ButtonUi variant="outline" size="sm">
                {{ $t('Войти') }}
              </ButtonUi>
            </nuxt-link-locale>
            <nuxt-link-locale to="/user/registration">
              <ButtonUi variant="primary" size="sm">
                {{ $t('Регистрация') }}
              </ButtonUi>
            </nuxt-link-locale>
          </div>
          <LangSwitcher />
          <MobileMenu />
          <ProfileUserDropdown v-if="authenticated" :name="shortName" class="md:flex hidden gap-2 items-center" />
        </div>
      </div>
    </ContainerUi>
  </header>
</template>

<style scoped>
.grid-cols-3 {
  grid-template-columns: 1fr auto 1fr;
}
</style>
