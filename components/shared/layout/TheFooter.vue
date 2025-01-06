<script setup lang="ts">
import ContainerUi from '~/components/shared/ui/ContainerUi.vue'
</script>

<template>
  <footer class="bg-primary text-primary-gray md:py-6 py-3">
    <ContainerUi size="xl">
      <div class="grid grid-cols-2">
        <div class="flex flex-col md:flex-row justify-between gap-2 text-sm md:text-base">
          <div class="basis-1/2 mb-3 md:mb-0">
            <p class="mb-2">
              {{ $t('АО "Qarmet"') }}
            </p>
            <address class="not-italic">
              {{ $t('пр. Республики, 1, 101407, Темиртау Карагандинская обл., Республика Казахстан') }}
            </address>
          </div>
          <div />
        </div>
        <div class="flex justify-end">
          <div>
            <a class="lg:text-xl text-md underline" href="mailto:1line-support@qarmet.kz">1line-support@qarmet.kz</a>
          </div>
        </div>
      </div>
    </ContainerUi>
  </footer>
</template>
