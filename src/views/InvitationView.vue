<script setup lang="ts">
import { computed, ref } from 'vue'
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
import { invitationData } from '../data/invitationData'

const bundle = invitationData
const showEnvelope = ref(true)
const inviteMusicRef = ref<HTMLAudioElement | null>(null)

function playInviteMusic() {
  const el = inviteMusicRef.value
  if (!el) return
  el.volume = 0.45
  void el.play().catch(() => {
    /* políticas de autoplay / permisos */
  })
}

function onEnvelopeOpened() {
  showEnvelope.value = false
}

const quinceName = computed(() => bundle.event?.name || 'Hanna')
</script>

<template>
  <audio
    ref="inviteMusicRef"
    class="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
    src="/audio/fondo.mp3"
    preload="auto"
    loop
    aria-hidden="true"
  />
  <!-- Mismo fondo pastel + mariposas decorativas durante todo el flujo (sobre + invitación) -->
  <InvitationPastelBackdrop />

  <EnvelopeGate v-if="showEnvelope" @opening="playInviteMusic" @opened="onEnvelopeOpened">
    <template #family>{{ bundle.family.family_name }}</template>
  </EnvelopeGate>

  <div
    class="relative z-[1] min-h-svh bg-transparent px-3 pb-24 sm:px-4 md:px-5 motion-safe:transition-[opacity,transform] motion-safe:duration-[480ms] motion-safe:ease-out motion-reduce:transition-none"
    :class="
      showEnvelope
        ? 'pointer-events-none translate-y-2 opacity-0 motion-reduce:translate-y-0'
        : 'translate-y-0 opacity-100'
    "
  >
    <div class="relative z-[1]">
      <FloatingTicketBtn />

      <SectionFormalInvite :family-name="bundle.family.family_name" :quince-name="quinceName" />

      <SectionVenue :venues="bundle.venues" :event-date="bundle.event?.event_date || null" />

      <SectionSponsors :sponsors="bundle.sponsors" />

      <CarouselHero :slides="bundle.carousel?.slides || []" />

      <SectionSchedule :items="bundle.schedule" />

      <SectionDressCode />

      <SectionGifts />

      <SectionRsvp :guests="bundle.guests" :extra-ticket-quantity="bundle.extraTicketQuantity" />

      <SectionSurpriseMessage />
    </div>
  </div>
</template>
