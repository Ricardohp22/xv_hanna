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
      <span class="font-semibold text-lilac-700">{{ familyName }}</span>, 
      Es un honor para nosotros informarles con mucho orgullo y emocion que se aproximan los XV años de nuestra hermosa hija
      <!-- <span class="font-semibold text-lilac-700">{{ quinceName || 'nuestra quinceañera' }}</span> -->
      <span class="font-display text-2xl text-lilac-700 sm:text-3xl">{{ quinceName || 'nuestra quinceañera' }}</span>.
      Por lo cual nos complace extenderles una grata invitacion para que usted y su familia nos honren con su presencia y 
      sean parte de esta dulce celebracion. 
      Para celebrar hemos organizado una ceremonia religiosa donde daremos gracias por la vida y prosperidad de nuestra hija. 
      Ademas, ofreceremos una cena y una fiesta en la que juntos podremos divertirnos y hacer de este un día mágico.
      Será una velada llena de alegría, música y momentos inolvidables; tu presencia hará que este día
      brille aún más. ¡Te esperamos con el corazón abierto!
    </p>
  </SectionPaper>
</template>
