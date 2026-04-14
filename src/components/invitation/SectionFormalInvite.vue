<script setup lang="ts">
defineProps<{
  familyName: string
  quinceName?: string
}>()
</script>

<template>
  <!-- Marco al ras del viewport: padding vertical pequeño; el marco crece (flex-1) para no dejar huecos por centrado -->
  <section
    id="invitacion"
    class="box-border flex h-svh max-h-svh min-h-0 flex-col px-4 py-10 sm:px-5 sm:py-2 md:px-6 md:py-2.5"
  >
    <div class="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col">
      <div
        class="flex min-h-0 flex-1 flex-col justify-center overflow-visible border-4 border-[#d2a74e]/80 bg-neutral-50/50 px-4 py-4 shadow-[0_20px_50px_-24px_rgba(147,120,58,0.35)] sm:px-6 sm:py-5 md:px-8 md:py-6"
      >
        <div class="relative z-[1] mx-auto flex w-full max-w-3xl flex-shrink-0 flex-col items-center text-center">
          <img
            :src="'/corona.png'"
            alt="Corona"
            class="mx-auto h-20 w-20 shrink-0 object-contain drop-shadow-[0_8px_16px_rgba(160,124,52,0.35)] sm:h-16 sm:w-16 md:h-[4.25rem] md:w-[4.25rem]"
            loading="eager"
            decoding="async"
          />

          <p
            class="mt-3 shrink-0 bg-purple-900 bg-clip-text font-display text-7xl leading-[0.95] text-transparent sm:text-6xl md:text-7xl"
          >
            {{ quinceName || 'Hannah' }}
          </p>

          <p
            class="mx-auto mt-3 max-w-xl shrink-0 font-elegant text-base font-semibold italic leading-snug text-slate-700 sm:mt-4 sm:text-base md:max-w-2xl"
          >
            Querida Familia
            <span class="text-lg font-semibold text-lilac-700">{{ familyName }}</span
            >:<br />
            Estan cordialmente invitados para ser parte de esta celebración.
          </p>

          <div class="relative mx-auto mt-4 w-full max-w-md shrink-0 px-1 sm:mt-5 sm:max-w-lg">
            <p
              class="relative z-10 flex flex-wrap items-end justify-center gap-x-1.5 pb-2 font-elegant font-semibold italic tracking-wide text-[#b8860b] sm:gap-x-2 sm:pb-2.5 md:gap-x-2.5"
              aria-label="mis 15 años"
            >
              <span class="text-2xl leading-none sm:text-3xl md:text-4xl">mis</span>
              <span
                class="translate-y-0.5 text-[3rem] font-bold leading-[0.82] sm:text-[3.75rem] md:text-[4.5rem]"
                >15</span
              >
              <span class="text-2xl leading-none sm:text-3xl md:text-4xl">años</span>
            </p>
            <img
              src="/base_flores.webp"
              alt=""
              class="pointer-events-none relative z-20 mx-auto -mt-5 w-full max-w-[14rem] select-none object-contain object-bottom sm:-mt-6 sm:max-w-[16rem] md:-mt-7 md:max-w-[18rem]"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
          </div>

          <p
            class="mt-2 shrink-0 font-elegant text-xl font-semibold italic text-lilac-700/80 sm:mt-3 sm:text-2xl md:text-3xl"
          >
            Contamos con tu presencia!
          </p>
          <!-- Indicador de scroll: sugerencia visual hacia el resto de la invitación -->
    <div
      class="pointer-events-none flex shrink-0 flex-col items-center gap-1.5 pb-1 pt-3 sm:gap-2 sm:pb-2 sm:pt-4"
    >
      <span
        class="font-elegant text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-lilac-600/80 sm:text-[0.7rem]"
      >
        Continúa abajo
      </span>
      <div
        class="formal-invite-scroll-cue flex flex-col items-center gap-0.5"
        aria-hidden="true"
      >
        <span
          class="block h-7 w-px rounded-full bg-gradient-to-b from-lilac-400/90 via-lilac-400/40 to-transparent sm:h-8"
        />
        <svg
          class="h-4 w-4 text-lilac-500/90 sm:h-[1.15rem] sm:w-[1.15rem]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
        </div>
      </div>
    </div>

    
  </section>
</template>

<style scoped>
@keyframes formal-invite-scroll-nudge {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.55;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}

.formal-invite-scroll-cue {
  animation: formal-invite-scroll-nudge 2.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .formal-invite-scroll-cue {
    animation: none;
    opacity: 0.75;
  }
}
</style>
