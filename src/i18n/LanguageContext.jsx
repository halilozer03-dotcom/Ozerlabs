import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'ozerlabs-lang'
const SUPPORTED = ['fr', 'en', 'tr']

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED.includes(stored)) return stored
  const browserLang = (navigator.language || 'fr').slice(0, 2)
  return SUPPORTED.includes(browserLang) ? browserLang : 'fr'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = { lang, setLang, t: translations[lang] }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
