import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { marked } from 'marked'
import { posts } from '../content/blog.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    if (!post) return
    const prevTitle = document.title
    document.title = `${post.title} — Ozer Labs Blog`
    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content')
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt)
    return () => {
      document.title = prevTitle
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc)
    }
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  return (
    <section className="services" style={{ minHeight: '70vh' }}>
      <div className="section-label">
        <span className="num">B</span>
        <h2>{post.title}</h2>
        <div className="rule" />
      </div>
      <article
        className="spec-card"
        style={{ maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />
      <p style={{ textAlign: 'center', marginTop: 32 }}>
        <Link to="/blog">← Tüm yazılar</Link>
      </p>
    </section>
  )
}
