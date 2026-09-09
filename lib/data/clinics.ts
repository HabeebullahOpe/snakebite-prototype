export interface Clinic {
  id: string
  name: string
  nameYoruba: string
  type: 'General Hospital' | 'Teaching Hospital' | 'Health Center' | 'Private Clinic'
  address: string
  lat: number
  lng: number
  phone: string
  antivenomStock: 'Available' | 'Low' | 'Unavailable'
  distance?: number // Will be calculated
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

// Simulate locations for testing
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
  // Haversine formula for distance in kilometers
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c // Distance in km
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

  // Sort by distance
  let sorted = withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))

  if (preferAvailable) {
    // Prioritize clinics with available antivenom
    const available = sorted.filter(c => c.antivenomStock === 'Available')
    const lowStock = sorted.filter(c => c.antivenomStock === 'Low')
    const unavailable = sorted.filter(c => c.antivenomStock === 'Unavailable')
    sorted = [...available, ...lowStock, ...unavailable]
  }

  return sorted
}