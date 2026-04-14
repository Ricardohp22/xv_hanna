<script setup lang="ts">
import { ref } from 'vue'
import InvitationPastelBackdrop from './InvitationPastelBackdrop.vue'

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
}

function onEnvelopeSceneAnimationEnd(ev: AnimationEvent) {
  // Con <style scoped>, Vue renombra los @keyframes; animationName no coincide al 100%.
  if (!ev.animationName.includes('envelope-zoom-through')) return
  if (ev.target !== ev.currentTarget) return
  done.value = true
  emit('opened')
}
</script>

<template>
  <!-- Capa fija: pantalla completa del sobre (por encima del resto de la SPA) -->
  <div
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent px-4 text-center sm:px-6"
    :class="{ 'pointer-events-none opacity-0 transition-none': done }"
    aria-live="polite"
  >
    <!-- Fondo pastel a pantalla: sin escala (solo la carta hace zoom) -->
    <div
      class="relative flex min-h-svh w-full max-w-none flex-col items-center justify-center"
    >
      <InvitationPastelBackdrop />

      <!-- Mariposas + carta: las mariposas no heredan la escala de apertura -->
      <div class="relative z-10 mb-10 max-w-md w-full">
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
            class="h-auto object-contain drop-shadow-[0_2px_8px_rgba(99,79,160,0.35)]"
            :class="n % 2 === 0 ? 'scale-x-[-1]' : ''"
            :style="{
              width: `${26 + (n % 6) * 8}px`,
              opacity: 0.5 + (n % 5) * 0.09,
            }"
            loading="eager"
            decoding="async"
          />
        </div>

        <!-- Solo esta tarjeta (mensaje + botón): 95% → zoom rápido → desvanecido -->
        <div
          class="relative mx-auto w-[min(88vw,320px)] origin-center"
          :class="opening ? 'envelope-zoom-through' : ''"
          @animationend="onEnvelopeSceneAnimationEnd"
        >
          <!-- Nota sobre: textura papel sobre (sobre.webp) + título, texto y botón -->
          <div class="relative z-10 overflow-hidden rounded-2xl border border-lilac-200/90 shadow-paper">
            <!-- Textura del sobre (imagen de fondo) -->
            <div
              class="pointer-events-none absolute inset-0 bg-[url('/sobre.webp')] bg-cover bg-center bg-no-repeat"
              aria-hidden="true"
            />
            <!-- Velo muy suave para mantener legible el texto sobre la textura -->
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/85"
              aria-hidden="true"
            />
            <!-- Contenido: mensaje inicial + acción -->
            <div class="relative z-[1] px-6 py-8 text-center sm:px-8 sm:py-9">
              <p class="font-script text-2xl text-lilac-700 sm:text-3xl">Apreciable familia</p>
              <p class="mt-1 font-display text-4xl leading-tight text-lilac-600 sm:text-5xl">
                <slot name="family" />
              </p>
              <p class="mt-6 font-sans text-base leading-relaxed text-slate-800">
                Hoy empieza la cuenta regresiva para uno de los días más especiales de mi vida y quiero que lo compartas
                conmigo. Dentro de este sobre encontrarás todo lo que mi familia y yo queremos compartir con ustedes!.
              </p>
              <!-- Botón principal: dispara audio (evento opening) y animación de apertura -->
              <button
                type="button"
                class="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-lilac-600 to-lilac-500 px-8 py-3 font-sans text-sm font-semibold text-white shadow-lg transition hover:from-lilac-500 hover:to-lilac-400"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Apertura: leve reducción → zoom que acelera al final (sin “plateau”) → desvanecido muy corto */
@keyframes envelope-zoom-through {
  0% {
    transform: scale(1);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  9% {
    transform: scale(0.95) translateY(0.45rem);
    opacity: 1;
    /* Zoom que gana velocidad hacia el final (evita pausa perceptible antes del fade) */
    animation-timing-function: cubic-bezier(0.2, 0.85, 0.2, 1);
  }
  72% {
    transform: scale(10.5) translateY(0);
    opacity: 1;
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }
  88% {
    transform: scale(12) translateY(0);
    opacity: 0;
  }
  100% {
    transform: scale(12) translateY(0);
    opacity: 0;
  }
}
.envelope-zoom-through {
  animation: envelope-zoom-through 1.35s forwards;
  will-change: transform, opacity;
}

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
