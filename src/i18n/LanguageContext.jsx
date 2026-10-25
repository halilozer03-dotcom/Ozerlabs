import { createContext, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { translations } from './translations.js'
import { LANGS, langFromPath, localizePath, stripLang } from './routes.js'

const LanguageContext = createContext(null)

/* Anahtar v2: yalnızca kullanıcının dil seçicisine basması yazar (otomatik
   tespit yazmaz). Eski "ozerlabs-lang" her açılışta yazıldığı için seçim ile
   tahmin ayırt edilemiyordu, artık okunmuyor. */
export const STORAGE_KEY = 'ozerlabs-lang-v2'

/* Ülke → dil. Listede olmayan ülke İngilizce önerisi alır. Fransızca listesi:
   Fransa ve Fransızcanın resmî/yaygın olduğu komşular + Mağrip. */
const COUNTRY_LANG = {
  TR: 'tr',
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  LU: 'fr',
  MC: 'fr',
  MA: 'fr',
  DZ: 'fr',
  TN: 'fr',
}

export function readStoredLang() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return LANGS.includes(v) ? v : null
  } catch {
    return null // gizli sekme / depolama kapalı
  }
}

export function storeLang(code) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* depolama yoksa seçim yalnız bu gezinmede geçerli */
  }
}

export function browserLang() {
  if (typeof navigator === 'undefined') return null
  const code = (navigator.language || '').slice(0, 2).toLowerCase()
  return LANGS.includes(code) ? code : null
}

/* Ülkeyi kendi origin'imizden okuruz: Cloudflare her sitede /cdn-cgi/trace
   sunar, `loc=XX` satırı ziyaretçinin ülkesidir. Üçüncü taraf IP servisi
   yok, ziyaretçinin IP'si dışarı çıkmaz. Yerelde uç yok → null. */
export async function countryLang(signal) {
  const res = await fetch('/cdn-cgi/trace', { signal })
  if (!res.ok) return null
  const loc = (await res.text()).match(/^loc=([A-Z]{2})$/m)?.[1]
  return loc ? COUNTRY_LANG[loc] || 'en' : null
}

/**
 * DİL = ADRES. `/` fr, `/en` en, `/tr` tr (src/i18n/routes.js).
 *
 * Eskiden dil çalışma anında seçiliyordu (seçim > ülke > tarayıcı) ve tek
 * adreste üç dil vardı. Ölçülen sonuç: içerik ilk çizimden sonra dil
 * değiştiriyordu (CLS 0,179 / 0,222) ve hreflang kurulamıyordu. Artık
 * içerik adresin dilindedir; tercih edilen dil yalnızca ÖNERİ olarak
 * gösterilir (LangSuggest.jsx) — tek istisna, kullanıcının daha önce dil
 * seçicisiyle açıkça seçtiği dildir (App.jsx → StoredLangRedirect).
 */
export function LanguageProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = langFromPath(location.pathname)

  /** Aynı sayfanın başka dildeki adresi (ürün/yazı/bölüm korunur). */
  const pathFor = (code) => localizePath(stripLang(location.pathname), code)

  /* Açık seçim: kalıcıdır, aynı sayfanın o dildeki adresine gider. */
  const setLang = (code) => {
    if (!LANGS.includes(code)) return
    storeLang(code)
    if (code === lang) return
    navigate({ pathname: pathFor(code), search: location.search, hash: location.hash })
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = { lang, setLang, pathFor, t: translations[lang] }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

/** Dile göre yol üreticisi: `lp('/blog')` → `/en/blog`. */
export function useLocalePath() {
  const { lang } = useLanguage()
  return (path) => localizePath(path, lang)
}
