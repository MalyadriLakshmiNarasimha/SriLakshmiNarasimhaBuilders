import { createContext, useContext, useMemo, useState } from 'react'

const translations = {
  en: {
    Home: 'Home', About: 'About', Projects: 'Projects', Gallery: 'Gallery', Blog: 'Blog', Contact: 'Contact', Search: 'Search', Compare: 'Compare',
    Language: 'Language', Telugu: 'తెలుగు', English: 'English',
    'Building Dreams Into Reality': 'Building Dreams Into Reality',
    'Browse Projects': 'Browse Projects', 'Contact Us': 'Contact Us',
  },
  te: {
    Home: 'హోమ్', About: 'మా గురించి', Projects: 'ప్రాజెక్టులు', Gallery: 'గ్యాలరీ', Blog: 'బ్లాగ్', Contact: 'సంప్రదించండి', Search: 'శోధన', Compare: 'పోల్చండి',
    Language: 'భాష', Telugu: 'తెలుగు', English: 'English',
    'Building Dreams Into Reality': 'కలలను నిజం చేస్తూ',
    'Browse Projects': 'ప్రాజెక్టులను చూడండి', 'Contact Us': 'మమ్మల్ని సంప్రదించండి',
  },
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('slnb-language') || 'en')
  const value = useMemo(() => ({
    language,
    setLanguage: (next) => { localStorage.setItem('slnb-language', next); setLanguage(next) },
    t: (key) => translations[language]?.[key] || translations.en[key] || key,
  }), [language])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  return useContext(I18nContext)
}
