'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { EmergencyAlert, CommunityResponder } from '@/lib/data/clinics'

interface AlertContextType {
  alerts: EmergencyAlert[]
  currentAlert: EmergencyAlert | null
  createAlert: (alert: EmergencyAlert) => void
  updateAlert: (id: string, updates: Partial<EmergencyAlert>) => void
  getAlert: (id: string) => EmergencyAlert | undefined
  clearCurrentAlert: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)

  const createAlert = (alert: EmergencyAlert) => {
    setAlerts(prev => [...prev, alert])
    setCurrentAlert(alert)
  }

  const updateAlert = (id: string, updates: Partial<EmergencyAlert>) => {
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updates } : a))
    )
    if (currentAlert?.id === id) {
      setCurrentAlert(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const getAlert = (id: string) => alerts.find(a => a.id === id)

  const clearCurrentAlert = () => setCurrentAlert(null)

  return (
    <AlertContext.Provider value={{
      alerts,
      currentAlert,
      createAlert,
      updateAlert,
      getAlert,
      clearCurrentAlert,
    }}>
      {children}
    </AlertContext.Provider>
  )
}

export function useAlerts() {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider')
  }
  return context
}