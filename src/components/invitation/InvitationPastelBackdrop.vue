<script setup lang="ts">
/**
 * Fondo decorativo tras abrir el sobre: gradientes pastel y recursos en márgenes.
 * Imágenes en /public (transparencia).
 */
const ASSETS = {
  floresAzules: '/flores_azules.webp',
  floresMoradas: '/flores_moradas.webp',
  manchas: '/manchas_pequeñas_azules.png',
  mariposa: '/mariposa.webp',
  nubes: '/nubes_azul_morado.webp',
  ramillete: '/ramillete_azul.webp',
} as const
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Base y transiciones pastel (morado · azul · blanco) -->
    <div class="absolute inset-0 bg-white" />
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#fbf9ff] via-white to-[#f3f8ff]"
    />
    <div
      class="absolute inset-0 bg-gradient-to-tr from-[#ede9fe]/90 via-transparent to-[#dbeafe]/80"
    />
    <div
      class="absolute inset-0 opacity-[0.92]"
      style="
        background:
          radial-gradient(ellipse 85% 55% at -5% 8%, rgba(199, 183, 255, 0.42), transparent 58%),
          radial-gradient(ellipse 75% 50% at 108% 12%, rgba(165, 210, 255, 0.38), transparent 52%),
          radial-gradient(ellipse 70% 45% at 50% 102%, rgba(230, 214, 255, 0.32), transparent 48%),
          radial-gradient(ellipse 50% 35% at 40% 45%, rgba(255, 255, 255, 0.55), transparent 65%);
      "
    />

    <!-- Margen izquierdo -->
    <img
      :src="ASSETS.floresAzules"
      alt=""
      class="absolute -left-[2%] top-[5%] w-[min(38vw,220px)] max-w-none opacity-[0.82] -rotate-[8deg] select-none"
      loading="lazy"
      decoding="async"
    />
    <img
      :src="ASSETS.manchas"
      alt=""
      class="absolute left-[0%] top-[32%] w-[min(28vw,150px)] opacity-[0.55] rotate-[18deg] scale-x-[-1] select-none"
      loading="lazy"
      decoding="async"
    />
    <img
      :src="ASSETS.ramillete"
      alt=""
      class="absolute -left-[3%] top-[58%] w-[min(34vw,190px)] opacity-[0.78] rotate-[6deg] select-none"
      loading="lazy"
      decoding="async"
    />
    <img
      :src="ASSETS.nubes"
      alt=""
      class="absolute left-[1%] bottom-[4%] w-[min(42vw,240px)] opacity-[0.72] -rotate-[4deg] scale-x-[-1] select-none"
      loading="lazy"
      decoding="async"
    />

    <!-- Margen derecho -->
    <img
      :src="ASSETS.floresMoradas"
      alt=""
      class="absolute -right-[1%] top-[8%] w-[min(36vw,210px)] opacity-[0.8] rotate-[10deg] scale-x-[-1] select-none"
      loading="lazy"
      decoding="async"
    />
    <img
      :src="ASSETS.mariposa"
      alt=""
      class="absolute right-[2%] top-[38%] w-[min(22vw,120px)] opacity-[0.75] -rotate-[14deg] select-none"
      loading="lazy"
      decoding="async"
    />
    <img
      :src="ASSETS.manchas"
      alt=""
      class="absolute right-[0%] top-[52%] w-[min(26vw,140px)] opacity-[0.48] -rotate-[22deg] select-none"
      loading="lazy"
      decoding="async"
    />
    <img
      :src="ASSETS.floresAzules"
      alt=""
      class="absolute -right-[4%] bottom-[18%] w-[min(32vw,200px)] opacity-[0.7] rotate-[5deg] scale-x-[-1] select-none"
      loading="lazy"
      decoding="async"
    />
    <img
      :src="ASSETS.ramillete"
      alt=""
      class="absolute right-[0%] bottom-[3%] w-[min(30vw,175px)] opacity-[0.68] -rotate-[9deg] select-none"
      loading="lazy"
      decoding="async"
    />

    <!-- Esquinas / refuerzo suave (no invade el centro) -->
    <img
      :src="ASSETS.nubes"
      alt=""
      class="absolute left-[8%] top-[1%] w-[min(48vw,280px)] opacity-[0.35] rotate-[3deg] select-none md:left-[12%]"
      loading="lazy"
      decoding="async"
    />
    <img
      :src="ASSETS.mariposa"
      alt=""
      class="absolute right-[18%] top-[6%] w-[min(16vw,88px)] opacity-[0.55] rotate-[22deg] scale-x-[-1] select-none md:right-[22%]"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>
