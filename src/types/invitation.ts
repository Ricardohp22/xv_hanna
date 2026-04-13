export type RsvpStatus = 'pendiente' | 'confirmado' | 'rechazado'

export type VenueType = 'misa' | 'fiesta'

export interface Family {
  id: number
  family_name: string
  contact_phone: string | null
  contact_email: string | null
}

export interface EventRow {
  id: number
  name: string
  description: string | null
  event_date: string
}

export interface VenueRow {
  id: number
  name: string | null
  address: string | null
  type: VenueType
  start_time: string | null
  end_time: string | null
}

export interface SponsorRow {
  id: number
  name: string
  role: string | null
}

export interface ScheduleRow {
  id: number
  title: string | null
  description: string | null
  start_time: string | null
  end_time: string | null
}

export interface GuestRow {
  id: number
  name: string
  is_primary: boolean
  is_additional: boolean
  rsvp_status: RsvpStatus
}

export interface CarouselSlide {
  image: string
  text: string
}

export interface InvitationBundle {
  family: Family
  event: EventRow | null
  venues: VenueRow[]
  sponsors: SponsorRow[]
  schedule: ScheduleRow[]
  guests: GuestRow[]
  extraTicketQuantity: number
  carousel: { slides: CarouselSlide[] }
}
