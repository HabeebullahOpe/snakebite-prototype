'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'en' | 'yo'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    'app.title': 'SnakeAid',
    'app.subtitle': 'Emergency Snakebite Response',
    'sos.button': 'SOS Emergency',
    'sos.sending': 'Sending Alert...',
    'sos.confirmed': 'Alert Sent!',
    'sos.eta': 'Estimated arrival',
    'sos.clinic': 'Nearest Clinic',
    'sos.distance': 'Distance',
    'sos.call': 'Call Clinic',
    'firstaid.title': 'First Aid Guide',
    'firstaid.step1': 'Keep the victim calm and still',
    'firstaid.step2': 'Immobilize the bitten limb',
    'firstaid.step3': 'Remove tight clothing/jewelry',
    'firstaid.step4': 'DO NOT apply tourniquet',
    'firstaid.step5': 'DO NOT cut or suck the wound',
    'firstaid.step6': 'Get to a hospital immediately',
    'location.simulate': 'Simulate Location',
    'location.current': 'Current Location',
    'clinic.stock.available': '✓ Antivenom Available',
    'clinic.stock.low': '⚠ Low Stock',
    'clinic.stock.unavailable': '✗ No Antivenom',
    'language.selector': 'Choose Language',
    'language.english': 'English',
    'language.yoruba': 'Yorùbá',
  },
  yo: {
    'app.title': 'Irani-ajo Ejo',
    'app.subtitle': 'Iranlọwọ Pajawiri Fun Ejo',
    'sos.button': 'SOS Pajawiri',
    'sos.sending': 'Nfi Iranlọwọ Ránṣẹ...',
    'sos.confirmed': 'Iranlọwọ Ti Rán!',
    'sos.eta': 'Akoko Dide',
    'sos.clinic': 'Ile-iwosan Tó Súnmọ́',
    'sos.distance': 'Ijinna',
    'sos.call': 'Pe Ile-iwosan',
    'firstaid.title': 'Itọsọna Iranlọwọ Akọkọ',
    'firstaid.step1': 'Jẹ́ kí ẹni tó jẹ́ ejo balẹ̀',
    'firstaid.step2': 'Dẹ́kun gbigbe ẹsẹ̀ tàbí ọwọ́ tó jẹ́',
    'firstaid.step3': 'Yọ aṣọ tàbí ohun ọṣọ tó fẹ́ mú kuro',
    'firstaid.step4': 'MÁ ṢE lo okun tó lágbára',
    'firstaid.step5': 'MÁ ṢE ge tàbí mu ọgbẹ́ náà',
    'firstaid.step6': 'Lọ sí ile-iwosan kíákíá',
    'location.simulate': 'Ṣe Àpèrẹ Ipo',
    'location.current': 'Ipo Lọ́wọ́lọ́wọ́',
    'clinic.stock.available': '✓ Oògùn Ejo Wà',
    'clinic.stock.low': '⚠ Oògùn Kò Pọ̀',
    'clinic.stock.unavailable': '✗ Kò Sí Oògùn',
    'language.selector': 'Yan Èdè',
    'language.english': 'Gẹ̀ẹ́sì',
    'language.yoruba': 'Yorùbá',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}