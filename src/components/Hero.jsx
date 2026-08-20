import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'
import HeroVisual from './HeroVisual.jsx'

export default function Hero() {
  const { t } = useLanguage()
  const [line1, line2, line3] = t.hero.titleLines

  // Güven göstergeleri sitede zaten var olan bilgilerden gelir —
  // yeni, doğrulanamaz iddia eklenmez.
  const trust = [
    { icon: 'check-circle', value: t.eyebrow.status.value, label: t.eyebrow.status.label },
    { icon: 'map-pin', value: t.eyebrow.location.value, label: t.eyebrow.location.label },
    {
      icon: 'clock',
      value: t.contact.details[2].value,
      label: t.contact.details[2].label,
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
            <Link to={{ pathname: '/', hash: '#projeler' }} className="btn btn--secondary">
              {t.hero.ctaSecondaryShort}
              <Icon name="layers" size={17} />
            </Link>
          </div>

          <ul className="hero__trust">
            {trust.map((item) => (
              <li className="trust-item" key={item.label}>
                <span className="trust-item__icon">
                  <Icon name={item.icon} size={18} />
                </span>
                <span>
                  <strong className="trust-item__value">{item.value}</strong>
                  <span className="trust-item__label">{item.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
