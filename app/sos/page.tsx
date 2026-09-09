'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { findNearestClinic, simulatedLocations } from '@/lib/data/clinics'
import { motion } from 'framer-motion'
import { CheckCircle, Phone, Clock, MapPin, ArrowLeft } from 'lucide-react'

interface Clinic {
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

export default function SOSConfirmationPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [matchedClinic, setMatchedClinic] = useState<Clinic | null>(null)
  const [eta, setEta] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate finding nearest clinic
    const location = simulatedLocations.osogbo
    const nearest = findNearestClinic(location.lat, location.lng)
    
    if (nearest && nearest.length > 0) {
      setMatchedClinic(nearest[0] as Clinic)
      
      // Calculate ETA (simulate 5-15 minutes)
      const minutes = Math.floor(Math.random() * 10) + 5
      const now = new Date()
      now.setMinutes(now.getMinutes() + minutes)
      setEta(now.toLocaleTimeString('en-NG', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }))
    }
    
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1B2A4A] flex items-center justify-center p-4">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          <p className="mt-4 text-white/70">Loading emergency response...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#1B2A4A] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="inline-flex p-4 bg-[#2F6B4F]/10 rounded-full mb-4">
            <CheckCircle className="text-[#2F6B4F]" size={48} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#1B2A4A]">
            {t('sos.confirmed')}
          </h2>
          <p className="text-[#1B2A4A]/60 text-sm">
            Alert has been sent to the nearest clinic
          </p>
        </div>

        {matchedClinic && (
          <div className="bg-[#F3EBD9] rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#E4572E] mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-[#1B2A4A]">
                  {language === 'yo' ? matchedClinic.nameYoruba : matchedClinic.name}
                </h3>
                <p className="text-[#1B2A4A]/60 text-sm">
                  {matchedClinic.address}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-sm text-[#1B2A4A]/70">
                    <Clock size={14} />
                    {matchedClinic.distance?.toFixed(1)}km
                  </span>
                  <span className="flex items-center gap-1 text-sm text-[#1B2A4A]/70">
                    <Clock size={14} />
                    ETA: {eta}
                  </span>
                </div>
                <div className="mt-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    matchedClinic.antivenomStock === 'Available' 
                      ? 'bg-[#2F6B4F]/20 text-[#2F6B4F]'
                      : matchedClinic.antivenomStock === 'Low'
                      ? 'bg-[#D9A441]/20 text-[#C4902A]'
                      : 'bg-[#E4572E]/20 text-[#E4572E]'
                  }`}>
                    {t(`clinic.stock.${matchedClinic.antivenomStock.toLowerCase()}`)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => window.open(`tel:${matchedClinic?.phone || '08031234567'}`)}
            className="w-full px-6 py-4 bg-[#1B2A4A] text-white font-heading font-semibold rounded-xl hover:bg-[#2A3D6B] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            {t('sos.call')}
          </button>
          
          <button
            onClick={() => router.push('/home')}
            className="w-full px-6 py-4 bg-transparent text-[#1B2A4A] border-2 border-[#1B2A4A] font-heading font-semibold rounded-xl hover:bg-[#1B2A4A]/5 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </motion.div>
    </main>
  )
}