<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { CarouselSlide } from '../../types/invitation'

const props = defineProps<{
  slides: CarouselSlide[]
}>()

const AUTOPLAY_MS = 10000

/** Índice real del slide visible. Siempre debe estar entre 0 y list.length - 1. */
const currentSlideIndex = ref(0)
const touchStartX = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const list = computed(() => (props.slides?.length ? props.slides : []))

const dotCount = computed(() => Math.min(list.value.length, 5))

const activeDot = computed(() => {
  const len = list.value.length
  if (len <= 1) return 0
  const dots = dotCount.value
  if (len <= dots) return currentSlideIndex.value
  const max = dots - 1
  return Math.round((currentSlideIndex.value / (len - 1)) * max)
})

function normalizeIndex() {
  const n = list.value.length
  if (n === 0) {
    currentSlideIndex.value = 0
    return
  }
  if (currentSlideIndex.value < 0 || currentSlideIndex.value >= n) {
    currentSlideIndex.value = 0
  }
}

function go(delta: number, restart = true) {
  const n = list.value.length
  if (n <= 1) return
  currentSlideIndex.value = (currentSlideIndex.value + delta + n) % n
  if (restart) restartAutoplay()
}

function restartAutoplay() {
  if (timer) clearInterval(timer)
  timer = null
  if (list.value.length <= 1) return
  timer = setInterval(() => {
    go(1, false)
  }, AUTOPLAY_MS)
}

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0]?.clientX ?? null
}

function onTouchEnd(e: TouchEvent) {
  if (touchStartX.value == null) return
  const end = e.changedTouches[0]?.clientX ?? touchStartX.value
  const dx = end - touchStartX.value
  touchStartX.value = null
  if (Math.abs(dx) < 40) return
  if (dx < 0) go(1)
  else go(-1)
}

watch(
  () => props.slides,
  () => {
    normalizeIndex()
    restartAutoplay()
  },
  { deep: true }
)

watch(list, () => {
  normalizeIndex()
  restartAutoplay()
})

onMounted(() => {
  normalizeIndex()
  restartAutoplay()
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    class="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-lilac-900"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <button
      type="button"
      class="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/30 sm:left-2 sm:p-3"
      aria-label="Foto anterior"
      @click="go(-1)"
    >
      ‹
    </button>
    <button
      type="button"
      class="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/30 sm:right-2 sm:p-3"
      aria-label="Foto siguiente"
      @click="go(1)"
    >
      ›
    </button>

    <div v-if="list.length" class="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
      <div
        class="flex h-full w-full transition-transform duration-700 ease-in-out will-change-transform"
        :style="{ transform: `translate3d(-${currentSlideIndex * 100}%, 0, 0)` }"
      >
        <div
          v-for="(slide, i) in list"
          :key="`${i}-${slide.image}`"
          class="relative h-full w-full shrink-0"
        >
          <img
            :src="slide.image"
            :alt="slide.text"
            class="h-full w-full object-cover"
            :loading="i <= 2 ? 'eager' : 'lazy'"
            decoding="async"
          />
          <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-t from-lilac-950/85 via-lilac-900/35 to-transparent"
          />
          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 top-0 flex items-end justify-center px-3 pb-12 text-center sm:px-4 sm:pb-16"
          >
            <p
              class="max-w-xl font-script text-3xl leading-snug text-white drop-shadow-lg sm:text-4xl md:text-5xl"
            >
              {{ slide.text }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2"
        role="tablist"
        aria-label="Indicadores del carrusel"
      >
        <span
          v-for="d in dotCount"
          :key="d"
          class="h-2.5 rounded-full transition-all duration-300"
          :class="
            activeDot === d - 1 ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'
          "
        />
      </div>
    </div>

    <div
      v-else
      class="flex aspect-[4/5] items-center justify-center px-3 text-center font-sans text-white/80 sm:aspect-[16/9] sm:px-4 lg:aspect-[21/9]"
    >
      Pronto habrá fotos mágicas por aquí.
    </div>
  </section>
</template>
