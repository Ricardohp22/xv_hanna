<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    /** Secciones con dos columnas (padrinos, etc.): papel un poco más ancho */
    wide?: boolean
  }>(),
  { wide: false }
)
</script>

<template>
  <section
    :id="id"
    class="relative flex min-h-svh items-center justify-center px-3 py-4 sm:px-4 sm:py-16 md:px-5 md:py-24"
  >
    <div
      class="animate-fade-up w-full max-w-2xl rounded-3xl border border-lilac-200/80 bg-white/95 px-5 py-8 shadow-paper backdrop-blur-sm sm:px-7 sm:py-10 md:px-9 md:py-12"
      :class="wide ? 'md:max-w-5xl' : 'md:max-w-3xl'"
    >
      <slot />
    </div>
  </section>
</template>
