import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { posts } from '../content/blog.js'

export default function BlogList() {
  const { lang } = useLanguage()

  return (
    <section className="services" style={{ minHeight: '70vh' }}>
      <div className="section-label">
        <span className="num">B</span>
        <h2>Blog</h2>
        <div className="rule" />
      </div>
      <div className="spec-grid">
        {posts.map((p) => {
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
    </section>
  )
}
