/**
 * Rota başına statik HTML üretimi (derleme sonrası).
 *
 * Site tek bir dist/index.html ile sunuluyordu (Cloudflare SPA fallback), bu
 * yüzden her adres aynı <head>'i ve aynı kanonik etiketi alıyordu: Google
 * blog sayfalarını ana sayfanın kopyası sayıp dizine almıyordu.
 *
 * Bu betik taze dist/index.html'i kabuk olarak alır, YALNIZCA <head> içindeki
 * adres/başlık/açıklama sinyallerini rotaya göre değiştirir ve her rota için
 * gerçek bir dosya yazar. Gövdeye (<div id="root">) dokunmaz — üç dilin tek
 * URL'de çalışma anında seçilmesi davranışı aynen korunur.
 *
 * Rota listesi ve sitemap src/content/blog.js'ten türetilir; yeni yazı
 * eklendiğinde başka hiçbir dosyaya dokunmak gerekmez.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const DIST = join(HERE, '..', 'dist')
const ORIGIN = 'https://ozerlabs.com'
const LANG = 'fr' // sunucudan giden HTML sitenin varsayılan dilindedir (index.html lang="fr")

const { posts } = await import(new URL('../src/content/blog.js', import.meta.url).href)
const { translations } = await import(new URL('../src/i18n/translations.js', import.meta.url).href)
const { LEGACY_SLUGS } = await import(new URL('../src/content/redirects.js', import.meta.url).href)
const { BRAND, blogListTitle, blogPostTitle } = await import(
  new URL('../src/content/brand.js', import.meta.url).href
)

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Kalıbı TAM OLARAK bir kez değiştirir. Sıfır eşleşme şablonun değiştiğini,
 * birden fazla eşleşme belirsizliği gösterir; ikisinde de derleme kırılır.
 */
function swapOnce(html, pattern, replacement, label) {
  const all = html.match(new RegExp(pattern.source, pattern.flags + 'g'))
  if (!all || all.length !== 1) {
    throw new Error(
      `prerender: index.html içinde "${label}" için beklenen tek eşleşme yok (bulunan: ${all ? all.length : 0}) — şablon değişmiş olabilir`,
    )
  }
  return html.replace(pattern, () => replacement)
}

