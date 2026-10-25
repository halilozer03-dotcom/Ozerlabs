/**
 * Sayfa başına <head> sinyalleri — TEK kaynak.
 *
 * Aynı fonksiyon iki yerde çalışır:
 *   - scripts/prerender.mjs: her rota × dil için sunucudan giden HTML'in
 *     <head>'ini yazar (headHtml).
 *   - src/hooks/useSeo.js: ziyaretçi site içinde gezinirken aynı etiketleri
 *     document.head'e yazar (applyMeta).
 * İkisi aynı veriden üretildiği için doğrudan yüklemede, yenilemede ve
 * geri/ileri gezinmede aynı başlık, açıklama, canonical, og:*, twitter:*,
 * hreflang ve JSON-LD çıkar.
 *
 * Eski kural "canonical'a JS ile dokunulmaz"dı (CLAUDE.md §6). 08.10.2026
 * denetimi: ana sayfa → blog → yazı → ana sayfa gezinmesinde canonical ve
 * og:url önceki sayfada kalıyordu. Artık her rota değişiminde hepsi birlikte
 * yazılır; sayfada her zaman TEK canonical olur (data-seo etiketleri önce
 * silinir, sonra yazılır).
 *
 * Node'dan da import edilir — React/JSX/tarayıcı kodu yok.
 */
import { translations } from '../i18n/translations.js'
import { posts } from '../content/blog.js'
import { LEGACY_SLUGS } from '../content/redirects.js'
import { SOCIAL_PROFILES, CONTACT_EMAIL, PLAY_BENDIQ } from '../content/links.js'
import { BRAND, blogListTitle, blogPostTitle } from '../content/brand.js'
import { LANGS, DEFAULT_LANG, LOCALE, ORIGIN, absoluteUrl } from '../i18n/routes.js'

export const OG_IMAGE = `${ORIGIN}/og-image.jpg`
const STUDIO_ID = `${ORIGIN}/#studio`

/** Sayfa tanımı → dil önekisiz yol. 404'ün yolu yoktur (canonical/hreflang almaz). */
export function pagePath(page) {
  switch (page.kind) {
    case 'home':
      return '/'
    case 'metaliq':
      return '/metaliq'
    case 'blog':
      return '/blog'
    case 'post':
      return `/blog/${LEGACY_SLUGS[page.slug] || page.slug}`
    default:
      return null
  }
}

function studioNode(lang) {
  return {
    '@type': 'ProfessionalService',
    '@id': STUDIO_ID,
    name: BRAND,
    url: absoluteUrl('/', lang),
    image: OG_IMAGE,
    logo: `${ORIGIN}/brand/ozerlabs-lockup.webp`,
    description: translations[lang].meta.description,
    areaServed: 'FR',
    availableLanguage: LANGS,
    email: CONTACT_EMAIL,
    sameAs: SOCIAL_PROFILES.filter((p) => p.entity === 'studio').map((p) => p.href),
  }
}

function bendiqNode(lang) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${ORIGIN}/#bendiq`,
    name: 'BENDIQ',
    url: PLAY_BENDIQ,
    description: translations[lang].bendiq.sub,
    operatingSystem: 'Android',
    applicationCategory: 'BusinessApplication',
    publisher: { '@id': STUDIO_ID },
    sameAs: SOCIAL_PROFILES.filter((p) => p.entity === 'bendiq').map((p) => p.href),
  }
}

function jsonLdFor(page, lang, url) {
  const t = translations[lang]
  switch (page.kind) {
    case 'home':
      return { '@context': 'https://schema.org', '@graph': [studioNode(lang), bendiqNode(lang)] }
    case 'metaliq':
      return {
        '@context': 'https://schema.org',
        '@graph': [
          studioNode(lang),
          {
            '@type': 'SoftwareApplication',
            '@id': `${ORIGIN}/metaliq#app`,
            name: 'METALIQ',
            url,
            description: t.pages.metaliq.description,
            operatingSystem: 'Web',
            applicationCategory: 'DesignApplication',
            inLanguage: lang,
            publisher: { '@id': STUDIO_ID },
          },
        ],
      }
    case 'blog':
      return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: t.sections.blog.title,
        description: t.sections.blog.sub,
        url,
        inLanguage: lang,
        publisher: { '@type': 'Organization', name: BRAND, url: ORIGIN },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: (p[lang] || p[DEFAULT_LANG]).title,
          url: absoluteUrl(`/blog/${p.slug}`, lang),
          datePublished: p.date,
        })),
      }
    case 'post': {
      const post = posts.find((p) => p.slug === (LEGACY_SLUGS[page.slug] || page.slug))
      if (!post) return null
      const loc = post[lang] || post[DEFAULT_LANG]
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: loc.title,
        description: loc.excerpt,
        datePublished: post.date,
        inLanguage: lang,
        url,
        mainEntityOfPage: url,
        image: OG_IMAGE,
        author: { '@type': 'Organization', name: BRAND, url: ORIGIN },
        publisher: { '@type': 'Organization', name: BRAND, url: ORIGIN },
      }
    }
    default:
      return null
  }
}

