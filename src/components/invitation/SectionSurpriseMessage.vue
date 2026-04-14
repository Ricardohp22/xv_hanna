<script setup lang="ts">
import { ref } from 'vue'
import SectionPaper from './SectionPaper.vue'
import { fetchJson } from '../../lib/api'

const props = defineProps<{
  familyId: number
}>()

const tab = ref<'texto' | 'audio' | 'video'>('texto')
const senderName = ref('')
const message = ref('')
const sending = ref(false)
const notice = ref<string | null>(null)
const error = ref<string | null>(null)

async function submitText() {
  notice.value = null
  error.value = null
  const s = senderName.value.trim()
  const m = message.value.trim()
  if (!s) {
    error.value = 'El nombre del remitente es obligatorio'
    return
  }
  if (!m) {
    error.value = 'Escribe un mensaje bonito para la quinceañera'
    return
  }
  sending.value = true
  try {
    await fetchJson(`/api/families/${props.familyId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ senderName: s, content: m }),
    })
    message.value = ''
    notice.value = '¡Tu mensaje fue enviado! Se guardará como un recuerdo muy especial.'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'No se pudo enviar'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <SectionPaper id="mensaje-sorpresa">
    <h2 class="text-center font-display text-3xl text-lilac-700 sm:text-4xl">
      Mensaje sorpresa para la Quinceañera
    </h2>
    <p class="mt-5 text-center font-sans text-sm leading-relaxed text-slate-700 sm:text-base">
      En esta sección podrás compartir un mensaje bonito para la quinceañera en esta nueva etapa de su vida:
      puedes escribirle un mensaje, un audio o un video. Ella lo verá el día de sus XV y se quedará como un
      recuerdo para toda la vida.
    </p>

    <div class="mt-8 flex justify-center gap-2 rounded-full bg-lilac-100 p-1 font-sans text-xs sm:text-sm">
      <button
        type="button"
        class="flex-1 rounded-full px-3 py-2 font-semibold transition sm:px-4"
        :class="tab === 'texto' ? 'bg-white text-lilac-800 shadow' : 'text-lilac-700'"
        @click="tab = 'texto'"
      >
        Mensaje
      </button>
      <button
        type="button"
        class="flex-1 rounded-full px-3 py-2 font-semibold transition sm:px-4"
        :class="tab === 'audio' ? 'bg-white text-lilac-800 shadow' : 'text-lilac-700'"
        @click="tab = 'audio'"
      >
        Audio
      </button>
      <button
        type="button"
        class="flex-1 rounded-full px-3 py-2 font-semibold transition sm:px-4"
        :class="tab === 'video' ? 'bg-white text-lilac-800 shadow' : 'text-lilac-700'"
        @click="tab = 'video'"
      >
        Video
      </button>
    </div>

    <label class="mt-8 block text-left">
      <span class="font-sans text-sm font-semibold text-lilac-800">Tu nombre (obligatorio)</span>
      <input
        v-model="senderName"
        type="text"
        maxlength="150"
        class="mt-2 w-full rounded-xl border border-lilac-200 bg-white px-3 py-2 font-sans text-sm outline-none ring-lilac-400 focus:ring-2"
        autocomplete="name"
      />
    </label>

    <div v-if="tab === 'texto'" class="mt-6">
      <label class="block text-left">
        <span class="font-sans text-sm font-semibold text-lilac-800">Tu mensaje</span>
        <textarea
          v-model="message"
          rows="6"
          class="mt-2 w-full rounded-2xl border border-lilac-200 bg-white px-3 py-3 font-sans text-sm leading-relaxed outline-none ring-lilac-400 focus:ring-2"
          maxlength="4000"
        />
      </label>
      <button
        type="button"
        class="mt-6 w-full rounded-full bg-lilac-600 py-3 font-sans text-sm font-semibold text-white transition hover:bg-lilac-500 disabled:opacity-50"
        :disabled="sending"
        @click="submitText"
      >
        {{ sending ? 'Enviando…' : 'Enviar mensaje' }}
      </button>
    </div>

    <div v-else class="mt-6 rounded-2xl border border-lilac-200/85 bg-white/75 p-5 text-left shadow-sm backdrop-blur-sm">
      <p class="font-sans text-sm leading-relaxed text-slate-700">
        Por ahora el servidor
        <span class="font-semibold">no almacena audio ni video</span>
        . Puedes grabar desde tu dispositivo como ensayo, pero el envío oficial estará disponible cuando
        habilitemos el almacenamiento seguro de archivos.
      </p>
      <p class="mt-3 font-sans text-sm text-slate-600">
        Mientras tanto, te invitamos a dejar tu mensaje escrito: es el que la quinceañera conservará en la
        base de datos.
      </p>
    </div>

    <p v-if="notice" class="mt-4 text-center font-sans text-sm text-emerald-700">{{ notice }}</p>
    <p v-if="error" class="mt-2 text-center font-sans text-sm text-red-600">{{ error }}</p>
  </SectionPaper>
</template>
