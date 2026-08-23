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

/* Dizine girmesi istenen rotalar — sitemap de bu listeden üretilir. */
const routes = [
  {
    path: 'blog',
    url: `${ORIGIN}/blog`,
    title: `${blogSection.title} — Ozer Labs`,
    description: blogSection.sub,
    priority: '0.8',
    changefreq: 'weekly',
  },
  ...posts.map((p) => ({
    path: `blog/${p.slug}`,
    url: `${ORIGIN}/blog/${p.slug}`,
    title: `${p[LANG].title} — Ozer Labs Blog`,
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
    title: `${target[LANG].title} — Ozer Labs Blog`,
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
