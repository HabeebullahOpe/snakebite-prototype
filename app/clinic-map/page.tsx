'use client'

import { useLanguage } from '@/lib/hooks/useLanguage'
import { clinics } from '@/lib/data/clinics'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Phone, Navigation } from 'lucide-react'

export default function ClinicMapPage() {
  const { t, language } = useLanguage()
  const router = useRouter()

  return (
    <main className="min-h-screen bg-[#F3EBD9] p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6 pt-4">
          <button
            onClick={() => router.back()}
            className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft size={20} className="text-[#1B2A4A]" />
          </button>
          <h1 className="font-heading text-2xl font-bold text-[#1B2A4A]">
            Nearby Clinics
          </h1>
        </div>

        <div className="space-y-4">
          {clinics.map((clinic, index) => (
            <motion.div
              key={clinic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-lg border border-[#E5D9C4]"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#1B2A4A]/5 rounded-lg">
                  <MapPin size={20} className="text-[#1B2A4A]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-[#1B2A4A]">
                    {language === 'yo' ? clinic.nameYoruba : clinic.name}
                  </h3>
                  <p className="text-[#1B2A4A]/60 text-sm">{clinic.address}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      clinic.antivenomStock === 'Available' 
                        ? 'bg-[#2F6B4F]/20 text-[#2F6B4F]'
                        : clinic.antivenomStock === 'Low'
                        ? 'bg-[#D9A441]/20 text-[#C4902A]'
                        : 'bg-[#E4572E]/20 text-[#E4572E]'
                    }`}>
                      {t(`clinic.stock.${clinic.antivenomStock.toLowerCase()}`)}
                    </span>
                    <button
                      onClick={() => window.open(`tel:${clinic.phone}`)}
                      className="text-[#1B2A4A]/60 hover:text-[#1B2A4A] transition-colors"
                    >
                      <Phone size={16} />
                    </button>
                  </div>
                </div>
                <button className="p-2 bg-[#1B2A4A] text-white rounded-xl hover:bg-[#2A3D6B] transition-colors">
                  <Navigation size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}