import { Link } from 'react-router-dom'
import { posts } from '../content/blog.js'

export default function BlogList() {
  return (
    <section className="services" style={{ minHeight: '70vh' }}>
      <div className="section-label">
        <span className="num">B</span>
        <h2>Blog</h2>
        <div className="rule" />
      </div>
      <div className="spec-grid">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="spec-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <span className="id">{p.date}</span>
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
