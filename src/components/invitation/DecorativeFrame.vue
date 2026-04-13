<script setup lang="ts">
function butterflyPath(): string {
  return 'M12 4c-2 4-6 6-8 8 2 2 6 2 8 0-1-3-1-6 0-8zm8 0c2 4 6 6 8 8-2 2-6 2-8 0 1-3 1-6 0-8z'
}
</script>

<template>
  <div class="pointer-events-none fixed inset-y-0 left-0 z-[5] w-6 overflow-hidden sm:w-10 md:w-14">
    <div
      class="absolute inset-0 bg-gradient-to-b from-lilac-200/80 via-white/40 to-lilac-300/70 opacity-90"
    />
    <svg
      class="absolute left-1 top-10 h-8 w-8 animate-flutter text-lilac-500/70 sm:left-2"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path :d="butterflyPath()" transform="translate(4,6) scale(1.2)" />
    </svg>
    <svg
      class="absolute bottom-24 left-0 h-7 w-7 animate-float text-lilac-400/60"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path :d="butterflyPath()" transform="translate(6,8)" />
    </svg>
    <svg
      class="absolute left-1 top-1/3 h-6 w-6 text-gold/50 animate-flutter [animation-delay:0.6s]"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path :d="butterflyPath()" transform="translate(5,7)" />
    </svg>
  </div>
  <div
    class="pointer-events-none fixed inset-y-0 right-0 z-[5] w-6 scale-x-[-1] overflow-hidden sm:w-10 md:w-14"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-lilac-200/80 via-white/40 to-lilac-300/70 opacity-90"
    />
    <svg
      class="absolute left-1 top-24 h-8 w-8 animate-flutter text-lilac-500/70 sm:left-2"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path :d="butterflyPath()" transform="translate(4,6) scale(1.2)" />
    </svg>
    <svg
      class="absolute bottom-32 left-0 h-7 w-7 animate-float text-lilac-400/60 [animation-delay:0.4s]"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path :d="butterflyPath()" transform="translate(6,8)" />
    </svg>
  </div>
</template>
