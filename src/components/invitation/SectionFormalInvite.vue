<script setup lang="ts">
defineProps<{
  familyName: string
  quinceName?: string
}>()
</script>

<template>
  <section id="invitacion"
    class="relative flex min-h-svh items-center justify-center px-3 py-16 sm:px-5 md:px-8 md:py-24">
    <!--     <div class="mx-auto w-full max-w-5xl rounded-[2.2rem] border border-[#d9b25e]/55 bg-white/65 p-4 shadow-[0_24px_60px_-28px_rgba(147,120,58,0.55)] backdrop-blur-sm sm:p-6 md:p-8"> -->
    <div
      class="relative border-4 border-[#d2a74e]/80 bg-neutral-50/50 px-5 py-10 sm:px-8 md:px-14 md:py-14">
      <!-- <div class="pointer-events-none absolute inset-3  border border-[#f3d58e]/70" aria-hidden="true" /> -->

      <div class="relative z-[1] text-center">
        <img :src="'/corona.png'" alt="Corona"
          class="mx-auto h-16 w-16 object-contain drop-shadow-[0_8px_16px_rgba(160,124,52,0.35)] sm:h-20 sm:w-20"
          loading="eager" decoding="async" />

        <p
          class="mt-5 bg-gradient-to-r from-[#93c5fd] via-[#c4b5fd] to-[#86efac] bg-clip-text font-display text-6xl leading-none text-transparent sm:text-7xl md:text-8xl">
          {{ quinceName || 'Hannah' }}
        </p>

        <p class="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-slate-700 sm:text-lg">
          Querida Familia
          <span class="font-semibold text-lilac-700">{{ familyName }}</span>
          nos complace invitarles a celebrar por la vida y prosperidad de nuestra hija hannah.
        </p>

        <p class="mt-9 font-display text-5xl uppercase tracking-wide text-[#c79d44] sm:text-6xl">
          mis 15 años
        </p>

        <p class="mt-9 font-script text-3xl text-lilac-700 sm:text-4xl">Contamos con tu presencia!</p>
      </div>
    </div>
    <!-- </div> -->
  </section>
</template>
