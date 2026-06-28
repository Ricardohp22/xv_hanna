<script setup lang="ts">
import SectionPaper from './SectionPaper.vue'
</script>

<template>
  <SectionPaper id="dress-code">
    <h2 class="text-center font-display text-4xl text-lilac-700 sm:text-5xl">Código de vestimenta</h2>
    <div class="mt-10 grid gap-8 md:grid-cols-2">
      <div class="rounded-2xl border border-lilac-200/80 bg-white/70 px-4 py-5 shadow-sm backdrop-blur-sm sm:px-5">
        <p class="font-script text-2xl text-pink-700">Mujeres</p>
        <p class="mt-3 font-sans text-sm leading-relaxed text-slate-700">
          Etiqueta: preferentemente formal, se sugiere vestido largo o de coctel.
        </p>
      </div>
      <div class="rounded-2xl border border-lilac-200/80 bg-white/70 px-4 py-5 shadow-sm backdrop-blur-sm sm:px-5">
        <p class="font-script text-2xl text-blue-700">Hombres</p>
        <p class="mt-3 font-sans text-sm leading-relaxed text-slate-700">
          Etiqueta: Preferentemente formal, se sugiere traje o blazer con camisa de vestir y corbata.
        </p>
      </div>
    </div>
  </SectionPaper>
</template>
