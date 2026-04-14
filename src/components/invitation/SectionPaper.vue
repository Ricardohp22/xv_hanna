<script setup lang="ts">
defineProps<{
  id?: string
}>()
</script>

<template>
  <section
    :id="id"
    class="relative flex min-h-svh items-center justify-center px-3 py-16 sm:px-4 md:px-5 md:py-24"
  >
    <div
      class="animate-fade-up w-full max-w-2xl rounded-3xl border border-lilac-200/80 bg-white/95 px-5 py-8 shadow-paper backdrop-blur-sm sm:px-7 sm:py-10 md:max-w-3xl md:px-9 md:py-12"
    >
      <slot />
    </div>
  </section>
</template>
