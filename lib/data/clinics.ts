export interface Clinic {
  id: string
  name: string
  nameYoruba: string
  type: string
  address: string
  lat: number
  lng: number
  phone: string
  antivenomStock: 'Available' | 'Low' | 'Unavailable'
  distance?: number
}

export const clinics: Clinic[] = [
  {
    id: '1',
    name: 'Osogbo State Hospital',
    nameYoruba: 'Ile-iwosan Ipinle Osogbo',
    type: 'General Hospital',
    address: 'Abere, Osogbo, Osun State',
    lat: 7.7833,
    lng: 4.5667,
    phone: '0803-456-7890',
    antivenomStock: 'Available',
  },
  {
    id: '2',
    name: 'LAUTECH Teaching Hospital Annex',
    nameYoruba: 'Ile-iwosan Oluko LAUTECH',
    type: 'Teaching Hospital',
    address: 'Old Garage, Osogbo, Osun State',
    lat: 7.7900,
    lng: 4.5500,
    phone: '0805-678-9012',
    antivenomStock: 'Available',
  },
  {
    id: '3',
    name: 'Ede General Hospital',
    nameYoruba: 'Ile-iwosan Gbogbo Ede',
    type: 'General Hospital',
    address: 'Oke-Ola, Ede, Osun State',
    lat: 7.7333,
    lng: 4.4333,
    phone: '0807-890-1234',
    antivenomStock: 'Low',
  },
  {
    id: '4',
    name: 'Baptist Medical Centre',
    nameYoruba: 'Ile-iwosan Baptisti',
    type: 'Private Clinic',
    address: 'Oja Oba, Ede, Osun State',
    lat: 7.7400,
    lng: 4.4400,
    phone: '0809-012-3456',
    antivenomStock: 'Unavailable',
  },
  {
    id: '5',
    name: 'Osogbo Primary Health Centre',
    nameYoruba: 'Ile-iwosan Alakobere Osogbo',
    type: 'Health Center',
    address: 'Oke-Baale, Osogbo, Osun State',
    lat: 7.7950,
    lng: 4.5600,
    phone: '0811-234-5678',
    antivenomStock: 'Low',
  },
  {
    id: '6',
    name: 'Oke-Ola Health Center',
    nameYoruba: 'Ile-iwosan Oke-Ola',
    type: 'Health Center',
    address: 'Oke-Ola, Ede, Osun State',
    lat: 7.7350,
    lng: 4.4350,
    phone: '0813-456-7890',
    antivenomStock: 'Available',
  },
  {
    id: '7',
    name: 'Redemption Clinic',
    nameYoruba: 'Ile-iwosan Irapada',
    type: 'Private Clinic',
    address: 'Station Road, Osogbo, Osun State',
    lat: 7.7880,
    lng: 4.5550,
    phone: '0815-678-9012',
    antivenomStock: 'Available',
  },
  {
    id: '8',
    name: 'Ede Maternity & Children Hospital',
    nameYoruba: 'Ile-iwosan Aboyun ati Awon Omo Ede',
    type: 'General Hospital',
    address: 'Ijebu Road, Ede, Osun State',
    lat: 7.7280,
    lng: 4.4450,
    phone: '0817-890-1234',
    antivenomStock: 'Unavailable',
  },
]

export const simulatedLocations = {
  osogbo: { lat: 7.7833, lng: 4.5667, label: 'Osogbo' },
  ede: { lat: 7.7333, lng: 4.4333, label: 'Ede' },
  between: { lat: 7.7583, lng: 4.5000, label: 'Road between Osogbo & Ede' },
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export function findNearestClinic(
  lat: number,
  lng: number,
  preferAvailable: boolean = true
): Clinic[] {
  const withDistance = clinics.map(clinic => ({
    ...clinic,
    distance: calculateDistance(lat, lng, clinic.lat, clinic.lng)
  }))

  let sorted = withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))

  if (preferAvailable) {
    const available = sorted.filter(c => c.antivenomStock === 'Available')
    const lowStock = sorted.filter(c => c.antivenomStock === 'Low')
    const unavailable = sorted.filter(c => c.antivenomStock === 'Unavailable')
    sorted = [...available, ...lowStock, ...unavailable]
  }

  return sorted
}

// Add to existing file

export interface CommunityResponder {
  id: string
  name: string
  phone: string
  type: 'Medical' | 'Driver' | 'General'
  lat: number
  lng: number
  available: boolean
  vehicle?: 'Car' | 'Keke' | 'Bus' | 'Motorcycle' | 'None'
  distance?: number
}

export interface EmergencyAlert {
  id: string
  victimLat: number
  victimLng: number
  victimName?: string
  victimPhone?: string
  status: 'pending' | 'clinic-confirmed' | 'transport-dispatched' | 'in-transit' | 'resolved'
  createdAt: string
  confirmedAt?: string
  dispatchedAt?: string
  resolvedAt?: string
  clinicId?: string
  responderId?: string
  driverId?: string
  notes?: string
}

// Mock community responders
export const communityResponders: CommunityResponder[] = [
  {
    id: 'resp-1',
    name: 'Dr. Adebayo Ogundipe',
    phone: '0803-111-2222',
    type: 'Medical',
    lat: 7.7850,
    lng: 4.5700,
    available: true,
    vehicle: 'Car',
  },
  {
    id: 'resp-2',
    name: 'Nurse Funke Adeleke',
    phone: '0805-333-4444',
    type: 'Medical',
    lat: 7.7800,
    lng: 4.5600,
    available: true,
    vehicle: 'None',
  },
  {
    id: 'resp-3',
    name: 'Mr. Tunde Bakare (Driver)',
    phone: '0807-555-6666',
    type: 'Driver',
    lat: 7.7900,
    lng: 4.5650,
    available: true,
    vehicle: 'Bus',
  },
  {
    id: 'resp-4',
    name: 'Mr. Segun Ojo (Keke)',
    phone: '0809-777-8888',
    type: 'Driver',
    lat: 7.7750,
    lng: 4.5500,
    available: true,
    vehicle: 'Keke',
  },
  {
    id: 'resp-5',
    name: 'Mrs. Bola Adeyemi',
    phone: '0811-999-0000',
    type: 'General',
    lat: 7.7700,
    lng: 4.5450,
    available: true,
    vehicle: 'None',
  },
  {
    id: 'resp-6',
    name: 'Mr. Kunle Olawale (Driver)',
    phone: '0813-222-3333',
    type: 'Driver',
    lat: 7.7600,
    lng: 4.5300,
    available: true,
    vehicle: 'Car',
  },
]

export function findNearbyResponders(
  lat: number,
  lng: number,
  radiusKm: number = 5
): CommunityResponder[] {
  return communityResponders
    .map(responder => ({
      ...responder,
      distance: calculateDistance(lat, lng, responder.lat, responder.lng)
    }))
    .filter(r => r.distance! <= radiusKm && r.available)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
}