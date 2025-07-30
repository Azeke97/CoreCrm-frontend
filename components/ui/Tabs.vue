<script setup lang="ts">

defineProps({
  tabs: {
    type: Array as () => string[],
    required: true
  },
  currentTab: {
    type: Number,
    required: true
  }
})

const zoom = ref(false)

const emit = defineEmits(['change', 'zoom'])

function selectTab (index: number) {
  emit('change', index)
}

function zoomTab (index: number) {
  zoom.value = !zoom.value
  emit('zoom', index)
}

</script>

<template>
  <div>
    <ul class="flex bg-white" :class="[zoom ? '' : 'border border-gray-300 border-b-0 rounded-t-md']">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{
          'bg-primary-blue text-white': currentTab === index,
          'text-black font-medium': currentTab !== index
        }"
        class="flex items-center justify-center cursor-pointer py-3 px-4 flex-1 text-center border-r border-gray-300 last:border-r-0 transition-colors duration-300 ease-in-out"
        @click="selectTab(index)"
        @dblclick="zoomTab(index)"
      >
        {{ tab }}
      </li>
    </ul>
    <div>
      <slot :selected-tab="currentTab" class="tab" />
    </div>
  </div>
</template>
