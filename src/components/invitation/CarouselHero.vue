<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { CarouselSlide } from '../../types/invitation'

const props = defineProps<{
  slides: CarouselSlide[]
}>()

/** Índice en el riel extendido (clon al inicio/fin si hay >1 slide) */
const slidePosition = ref(0)
const instantMove = ref(false)
const touchStartX = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const list = computed(() => (props.slides?.length ? props.slides : []))

/** [última, ...todas, primera] para transición circular sin salto visual */
const extendedSlides = computed((): CarouselSlide[] => {
  const L = list.value
  const n = L.length
  if (n === 0) return []
  if (n === 1) return L
  return [L[n - 1]!, ...L, L[0]!]
})

const dotCount = computed(() => Math.min(list.value.length, 5))

const logicalIndex = computed(() => {
  const n = list.value.length
  if (n <= 1) return 0
  const p = slidePosition.value
  if (p === 0) return n - 1
  if (p === n + 1) return 0
  return p - 1
})

const activeDot = computed(() => {
  const len = list.value.length
  if (len <= 1) return 0
  const dots = dotCount.value
  if (len <= dots) return logicalIndex.value
  const max = dots - 1
  return Math.round((logicalIndex.value / (len - 1)) * max)
})

function resetPosition() {
  const n = list.value.length
  slidePosition.value = n <= 1 ? 0 : 1
}

function go(delta: number) {
  const n = list.value.length
  if (!n) return
  if (n === 1) return
  slidePosition.value += delta
  restartAutoplay()
}

function restartAutoplay() {
  if (timer) clearInterval(timer)
  if (list.value.length <= 1) return
  timer = setInterval(() => {
    go(1)
  }, 5000)
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

function onTrackTransitionEnd(ev: TransitionEvent) {
  if (instantMove.value) return
  if (ev.propertyName !== 'transform') return
  const n = list.value.length
  if (n <= 1) return
  const p = slidePosition.value
  if (p === n + 1) {
    instantMove.value = true
    slidePosition.value = 1
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        instantMove.value = false
      })
    })
  } else if (p === 0) {
    instantMove.value = true
    slidePosition.value = n
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        instantMove.value = false
      })
    })
  }
}

watch(
  () => props.slides,
  () => {
    resetPosition()
    restartAutoplay()
  },
  { deep: true }
)

watch(list, () => {
  resetPosition()
})

onMounted(() => {
  resetPosition()
  restartAutoplay()
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    class="relative left-1/2 min-h-svh w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-lilac-900"
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

    <div v-if="list.length" class="relative h-[100svh] w-full">
      <div
        class="flex h-full w-full"
        :class="
          instantMove
            ? 'transition-none duration-0'
            : 'transition-transform duration-700 ease-in-out will-change-transform'
        "
        :style="{ transform: `translate3d(-${slidePosition * 100}vw, 0, 0)` }"
        @transitionend="onTrackTransitionEnd"
      >
        <div
          v-for="(slide, i) in extendedSlides"
          :key="`${i}-${slide.image}`"
          class="relative h-[100svh] w-screen shrink-0"
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
            class="pointer-events-none absolute inset-x-0 bottom-0 top-0 flex items-end justify-center px-3 pb-28 text-center sm:px-4 sm:pb-32"
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
      class="flex h-[100svh] items-center justify-center px-3 text-center font-sans text-white/80 sm:px-4"
    >
      Pronto habrá fotos mágicas por aquí.
    </div>
  </section>
</template>
