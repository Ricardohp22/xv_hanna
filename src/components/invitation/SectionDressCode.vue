<script setup lang="ts">
import SectionPaper from './SectionPaper.vue'
</script>

<template>
  <SectionPaper id="dress-code">
    <h2 class="text-center font-display text-4xl text-lilac-700 sm:text-5xl">Código de vestimenta</h2>
    <div class="mt-10 grid gap-8 md:grid-cols-2">
      <div class="rounded-2xl border border-lilac-100 bg-lilac-50/70 p-6">
        <p class="font-script text-2xl text-lilac-700">Mujeres</p>
        <p class="mt-3 font-sans text-sm leading-relaxed text-slate-700">
          Etiqueta semi-formal o coctel: vestido midi o largo en tonos pasteles, lila o neutros elegantes.
          Evita color blanco (reservado para la quinceañera) y ten cuidado con el verde intenso si no es parte
          de la paleta sugerida. Un toque brillante o floral queda precioso en fotos.
        </p>
      </div>
      <div class="rounded-2xl border border-lilac-100 bg-lilac-50/70 p-6">
        <p class="font-script text-2xl text-lilac-700">Hombres</p>
        <p class="mt-3 font-sans text-sm leading-relaxed text-slate-700">
          Traje oscuro o blazer con camisa de vestir y corbina o corbata. Calzado cerrado y pulcro. Si
          prefieres un look smart casual, mantén la camisa impecable y evita shorts o playeras.
        </p>
      </div>
    </div>
  </SectionPaper>
</template>
