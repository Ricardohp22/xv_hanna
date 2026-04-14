<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { VenueRow } from '../../types/invitation'
import { googleMapsSearchUrl } from '../../lib/maps'

const props = defineProps<{
  venues: VenueRow[]
  eventDate: string | null
  extraNotes?: string
}>()

const now = ref(Date.now())
let tick: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  tick = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})
onUnmounted(() => {
  if (tick) clearInterval(tick)
})

const misa = computed(() => props.venues.find((v) => v.type === 'misa'))
const fiesta = computed(() => props.venues.find((v) => v.type === 'fiesta'))

/**
 * Cuenta regresiva: `event.event_date` (prop `eventDate`) + `venue.start_time` en hora local.
 * Prioridad: misa con hora; si no, fiesta con hora.
 */
const countdownVenue = computed(() => {
  const m = misa.value
  const f = fiesta.value
  if (m?.start_time) return m
  if (f?.start_time) return f
  return null
})

const countdownTitle = computed(() => {
  const v = countdownVenue.value
  if (!v) return 'Cuenta regresiva'
  if (v.type === 'misa') return '¡Ya solo faltan!'
  return 'Cuenta regresiva para la fiesta'
})

/**
 * `event.event_date` solo trae día (DATE). Por JSON puede llegar como `YYYY-MM-DD`
 * o como ISO (`2026-05-20T00:00:00.000Z`); tomamos siempre los tres componentes iniciales.
 */
function parseLocalDate(dateStr: string | null | undefined): Date | null {
  if (dateStr == null || dateStr === '') return null
  const s = String(dateStr).trim()
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) return null
  return new Date(y, mo - 1, d, 0, 0, 0, 0)
}

/**
 * `venue.start_time` solo trae hora (TIME). Puede llegar como `HH:MM:SS`, `HH:MM`
 * o embebido en ISO (`1970-01-01T18:30:00.000Z` desde node-pg serializado).
 */
function parseStartTimeParts(t: unknown): { hh: number; mm: number; ss: number } | null {
  if (t == null || t === '') return null
  const s = String(t).trim()
  let m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?$/.exec(s)
  if (m) {
    const hh = Number(m[1])
    const mm = Number(m[2])
    const ss = Number(m[3] ?? 0)
    if (Number.isFinite(hh) && Number.isFinite(mm) && Number.isFinite(ss)) return { hh, mm, ss }
  }
  m = /T(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(s)
  if (m) {
    const hh = Number(m[1])
    const mm = Number(m[2])
    const ss = Number(m[3] ?? 0)
    if (Number.isFinite(hh) && Number.isFinite(mm) && Number.isFinite(ss)) return { hh, mm, ss }
  }
  return null
}

/** Instante local = fecha del evento + hora del venue (misma fecha civil + reloj local). */
function countdownTargetDateTime(): Date | null {
  const day = parseLocalDate(props.eventDate)
  const venue = countdownVenue.value
  const clock = parseStartTimeParts(venue?.start_time ?? null)
  if (!day || !clock) return null
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), clock.hh, clock.mm, clock.ss, 0)
}

const countdown = computed(() => {
  const target = countdownTargetDateTime()
  if (!target) return null
  let ms = target.getTime() - now.value
  if (ms < 0) ms = 0
  const s = Math.floor(ms / 1000)
  const days = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  return { days, hours, minutes, seconds }
})

const calendar = computed(() => {
  const d0 = parseLocalDate(props.eventDate)
  if (!d0) return null
  const y = d0.getFullYear()
  const m = d0.getMonth()
  const firstDow = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const eventDay = d0.getDate()
  const cells: { day: number | null; isEvent: boolean }[] = []
  for (let i = 0; i < firstDow; i++) cells.push({ day: null, isEvent: false })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, isEvent: d === eventDay })
  while (cells.length % 7 !== 0) cells.push({ day: null, isEvent: false })
  return {
    y,
    m,
    label: d0.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }),
    cells,
    eventDay,
  }
})

