import { useLanguage } from '../i18n/LanguageContext.jsx'
import { PLAY_BENDIQ } from '../content/links.js'
import { track } from '../lib/track.js'
import Icon from './Icon.jsx'
import HeroVisual from './HeroVisual.jsx'

/**
 * Hero = BENDIQ (kullanıcı kararı 08.10.2026: birinci ürün, CAD ya da web
 * hizmetlerinin arkasına taşınmaz). Kime: abkant operatörü ve sac atölyesi.
 * Hangi sorun: yanlış açınım = hurda parça. Ne yapar: açınım + büküm payı,
 * 2D/3D/4D kontrol.
 *
 * Birincil eylem Google Play'dir — genel teklif formuna DÖNÜŞTÜRÜLMEZ.
 * İkincil eylem aynı sayfadaki özellik bölümüne iner (#bendiq).
 *
 * Güven göstergeleri yalnızca mağaza listesinde yazanlardır (08.10.2026'da
 * okundu): 30 gün deneme, abonelik yok / tek seferlik satın alma, hesap yok,
 * 25 dil. Fiyat listede görünmediği için yazılmaz.
 *
 * İlk ekrandaki metin hiçbir gecikmeli görünürlük koşuluna bağlı değildir
 * (Reveal yok): sunucudan gelen HTML'de yerindedir — LCP öğesi budur.
 */
export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section className="hero dot-grid" data-surface="void" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="tag tag--brand hero__badge">
            <Icon name="smartphone" size={13} />
            {h.badge}
          </span>

          <h1 className="hero__title" id="hero-title">
            {h.title}
          </h1>

          <p className="hero__sub">{h.sub}</p>

          <div className="hero__actions">
            <a
              href={PLAY_BENDIQ}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('store_click', { topic: 'hero' })}
            >
              {h.ctaPrimary}
              <Icon name="arrow-up-right" size={17} className="btn__icon" />
            </a>
            <a href="#bendiq" className="btn btn--secondary">
              {h.ctaSecondary}
              <Icon name="arrow-down" size={17} />
            </a>
          </div>

          <ul className="hero__trust">
            {h.trust.map((item) => (
              <li key={item.value} className="trust-item">
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
