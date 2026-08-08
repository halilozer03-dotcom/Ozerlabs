/**
 * Blog sayfalarinin paylastigi parcalar.
 * Ana sayfadaki blog onizleme bolumu kaldirildi (ziyaretciyi donusumden
 * uzaklastiran tek bolumdu); yazilar navigasyonda ve footerda.
 */
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export const BLOG_LABELS = {
  fr: {
    section: 'Derniers articles',
    all: 'Tous les articles',
    back: 'Tous les articles',
    ctaTitle: 'Un projet de ce type ?',
    ctaText: "Dites-moi ce que vous voulez construire ; on en parle sans engagement.",
    ctaBtn: 'Devis gratuit',
  },
  en: {
    section: 'Latest articles',
    all: 'All articles',
    back: 'All posts',
    ctaTitle: 'Working on something like this?',
    ctaText: 'Tell me what you want to build — the first conversation costs nothing.',
    ctaBtn: 'Get a free quote',
  },
  tr: {
    section: 'Son Yazılar',
    all: 'Tüm yazılar',
    back: 'Tüm yazılar',
    ctaTitle: 'Benzer bir işin mi var?',
    ctaText: 'Ne yapmak istediğini yaz; ilk görüşme hiçbir şeye mal olmaz.',
    ctaBtn: 'Ücretsiz teklif al',
  },
}

export function PostCard({ post, lang }) {
  const localized = post[lang] || post.tr

  return (
    <Link to={`/blog/${post.slug}`} className="card card--interactive">
      <time className="post-card__date" dateTime={post.date}>
        {post.date}
      </time>
      <h3 className="post-card__title">{localized.title}</h3>
      <p className="card__text">{localized.excerpt}</p>
      <span className="card__foot btn btn--ghost" style={{ alignSelf: 'flex-start' }}>
        {localized.readMore || BLOG_LABELS[lang]?.all || BLOG_LABELS.tr.all}
        <Icon name="arrow-right" size={15} className="btn__icon" />
      </span>
    </Link>
  )
}
