<script setup lang="ts">
import SectionPaper from './SectionPaper.vue'

defineProps<{
  amazonLinks?: { label: string; href: string }[]
}>()

const defaults = [
  { label: 'Lista de deseos en Amazon', href: 'https://www.amazon.com.mx/hz/wishlist/ls/' },
  { label: 'Detalles útiles (Amazon)', href: 'https://www.amazon.com.mx/' },
]
</script>

<template>
  <SectionPaper id="mesa-regalos">
    <h2 class="text-center font-display text-3xl leading-tight text-lilac-700 sm:text-4xl">
      Tu presencia es mi mayor regalo
    </h2>
    <p class="mt-6 text-center font-sans text-base leading-relaxed text-slate-700">
      No necesitas darme nada, pero si deseas obsequiarme un detalle será recibido con mucho amor.
    </p>
    <p class="mt-4 text-center font-sans text-base leading-relaxed text-slate-700">
      Puedes llevar el detalle que tú quieras; si quieres un poco de ayuda sobre qué darme, aquí te dejo
      ideas que me serían muy útiles en esta nueva etapa.
    </p>
    <div class="mt-10 flex flex-col items-center gap-4">
      <a
        v-for="link in amazonLinks?.length ? amazonLinks : defaults"
        :key="link.href + link.label"
        class="inline-flex w-full max-w-md items-center justify-center rounded-full bg-gradient-to-r from-lilac-600 to-lilac-500 px-6 py-3 font-sans text-sm font-semibold text-white shadow-md transition hover:from-lilac-500 hover:to-lilac-400 sm:text-base"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ link.label }}
      </a>
    </div>
    <p class="mt-8 text-center font-script text-xl text-lilac-600">Gracias por tu cariño</p>
  </SectionPaper>
</template>
