<script setup lang="ts">
import type { ScheduleRow } from '../../types/invitation'

defineProps<{
  items: ScheduleRow[]
}>()

function fmt(dt: string | null | undefined): string {
  if (!dt) return '—'
  const d = new Date(dt)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
  })
}
</script>

<template>
  <section id="cronograma" class="relative bg-lilac-50 px-3 py-16 sm:px-4 md:px-5 md:py-24">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="font-display text-4xl text-lilac-700 sm:text-5xl">Cronograma</h2>
      <p class="mt-3 font-sans text-sm text-slate-600">Un vistazo a los momentos más especiales.</p>
    </div>

    <div v-if="items.length" class="relative mx-auto mt-14 max-w-3xl pb-8">
      <div
        class="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-lilac-300 via-lilac-500 to-lilac-300 md:block"
        style="height: calc(100% - 2rem)"
        aria-hidden="true"
      />
      <ol class="space-y-10">
        <li
          v-for="(it, idx) in items"
          :key="it.id"
          class="relative flex flex-col items-stretch gap-4 md:grid md:grid-cols-2 md:items-center"
        >
          <div
            class="md:pr-5"
            :class="idx % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-2 md:text-left'"
          >
            <div
              class="rounded-3xl border border-lilac-200 bg-white/95 p-5 shadow-paper transition hover:-translate-y-0.5 hover:shadow-lg"
              :class="idx % 2 === 0 ? '' : 'md:order-2'"
            >
              <p class="font-sans text-xs font-semibold uppercase tracking-wide text-lilac-600">
                {{ fmt(it.start_time) }}
                <span v-if="it.end_time"> · hasta {{ fmt(it.end_time) }}</span>
              </p>
              <h3 class="mt-2 font-script text-2xl text-lilac-800">{{ it.title || 'Actividad' }}</h3>
              <p class="mt-2 font-sans text-sm leading-relaxed text-slate-600">
                {{ it.description || 'Detalle por confirmar.' }}
              </p>
            </div>
          </div>
          <div
            class="hidden h-4 w-4 rounded-full border-4 border-white bg-lilac-500 shadow md:absolute md:left-1/2 md:top-8 md:block md:-translate-x-1/2"
            aria-hidden="true"
          />
        </li>
      </ol>
    </div>
    <p v-else class="mx-auto mt-10 max-w-lg text-center font-sans text-slate-600">
      El cronograma se publicará muy pronto.
    </p>
  </section>
</template>
