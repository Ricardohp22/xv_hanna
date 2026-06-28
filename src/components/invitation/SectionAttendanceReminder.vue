<script setup lang="ts">
import SectionPaper from './SectionPaper.vue'

const whatsappContacts = [
  { name: 'Rafael', displayPhone: '477 340 4917', phone: '524773404917' },
  { name: 'Alma', displayPhone: '477 110 8772', phone: '524771108772' },
]

function whatsappUrl(phone: string): string {
  const message = encodeURIComponent('Hola, quiero confirmar la asistencia a los XV de Hannah de las siguientes personas: ')
  return `https://wa.me/${phone}?text=${message}`
}
</script>

<template>
  <SectionPaper id="confirmar-asistencia">
    <h2 class="text-center font-display text-3xl leading-tight text-rose-500 sm:text-4xl">
      Confirma tu asistencia
    </h2>
    <p class="mt-5 text-center font-sans text-base leading-relaxed text-slate-700">
      Para nosotros es muy importante saber si podrás acompañarnos, así podremos preparar tu lugar con mucho
      cariño y organizar cada detalle de esta noche tan especial. Por favor haznos saber lo antes posible quienes podrán asistir.
    </p>
    <p class="mt-6 text-center font-script text-2xl text-indigo-900">
      ¡Tu presencia hará este día aún más bonito!
    </p>

    <div class="mt-8 grid gap-3 sm:grid-cols-2">
      <a
        v-for="contact in whatsappContacts"
        :key="contact.phone"
        :href="whatsappUrl(contact.phone)"
        target="_blank"
        rel="noopener noreferrer"
        class="group rounded-3xl border border-emerald-200/80 bg-emerald-50/80 px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100/80 hover:shadow-md"
      >
        <span class="block font-sans text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700/80">
          Confirmar con
        </span>
        <span class="mt-1 block font-elegant text-2xl font-semibold italic text-slate-800">
          {{ contact.name }}
        </span>
        <span class="mt-1 block font-sans text-sm font-semibold text-emerald-800">
          WhatsApp {{ contact.displayPhone }}
        </span>
      </a>
    </div>
  </SectionPaper>
</template>
