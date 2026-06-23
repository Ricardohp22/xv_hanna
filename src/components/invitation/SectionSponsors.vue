<script setup lang="ts">
import SectionPaper from './SectionPaper.vue'
import type { SponsorRow } from '../../types/invitation'

defineProps<{
  sponsors: SponsorRow[]
}>()
</script>

<template>
  <SectionPaper id="padrinos" wide>
    <h2 class="text-center font-display text-4xl text-lilac-700 sm:text-5xl">Mis padrinos</h2>
    <!-- <p class="mt-3 text-center font-sans text-sm text-slate-600">
      Gracias a mis padrinos y a toda mi familia por caminar a mi lado en este sueño y apoyarme incondicionalmente.
    </p> -->

    <div v-if="sponsors.length" class="mx-auto mt-10 max-w-3xl text-center">
      <div class="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-8">
        <template v-for="(s, idx) in sponsors" :key="s.id">
          <div class="min-w-0 flex-1">
            <p
              class="font-elegant text-xl font-semibold italic leading-tight text-slate-600 sm:text-4xl"
            >
              {{ s.name }}
            </p>
          </div>
          <div
            v-if="idx < sponsors.length - 1"
            class="flex items-center gap-3 text-lilac-600 md:flex-col md:gap-2"
            aria-hidden="true"
          >
            <span class="h-px w-12 bg-gradient-to-r from-transparent via-lilac-600 to-transparent md:h-10 md:w-px md:bg-gradient-to-b" />
            <span class="font-elegant text-3xl italic leading-none">&</span>
            <span class="h-px w-12 bg-gradient-to-r from-transparent via-lilac-600 to-transparent md:h-10 md:w-px md:bg-gradient-to-b" />
          </div>
        </template>
      </div>
    </div>

    <p v-else class="mt-10 text-center font-sans text-sm text-slate-500">
      Los padrinos se publicarán muy pronto.
    </p>
  </SectionPaper>
</template>
