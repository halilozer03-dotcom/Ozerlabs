import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { marked } from 'marked'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { posts } from '../content/blog.js'
import { BLOG_LABELS } from './BlogShared.jsx'
import Icon from './Icon.jsx'

export default function BlogPost() {
  const { slug } = useParams()
  const { lang } = useLanguage()
  const post = posts.find((p) => p.slug === slug)
  const localized = post ? post[lang] || post.tr : null
  const labels = BLOG_LABELS[lang] || BLOG_LABELS.tr

  // SEO: başlık ve açıklama yazıya göre güncellenir, ayrılırken geri alınır.
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
    <main className="section blog-page" id="main">
      <div className="container-read">
        <Link to="/blog" className="btn btn--ghost" style={{ marginBottom: 'var(--space-6)' }}>
          <Icon name="arrow-right" size={15} style={{ transform: 'rotate(180deg)' }} />
          {labels.back}
        </Link>

        <article>
          <header style={{ marginBottom: 'var(--space-10)' }}>
            <time className="post-card__date" dateTime={post.date}>
              {post.date}
            </time>
            <h1 className="section-title" style={{ fontSize: 'var(--fs-h1)' }}>
              {localized.title}
            </h1>
          </header>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: marked.parse(localized.content) }}
          />
        </article>

        {/* Yazı sonu CTA: blog dönüşüm hunisinin girişidir.
            Okuyucu buraya geldiyse konuya zaten ilgili. */}
        <aside className="post-cta">
          <div>
            <h2 className="post-cta__title">{labels.ctaTitle}</h2>
            <p className="post-cta__text">{labels.ctaText}</p>
          </div>
          <Link to={{ pathname: '/', hash: '#iletisim' }} className="btn btn--primary">
            {labels.ctaBtn}
            <Icon name="arrow-right" size={16} className="btn__icon" />
          </Link>
        </aside>

        <Link to="/blog" className="btn btn--secondary btn--sm">
          <Icon name="arrow-right" size={15} style={{ transform: 'rotate(180deg)' }} />
          {labels.back}
        </Link>
      </div>
    </main>
  )
}
