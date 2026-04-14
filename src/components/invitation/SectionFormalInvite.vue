<script setup lang="ts">
defineProps<{
  familyName: string
  quinceName?: string
}>()
</script>

<template>
  <section
    id="invitacion"
    class="relative flex min-h-svh flex-col px-3 py-10 sm:px-5 sm:py-12 md:px-8 md:py-16"
  >
    <div class="my-auto flex w-full max-w-5xl justify-center">
      <div
        class="relative w-full border-4 border-[#d2a74e]/80 bg-neutral-50/50 px-5 py-10 shadow-[0_20px_50px_-24px_rgba(147,120,58,0.35)] sm:px-8 sm:py-12 md:px-14 md:py-16"
      >
        <div class="relative z-[1] text-center">
          <img
            :src="'/corona.png'"
            alt="Corona"
            class="mx-auto h-20 w-20 object-contain drop-shadow-[0_8px_16px_rgba(160,124,52,0.35)] sm:h-[6.25rem] sm:w-[6.25rem] md:h-28 md:w-28"
            loading="eager"
            decoding="async"
          />

          <p
            class="mt-6 bg-gradient-to-r from-[#93c5fd] via-[#c4b5fd] to-[#86efac] bg-clip-text font-display text-7xl leading-[0.95] text-transparent sm:text-8xl md:text-9xl"
          >
            {{ quinceName || 'Hannah' }}
          </p>

          <p class="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-slate-700 sm:text-lg">
            Querida Familia
            <span class="font-semibold text-lilac-700">{{ familyName }}</span>
            nos complace invitarles a celebrar por la vida y prosperidad de nuestra hija hannah.
          </p>

          <p
            class="mt-10 font-elegant text-4xl font-semibold italic tracking-wide text-[#b8860b] sm:text-5xl md:text-6xl"
          >
            mis 15 años
          </p>

          <p class="mt-10 font-script text-3xl text-lilac-700 sm:text-4xl">Contamos con tu presencia!</p>
        </div>
      </div>
    </div>
  </section>
</template>
