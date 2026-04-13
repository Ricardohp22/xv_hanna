<script setup lang="ts">
import SectionPaper from './SectionPaper.vue'

defineProps<{
  familyName: string
  quinceName?: string
}>()
</script>

<template>
  <SectionPaper id="invitacion">
    <h2 class="font-display text-4xl text-lilac-700 sm:text-5xl">Con todo cariño</h2>
    <p class="mt-6 font-sans text-base leading-relaxed text-slate-700 sm:text-lg">
      Querida familia 
      <span class="font-semibold text-lilac-700">{{ familyName }}</span>
      , Es un honor para nosotros informarles con mucho orgullo que se aproximan los XV años de nuestra quinceañera
      <span class="font-semibold text-lilac-700">{{ quinceName || 'nuestra quinceañera' }}</span>
      Por lo cual nos complace que usted y su familia puedan acompañarnos en esta dulce celebracion para la cual hemos 
      organizado una ceremonia religiosa y una fiesta para celebrar.
      . Será una velada llena de alegría, música y momentos inolvidables; tu presencia hará que este día
      brille aún más. ¡Te esperamos con el corazón abierto!
    </p>
    <p class="mt-6 font-script text-2xl text-lilac-600 sm:text-3xl">Con cariño y emoción</p>
  </SectionPaper>
</template>
