<script setup lang="ts">
defineProps<{
  id?: string
}>()
</script>

<template>
  <section
    :id="id"
    class="relative flex min-h-svh items-center justify-center px-5 py-16 sm:px-10 md:py-24"
  >
    <div
      class="animate-fade-up w-full max-w-2xl rounded-3xl border border-lilac-200/80 bg-white/95 p-8 shadow-paper backdrop-blur-sm sm:p-12 md:max-w-3xl"
    >
      <slot />
    </div>
  </section>
</template>
