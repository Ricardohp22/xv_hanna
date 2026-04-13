<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { CarouselSlide } from '../../types/invitation'

const props = defineProps<{
  slides: CarouselSlide[]
}>()

const index = ref(0)
const touchStartX = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const list = computed(() => (props.slides?.length ? props.slides : []))

const dotCount = computed(() => Math.min(list.value.length, 5))

const activeDot = computed(() => {
  const len = list.value.length
  if (len <= 1) return 0
  const dots = dotCount.value
  if (len <= dots) return index.value
  const max = dots - 1
  return Math.round((index.value / (len - 1)) * max)
})

function go(delta: number) {
  const len = list.value.length
  if (!len) return
  index.value = (index.value + delta + len) % len
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

watch(
  () => props.slides,
  () => {
    index.value = 0
    restartAutoplay()
  },
  { deep: true }
)

onMounted(() => restartAutoplay())
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    class="relative min-h-svh w-full overflow-hidden bg-lilac-900"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <button
      type="button"
      class="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 sm:left-4"
      aria-label="Foto anterior"
      @click="go(-1)"
    >
      ‹
    </button>
    <button
      type="button"
      class="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 sm:right-4"
      aria-label="Foto siguiente"
      @click="go(1)"
    >
      ›
    </button>

    <div v-if="list.length" class="relative h-[100svh] w-full">
      <div class="relative h-full w-full">
        <Transition name="fade-slide" mode="out-in">
          <div :key="index" class="absolute inset-0">
            <img
              :src="list[index]!.image"
              :alt="list[index]!.text"
              class="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-lilac-950/85 via-lilac-900/35 to-transparent"
            />
            <div
              class="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center px-6 pb-28 text-center sm:pb-32"
            >
              <p
                class="max-w-xl font-script text-3xl leading-snug text-white drop-shadow-lg sm:text-4xl md:text-5xl"
              >
                {{ list[index]!.text }}
              </p>
            </div>
          </div>
        </Transition>
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
      class="flex h-[100svh] items-center justify-center px-6 text-center font-sans text-white/80"
    >
      Pronto habrá fotos mágicas por aquí.
    </div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: scale(1.03);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
