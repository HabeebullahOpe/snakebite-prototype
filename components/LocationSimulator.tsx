'use client'

import { useState } from 'react'
import { simulatedLocations } from '@/lib/data/clinics'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useLanguage } from '@/lib/hooks/useLanguage'

interface LocationSimulatorProps {
  onLocationSelect: (lat: number, lng: number) => void
}

export function LocationSimulator({ onLocationSelect }: LocationSimulatorProps) {
  const [selected, setSelected] = useState<string>('osogbo')
  const { t } = useLanguage()

  const locations = [
    { id: 'osogbo', ...simulatedLocations.osogbo },
    { id: 'ede', ...simulatedLocations.ede },
    { id: 'between', ...simulatedLocations.between },
  ]

  const handleSelect = (id: string) => {
    setSelected(id)
    const loc = locations.find(l => l.id === id)
    if (loc) {
      onLocationSelect(loc.lat, loc.lng)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-sand-dark">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="text-gold" size={20} />
        <span className="font-heading font-semibold text-indigo-deep">
          {t('location.simulate')}
        </span>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {locations.map((loc) => (
          <motion.button
            key={loc.id}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selected === loc.id
                ? 'bg-indigo-deep text-white shadow-lg'
                : 'bg-sand text-indigo-deep hover:bg-sand-dark'
            }`}
            onClick={() => handleSelect(loc.id)}
            whileTap={{ scale: 0.95 }}
          >
            {loc.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}