'use client'

import { useLanguage } from '@/lib/hooks/useLanguage'
import { motion } from 'framer-motion'

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="bg-sand-dark rounded-xl p-1 inline-flex shadow-inner">
      <motion.button
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          language === 'en' 
            ? 'bg-indigo-deep text-white shadow-lg' 
            : 'text-indigo-deep hover:text-indigo'
        }`}
        onClick={() => setLanguage('en')}
        whileTap={{ scale: 0.95 }}
      >
        {t('language.english')}
      </motion.button>
      <motion.button
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          language === 'yo' 
            ? 'bg-indigo-deep text-white shadow-lg' 
            : 'text-indigo-deep hover:text-indigo'
        }`}
        onClick={() => setLanguage('yo')}
        whileTap={{ scale: 0.95 }}
      >
        {t('language.yoruba')}
      </motion.button>
    </div>
  )
}