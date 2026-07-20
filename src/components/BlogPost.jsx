import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { marked } from 'marked'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { posts } from '../content/blog.js'

const BACK_LABEL = { fr: '← Tous les articles', en: '← All posts', tr: '← Tüm yazılar' }

export default function BlogPost() {
  const { slug } = useParams()
  const { lang } = useLanguage()
  const post = posts.find((p) => p.slug === slug)
  const localized = post ? (post[lang] || post.tr) : null

  useEffect(() => {
    if (!localized) return
    const prevTitle = document.title
    document.title = `${localized.title} — Ozer Labs Blog`
    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content')
    if (metaDesc) metaDesc.setAttribute('content', localized.excerpt)
    return () => {
      document.title = prevTitle
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc)
    }
  }, [localized])

  if (!post) return <Navigate to="/blog" replace />

  return (
    <section className="services" style={{ minHeight: '70vh' }}>
      <div className="section-label">
        <span className="num">B</span>
        <h2>{localized.title}</h2>
        <div className="rule" />
      </div>
      <article
        className="spec-card"
        style={{ maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: marked.parse(localized.content) }}
      />
      <p style={{ textAlign: 'center', marginTop: 32 }}>
        <Link to="/blog">{BACK_LABEL[lang] || BACK_LABEL.tr}</Link>
      </p>
    </section>
  )
}
