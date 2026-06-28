<script setup lang="ts">
import SectionPaper from './SectionPaper.vue'
</script>

<template>
  <SectionPaper id="dress-code">
    <h2 class="text-center font-display text-4xl text-lilac-700 sm:text-5xl">Código de vestimenta</h2>
    <p class="mx-auto mt-5 max-w-xl text-center font-sans text-base leading-relaxed text-slate-700">
      Para disfrutar la celebración y lucir increíbles en las fotos, sugerimos un estilo
      <span class="font-semibold text-lilac-700">preferentemente formal</span>
      .
    </p>

    <div class="mx-auto mt-8 max-w-xl divide-y divide-lilac-200/70 border-y border-lilac-200/70">
      <div class="py-4 text-center sm:flex sm:items-baseline sm:justify-center sm:gap-4 sm:text-left">
        <p class="font-script text-2xl text-pink-700">Mujeres</p>
        <p class="mt-1 font-sans text-sm leading-relaxed text-slate-700 sm:mt-0">
          Vestido largo o de coctel.
        </p>
      </div>
      <div class="py-4 text-center sm:flex sm:items-baseline sm:justify-center sm:gap-4 sm:text-left">
        <p class="font-script text-2xl text-blue-700">Hombres</p>
        <p class="mt-1 font-sans text-sm leading-relaxed text-slate-700 sm:mt-0">
          Traje o blazer con camisa de vestir y corbata.
        </p>
      </div>
    </div>
  </SectionPaper>
</template>
