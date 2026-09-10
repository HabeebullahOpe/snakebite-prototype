'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAlerts } from '@/lib/hooks/useAlerts'
import { motion } from 'framer-motion'
import { 
  MapPin, Clock, CheckCircle, Truck, Users, 
  Phone, ArrowLeft, Radio 
} from 'lucide-react'

const statusSteps = [
  { key: 'pending', label: 'Alert Sent', icon: Radio },
  { key: 'clinic-confirmed', label: 'Clinic Confirmed', icon: CheckCircle },
  { key: 'transport-dispatched', label: 'Transport Dispatched', icon: Truck },
  { key: 'in-transit', label: 'In Transit', icon: MapPin },
  { key: 'resolved', label: 'Resolved', icon: CheckCircle },
]

export default function TrackPage() {
  const params = useParams()
  const router = useRouter()
  const { getAlert } = useAlerts()
  const [alert, setAlert] = useState<any>(null)

  useEffect(() => {
    const found = getAlert(params.id as string)
    if (found) setAlert(found)
    
    // Refresh every 2 seconds to see updates
    const interval = setInterval(() => {
      const updated = getAlert(params.id as string)
      if (updated) setAlert(updated)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [params.id, getAlert])

  if (!alert) {
    return (
      <main className="min-h-screen bg-[#F3EBD9] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1B2A4A] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-[#1B2A4A]/70">Loading alert...</p>
        </div>
      </main>
    )
  }

  const currentStepIndex = statusSteps.findIndex(s => s.key === alert.status)

  return (
    <main className="min-h-screen bg-[#F3EBD9] p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-4">
          <button
            onClick={() => router.back()}
            className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft size={20} className="text-[#1B2A4A]" />
          </button>
          <div>
            <h1 className="font-heading text-xl font-bold text-[#1B2A4A]">
              Emergency Tracking
            </h1>
            <p className="text-[#1B2A4A]/60 text-xs">
              Case #{alert.id.slice(-6)}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="font-heading font-semibold text-[#1B2A4A] mb-4">
            Response Progress
          </h2>
          
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const Icon = step.icon
              const isComplete = index <= currentStepIndex
              const isCurrent = index === currentStepIndex

              return (
                <div key={step.key} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isComplete 
                      ? 'bg-[#2F6B4F] text-white' 
                      : 'bg-[#E5D9C4] text-[#1B2A4A]/40'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className={`font-medium ${
                      isComplete ? 'text-[#1B2A4A]' : 'text-[#1B2A4A]/40'
                    }`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-[#2F6B4F] mt-1 flex items-center gap-1"
                      >
                        <span className="w-2 h-2 bg-[#2F6B4F] rounded-full animate-pulse" />
                        Currently processing...
                      </motion.p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-2xl p-5 shadow-lg mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="text-[#E4572E]" size={18} />
            <h2 className="font-heading font-semibold text-[#1B2A4A]">
              Victim Location
            </h2>
          </div>
          <p className="text-sm text-[#1B2A4A]/70">
            Lat: {alert.victimLat.toFixed(4)}, Lng: {alert.victimLng.toFixed(4)}
          </p>
        </div>

        {/* Responders */}
        <div className="bg-[#2F6B4F]/10 border-2 border-[#2F6B4F]/30 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-[#2F6B4F]" size={18} />
            <h2 className="font-heading font-semibold text-[#2F6B4F]">
              Community Responders
            </h2>
          </div>
          <p className="text-sm text-[#1B2A4A]/70">
            3 responders notified and monitoring
          </p>
        </div>

        {/* Call Button */}
        <button
          onClick={() => window.open('tel:08031234567')}
          className="w-full px-6 py-4 bg-[#1B2A4A] text-white font-heading font-semibold rounded-xl hover:bg-[#2A3D6B] transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Phone size={20} />
          Call Emergency Line
        </button>
      </div>
    </main>
  )
}