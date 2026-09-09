'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './Button'
import { AlertCircle, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/hooks/useLanguage'

export function SOSButton() {
  const [isPressed, setIsPressed] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const router = useRouter()
  const { t } = useLanguage()

  const handleSOS = () => {
    setIsPressed(true)
    let count = 3
    setCountdown(count)
    
    const interval = setInterval(() => {
      count -= 1
      setCountdown(count)
      
      if (count === 0) {
        clearInterval(interval)
        router.push('/sos')
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="relative"
        initial={false}
        animate={isPressed ? 'pressed' : 'idle'}
      >
        {!isPressed && (
          <div className="absolute inset-0 sos-pulse rounded-full bg-coral/30" />
        )}
        
        <Button
          variant="sos"
          size="lg"
          className="w-48 h-48 rounded-full text-2xl font-bold shadow-2xl"
          onClick={handleSOS}
          disabled={isPressed}
        >
          <div className="flex flex-col items-center gap-2">
            <AlertCircle size={48} strokeWidth={2.5} />
            <span>{t('sos.button')}</span>
          </div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isPressed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-coral/10 backdrop-blur-sm border-2 border-coral rounded-2xl p-6 text-center max-w-sm"
          >
            <div className="text-4xl font-bold text-coral">{countdown}</div>
            <p className="text-indigo-deep/70 mt-2">
              {countdown > 0 
                ? 'Sending alert in...' 
                : 'Alert sent! Redirecting...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}