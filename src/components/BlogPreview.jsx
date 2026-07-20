import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { posts } from '../content/blog.js'

const SECTION_TITLE = { fr: 'Derniers articles', en: 'Latest articles', tr: 'Son Yazılar' }
const ALL_POSTS_LABEL = { fr: 'Tous les articles →', en: 'All articles →', tr: 'Tüm yazılar →' }

export default function BlogPreview() {
  const { lang } = useLanguage()

  return (
    <section className="services">
      <div className="section-label">
        <span className="num">04</span>
        <h2>{SECTION_TITLE[lang] || SECTION_TITLE.tr}</h2>
        <div className="rule" />
      </div>
      <div className="spec-grid">
        {posts.slice(0, 3).map((p, i) => {
          const localized = p[lang] || p.tr
          return (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="spec-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <span className="id">{p.date}</span>
              <h3>{localized.title}</h3>
              <p>{localized.excerpt}</p>
            </Link>
          )
        })}
      </div>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        <Link to="/blog">{ALL_POSTS_LABEL[lang] || ALL_POSTS_LABEL.tr}</Link>
      </p>
    </section>
  )
}
