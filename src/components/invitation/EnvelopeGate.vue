<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  /** Al hacer clic en “Abrir sobre”; el padre inicia aquí el audio (gesto de usuario). */
  opening: []
  opened: []
}>()

const opening = ref(false)
const done = ref(false)

function open() {
  if (opening.value || done.value) return
  emit('opening')
  opening.value = true
  window.setTimeout(() => {
    done.value = true
    emit('opened')
  }, 2200)
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-lilac-900 via-lilac-700 to-lilac-500 px-6 text-center"
    :class="{ 'pointer-events-none opacity-0': done, 'transition-opacity duration-700': done }"
    aria-live="polite"
  >
    <div class="relative mb-10 max-w-md">
      <div
        v-for="n in 14"
        :key="n"
        class="pointer-events-none absolute flex items-center justify-center"
        :class="opening ? `bfly-${n}` : 'opacity-0'"
        :style="{ animationDelay: `${n * 0.08}s` }"
        aria-hidden="true"
      >
        <img
          src="/mariposa_icon.png"
          alt=""
          class="h-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          :class="n % 2 === 0 ? 'scale-x-[-1]' : ''"
          :style="{
            width: `${26 + (n % 6) * 8}px`,
            opacity: 0.5 + (n % 5) * 0.09,
          }"
          loading="eager"
          decoding="async"
        />
      </div>

      <div
        class="relative mx-auto w-[min(88vw,320px)] transition-transform duration-700"
        :class="opening ? 'translate-y-4 scale-[0.97]' : ''"
      >
        <div
          class="relative z-10 rounded-2xl border border-white/25 bg-white/10 p-8 shadow-2xl backdrop-blur-md"
        >
          <p class="font-script text-2xl text-white/90 sm:text-3xl">Apreciable familia</p>
          <p class="mt-1 font-display text-4xl leading-tight text-blush sm:text-5xl">
            <slot name="family" />
          </p>
          <p class="mt-6 font-sans text-base leading-relaxed text-white/90">
            Hoy empieza la cuenta regresiva para el día más especial de mi vida y quiero que lo compartas
            conmigo. Dentro de este sobre encontrarás todo lo que tienes que saber.
          </p>
          <button
            type="button"
            class="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3 font-sans text-sm font-semibold text-lilac-700 shadow-lg transition hover:bg-blush hover:text-lilac-900"
            @click="open"
          >
            <img
              src="/mariposa_icon.png"
              alt=""
              class="h-6 w-6 shrink-0 object-contain opacity-90 motion-safe:animate-float"
              aria-hidden="true"
              loading="eager"
              decoding="async"
            />
            Abrir sobre
          </button>
        </div>

        <div
          class="envelope-back absolute -bottom-6 left-1/2 z-0 h-40 w-[110%] -translate-x-1/2 rounded-b-3xl bg-lilac-900/60 shadow-inner"
          aria-hidden="true"
        />
        <div
          class="absolute -top-3 left-1/2 z-20 h-24 w-[min(92vw,340px)] -translate-x-1/2 rounded-t-3xl bg-gradient-to-b from-lilac-100/95 to-lilac-300/70 shadow-lg transition-all duration-700 ease-out"
          :class="opening ? '-translate-y-16 opacity-0' : ''"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bfly-out {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.6) rotate(0deg);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) scale(1.2) rotate(25deg);
  }
}
.bfly-1 {
  top: 10%;
  left: 5%;
  --tx: -40px;
  --ty: -120px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-2 {
  top: 15%;
  right: 8%;
  --tx: 60px;
  --ty: -100px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-3 {
  bottom: 20%;
  left: 10%;
  --tx: -80px;
  --ty: 90px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-4 {
  bottom: 12%;
  right: 12%;
  --tx: 70px;
  --ty: 110px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-5 {
  top: 40%;
  left: 0;
  --tx: -100px;
  --ty: -40px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-6 {
  top: 35%;
  right: 0;
  --tx: 100px;
  --ty: -30px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-7 {
  top: 8%;
  left: 40%;
  --tx: -20px;
  --ty: -140px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-8 {
  bottom: 8%;
  left: 35%;
  --tx: -30px;
  --ty: 130px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-9 {
  top: 22%;
  left: 20%;
  --tx: -90px;
  --ty: -80px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-10 {
  top: 28%;
  right: 18%;
  --tx: 85px;
  --ty: -70px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-11 {
  bottom: 28%;
  left: 18%;
  --tx: -70px;
  --ty: 70px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-12 {
  bottom: 22%;
  right: 22%;
  --tx: 90px;
  --ty: 60px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-13 {
  top: 50%;
  left: 8%;
  --tx: -110px;
  --ty: 20px;
  animation: bfly-out 2.2s ease-out forwards;
}
.bfly-14 {
  top: 48%;
  right: 6%;
  --tx: 120px;
  --ty: 30px;
  animation: bfly-out 2.2s ease-out forwards;
}
</style>
