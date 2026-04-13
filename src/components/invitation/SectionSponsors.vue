<script setup lang="ts">
import SectionPaper from './SectionPaper.vue'
import type { SponsorRow } from '../../types/invitation'

defineProps<{
  sponsors: SponsorRow[]
}>()
</script>

<template>
  <SectionPaper id="padrinos">
    <h2 class="text-center font-display text-4xl text-lilac-700 sm:text-5xl">Mis padrinos</h2>
    <p class="mt-3 text-center font-sans text-sm text-slate-600">
      Gracias por caminar a mi lado en este sueño.
    </p>
    <ul class="mt-10 space-y-5">
      <li
        v-for="s in sponsors"
        :key="s.id"
        class="flex flex-col gap-1 rounded-2xl border border-lilac-100 bg-lilac-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"
      >
        <span class="font-sans text-base font-semibold text-slate-800">{{ s.name }}</span>
        <span class="font-sans text-sm text-lilac-700">{{ s.role || 'Padrino / Madrina' }}</span>
      </li>
    </ul>
  </SectionPaper>
</template>
