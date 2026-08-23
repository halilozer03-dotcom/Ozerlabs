/**
 * Sitenin varsayılan (fr) sekme başlığı ve açıklaması.
 *
 * Değerler elle yazılmaz: vite.config.js bunları derleme anında index.html'den
 * okuyup buraya gömer. Böylece tek kaynak index.html olarak kalır ve iki
 * yerin birbirinden ayrışması mümkün olmaz.
 *
 * Neden gerekli: /blog ve /blog/:slug artık kendi statik <title>'ıyla
 * sunuluyor. Bileşenler ayrılırken "mount anındaki başlığa" dönerse ana
 * sayfada sekmede blog yazısının başlığı kalırdı.
 */
export const SITE_TITLE = __SITE_TITLE__

export const SITE_DESCRIPTION = __SITE_DESCRIPTION__
