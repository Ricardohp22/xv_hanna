<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { GuestRow, RsvpStatus } from '../../types/invitation'
import { fetchJson } from '../../lib/api'

const props = defineProps<{
  familyId: number
  guests: GuestRow[]
  extraTicketQuantity: number
}>()

const emit = defineEmits<{
  refresh: []
}>()

const statusByGuest = reactive<Record<number, RsvpStatus>>({})
const nameByGuest = reactive<Record<number, string>>({})
const extraName = ref('')
const saving = ref(false)
const error = ref<string | null>(null)

function syncFromGuests() {
  for (const g of props.guests) {
    statusByGuest[g.id] = g.rsvp_status
    nameByGuest[g.id] = g.name
  }
}

watch(
  () => props.guests,
  () => syncFromGuests(),
  { immediate: true, deep: true }
)

const options: { value: RsvpStatus; label: string }[] = [
  { value: 'confirmado', label: 'Sí asistiré' },
  { value: 'pendiente', label: 'Tal vez asistiré' },
  { value: 'rechazado', label: 'No asistiré' },
]

async function saveAll() {
  error.value = null
  saving.value = true
  try {
    const updates = props.guests.map((g) => ({
      guestId: g.id,
      status: statusByGuest[g.id] ?? g.rsvp_status,
    }))
    await fetchJson<{ guests: GuestRow[] }>(`/api/families/${props.familyId}/rsvp`, {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    })

    for (const g of props.guests.filter((x) => x.is_additional)) {
      const name = (nameByGuest[g.id] || '').trim()
      if (!name || name === g.name) continue
      await fetchJson<{ guests: GuestRow[] }>(`/api/families/${props.familyId}/guests/${g.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
      })
    }

    emit('refresh')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'No se pudo guardar'
  } finally {
    saving.value = false
  }
}

const additionalCount = () => props.guests.filter((g) => g.is_additional).length

async function addExtraGuest() {
  error.value = null
  const name = extraName.value.trim()
  if (!name) {
    error.value = 'Escribe el nombre del invitado extra'
    return
  }
  saving.value = true
  try {
    await fetchJson(`/api/families/${props.familyId}/guests/extra`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
    extraName.value = ''
    emit('refresh')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'No se pudo agregar'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section
    id="confirmacion"
    class="flex min-h-svh items-center justify-center bg-gradient-to-b from-white via-lilac-50 to-lilac-100 px-5 py-16 sm:px-10 md:py-24"
  >
    <div
      class="w-full max-w-2xl rounded-3xl border border-lilac-200/80 bg-white/95 p-8 shadow-paper backdrop-blur-sm sm:p-12"
    >
      <h2 class="text-center font-display text-3xl text-lilac-700 sm:text-4xl">
        Confirma tu asistencia
      </h2>
      <p class="mt-4 font-sans text-sm leading-relaxed text-slate-700 sm:text-base">
        Es muy importante que confirmes tu asistencia para reservar tu lugar en la mesa. Puedes cambiar tu
        respuesta cuando quieras; al final solo presiona
        <span class="font-semibold text-lilac-700">Confirmar asistencia</span> para guardar los cambios.
      </p>
      <p class="mt-3 font-sans text-sm leading-relaxed text-slate-600">
        Si tienes dudas sobre horarios o acompañantes, comunícate con la familia anfitriona con la mayor
        antelación posible: nos ayudará a organizar todo con calma y cariño.
      </p>

      <ul class="mt-10 space-y-6">
        <li
          v-for="g in guests"
          :key="g.id"
          class="rounded-2xl border border-lilac-100 bg-lilac-50/60 p-4 sm:p-5"
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0 flex-1">
              <p v-if="g.is_additional" class="text-xs font-semibold uppercase text-lilac-600">
                Invitado adicional
              </p>
              <input
                v-if="g.is_additional"
                v-model="nameByGuest[g.id]"
                type="text"
                class="mt-1 w-full rounded-xl border border-lilac-200 bg-white px-3 py-2 font-sans text-sm text-slate-800 outline-none ring-lilac-400 focus:ring-2"
                maxlength="150"
                :aria-label="`Nombre de ${g.name}`"
              />
              <p v-else class="font-sans text-base font-semibold text-slate-800">{{ g.name }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in options"
                :key="opt.value + g.id"
                type="button"
                class="rounded-full px-3 py-1.5 font-sans text-xs font-semibold transition sm:text-sm"
                :class="
                  statusByGuest[g.id] === opt.value
                    ? 'bg-lilac-600 text-white shadow'
                    : 'bg-white text-lilac-700 ring-1 ring-lilac-200 hover:bg-lilac-100'
                "
                @click="statusByGuest[g.id] = opt.value"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="extraTicketQuantity > 0" class="mt-10 rounded-2xl border border-dashed border-lilac-300 p-5">
        <h3 class="font-script text-2xl text-lilac-700">Invitados extra</h3>
        <p class="mt-2 font-sans text-sm text-slate-600">
          Tienes
          <span class="font-semibold text-lilac-700">{{ extraTicketQuantity }}</span>
          boleto(s) extra. Registrados:
          <span class="font-semibold text-lilac-700">{{ additionalCount() }}</span>
          .
        </p>
        <div v-if="additionalCount() < extraTicketQuantity" class="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            v-model="extraName"
            type="text"
            maxlength="150"
            placeholder="Nombre completo del invitado"
            class="flex-1 rounded-xl border border-lilac-200 bg-white px-3 py-2 font-sans text-sm outline-none ring-lilac-400 focus:ring-2"
          />
          <button
            type="button"
            class="rounded-full bg-lilac-600 px-5 py-2 font-sans text-sm font-semibold text-white transition hover:bg-lilac-500 disabled:opacity-50"
            :disabled="saving"
            @click="addExtraGuest"
          >
            Agregar invitado
          </button>
        </div>
      </div>

      <p v-if="error" class="mt-6 text-center font-sans text-sm text-red-600">{{ error }}</p>

      <div class="mt-8 flex justify-center">
        <button
          type="button"
          class="rounded-full bg-gradient-to-r from-lilac-600 to-lilac-500 px-10 py-3 font-sans text-sm font-semibold text-white shadow-lg transition hover:from-lilac-500 hover:to-lilac-400 disabled:opacity-50"
          :disabled="saving"
          @click="saveAll"
        >
          {{ saving ? 'Guardando…' : 'Confirmar asistencia' }}
        </button>
      </div>
    </div>
  </section>
</template>
