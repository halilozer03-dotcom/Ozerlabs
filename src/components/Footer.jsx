import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { posts } from '../content/blog.js'
import { BLOG_LABELS } from './BlogShared.jsx'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'

/**
 * Sosyal hesaplar tek yerden yönetilir.
 * Yeni hesap eklemek için buraya bir satır yeterli — ikon adı
 * Icon.jsx'te tanımlı olmalı (github, linkedin, instagram, mail).
 * Uydurma profil linki eklenmez: yalnızca gerçekten var olanlar listelenir.
 */
const SOCIAL_LINKS = [{ icon: 'mail', href: 'mailto:ozer.labs@gmail.com', label: 'E-mail' }]

export default function Footer() {
  const { lang, t } = useLanguage()
  const blogLabels = BLOG_LABELS[lang] || BLOG_LABELS.tr

  // Süreç ayrı bölüm olmaktan çıkıp Çalışma biçimi içine girdi.
  const company = [
    { label: t.nav.services, hash: '#hizmetler' },
    { label: t.nav.solutions, hash: '#cozumler' },
    { label: t.nav.projects, hash: '#projeler' },
    { label: t.nav.about, hash: '#hakkimda' },
    { label: t.nav.pricing, hash: '#fiyatlandirma' },
  ]

  // Ana sayfadaki blog önizlemesi buraya indi: en yeni üç yazı.
  const sonYazilar = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  return (
    <footer className="footer" data-surface="void">
      <div className="container">
        <div className="footer__grid">
          {/* Marka */}
          <div className="footer__brand">
            <Link to="/" aria-label={t.nav.home}>
              <Logo />
            </Link>
            <p className="footer__tagline">{t.banner.tagline}</p>
            <ul className="footer__social" aria-label={t.footer.social}>
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    {...(s.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h2 className="footer__col-title">{t.footer.columns.company}</h2>
            <ul className="footer__list">
              {company.map((c) => (
                <li key={c.hash}>
                  <Link to={{ pathname: '/', hash: c.hash }}>{c.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/blog">{t.nav.blog}</Link>
              </li>
            </ul>
          </div>

          {/* Son yazılar — ana sayfadan buraya indi */}
          <div>
            <h2 className="footer__col-title">{blogLabels.section}</h2>
            <ul className="footer__list footer__posts">
              {sonYazilar.map((post) => {
                const yerel = post[lang] || post.tr
                return (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`}>
                      <time className="footer__post-date" dateTime={post.date}>
                        {post.date}
                      </time>
                      <span className="footer__post-title">{yerel.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h2 className="footer__col-title">{t.footer.columns.contact}</h2>
            <ul className="footer__list">
              {t.contact.details.map((d) => {
                const isEmail = d.value.includes('@')
                return (
                  <li key={d.label}>
                    {isEmail ? (
                      <a href={`mailto:${d.value}`}>
                        <Icon name={d.icon} size={16} />
                        {d.value}
                      </a>
                    ) : (
                      <span>
                        <Icon name={d.icon} size={16} />
                        {d.value}
                      </span>
                    )}
                  </li>
                )
              })}
              <li style={{ marginTop: 'var(--space-2)' }}>
                <Link to={{ pathname: '/', hash: '#iletisim' }} className="btn btn--secondary btn--sm">
                  {t.nav.cta}
                  <Icon name="arrow-right" size={15} className="btn__icon" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{t.footer.copyright}</span>
          <Link to={{ pathname: '/', hash: '#iletisim' }}>{t.footer.cta}</Link>
        </div>
      </div>
    </footer>
  )
}
