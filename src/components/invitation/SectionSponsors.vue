<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionPaper from './SectionPaper.vue'
import type { SponsorRow } from '../../types/invitation'

const props = defineProps<{
  sponsors: SponsorRow[]
}>()

/** Convención fija (sin columna en DB): `public/padrinos/<id>.jpg` */
function sponsorPhotoSrc(id: number) {
  return `/padrinos/${id}.jpg`
}

const photoLoadFailed = ref<Set<number>>(new Set())

function onSponsorPhotoError(id: number) {
  const next = new Set(photoLoadFailed.value)
  next.add(id)
  photoLoadFailed.value = next
}

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
  <SectionPaper id="padrinos" wide>
    <h2 class="text-center font-display text-4xl text-lilac-700 sm:text-5xl">Mis padrinos</h2>
    <p class="mt-3 text-center font-sans text-sm text-slate-600">
      Gracias por caminar a mi lado en este sueño.
    </p>

    <div
      v-if="sponsors.length"
      class="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-0 md:gap-y-10"
    >
      <ul class="flex flex-col gap-8 md:pr-8">
        <li v-for="s in leftColumn" :key="s.id" class="flex flex-row items-center gap-3.5 text-left">
          <div
            class="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-lilac-200/85 bg-gradient-to-br from-white to-lilac-50 shadow-[0_2px_8px_rgba(99,79,160,0.12)] ring-1 ring-lilac-100/60 sm:h-[4.5rem] sm:w-[4.5rem]"
          >
            <img
              v-if="!photoLoadFailed.has(s.id)"
              :src="sponsorPhotoSrc(s.id)"
              alt=""
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              @error="onSponsorPhotoError(s.id)"
            />
            <span
              v-else
              class="flex h-full w-full items-center justify-center px-1 text-center font-sans text-[9px] font-medium leading-tight text-lilac-400"
            >
              Imagen alusiva
            </span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-base font-semibold text-slate-800">{{ s.name }}</p>
            <p class="mt-0.5 font-sans text-sm text-lilac-700">{{ s.role || 'Padrino / Madrina' }}</p>
          </div>
        </li>
      </ul>

      <ul class="flex flex-col gap-8 md:border-l md:border-lilac-200/50 md:pl-8">
        <li v-for="s in rightColumn" :key="s.id" class="flex flex-row items-center gap-3.5 text-left">
          <div
            class="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-lilac-200/85 bg-gradient-to-br from-white to-lilac-50 shadow-[0_2px_8px_rgba(99,79,160,0.12)] ring-1 ring-lilac-100/60 sm:h-[4.5rem] sm:w-[4.5rem]"
          >
            <img
              v-if="!photoLoadFailed.has(s.id)"
              :src="sponsorPhotoSrc(s.id)"
              alt=""
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              @error="onSponsorPhotoError(s.id)"
            />
            <span
              v-else
              class="flex h-full w-full items-center justify-center px-1 text-center font-sans text-[9px] font-medium leading-tight text-lilac-400"
            >
              Imagen alusiva
            </span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-sans text-base font-semibold text-slate-800">{{ s.name }}</p>
            <p class="mt-0.5 font-sans text-sm text-lilac-700">{{ s.role || 'Padrino / Madrina' }}</p>
          </div>
        </li>
      </ul>
    </div>

    <p v-else class="mt-10 text-center font-sans text-sm text-slate-500">
      Los padrinos se publicarán muy pronto.
    </p>
  </SectionPaper>
</template>
