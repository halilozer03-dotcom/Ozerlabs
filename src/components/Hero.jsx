import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { GOOGLE_BUSINESS } from '../content/links.js'
import Icon from './Icon.jsx'
import HeroVisual from './HeroVisual.jsx'

export default function Hero() {
  const { t } = useLanguage()
  const [line1, line2, line3] = t.hero.titleLines

  // Güven göstergeleri sitede zaten var olan bilgilerden gelir —
  // yeni, doğrulanamaz iddia eklenmez.
  //
  // Google puanı bunun tek istisnası değil, tam tersi örneği: sayı
  // uydurulmuyor, gerçek İşletme Profilinden geliyor ve ziyaretçinin
  // kendi gözüyle doğrulayabilmesi için o profile linkli veriliyor.
  // Puan veya değerlendirme sayısı değişirse translations.js'teki
  // eyebrow.rating üç dilde birlikte güncellenir.
  const trust = [
    { icon: 'check-circle', value: t.eyebrow.status.value, label: t.eyebrow.status.label },
    { icon: 'map-pin', value: t.eyebrow.location.value, label: t.eyebrow.location.label },
    {
      icon: 'clock',
      value: t.contact.details[2].value,
      label: t.contact.details[2].label,
    },
    {
      icon: 'star',
      value: t.eyebrow.rating.value,
      label: t.eyebrow.rating.label,
      href: GOOGLE_BUSINESS,
    },
  ]

  return (
    <section className="hero dot-grid" data-surface="void" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="tag tag--brand hero__badge">
            <Icon name="sparkles" size={13} />
            {t.hero.badge}
          </span>

          <h1 className="hero__title" id="hero-title">
            {line1} {line2} <span className="accent">{line3}</span>
          </h1>

          <p className="hero__sub">{t.hero.sub}</p>

          {/* Hedefler metinle eşleşmek ZORUNDA. 08-08 yeniden tasarımında
              ctaPrimary "Projeleri Gör"den "Ücretsiz Teklif Al"a döndü ama
              hash'ler eski kalmıştı: birincil buton projelere, ikincil buton
              iletişime gidiyordu. Butonun yazdığı yere götürmemesi, sitenin
              tek ticari eylemini kaybettiriyordu. */}
          <div className="hero__actions">
            <Link to={{ pathname: '/', hash: '#iletisim' }} className="btn btn--primary">
              {t.hero.ctaPrimary}
              <Icon name="arrow-right" size={17} className="btn__icon" />
            </Link>
          </div>

          {/* Kitle ayrımı: ikincil "Projeleri gör" yerine iki yol. İkisi de
              projeler ızgarasına iner ve onu ilgili kitleye süzer
              (Projects.jsx, location.state.segment); ziyaretçi orada
              "Tümü"ne dönebilir. Birincil eylem tek kalır. */}
          <nav className="hero__segments" aria-label={t.hero.segments.label}>
            <span className="hero__segments-label">{t.hero.segments.label}</span>
            <Link
              to={{ pathname: '/', hash: '#projeler' }}
              state={{ segment: 'industry' }}
              className="btn btn--secondary btn--sm"
            >
              <Icon name="layers" size={16} />
              {t.hero.segments.industry}
            </Link>
            <Link
              to={{ pathname: '/', hash: '#projeler' }}
              state={{ segment: 'local' }}
              className="btn btn--secondary btn--sm"
            >
              <Icon name="map-pin" size={16} />
              {t.hero.segments.local}
            </Link>
          </nav>

          <ul className="hero__trust">
            {trust.map((item) => {
              const govde = (
                <>
                  <span className="trust-item__icon">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <span>
                    <strong className="trust-item__value">{item.value}</strong>
                    <span className="trust-item__label">{item.label}</span>
                  </span>
                </>
              )

              return (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      className="trust-item trust-item--link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {govde}
                    </a>
                  ) : (
                    <span className="trust-item">{govde}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
