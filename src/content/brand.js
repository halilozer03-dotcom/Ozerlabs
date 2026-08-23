/**
 * Marka adının tek kaynağı.
 *
 * Ad birden çok string literalinde elle yazılıydı (sekme başlığı, JSON-LD,
 * footer telifi, hero künyesi, blog başlık kalıpları, prerender'daki
 * kopyaları). Bu hata sınıfı sessizdir: biri güncellenir, diğerleri eski
 * kalır; ne derleme ne konsol uyarır. Site aynı anda "Ozer Labs", "OZER LABS"
 * ve "OZERLABS" gösteriyordu.
 *
 * Kanonik biçim TEK KELİME. Logonun kelime markası (Logo.jsx, DOM'da
 * "OZERLABS"), alan adı (ozerlabs.com), Play geliştirici sayfası
 * (by.ozerlabs) ve YouTube kanalı (@Ozerlabs) zaten tek kelime; ayrık yazım
 * yalnızca bizim yazdığımız meta metinlerindeydi. Tümü büyük harf
 * ("OZERLABS") ayrı bir ad değil, tipografik muameledir: logoda ve footer
 * telifinde öyle kalır.
 *
 * DİKKAT: bu dosya Node tarafından da import edilir (scripts/prerender.mjs).
 * React, JSX veya tarayıcıya özel kod EKLENMEZ — eklenirse derleme prerender
 * adımında kırılır.
 */
export const BRAND = 'OzerLabs'

/* Blog rotalarının sekme başlığı kalıpları.
   ÜÇ yer aynı metni üretmek zorunda: prerender.mjs statik <title>'ı yazar,
   BlogList/BlogPost ise ziyaretçi SPA içinden geldiğinde aynı başlığı çalışma
   anında yazar. Ayrışırlarsa sekme başlığı gezinme yönüne göre değişir —
   sessiz hata. Kalıbın tek kopyası burada. */
export const blogListTitle = (sectionTitle) => `${sectionTitle} — ${BRAND}`
export const blogPostTitle = (postTitle) => `${postTitle} — ${BRAND} Blog`
