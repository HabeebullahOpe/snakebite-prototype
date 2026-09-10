'use client'

import { useState } from 'react'
import { useAlerts } from '@/lib/hooks/useAlerts'
import { motion } from 'framer-motion'
import { 
  Truck, MapPin, CheckCircle, XCircle, Navigation,
  Clock, Phone, Car 
} from 'lucide-react'

export default function DriverDashboard() {
  const { alerts, updateAlert } = useAlerts()
  const [activeTab, setActiveTab] = useState<'requests' | 'history'>('requests')

  const transportRequests = alerts.filter(
    a => a.status === 'transport-dispatched' && !a.driverId
  )
  const myTrips = alerts.filter(a => a.driverId === 'resp-3')

  const acceptTrip = (alertId: string) => {
    updateAlert(alertId, {
      driverId: 'resp-3',
      status: 'in-transit',
    })
  }

  return (
    <main className="min-h-screen bg-[#F3EBD9] p-4">
      <div className="max-w-md mx-auto">
        <div className="pt-4 mb-6">
          <h1 className="font-heading text-2xl font-bold text-[#1B2A4A]">
            Driver Dashboard
          </h1>
          <p className="text-[#1B2A4A]/60 text-sm">
            Emergency Transport Services
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <Truck className="text-[#E4572E] mb-2" size={24} />
            <div className="text-2xl font-bold text-[#1B2A4A]">
              {transportRequests.length}
            </div>
            <div className="text-xs text-[#1B2A4A]/60">Pending Requests</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <CheckCircle className="text-[#2F6B4F] mb-2" size={24} />
            <div className="text-2xl font-bold text-[#1B2A4A]">
              {myTrips.length}
            </div>
            <div className="text-xs text-[#1B2A4A]/60">My Trips</div>
          </div>
        </div>

        {/* Requests */}
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-[#1B2A4A]">
            Transport Requests
          </h2>

          {transportRequests.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <Car className="mx-auto text-[#2F6B4F] mb-3" size={48} />
              <p className="font-heading font-semibold text-[#1B2A4A]">
                No Pending Requests
              </p>
              <p className="text-sm text-[#1B2A4A]/60 mt-1">
                You'll be notified when transport is needed
              </p>
            </div>
          )}

          {transportRequests.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-lg border-2 border-[#E4572E]/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#E4572E]/10 rounded-lg">
                    <Truck className="text-[#E4572E]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#1B2A4A]">
                      Transport Needed
                    </h3>
                    <p className="text-xs text-[#1B2A4A]/60">
                      {new Date(alert.dispatchedAt || alert.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F3EBD9] rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="text-[#E4572E]" size={16} />
                  <span className="text-sm font-medium text-[#1B2A4A]">
                    Pickup Location
                  </span>
                </div>
                <p className="text-sm text-[#1B2A4A]/70">
                  Lat: {alert.victimLat.toFixed(4)}, Lng: {alert.victimLng.toFixed(4)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => acceptTrip(alert.id)}
                  className="flex-1 py-3 bg-[#2F6B4F] text-white rounded-xl font-medium text-sm hover:bg-[#1F4A35] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Accept Trip
                </button>
                <button
                  onClick={() => window.open('tel:08031234567')}
                  className="p-3 bg-[#1B2A4A] text-white rounded-xl hover:bg-[#2A3D6B] transition-all"
                >
                  <Phone size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* My Trips */}
        {myTrips.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="font-heading font-semibold text-[#1B2A4A]">
              My Active Trips
            </h2>
            {myTrips.map((alert) => (
              <div
                key={alert.id}
                className="bg-white rounded-2xl p-5 shadow-lg border-2 border-[#D9A441]/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#1B2A4A]">
                    Trip #{alert.id.slice(-6)}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#D9A441]/20 text-[#C4902A]">
                    In Progress
                  </span>
                </div>
                <button
                  onClick={() => updateAlert(alert.id, { 
                    status: 'resolved',
                    resolvedAt: new Date().toISOString()
                  })}
                  className="w-full py-2 bg-[#2F6B4F] text-white rounded-xl font-medium text-sm hover:bg-[#1F4A35] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} />
                  Mark as Delivered
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}