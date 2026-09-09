'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { SOSButton } from '@/components/ui/SOSButton'
import { LocationSimulator } from '@/components/LocationSimulator'
import { motion } from 'framer-motion'
import { BookOpen, MapPin } from 'lucide-react'

export default function HomeScreen() {
  const { t } = useLanguage()
  const router = useRouter()
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  return (
    <main className="min-h-screen bg-[#F3EBD9] p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6 pt-4"
        >
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1B2A4A]">
              {t('app.title')}
            </h1>
            <p className="text-[#1B2A4A]/60 text-sm">
              {t('app.subtitle')}
            </p>
          </div>
          <LanguageToggle />
        </motion.div>

        {/* SOS Button - Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center py-8"
        >
          <SOSButton />
        </motion.div>

        {/* Location Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <LocationSimulator onLocationSelect={(lat, lng) => setLocation({ lat, lng })} />
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => router.push('/first-aid')}
            className="bg-white rounded-2xl p-4 shadow-lg border border-[#E5D9C4] hover:shadow-xl transition-all text-left"
          >
            <BookOpen className="text-[#D9A441] mb-2" size={24} />
            <p className="font-heading font-semibold text-[#1B2A4A] text-sm">
              {t('firstaid.title')}
            </p>
          </button>
          
          <button
            onClick={() => router.push('/clinic-map')}
            className="bg-white rounded-2xl p-4 shadow-lg border border-[#E5D9C4] hover:shadow-xl transition-all text-left"
          >
            <MapPin className="text-[#2F6B4F] mb-2" size={24} />
            <p className="font-heading font-semibold text-[#1B2A4A] text-sm">
              Find Clinics
            </p>
          </button>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-[#1B2A4A]/30 text-xs mt-8">
          {t('app.subtitle')} • Osun State
        </p>
      </div>
    </main>
  )
}