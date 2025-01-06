<template>
  <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
    <svg
      class="animate-spin h-16 w-16"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="48.9724" cy="27.1973" r="4.38158" transform="rotate(180 48.9724 27.1973)" fill="#D9D9D9" />
      <circle cx="5.15663" cy="27.1973" r="4.38158" transform="rotate(180 5.15663 27.1973)" fill="#D9D9D9" />
      <circle cx="27.0646" cy="49.1052" r="4.38158" transform="rotate(180 27.0646 49.1052)" fill="#D9D9D9" />
      <circle cx="27.0646" cy="5.28932" r="4.38158" transform="rotate(180 27.0646 5.28932)" fill="#1E73D9" />
      <circle cx="11.575" cy="42.6885" r="4.38158" transform="rotate(-135 11.575 42.6885)" fill="#D9D9D9" />
      <circle cx="42.5541" cy="11.7059" r="4.38158" transform="rotate(-135 42.5541 11.7059)" fill="#D9D9D9" />
      <circle cx="11.5714" cy="11.7061" r="4.38158" transform="rotate(-45 11.5714 11.7061)" fill="#D9D9D9" />
      <circle cx="42.5548" cy="42.6885" r="4.38158" transform="rotate(-45 42.5548 42.6885)" fill="#D9D9D9" />
    </svg>
  </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
