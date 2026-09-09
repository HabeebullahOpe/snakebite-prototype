'use client'

import { useLanguage } from '@/lib/hooks/useLanguage'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

export default function FirstAidPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const steps = [
    { icon: Shield, key: 'step1', color: 'forest' },
    { icon: Shield, key: 'step2', color: 'forest' },
    { icon: Shield, key: 'step3', color: 'forest' },
    { icon: AlertTriangle, key: 'step4', color: 'coral' },
    { icon: AlertTriangle, key: 'step5', color: 'coral' },
    { icon: CheckCircle, key: 'step6', color: 'gold' },
  ]

  const colorClasses = {
    forest: 'bg-[#2F6B4F]/10 text-[#2F6B4F] border-[#2F6B4F]/20',
    coral: 'bg-[#E4572E]/10 text-[#E4572E] border-[#E4572E]/20',
    gold: 'bg-[#D9A441]/10 text-[#D9A441] border-[#D9A441]/20',
  }

  return (
    <main className="min-h-screen bg-[#F3EBD9] p-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6 pt-4"
        >
          <button
            onClick={() => router.back()}
            className="p-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft size={20} className="text-[#1B2A4A]" />
          </button>
          <h1 className="font-heading text-2xl font-bold text-[#1B2A4A]">
            {t('firstaid.title')}
          </h1>
        </motion.div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-4 shadow-lg border ${colorClasses[step.color as keyof typeof colorClasses]}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${colorClasses[step.color as keyof typeof colorClasses]}`}>
                  <step.icon size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1B2A4A]/40">
                    Step {index + 1}
                  </div>
                  <p className="font-heading text-[#1B2A4A]">
                    {t(`firstaid.${step.key}`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 bg-[#E4572E]/10 border-2 border-[#E4572E]/30 rounded-2xl p-4"
        >
          <p className="text-sm text-[#C94A1F] font-medium text-center">
            ⚠️ Remember: Do not wait for symptoms to develop. 
            Get to a hospital immediately after a snakebite.
          </p>
        </motion.div>
      </div>
    </main>
  )
}