/**
 * Sayfa + dil → <head> verisi. Bilinmeyen yazı `null` döner; çağıran 404'e düşer.
 * page: { kind: 'home' | 'metaliq' | 'blog' | 'post' | 'notFound', slug? }
 */
export function buildMeta(page, lang) {
  const t = translations[lang] || translations[DEFAULT_LANG]
  let title
  let description
  let type = 'website'

  switch (page.kind) {
    case 'home':
      title = t.meta.title
      description = t.meta.description
      break
    case 'metaliq':
      title = t.pages.metaliq.title
      description = t.pages.metaliq.description
      break
    case 'blog':
      title = blogListTitle(t.sections.blog.title)
      description = t.sections.blog.sub
      break
    case 'post': {
      const post = posts.find((p) => p.slug === (LEGACY_SLUGS[page.slug] || page.slug))
      if (!post) return null
      const loc = post[lang] || post[DEFAULT_LANG]
      title = blogPostTitle(loc.title)
      description = loc.excerpt
      type = 'article'
      break
    }
    default:
      title = t.pages.notFound.title
      description = t.pages.notFound.description
  }

  const path = pagePath(page)
  const canonical = path ? absoluteUrl(path, lang) : null
  return {
    lang,
    title,
    description,
    type,
    canonical,
    alternates: path
      ? [
          ...LANGS.map((l) => ({ hreflang: l, href: absoluteUrl(path, l) })),
          { hreflang: 'x-default', href: absoluteUrl(path, DEFAULT_LANG) },
        ]
      : [],
    ogLocale: LOCALE[lang],
    ogLocaleAlternates: LANGS.filter((l) => l !== lang).map((l) => LOCALE[l]),
    robots: path ? null : 'noindex',
    jsonLd: path ? jsonLdFor(page, lang, canonical) : null,
  }
}

/* ---------- Etiket listesi: sunucu ve istemci AYNI listeyi kullanır ---------- */

/** [etiket, öznitelikler] çiftleri. <title> ayrı yazılır. */
export function metaTags(meta) {
  const tags = [['meta', { name: 'description', content: meta.description }]]
  if (meta.canonical) tags.push(['link', { rel: 'canonical', href: meta.canonical }])
  for (const a of meta.alternates) tags.push(['link', { rel: 'alternate', hreflang: a.hreflang, href: a.href }])
  if (meta.robots) tags.push(['meta', { name: 'robots', content: meta.robots }])
  tags.push(['meta', { property: 'og:type', content: meta.type }])
  if (meta.canonical) tags.push(['meta', { property: 'og:url', content: meta.canonical }])
  tags.push(['meta', { property: 'og:title', content: meta.title }])
  tags.push(['meta', { property: 'og:description', content: meta.description }])
  tags.push(['meta', { property: 'og:locale', content: meta.ogLocale }])
  for (const l of meta.ogLocaleAlternates) tags.push(['meta', { property: 'og:locale:alternate', content: l }])
  tags.push(['meta', { name: 'twitter:title', content: meta.title }])
  tags.push(['meta', { name: 'twitter:description', content: meta.description }])
  return tags
}

/** JSON-LD metni: `</script>` kaçışı için `<` kodlanır. */
export const jsonLdText = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Sunucu: <head> içine giden HTML. Her etiket `data-seo` taşır — istemci onları değiştirir. */
export function headHtml(meta) {
  const lines = [`<title>${esc(meta.title)}</title>`]
  for (const [tag, attrs] of metaTags(meta)) {
    const a = Object.entries(attrs)
      .map(([k, v]) => `${k}="${esc(v)}"`)
      .join(' ')
    lines.push(`<${tag} ${a} data-seo />`)
  }
  if (meta.jsonLd) {
    lines.push(`<script type="application/ld+json" data-seo>${jsonLdText(meta.jsonLd)}</script>`)
  }
  return lines.join('\n    ')
}
