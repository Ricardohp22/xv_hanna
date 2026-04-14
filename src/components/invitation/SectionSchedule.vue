<script setup lang="ts">
import { computed } from 'vue'
import type { ScheduleRow } from '../../types/invitation'

const props = defineProps<{
  items: ScheduleRow[]
}>()

const sortedItems = computed(() =>
  [...props.items].sort((a, b) => {
    const ta = a.start_time ? new Date(a.start_time).getTime() : 0
    const tb = b.start_time ? new Date(b.start_time).getTime() : 0
    return ta - tb
  })
)

function fmtTimeOnly(dt: string | null | undefined): string {
  if (!dt) return '—'
  const d = new Date(dt)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
</script>

<template>
  <section id="cronograma" class="relative px-3 py-16 sm:px-4 md:px-5 md:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <p
        class="mx-auto mb-2 inline-block rounded-full border border-lilac-200/80 bg-white/60 px-4 py-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-lilac-600 backdrop-blur-sm"
      >
        Itinerario
      </p>
      <h2 class="font-display text-4xl text-lilac-800 sm:text-5xl">Cronograma</h2>
      <p class="mt-3 font-sans text-sm text-slate-600">
        Una línea del tiempo con los momentos más especiales — solo horas, en orden.
      </p>
    </div>

    <div v-if="sortedItems.length" class="relative mx-auto mt-16 max-w-3xl">
      <!-- Riel vertical continuo -->
      <div
        class="pointer-events-none absolute left-[5.625rem] top-2 bottom-8 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-lilac-200/90 via-lilac-500 to-lilac-300/80 shadow-[0_0_20px_rgba(139,92,246,0.25)] sm:left-[6.875rem]"
        aria-hidden="true"
      />

      <ol class="relative space-y-0">
        <li
          v-for="(it, idx) in sortedItems"
          :key="it.id"
          class="relative grid grid-cols-[4.5rem_2.25rem_1fr] gap-x-2 pb-14 sm:grid-cols-[5.5rem_2.75rem_1fr] sm:gap-x-3 sm:pb-16"
        >
          <!-- Columna hora (solo hora) -->
          <div class="flex flex-col items-end justify-start pt-1 text-right sm:pt-0.5">
            <span
              class="font-display text-2xl leading-none text-lilac-800 tabular-nums sm:text-3xl"
            >
              {{ fmtTimeOnly(it.start_time) }}
            </span>
            <span
              v-if="it.end_time"
              class="mt-1 font-sans text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs"
            >
              hasta {{ fmtTimeOnly(it.end_time) }}
            </span>
          </div>

          <!-- Nodo sobre la línea -->
          <div class="relative flex justify-center pt-2 sm:pt-2.5">
            <span
              class="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-lilac-400 to-lilac-700 shadow-md ring-2 ring-lilac-200/90 sm:h-[18px] sm:w-[18px]"
              aria-hidden="true"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-white/90" />
            </span>
          </div>

          <!-- Tarjeta lateral -->
          <article
            class="group relative -mt-1 overflow-hidden rounded-2xl border border-lilac-200/85 bg-white/75 p-4 shadow-[0_8px_30px_-12px_rgba(99,79,160,0.35)] backdrop-blur-md transition duration-300 hover:border-lilac-300/90 hover:bg-white/90 hover:shadow-[0_12px_36px_-10px_rgba(99,79,160,0.4)] sm:rounded-3xl sm:p-5"
          >
            <span
              class="pointer-events-none absolute -right-6 -top-6 font-display text-7xl leading-none text-lilac-200/40 transition group-hover:text-lilac-300/50 sm:text-8xl"
              aria-hidden="true"
            >
              {{ String(idx + 1).padStart(2, '0') }}
            </span>
            <h3 class="relative font-script text-xl text-lilac-800 sm:text-2xl">
              {{ it.title || 'Actividad' }}
            </h3>
            <p class="relative mt-2 font-sans text-sm leading-relaxed text-slate-600">
              {{ it.description || 'Detalle por confirmar.' }}
            </p>
          </article>
        </li>
      </ol>

      <!-- Remate inferior del riel -->
      <div
        class="pointer-events-none absolute bottom-6 left-[5.625rem] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-lilac-300/60 bg-white/80 shadow-md backdrop-blur-sm sm:left-[6.875rem]"
        aria-hidden="true"
      >
        <span class="text-lg">✦</span>
      </div>
    </div>

    <p v-else class="mx-auto mt-12 max-w-lg text-center font-sans text-sm text-slate-600">
      El cronograma se publicará muy pronto.
    </p>
  </section>
</template>
