'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAlerts } from '@/lib/hooks/useAlerts'
import { findNearbyResponders, communityResponders } from '@/lib/data/clinics'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, MapPin, Clock, CheckCircle, XCircle, 
  Ambulance, Users, Send, Phone, AlertTriangle,
  Truck, Car
} from 'lucide-react'

export default function ClinicDashboard() {
  const { alerts, updateAlert } = useAlerts()
  const router = useRouter()
  const [dispatching, setDispatching] = useState<string | null>(null)
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null)

  const pendingAlerts = alerts.filter(a => a.status === 'pending' || a.status === 'clinic-confirmed')
  const activeAlerts = alerts.filter(a => a.status === 'transport-dispatched' || a.status === 'in-transit')

  const confirmEmergency = (alertId: string) => {
    updateAlert(alertId, {
      status: 'clinic-confirmed',
      confirmedAt: new Date().toISOString(),
    })
  }

  const dispatchTransport = (alertId: string) => {
    setDispatching(alertId)
    
    // Find nearby drivers
    const alert = alerts.find(a => a.id === alertId)
    if (!alert) return
    
    const drivers = findNearbyResponders(alert.victimLat, alert.victimLng, 10)
      .filter(r => r.type === 'Driver' && r.vehicle !== 'None')
    
    // Simulate dispatch
    setTimeout(() => {
      updateAlert(alertId, {
        status: 'transport-dispatched',
        dispatchedAt: new Date().toISOString(),
        driverId: drivers[0]?.id,
      })
      setDispatching(null)
      setDispatchSuccess(alertId)
      
      setTimeout(() => setDispatchSuccess(null), 3000)
    }, 2000)
  }

  const resolveCase = (alertId: string) => {
    updateAlert(alertId, {
      status: 'resolved',
      resolvedAt: new Date().toISOString(),
    })
  }

  return (
    <main className="min-h-screen bg-[#F3EBD9] p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#1B2A4A]">
              Clinic Dashboard
            </h1>
            <p className="text-[#1B2A4A]/60 text-sm">
              Emergency Response Center
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#2F6B4F] rounded-full animate-pulse" />
            <span className="text-xs text-[#1B2A4A]/60">Online</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
            <div className="text-2xl font-bold text-[#E4572E]">{pendingAlerts.length}</div>
            <div className="text-xs text-[#1B2A4A]/60">Pending</div>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
            <div className="text-2xl font-bold text-[#D9A441]">{activeAlerts.length}</div>
            <div className="text-xs text-[#1B2A4A]/60">Active</div>
          </div>
          <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
            <div className="text-2xl font-bold text-[#2F6B4F]">
              {alerts.filter(a => a.status === 'resolved').length}
            </div>
            <div className="text-xs text-[#1B2A4A]/60">Resolved</div>
          </div>
        </div>

        {/* Pending Alerts */}
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-[#1B2A4A] flex items-center gap-2">
            <Bell className="text-[#E4572E]" size={18} />
            Incoming Emergencies
          </h2>

          {pendingAlerts.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <CheckCircle className="mx-auto text-[#2F6B4F] mb-3" size={48} />
              <p className="font-heading font-semibold text-[#1B2A4A]">
                No Pending Emergencies
              </p>
              <p className="text-sm text-[#1B2A4A]/60 mt-1">
                All clear for now
              </p>
            </div>
          )}

          {pendingAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-2xl p-5 shadow-lg border-2 ${
                alert.status === 'clinic-confirmed'
                  ? 'border-[#2F6B4F]/30'
                  : 'border-[#E4572E]/30'
              }`}
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
                  alert.status === 'clinic-confirmed'
                    ? 'bg-[#2F6B4F]/20 text-[#2F6B4F]'
                    : 'bg-[#E4572E]/20 text-[#E4572E]'
                }`}>
                  {alert.status === 'clinic-confirmed' ? 'Confirmed' : 'New'}
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
              <div className="space-y-2">
                {alert.status === 'pending' && (
                  <button
                    onClick={() => confirmEmergency(alert.id)}
                    className="w-full py-3 bg-[#1B2A4A] text-white rounded-xl font-medium text-sm hover:bg-[#2A3D6B] transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Confirm Emergency & Notify Community
                  </button>
                )}

                {alert.status === 'clinic-confirmed' && (
                  <>
                    <button
                      onClick={() => dispatchTransport(alert.id)}
                      disabled={dispatching === alert.id}
                      className="w-full py-3 bg-[#E4572E] text-white rounded-xl font-medium text-sm hover:bg-[#C94A1F] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {dispatching === alert.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Dispatching...
                        </>
                      ) : (
                        <>
                          <Truck size={18} />
                          Dispatch Transport to Victim
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {dispatchSuccess === alert.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-[#2F6B4F]/10 border border-[#2F6B4F]/30 rounded-xl p-3"
                        >
                          <div className="flex items-center gap-2 text-[#2F6B4F]">
                            <CheckCircle size={16} />
                            <span className="text-sm font-medium">
                              Transport dispatched! Driver en route.
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(`tel:${alert.victimPhone || '08031234567'}`)}
                    className="flex-1 py-2 bg-white border-2 border-[#1B2A4A]/20 text-[#1B2A4A] rounded-xl font-medium text-sm hover:bg-[#1B2A4A]/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    Call Victim
                  </button>
                  <button
                    onClick={() => resolveCase(alert.id)}
                    className="flex-1 py-2 bg-white border-2 border-[#1B2A4A]/20 text-[#1B2A4A] rounded-xl font-medium text-sm hover:bg-[#1B2A4A]/5 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Resolve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Cases */}
        {activeAlerts.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="font-heading font-semibold text-[#1B2A4A] flex items-center gap-2">
              <Ambulance className="text-[#D9A441]" size={18} />
              Active Transport
            </h2>

            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-2xl p-5 shadow-lg border-2 border-[#D9A441]/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#1B2A4A]">
                    Case #{alert.id.slice(-6)}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#D9A441]/20 text-[#C4902A]">
                    In Transit
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1B2A4A]/70">
                  <Car size={16} />
                  <span>Driver en route to clinic</span>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => resolveCase(alert.id)}
                    className="w-full py-2 bg-[#2F6B4F] text-white rounded-xl font-medium text-sm hover:bg-[#1F4A35] transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Mark as Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}