function formatTime(t: string | null | undefined): string {
  if (!t) return ''
  const [hh, mm] = t.split(':')
  const h = Number(hh)
  const ampm = h >= 12 ? 'p. m.' : 'a. m.'
  const h12 = ((h + 11) % 12) + 1
  return `${h12}:${(mm || '00').padStart(2, '0')} ${ampm}`
}
</script>

<template>
  <section
    id="fecha-lugar"
    class="relative min-h-[150svh] bg-gradient-to-b from-white/70 via-transparent to-white/50 px-3 py-4 sm:px-4 md:px-5 md:py-24"
  >
    <div class="mx-auto max-w-3xl">
      <!-- Tarjeta principal: título, fecha, calendario del mes, misa, fiesta -->
      <div
        class="rounded-3xl border border-lilac-200 bg-white/95 px-4 py-6 shadow-paper sm:px-6 sm:py-8 md:px-8 md:py-9"
      >
        <h2 class="text-center font-display text-4xl text-lilac-700 sm:text-5xl">¿Cuándo y dónde?</h2>
        <p v-if="eventDate" class="mt-4 text-center font-sans text-lg text-slate-700">
          
          <span class="font-semibold text-lilac-700">{{
            parseLocalDate(eventDate)?.toLocaleDateString('es-MX', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          }}</span>
        </p>

        <div class="my-8 border-t border-lilac-200/70" aria-hidden="true" />

        <template v-if="calendar">
          <!-- <p class="text-center font-sans text-sm font-semibold uppercase tracking-wide text-lilac-600">
            Calendario
          </p> -->
          <p class="text-center font-display text-3xl capitalize text-lilac-800">{{ calendar.label }}</p>
          <div class="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500">
            <span>Dom</span>
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
          </div>
          <div class="mt-2 grid grid-cols-7 gap-1 text-center text-sm">
            <span
              v-for="(c, i) in calendar.cells"
              :key="i"
              class="rounded-lg py-2 font-sans"
              :class="
                c.day == null
                  ? 'text-transparent'
                  : c.isEvent
                    ? 'bg-lilac-500 font-bold text-white shadow-md'
                    : 'bg-white/70 text-slate-700 backdrop-blur-sm'
              "
            >
              {{ c.day != null ? c.day : '' }}
            </span>
          </div>
        </template>

        <template v-if="misa">
          <div class="my-8 border-t border-lilac-200/70" aria-hidden="true" />

          <div class="flex items-start gap-3 sm:gap-4">
<!--             <span class="shrink-0 text-3xl sm:text-4xl" aria-hidden="true">⛪</span> -->            <div class="min-w-0 flex-1">
              <h3 class="font-script text-2xl text-lilac-700 sm:text-3xl">Misa</h3>
              <p class="mt-1 font-sans text-sm font-semibold uppercase tracking-wide text-lilac-600">Iglesia</p>
              <p class="mt-1 font-sans text-base font-semibold text-slate-800">{{ misa.name }}</p>
              <p class="mt-2 font-sans text-sm leading-relaxed text-slate-600">{{ misa.address }}</p>
              <p class="mt-2 font-sans text-sm text-lilac-700">
                Horario: {{ formatTime(misa.start_time) }}
                <span v-if="misa.end_time"> — {{ formatTime(misa.end_time) }}</span>
              </p>
              <a
                v-if="misa.address"
                class="mt-4 inline-flex items-center rounded-full bg-lilac-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-lilac-500"
                :href="googleMapsSearchUrl(`${misa.name || ''} ${misa.address}`)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </template>

        <template v-if="fiesta">
          <div class="my-8 border-t border-lilac-200/70" aria-hidden="true" />

          <div class="flex items-start gap-3 sm:gap-4">
<!--             <span class="shrink-0 text-3xl sm:text-4xl" aria-hidden="true">🎉</span> -->
            <div class="min-w-0 flex-1">
              <h3 class="font-script text-2xl text-lilac-700 sm:text-3xl">Fiesta</h3>
              <p class="mt-1 font-sans text-sm font-semibold uppercase tracking-wide text-lilac-600">Recepción</p>
              <p class="mt-1 font-sans text-base font-semibold text-slate-800">{{ fiesta.name }}</p>
              <p class="mt-2 font-sans text-sm leading-relaxed text-slate-600">{{ fiesta.address }}</p>
              <p class="mt-2 font-sans text-sm text-lilac-700">
                Horario: {{ formatTime(fiesta.start_time) }}
                <span v-if="fiesta.end_time"> — {{ formatTime(fiesta.end_time) }}</span>
              </p>
              <a
                v-if="fiesta.address"
                class="mt-4 inline-flex items-center rounded-full bg-lilac-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-lilac-500"
                :href="googleMapsSearchUrl(`${fiesta.name || ''} ${fiesta.address}`)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </template>
      </div>

      <div
        class="mt-10 rounded-3xl border border-lilac-200/70 bg-white/75 px-3 py-4 shadow-paper backdrop-blur-[2px] sm:px-5 sm:py-6 md:px-6"
      >
        <p class="text-center font-script text-xl text-lilac-600/90 sm:text-2xl">{{ countdownTitle }}</p>
        <div
          v-if="countdown"
          class="mt-4 flex items-stretch gap-1.5 font-sans text-center sm:mt-5 sm:gap-2.5"
        >
          <div class="flex min-w-0 flex-1 flex-col justify-center rounded-xl border border-lilac-200/60 bg-white/45 px-2 py-2 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:bg-white/65 sm:px-3 sm:py-3">
            <p class="text-xl font-bold leading-none text-lilac-700 sm:text-3xl">{{ countdown.days }}</p>
            <p class="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-wide">días</p>
          </div>
          <div class="flex min-w-0 flex-1 flex-col justify-center rounded-xl border border-lilac-200/60 bg-white/45 px-2 py-2 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:bg-white/65 sm:px-3 sm:py-3">
            <p class="text-xl font-bold leading-none text-lilac-700 sm:text-3xl">{{ countdown.hours }}</p>
            <p class="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-wide">horas</p>
          </div>
          <div class="flex min-w-0 flex-1 flex-col justify-center rounded-xl border border-lilac-200/60 bg-white/45 px-2 py-2 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:bg-white/65 sm:px-3 sm:py-3">
            <p class="text-xl font-bold leading-none text-lilac-700 sm:text-3xl">{{ countdown.minutes }}</p>
            <p class="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-wide">min</p>
          </div>
          <div class="flex min-w-0 flex-1 flex-col justify-center rounded-xl border border-lilac-200/60 bg-white/45 px-2 py-2 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:bg-white/65 sm:px-3 sm:py-3">
            <p class="text-xl font-bold leading-none text-lilac-700 sm:text-3xl">{{ countdown.seconds }}</p>
            <p class="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-wide">seg</p>
          </div>
        </div>
        <p v-else class="mt-4 text-center font-sans text-sm text-slate-500">
          Configura la fecha del evento y el horario de misa o fiesta en la base de datos para ver la cuenta
          regresiva.
        </p>
      </div>

      <!-- <div class="mt-12 rounded-3xl border border-lilac-200 bg-white/95 px-4 py-6 shadow-paper sm:px-5 sm:py-7 md:px-6">
        <h3 class="text-center font-display text-3xl text-lilac-700">Indicaciones adicionales</h3>
        <p class="mt-4 font-sans text-base leading-relaxed text-slate-700">
          {{
            extraNotes ||
            'Llega con unos minutos de anticipación para la misa. Después de la ceremonia te compartiremos el acceso al salón. Si vienes en auto, considera el tráfico y el estacionamiento cercano a cada ubicación.'
          }}
        </p>
      </div> -->
    </div>
  </section>
</template>
