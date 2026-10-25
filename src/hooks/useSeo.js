import { createContext, useContext, useEffect } from 'react'
import { buildMeta, metaTags, jsonLdText } from '../seo/meta.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Sayfanın <head>'ini yazan TEK mekanizma (eski useDocumentMeta'nın yerine).
 *
 * Sözleşme aynı kaldı: BAŞLIĞIN SAHİBİ ROTADIR. <Routes> aynı anda tek rota
 * bileşeni bağlar, o bileşen kendi sayfa tanımıyla useSeo'yu çağırır.
 * Temizleme (cleanup) YOKTUR: bağlanan rota zaten kendi etiketlerini yazar;
 * "varsayılana dön" adımı eskiden yarış durumu ve yanlış dil üretiyordu.
 *
 * Sunucuda (scripts/prerender.mjs) efekt çalışmaz; HeadContext'e verilen
 * toplayıcıya meta yazılır ve prerender onu <head>'e döker.
 */
export const HeadContext = createContext(null)

/** document.head'deki data-seo etiketlerini verilen meta ile değiştirir. */
export function applyMeta(meta) {
  if (typeof document === 'undefined' || !meta) return
  document.title = meta.title

  const head = document.head
  const next = metaTags(meta).map(([tag, attrs]) => {
    const el = document.createElement(tag)
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
    el.setAttribute('data-seo', '')
    return el
  })
  if (meta.jsonLd) {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-seo', '')
    s.textContent = jsonLdText(meta.jsonLd)
    next.push(s)
  }

  const current = [...head.querySelectorAll('[data-seo]')]
  // Hidrasyondan hemen sonra etiketler sunucudakiyle birebir aynıdır: dokunma.
  const same =
    current.length === next.length && current.every((el, i) => el.outerHTML === next[i].outerHTML)
  if (same) return

  current.forEach((el) => el.remove())
  // Sunucudan gelen kabukta da kalmış olabilecek, işaretsiz eski etiketler —
  // sayfada TEK canonical kalsın.
  head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  next.forEach((el) => head.appendChild(el))
}

/**
 * page: { kind, slug? } — bkz. src/seo/meta.js buildMeta.
 * Bilinmeyen yazıda meta null'dır; çağıran 404 gösterir ve 404 metasını yazar.
 */
export function useSeo(page) {
  const { lang } = useLanguage()
  const collector = useContext(HeadContext)
  const meta = buildMeta(page, lang)
  if (collector) collector.meta = meta

  const key = `${lang}|${page.kind}|${page.slug || ''}`
  useEffect(() => {
    applyMeta(meta)
    // meta, key'den türer; key değişmeden yeniden yazmaya gerek yok.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return meta
}
