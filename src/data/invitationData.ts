import type { InvitationBundle } from '../types/invitation'

/**
 * Datos fijos de la invitación.
 * Edita este archivo para cambiar familia, evento, venues, padrinos,
 * cronograma, invitados, boletos extra y slides del carrusel.
 */
export const invitationData: InvitationBundle = {
  family: {
    id: 1,
    family_name: 'Familia e invitados especiales',
    contact_phone: null,
    contact_email: null,
  },
  event: {
    id: 1,
    name: 'Hanna',
    description: 'Celebración de XV años',
    event_date: '2026-07-25',
  },
  venues: [
    {
      id: 1,
      name: 'Parroquia por confirmar',
      address: 'Dirección de la misa por confirmar',
      type: 'misa',
      start_time: '18:00:00',
      end_time: null,
    },
    {
      id: 2,
      name: 'Salón de eventos por confirmar',
      address: 'Dirección de la recepción por confirmar',
      type: 'fiesta',
      start_time: '20:00:00',
      end_time: null,
    },
  ],
  sponsors: [
    { id: 1, name: 'Nombre del padrino 1', role: 'Padrinos de iglesia' },
    { id: 2, name: 'Nombre del padrino 2', role: 'Padrinos de anillo' },
    { id: 3, name: 'Nombre del padrino 3', role: 'Padrinos de ramo' },
    { id: 4, name: 'Nombre del padrino 4', role: 'Padrinos de brindis' },
  ],
  schedule: [
    {
      id: 1,
      title: 'Ceremonia religiosa',
      description: 'Acompáñanos a dar gracias por este momento tan especial.',
      start_time: '2026-07-25T18:00:00',
      end_time: '2026-07-25T19:00:00',
    },
    {
      id: 2,
      title: 'Recepción',
      description: 'Te esperamos para celebrar juntos con música, cena y baile.',
      start_time: '2026-07-25T20:00:00',
      end_time: null,
    },
    {
      id: 3,
      title: 'Vals',
      description: 'Un momento especial para compartir con familia y amigos.',
      start_time: '2026-07-25T21:30:00',
      end_time: null,
    },
  ],
  guests: [
    {
      id: 1,
      name: 'Invitado principal',
      is_primary: true,
      is_additional: false,
      rsvp_status: 'pendiente',
    },
  ],
  extraTicketQuantity: 0,
  carousel: {
    slides: [
      {
        image: '/carousel/slide-1.jpeg',
        text: 'Un día mágico que guardaré en el corazón para siempre',
      },
      {
        image: '/carousel/slide-2.jpg',
        text: 'Gracias por ser parte de esta historia',
      },
      {
        image: '/carousel/slide-3.jpg',
        text: 'Con amor, Hanna',
      },
    ],
  },
}
