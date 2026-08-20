import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)
const SUPPORTED = ['fr', 'en', 'tr']

/* Anahtar v2: eskisi ("ozerlabs-lang") her açılışta otomatik yazılıyordu, bu
   yüzden "kullanıcı seçti" ile "tarayıcıdan tahmin edildi" ayırt edilemiyordu.
   Artık buraya YALNIZCA kullanıcının dil düğmesine basması yazar. */
const STORAGE_KEY = 'ozerlabs-lang-v2'

/* Ülke → dil. Site üç dil sunuyor; listede olmayan ülke İngilizce görür.
   Fransızca listesi: Fransa ve Fransızcanın resmî/yaygın olduğu komşular +
   Mağrip — işin müşteri kitlesi bu coğrafyada. */
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

function okuSecim() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return SUPPORTED.includes(v) ? v : null
  } catch {
    return null // gizli sekme / depolama kapalı
  }
}

function tarayiciDili() {
  const code = (navigator.language || '').slice(0, 2).toLowerCase()
  return SUPPORTED.includes(code) ? code : null
}

/* İlk boyama senkron olmak zorunda: kullanıcının kendi seçimi, yoksa tarayıcı
   dili, o da tutmuyorsa sitenin varsayılanı (fr). Ülke bilgisi ağdan geldiği
   için bir adım sonra devreye girer. */
function baslangicDili() {
  if (typeof window === 'undefined') return 'fr'
  return okuSecim() || tarayiciDili() || 'fr'
}

/* Ülkeyi kendi origin'imizden okuruz: Cloudflare her sitede /cdn-cgi/trace
   sunar ve `loc=XX` satırında ziyaretçinin ülkesini verir. Üçüncü taraf bir
   IP servisine istek gitmez, ziyaretçinin IP'si dışarı çıkmaz. */
async function ulkeKodu(signal) {
  const res = await fetch('/cdn-cgi/trace', { signal })
  if (!res.ok) return null // yerel geliştirmede bu uç nokta yok
  return res.text().then((t) => t.match(/^loc=([A-Z]{2})$/m)?.[1] || null)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(baslangicDili)

  // Açık seçim kalıcıdır ve ülke tespitini kalıcı olarak devre dışı bırakır.
  const setLang = (code) => {
    if (!SUPPORTED.includes(code)) return
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* depolama yoksa seçim yalnızca bu oturumda geçerli olur */
    }
    setLangState(code)
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Ülkeye göre dil — yalnızca kullanıcı henüz kendi seçimini yapmadıysa.
  useEffect(() => {
    if (okuSecim()) return

    const controller = new AbortController()

    ulkeKodu(controller.signal)
      .then((loc) => {
        if (!loc) return
        // Bilinen ülke kendi dilini, bilinmeyen ülke İngilizceyi alır.
        const hedef = COUNTRY_LANG[loc] || 'en'
        // Seçim değil tespit: localStorage'a yazılmaz, kullanıcı istediğinde
        // düğmeyle değiştirebilsin ve bir sonraki ziyarette yine ülkesi geçerli olsun.
        setLangState((mevcut) => (mevcut === hedef ? mevcut : hedef))
      })
      .catch(() => {
        /* ağ hatası veya iptal: tarayıcı dilinden gelen değer olduğu gibi kalır */
      })

    return () => controller.abort()
  }, [])

  const value = { lang, setLang, t: translations[lang] }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