function pageHtml(shell, { url, title, description }) {
  const t = esc(title)
  const d = esc(description)
  let out = shell
  out = swapOnce(out, /<title>[^<]*<\/title>/, `<title>${t}</title>`, 'title')
  out = swapOnce(out, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  out = swapOnce(out, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${d}" />`, 'description')
  out = swapOnce(out, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url')
  out = swapOnce(out, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${t}" />`, 'og:title')
  out = swapOnce(out, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${d}" />`, 'og:description')
  out = swapOnce(out, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${t}" />`, 'twitter:title')
  out = swapOnce(out, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${d}" />`, 'twitter:description')
  return out
}

/**
 * Kardeş .html dosyası yazılır (dist/blog.html, dist/blog/<slug>.html).
 * Cloudflare'in varsayılan html_handling modu bu dosyaları slash'sız adreste
 * 200 ile sunar; /blog/ ve /blog.html biçimleri 307 ile kanonik biçime döner.
 * Bu yüzden wrangler.toml'a dokunmak gerekmiyor.
 */
async function writePage(relPath, html) {
  const file = join(DIST, `${relPath}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
}

const shell = await readFile(join(DIST, 'index.html'), 'utf8')
const blogSection = translations[LANG].sections.blog

const REPO = join(HERE, '..')
const LANGS = ['fr', 'en', 'tr']

/* ---------------------------------------------------------------------
   DERLEME DENETİMLERİ

   Bu projede test, lint ve typecheck YOK. Tek kapı `npm run build`.
   Aşağıdaki denetimler, derlemeyi KIRMADAN yanlış çalışabilecek hataları
   kapatır — sessiz yanlış çıktı üretilmez:
     1. index.html'in marka adı brand.js ile ayrışması
     2. üç dilden birinin marka yazımını kaçırması
     3. eski "Ozer Labs" yazımının kaynakta kalması
     4. ana sayfanın fr <head> metninin translations.fr.meta ile ayrışması
     5. üç dilin anahtar/tip şemasının ayrışması (ör. bir dilde meta'nın
        eksik olması -> o dilde sekme başlığı sessizce güncellenmez)
     6. bir blog yazısının bir dilde eksik olması
   --------------------------------------------------------------------- */

/* 1) index.html kabuğu marka adıyla uyumlu mu? */
for (const [needle, label] of [
  [`<title>${BRAND} `, '<title>'],
  [`"name": "${BRAND}"`, 'JSON-LD name'],
  [`<meta property="og:site_name" content="${BRAND}" />`, 'og:site_name'],
]) {
  if (!shell.includes(needle)) {
    throw new Error(
      `prerender: index.html marka adı "${BRAND}" ile uyuşmuyor (${label}) — src/content/brand.js ile birlikte güncelleyin`,
    )
  }
}

/* 2) Üç dilde marka yazımı */
for (const l of LANGS) {
  const T = translations[l]
  if (T.eyebrow.brand.value !== BRAND) {
    throw new Error(
      `prerender: translations.${l}.eyebrow.brand.value = "${T.eyebrow.brand.value}" — beklenen "${BRAND}"`,
    )
  }
  if (!T.footer.copyright.includes(BRAND.toUpperCase())) {
    throw new Error(
      `prerender: translations.${l}.footer.copyright "${BRAND.toUpperCase()}" içermiyor: ${T.footer.copyright}`,
    )
  }
}

/* 3) Eski yazım taraması (metin kaynakları) */
const metinKaynaklari = await Promise.all([
  readFile(join(REPO, 'src', 'i18n', 'translations.js'), 'utf8'),
  readFile(join(REPO, 'src', 'content', 'blog.js'), 'utf8'),
])
const eskiYazim = metinKaynaklari.join('\n').match(/Ozer\s+Labs/gi)
if (eskiYazim) {
  throw new Error(
    `prerender: eski marka yazımı kalmış (${eskiYazim.length} yer) — translations.js / blog.js içinde "${BRAND}" kullanın`,
  )
}

/* 4) Ana sayfanın fr <head> metni ile translations.fr.meta eşitliği.
     Ana sayfa başlığı iki yerde yaşıyor: index.html (sunucudan giden kabuk,
     prerender'ın temeli) ve translations.fr.meta (dil değişince çalışma
     anında yazılan değer). Ayrışırlarsa aynı sayfa iki farklı fr başlık
     gösterir ve bunu ne build ne konsol söyler. */
function readOnce(pattern, label) {
  const found = shell.match(pattern)
  if (!found) {
    throw new Error(`prerender: index.html içinde "${label}" okunamadı — şablon değişmiş olabilir`)
  }
  return found[1]
}

const homeMeta = translations[LANG].meta
const shellTitle = readOnce(/<title>([^<]*)<\/title>/, 'title')
const shellDesc = readOnce(/<meta name="description" content="([^"]*)" \/>/, 'description')

if (esc(homeMeta.title) !== shellTitle || esc(homeMeta.description) !== shellDesc) {
  throw new Error(
    `prerender: ana sayfanın ${LANG} <head> metni translations.${LANG}.meta ile ayrışmış.\n` +
      `  index.html   title: ${shellTitle}\n` +
      `  translations title: ${esc(homeMeta.title)}\n` +
      `  index.html   desc : ${shellDesc}\n` +
      `  translations desc : ${esc(homeMeta.description)}`,
  )
}

/* 5) Üç dilin şema eşitliği (anahtar adı + tip).
     Diziler yaprak kabul edilir (tip + uzunluk): içerikleri dile göre
     meşru olarak farklıdır, sayıları değil. */
function sekil(o, p = '') {
  if (Array.isArray(o)) return [`${p}:array(${o.length})`]
  if (o === null || typeof o !== 'object') return [`${p}:${typeof o}`]
  return Object.keys(o)
    .sort()
    .flatMap((k) => sekil(o[k], `${p}.${k}`))
}

const refSekil = sekil(translations[LANG])
const refSet = new Set(refSekil)
for (const l of LANGS.filter((x) => x !== LANG)) {
  const curSekil = sekil(translations[l])
  if (curSekil.join('|') !== refSekil.join('|')) {
    const curSet = new Set(curSekil)
    throw new Error(
      `prerender: translations.${l} şekli ${LANG} ile ayrışıyor.\n` +
        `  eksik/farklı: ${refSekil.filter((x) => !curSet.has(x)).join(', ') || '-'}\n` +
        `  fazla/farklı: ${curSekil.filter((x) => !refSet.has(x)).join(', ') || '-'}`,
    )
  }
}

/* 6) Her blog yazısı üç dilde tam mı? Eksik bir dil derlemeyi KIRMIYORDU:
     prerender yalnızca fr'yi okur, o dilde okuyan ziyaretçi ise yarım bir
     sayfa görürdü. */
for (const p of posts) {
  for (const l of LANGS) {
    for (const alan of ['title', 'excerpt', 'content']) {
      const v = p[l]?.[alan]
      if (typeof v !== 'string' || !v.trim()) {
        throw new Error(`prerender: blog.js — "${p.slug}" yazısında ${l}.${alan} eksik`)
      }
    }
  }
}

/* Dizine girmesi istenen rotalar — sitemap de bu listeden üretilir. */
const routes = [
  {
    path: 'blog',
    url: `${ORIGIN}/blog`,
    title: blogListTitle(blogSection.title),
    description: blogSection.sub,
    priority: '0.8',
    changefreq: 'weekly',
  },
  ...posts.map((p) => ({
    path: `blog/${p.slug}`,
    url: `${ORIGIN}/blog/${p.slug}`,
    title: blogPostTitle(p[LANG].title),
    description: p[LANG].excerpt,
    lastmod: p.date,
    priority: '0.6',
    changefreq: 'monthly',
  })),
]

for (const r of routes) {
  await writePage(r.path, pageHtml(shell, r))
}

/* Adresi değişmiş yazılar: sayfa üretilir ama kanonik YENİ adresi gösterir.
   Sitemap'e girmez. Gerçek 301 için Cloudflare Redirect Rule gerekir. */
let aliasCount = 0
for (const [oldSlug, newSlug] of Object.entries(LEGACY_SLUGS)) {
  const target = posts.find((p) => p.slug === newSlug)
  if (!target) throw new Error(`prerender: LEGACY_SLUGS hedefi bulunamadı: ${newSlug}`)
  await writePage(`blog/${oldSlug}`, pageHtml(shell, {
    url: `${ORIGIN}/blog/${newSlug}`,
    title: blogPostTitle(target[LANG].title),
    description: target[LANG].excerpt,
  }))
  aliasCount += 1
}

/* Sitemap aynı listeden üretilir — elle güncellenecek ikinci bir liste yok. */
const entries = [
  { loc: `${ORIGIN}/`, changefreq: 'monthly', priority: '1.0' },
  ...routes.map((r) => ({
    loc: r.url,
    lastmod: r.lastmod,
    changefreq: r.changefreq,
    priority: r.priority,
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) =>
    [
      '  <url>',
      `    <loc>${e.loc}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      `    <changefreq>${e.changefreq}</changefreq>`,
      `    <priority>${e.priority}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')}
</urlset>
`

await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8')

console.log(
  `prerender: ${routes.length} rota + ${aliasCount} eski adres yazıldı, sitemap ${entries.length} URL ile üretildi`,
)
