'use client'

import { useLanguage } from '@/lib/hooks/useLanguage'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'

export default function LanguageSelectionPage() {
  const { setLanguage, t } = useLanguage()
  const router = useRouter()

  const selectLanguage = (lang: 'en' | 'yo') => {
    setLanguage(lang)
    router.push('/home')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(to bottom, #1B2A4A, #2A3D6B)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-[#D9A441]/20 rounded-full mb-4">
            <Globe className="text-[#D9A441]" size={40} />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">
            {t('app.title')}
          </h1>
          <p className="text-white/70">
            {t('app.subtitle')}
          </p>
          <p className="text-white/50 text-sm mt-2">
            Osogbo & Ede LGAs, Osun State
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-white/80 text-center text-sm font-medium">
            {t('language.selector')}
          </p>
          <button
            className="w-full px-6 py-3 bg-[#D9A441] text-[#1B2A4A] font-heading font-semibold rounded-xl hover:bg-[#C4902A] transition-all shadow-lg"
            onClick={() => selectLanguage('en')}
          >
            🇬🇧 {t('language.english')}
          </button>
          <button
            className="w-full px-6 py-3 bg-transparent text-white border-2 border-white/30 font-heading font-semibold rounded-xl hover:bg-white/10 transition-all"
            onClick={() => selectLanguage('yo')}
          >
            🇳🇬 {t('language.yoruba')}
          </button>
        </div>

        <p className="text-white/30 text-xs text-center mt-6">
          Emergency response for snakebite victims
        </p>
      </motion.div>
    </main>
  )
}