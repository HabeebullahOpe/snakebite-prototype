'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAlerts } from '@/lib/hooks/useAlerts'
import { useLanguage } from '@/lib/hooks/useLanguage'
import { motion } from 'framer-motion'
import { 
  Bell, MapPin, Clock, Phone, CheckCircle, 
  XCircle, Navigation, Users, AlertTriangle 
} from 'lucide-react'

export default function ResponderDashboard() {
  const { alerts, updateAlert } = useAlerts()
  const { t } = useLanguage()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active')

  const activeAlerts = alerts.filter(a => a.status !== 'resolved')
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved')

  const acceptAlert = (alertId: string) => {
    updateAlert(alertId, {
      status: 'in-transit',
      responderId: 'resp-1',
    })
  }

  const declineAlert = (alertId: string) => {
    // Remove from responder's view
    console.log('Declined alert:', alertId)
  }

  return (
    <main className="min-h-screen bg-[#F3EBD9] p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1B2A4A]">
              Responder Dashboard
            </h1>
            <p className="text-[#1B2A4A]/60 text-sm">
              Community Emergency Response
            </p>
          </div>
          <div className="w-3 h-3 bg-[#2F6B4F] rounded-full animate-pulse" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'active'
                ? 'bg-[#1B2A4A] text-white shadow-lg'
                : 'bg-white text-[#1B2A4A] hover:bg-[#E5D9C4]'
            }`}
          >
            Active ({activeAlerts.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'history'
                ? 'bg-[#1B2A4A] text-white shadow-lg'
                : 'bg-white text-[#1B2A4A] hover:bg-[#E5D9C4]'
            }`}
          >
            History ({resolvedAlerts.length})
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {activeTab === 'active' && activeAlerts.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <CheckCircle className="mx-auto text-[#2F6B4F] mb-3" size={48} />
              <p className="font-heading font-semibold text-[#1B2A4A]">
                No Active Alerts
              </p>
              <p className="text-sm text-[#1B2A4A]/60 mt-1">
                You'll be notified when someone needs help
              </p>
            </div>
          )}

          {activeTab === 'active' && activeAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-lg border-2 border-[#E4572E]/20"
            >
              {/* Alert Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#E4572E]/10 rounded-lg">
                    <AlertTriangle className="text-[#E4572E]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#1B2A4A]">
                      Snakebite Emergency
                    </h3>
                    <p className="text-xs text-[#1B2A4A]/60">
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  alert.status === 'pending'
                    ? 'bg-[#D9A441]/20 text-[#C4902A]'
                    : alert.status === 'clinic-confirmed'
                    ? 'bg-[#2F6B4F]/20 text-[#2F6B4F]'
                    : 'bg-[#1B2A4A]/20 text-[#1B2A4A]'
                }`}>
                  {alert.status.replace('-', ' ')}
                </span>
              </div>

              {/* Location */}
              <div className="bg-[#F3EBD9] rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="text-[#E4572E]" size={16} />
                  <span className="text-sm font-medium text-[#1B2A4A]">
                    Victim Location
                  </span>
                </div>
                <p className="text-sm text-[#1B2A4A]/70">
                  Lat: {alert.victimLat.toFixed(4)}, Lng: {alert.victimLng.toFixed(4)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => acceptAlert(alert.id)}
                  className="flex-1 py-3 bg-[#2F6B4F] text-white rounded-xl font-medium text-sm hover:bg-[#1F4A35] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Accept
                </button>
                <button
                  onClick={() => declineAlert(alert.id)}
                  className="flex-1 py-3 bg-white border-2 border-[#1B2A4A]/20 text-[#1B2A4A] rounded-xl font-medium text-sm hover:bg-[#1B2A4A]/5 transition-all flex items-center justify-center gap-2"
                >
                  <XCircle size={18} />
                  Decline
                </button>
                <button
                  onClick={() => router.push(`/track/${alert.id}`)}
                  className="p-3 bg-[#1B2A4A] text-white rounded-xl hover:bg-[#2A3D6B] transition-all"
                >
                  <Navigation size={18} />
                </button>
              </div>
            </motion.div>
          ))}

          {activeTab === 'history' && resolvedAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white/60 rounded-2xl p-4 shadow border border-[#E5D9C4]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1B2A4A]">
                    Case Resolved
                  </p>
                  <p className="text-xs text-[#1B2A4A]/60">
                    {new Date(alert.resolvedAt || alert.createdAt).toLocaleString()}
                  </p>
                </div>
                <CheckCircle className="text-[#2F6B4F]" size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}