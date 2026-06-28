<script setup lang="ts">
import { computed, ref } from 'vue'
import EnvelopeGate from '../components/invitation/EnvelopeGate.vue'
import InvitationPastelBackdrop from '../components/invitation/InvitationPastelBackdrop.vue'
import SectionFormalInvite from '../components/invitation/SectionFormalInvite.vue'
import SectionParents from '../components/invitation/SectionParents.vue'
import SectionSponsors from '../components/invitation/SectionSponsors.vue'
import SectionVenue from '../components/invitation/SectionVenue.vue'
import SectionSchedule from '../components/invitation/SectionSchedule.vue'
import SectionDressCode from '../components/invitation/SectionDressCode.vue'
import SectionGifts from '../components/invitation/SectionGifts.vue'
import SectionAttendanceReminder from '../components/invitation/SectionAttendanceReminder.vue'
import { invitationData } from '../data/invitationData'

const bundle = invitationData
const showEnvelope = ref(true)
const inviteMusicRef = ref<HTMLAudioElement | null>(null)
const isMusicPlaying = ref(false)

function playInviteMusic() {
  const el = inviteMusicRef.value
  if (!el) return
  el.volume = 0.45
  void el
    .play()
    .then(() => {
      isMusicPlaying.value = true
    })
    .catch(() => {
      /* políticas de autoplay / permisos */
      isMusicPlaying.value = false
    })
}

function toggleInviteMusic() {
  const el = inviteMusicRef.value
  if (!el) return
  if (el.paused) {
    el.volume = 0.45
    void el
      .play()
      .then(() => {
        isMusicPlaying.value = true
      })
      .catch(() => {
        isMusicPlaying.value = false
      })
    return
  }
  el.pause()
  isMusicPlaying.value = false
}

function onEnvelopeOpened() {
  showEnvelope.value = false
}

const quinceName = computed(() => bundle.event?.name || 'Hannah')
</script>

<template>
  <audio
    ref="inviteMusicRef"
    class="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
    src="/audio/fondo.mp3"
    preload="auto"
    loop
    aria-hidden="true"
    @play="isMusicPlaying = true"
    @pause="isMusicPlaying = false"
  />
  <!-- Mismo fondo pastel + mariposas decorativas durante todo el flujo (sobre + invitación) -->
  <InvitationPastelBackdrop />

  <EnvelopeGate v-if="showEnvelope" @opening="playInviteMusic" @opened="onEnvelopeOpened">
    <template #family>{{ bundle.family.family_name }}</template>
  </EnvelopeGate>

  <button
    v-if="!showEnvelope"
    type="button"
    class="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/75 text-lilac-800 shadow-lg shadow-lilac-900/15 backdrop-blur-md transition hover:scale-105 hover:bg-white/90 active:scale-95 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
    :aria-label="isMusicPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'"
    :title="isMusicPlaying ? 'Pausar música' : 'Reproducir música'"
    @click="toggleInviteMusic"
  >
    <svg
      v-if="isMusicPlaying"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
    <svg
      v-else
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M16 9l5 5" />
      <path d="m21 9-5 5" />
    </svg>
  </button>

  <div
    class="relative z-[1] bg-transparent px-3 pb-10 sm:px-4 md:px-5 motion-safe:transition-[opacity,transform] motion-safe:duration-[480ms] motion-safe:ease-out motion-reduce:transition-none"
    :class="
      showEnvelope
        ? 'pointer-events-none translate-y-2 opacity-0 motion-reduce:translate-y-0'
        : 'translate-y-0 opacity-100'
    "
  >
    <div class="relative z-[1]">
      <SectionFormalInvite :family-name="bundle.family.family_name" :quince-name="quinceName" />

      <SectionParents :parents="bundle.parents" />

      <SectionSponsors :sponsors="bundle.sponsors" />

      <SectionVenue :venues="bundle.venues" :event-date="bundle.event?.event_date || null" />

      <!-- <CarouselHero :slides="bundle.carousel?.slides || []" /> -->

      <SectionSchedule :items="bundle.schedule" />

      <SectionDressCode />

      <SectionGifts />

      <SectionAttendanceReminder />

<!--       <SectionRsvp :guests="bundle.guests" :extra-ticket-quantity="bundle.extraTicketQuantity" />
 -->
<!--       <SectionSurpriseMessage />
 -->    </div>
  </div>
</template>
