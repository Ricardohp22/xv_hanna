import type { InvitationBundle } from '../types/invitation'

/**
 * Datos fijos de la invitación.
 * Edita este archivo para cambiar familia, evento, venues, padrinos,
 * cronograma, invitados, boletos extra y slides del carrusel.
 */
export const invitationData: InvitationBundle = {
  family: {
    id: 1,
    family_name: 'Querida familia',
    contact_phone: null,
    contact_email: null,
  },
  event: {
    id: 1,
    name: 'Hannah Getsemani',
    description: 'Celebración de XV años',
    event_date: '2026-07-18',
  },
  venues: [
    {
      id: 1,
      name: 'Parroquia de Nuestra Señora de San Juan de los Lagos',
      address: 'Av. León, esq. Av. Guanajuato, Col. Jardines del Moral',
      mapUrl: 'https://maps.app.goo.gl/Aw3fLtmJug4un1Yw6',
      type: 'misa',
      start_time: '17:00:00',
      end_time: null,
    },
    {
      id: 2,
      name: 'Salones Santa Clara (Salón 1)',
      address: 'Blvd. Torres Landa #1702-9, Col. Santa Clara',
      mapUrl: 'https://maps.app.goo.gl/PkHoxqygMnksyoT96',
      type: 'fiesta',
      start_time: '19:00:00',
      end_time: null,
    },
  ],
  parents: [
    { id: 1, name: 'Alma Erika Martínez Rodríguez', role: 'Mamá' },
    { id: 2, name: 'Rafael Pérez García', role: 'Papá' },
  ],
  sponsors: [
    { id: 1, name: 'Juan Carlos Martínez Rodríguez', role: 'Padrino de velacion' },
    { id: 2, name: 'Ana Julia Quiroga Medina', role: 'Madrina de velacion' },
  ],
  schedule: [
    {
      id: 1,
      title: 'Ceremonia religiosa',
      description: 'Empezamos dando gracias por este día tan especial. Lleguen con tiempo para acompañarnos con mucho cariño.',
      start_time: '2026-07-18T17:00:00',
      end_time: '2026-07-18T18:00:00',
    },
    {
      id: 2,
      title: 'Bienvenida al salón',
      description: 'Ya en el salón, vayan tomando lugar, saludando a la familia y preparándose para una noche llena de alegría.',
      start_time: '2026-07-18T19:00:00',
      end_time: null,
    },
    {
      id: 3,
      title: 'Entrada de la quinceañera',
      description: 'Llega el momento de recibir a Hanna con aplausos, sonrisas y toda la emoción que se merece.',
      start_time: '2026-07-18T19:30:00',
      end_time: null,
    },
    {
      id: 4,
      title: 'Cena',
      description: 'A disfrutar la comida y la buena compañía. Este es el momento perfecto para convivir y brindar en familia.',
      start_time: '2026-07-18T20:00:00',
      end_time: null,
    },
    {
      id: 5,
      title: 'Vals familiar',
      description: 'Un momento bonito y emotivo para compartir con quienes han sido parte de esta historia desde el corazón.',
      start_time: '2026-07-18T20:45:00',
      end_time: null,
    },
    {
      id: 6,
      title: 'Brindis',
      description: 'Levantemos la copa por Hanna, por su felicidad y por todos los recuerdos que vamos a crear esta noche.',
      start_time: '2026-07-18T21:15:00',
      end_time: null,
    },
    {
      id: 7,
      title: 'Baile y fiesta',
      description: 'Ahora sí, todos a la pista. Queremos ver a la familia bailando, riendo y disfrutando la noche al máximo.',
      start_time: '2026-07-18T21:00:00',
      end_time: null,
    },
    {
      id: 8,
      title: 'Pastel',
      description: 'Un momento dulce para cantar, tomar fotos y consentirnos un poquito antes de seguir la fiesta.',
      start_time: '2026-07-18T22:45:00',
      end_time: null,
    },
    {
      id: 9,
      title: 'Sorpresas y fotos',
      description: 'Entre baile y baile habrá momentos especiales para guardar recuerdos, abrazar fuerte y tomarnos muchas fotos.',
      start_time: '2026-07-18T23:00:00',
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
        text: 'Con amor, Hannah',
      },
    ],
  },
}
