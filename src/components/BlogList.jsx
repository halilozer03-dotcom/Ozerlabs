import { useLanguage } from '../i18n/LanguageContext.jsx'
import { posts } from '../content/blog.js'
import Reveal from './Reveal.jsx'
import { PostCard, BLOG_LABELS } from './BlogShared.jsx'

export default function BlogList() {
  const { lang, t } = useLanguage()
  const labels = BLOG_LABELS[lang] || BLOG_LABELS.tr

  return (
    <main className="section blog-page" id="main">
      <div className="container">
        <Reveal className="section-head">
          <div className="section-head__body">
            <span className="eyebrow">{labels.section}</span>
            <h1 className="section-title">{t.sections.blog.title}</h1>
            <p className="section-sub">{t.sections.blog.sub}</p>
          </div>
        </Reveal>

        <ul className="grid grid--3">
          {posts.map((p, i) => (
            <Reveal as="li" delay={(i % 3) * 90} key={p.slug}>
              <PostCard post={p} lang={lang} />
            </Reveal>
          ))}
        </ul>
      </div>
    </main>
  )
}
