import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { posts } from '../content/blog.js'
import { BLOG_LABELS } from './BlogShared.jsx'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { SOCIAL_PROFILES, CONTACT_EMAIL } from '../content/links.js'
import { BENDIQ_PATH } from '../content/bendiqPage.js'

/**
 * Sosyal hesaplar tek yerden yönetilir: src/content/links.js.
 * Aynı liste JSON-LD sameAs'i de besler (bkz. prerender.mjs 7. denetim),
 * bu yüzden yeni hesap oraya eklenir — buraya değil. İkon adı Icon.jsx'te
 * tanımlı olmalı. Uydurma profil linki eklenmez: yalnızca gerçekten var
 * olan hesaplar listelenir.
 * E-posta profil değil, doğrudan iletişim ucu; o yüzden listenin başında
 * ve yapısal veride "email" alanı olarak duruyor.
 */
const SOCIAL_LINKS = [
  { icon: 'mail', href: `mailto:${CONTACT_EMAIL}`, label: 'E-mail' },
  ...SOCIAL_PROFILES.filter((p) => p.footer),
]

export default function Footer() {
  const { lang, t } = useLanguage()
  const blogLabels = BLOG_LABELS[lang] || BLOG_LABELS.tr

  // Süreç ayrı bölüm olmaktan çıkıp Çalışma biçimi içine girdi.
  // BENDIQ ilk sırada, kendi sayfasına gider (kullanıcı kararı 15.11.2026);
  // geri kalanı ana sayfa bölüm sırası.
  const company = [
    { label: t.nav.bendiq, to: BENDIQ_PATH },
    { label: t.nav.projects, to: { pathname: '/', hash: '#projeler' } },
    { label: t.nav.services, to: { pathname: '/', hash: '#hizmetler' } },
    { label: t.nav.solutions, to: { pathname: '/', hash: '#cozumler' } },
    { label: t.nav.metaliq, to: { pathname: '/', hash: '#metaliq' } },
    { label: t.nav.about, to: { pathname: '/', hash: '#hakkimda' } },
    { label: t.nav.pricing, to: { pathname: '/', hash: '#fiyatlandirma' } },
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
                <li key={c.label}>
                  <Link to={c.to}>{c.label}</Link>
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
