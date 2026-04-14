<script setup lang="ts">
import { computed } from 'vue'
import SectionPaper from './SectionPaper.vue'
import type { SponsorRow } from '../../types/invitation'

const props = defineProps<{
  sponsors: SponsorRow[]
}>()

const leftColumn = computed(() => {
  const list = props.sponsors
  if (!list.length) return []
  const mid = Math.ceil(list.length / 2)
  return list.slice(0, mid)
})

const rightColumn = computed(() => {
  const list = props.sponsors
  if (!list.length) return []
  const mid = Math.ceil(list.length / 2)
  return list.slice(mid)
})
</script>

<template>
  <SectionPaper id="padrinos">
    <h2 class="text-center font-display text-4xl text-lilac-700 sm:text-5xl">Mis padrinos</h2>
    <p class="mt-3 text-center font-sans text-sm text-slate-600">
      Gracias por caminar a mi lado en este sueño.
    </p>

    <div v-if="sponsors.length" class="mt-10 flex flex-col md:flex-row md:items-stretch">
      <ul class="flex-1 space-y-6 md:pr-3 lg:pr-5">
        <li v-for="s in leftColumn" :key="s.id" class="text-left">
          <p class="font-sans text-base font-semibold text-slate-800">{{ s.name }}</p>
          <p class="mt-0.5 font-sans text-sm text-lilac-700">{{ s.role || 'Padrino / Madrina' }}</p>
        </li>
      </ul>

      <div
        class="relative my-8 flex shrink-0 items-center justify-center gap-3 md:my-0 md:w-10 md:flex-col md:gap-0 md:self-stretch lg:w-12"
        aria-hidden="true"
      >
        <div
          class="h-px flex-1 bg-gradient-to-r from-transparent via-lilac-400 to-lilac-400/80 md:hidden"
        />
        <div
          class="hidden h-full w-px bg-gradient-to-b from-lilac-200/40 via-lilac-400 to-lilac-200/40 md:block"
        />
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full border border-lilac-200/90 bg-gradient-to-br from-white to-lilac-50 shadow-sm md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <img
            src="/mariposa_icon.png"
            alt=""
            class="h-8 w-8 object-contain opacity-90 drop-shadow-[0_1px_3px_rgba(99,79,180,0.35)] "
            loading="lazy"
            decoding="async"
          />
        </div>
        <div
          class="h-px flex-1 bg-gradient-to-l from-transparent via-lilac-400 to-lilac-400/80 md:hidden"
        />
      </div>

      <ul class="flex-1 space-y-6 md:pl-3 lg:pl-5">
        <li v-for="s in rightColumn" :key="s.id" class="text-left">
          <p class="font-sans text-base font-semibold text-slate-800">{{ s.name }}</p>
          <p class="mt-0.5 font-sans text-sm text-lilac-700">{{ s.role || 'Padrino / Madrina' }}</p>
        </li>
      </ul>
    </div>

    <p v-else class="mt-10 text-center font-sans text-sm text-slate-500">
      Los padrinos se publicarán muy pronto.
    </p>
  </SectionPaper>
</template>
