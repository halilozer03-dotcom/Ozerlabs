/**
 * Adresi değişmiş yazılar: eski slug -> yeni slug.
 *
 * Tek kaynak burasıdır. App.jsx buradan istemci tarafı yönlendirmeyi kurar,
 * scripts/prerender.mjs ise aynı listeden eski adres için kanonik hedefi
 * yeni yazıyı gösteren statik bir sayfa üretir. Yeni bir ad değişikliğinde
 * yalnızca bu dosyaya satır eklenir.
 */
export const LEGACY_SLUGS = {
  'ozer-bend-pro-hikayesi': 'bendiq-hikayesi',
}
