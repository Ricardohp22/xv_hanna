<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchJson } from '../lib/api'
import type { InvitationBundle } from '../types/invitation'
import EnvelopeGate from '../components/invitation/EnvelopeGate.vue'
import InvitationPastelBackdrop from '../components/invitation/InvitationPastelBackdrop.vue'
import FloatingTicketBtn from '../components/invitation/FloatingTicketBtn.vue'
import CarouselHero from '../components/invitation/CarouselHero.vue'
import SectionFormalInvite from '../components/invitation/SectionFormalInvite.vue'
import SectionSponsors from '../components/invitation/SectionSponsors.vue'
import SectionVenue from '../components/invitation/SectionVenue.vue'
import SectionSchedule from '../components/invitation/SectionSchedule.vue'
import SectionDressCode from '../components/invitation/SectionDressCode.vue'
import SectionGifts from '../components/invitation/SectionGifts.vue'
import SectionRsvp from '../components/invitation/SectionRsvp.vue'
import SectionSurpriseMessage from '../components/invitation/SectionSurpriseMessage.vue'

const route = useRoute()

const familyId = computed(() => {
  const raw = route.query._fam
  const s = Array.isArray(raw) ? raw[0] : raw
  const n = Number(s)
  return Number.isInteger(n) && n > 0 ? n : null
})

const bundle = ref<InvitationBundle | null>(null)
const loadError = ref<string | null>(null)
const loading = ref(false)
const showEnvelope = ref(true)

async function load() {
  loadError.value = null
  bundle.value = null
  const id = familyId.value
  if (!id) return
  loading.value = true
  try {
    bundle.value = await fetchJson<InvitationBundle>(`/api/families/${id}/invitation`)
  } catch (e) {
    loadError.value = e instanceof Error ? e.message : 'No se pudo cargar la invitación'
  } finally {
    loading.value = false
  }
}

watch(
  familyId,
  () => {
    void load()
  },
  { immediate: true }
)

watch(familyId, () => {
  showEnvelope.value = true
})

function onEnvelopeOpened() {
  showEnvelope.value = false
}

const quinceName = computed(() => bundle.value?.event?.name || 'Hanna')
</script>

<template>
  <div v-if="!familyId" class="flex min-h-svh flex-col items-center justify-center bg-lilac-100 px-3 text-center sm:px-4">
    <p class="font-display text-4xl text-lilac-700">Invitación</p>
    <p class="mt-4 max-w-md font-sans text-sm text-slate-600">
      Falta el parámetro
      <code class="rounded bg-white/80 px-1 py-0.5 text-lilac-800">_fam</code>
      en la URL. Ejemplo:
      <code class="mt-2 block rounded bg-white/80 px-2 py-1 text-xs text-lilac-900">/?_fam=1</code>
    </p>
  </div>

  <div
    v-else-if="loadError"
    class="flex min-h-svh flex-col items-center justify-center bg-lilac-100 px-3 text-center sm:px-4"
  >
    <p class="font-display text-3xl text-lilac-700">No pudimos abrir tu invitación</p>
    <p class="mt-3 max-w-md font-sans text-sm text-red-700">{{ loadError }}</p>
  </div>

  <div v-else-if="loading || !bundle" class="flex min-h-svh items-center justify-center bg-lilac-100">
    <p class="animate-pulse font-script text-3xl text-lilac-600">Preparando algo hermoso…</p>
  </div>

  <template v-else>
    <EnvelopeGate v-if="showEnvelope" @opened="onEnvelopeOpened">
      <template #family>{{ bundle.family.family_name }}</template>
    </EnvelopeGate>

    <div
      class="relative isolate min-h-svh bg-white px-3 pb-24 sm:px-4 md:px-5"
    >
      <InvitationPastelBackdrop v-if="!showEnvelope" />
      <div class="relative z-[1]">
        <FloatingTicketBtn />

        <CarouselHero :slides="bundle.carousel?.slides || []" />

        <SectionFormalInvite :family-name="bundle.family.family_name" :quince-name="quinceName" />

        <SectionSponsors :sponsors="bundle.sponsors" />

        <SectionVenue :venues="bundle.venues" :event-date="bundle.event?.event_date || null" />

        <SectionSchedule :items="bundle.schedule" />

        <SectionDressCode />

        <SectionGifts />

        <SectionRsvp
          v-if="familyId"
          :family-id="familyId"
          :guests="bundle.guests"
          :extra-ticket-quantity="bundle.extraTicketQuantity"
          @refresh="load"
        />

        <SectionSurpriseMessage v-if="familyId" :family-id="familyId" />
      </div>
    </div>
  </template>
</template>
