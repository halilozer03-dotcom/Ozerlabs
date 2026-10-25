/**
 * Dil başına adres — tek kaynak.
 *
 * Fransızca varsayılan dildir ve ÖNEKSİZ kalır: `/`, `/blog`, `/blog/<yazı>`
 * bugüne kadar paylaşılmış ve dizine girmiş adreslerdir, değişmeleri arama
 * değerini sıfırlardı. İngilizce ve Türkçe kendi önekini alır: `/en`, `/tr`.
 *
 * Neden dil adresi: üç dil tek adreste çalışma anında seçiliyordu. Ölçüldü
 * (08.10.2026, canlı, tarayıcı dili en-US): sayfa önce İngilizce çiziliyor,
 * ülke bilgisi gelince Fransızcaya dönüyordu — mobil CLS 0,179, masaüstü
 * 0,222. Ayrıca Googlebot tek bir dil görüyordu ve hreflang kurulamıyordu.
 * Artık adres dili belirler; içerik ilk HTML'de doğru dilde gelir.
 *
 * Bu dosya Node tarafından da import edilir (scripts/prerender.mjs) —
 * React/JSX ya da tarayıcıya özel kod eklenmez.
 */
export const LANGS = ['fr', 'en', 'tr']
export const DEFAULT_LANG = 'fr'
export const ORIGIN = 'https://ozerlabs.com'

/* hreflang ve og:locale değerleri */
export const LOCALE = { fr: 'fr_FR', en: 'en_US', tr: 'tr_TR' }

/** Adresin dili: `/en/...` → en, `/tr/...` → tr, gerisi fr. */
export function langFromPath(pathname = '/') {
  const seg = pathname.split('/')[1]
  return seg === 'en' || seg === 'tr' ? seg : DEFAULT_LANG
}

/** Dil önekini atar: `/en/blog` → `/blog`, `/tr` → `/`. */
export function stripLang(pathname = '/') {
  const lang = langFromPath(pathname)
  if (lang === DEFAULT_LANG) return pathname || '/'
  const rest = pathname.slice(lang.length + 1)
  return rest === '' ? '/' : rest
}

/** Dile bağlı adres: localizePath('/blog', 'en') → `/en/blog`; fr öneksiz. */
export function localizePath(path = '/', lang = DEFAULT_LANG) {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (lang === DEFAULT_LANG) return clean
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`
}

/** Mutlak adres (canonical, hreflang, sitemap). Kök fr adresi `https://ozerlabs.com/`. */
export function absoluteUrl(path = '/', lang = DEFAULT_LANG) {
  return `${ORIGIN}${localizePath(path, lang)}`
}
