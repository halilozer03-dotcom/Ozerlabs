import { useLanguage } from '../i18n/LanguageContext.jsx'
import { PLAY_BENDIQ } from '../content/links.js'
import { track } from '../lib/track.js'
import Icon from './Icon.jsx'

/**
 * Hero görseli: BENDIQ'in gerçek ekranı, SAYFANIN DİLİNDE. Fransızca sayfa
 * Fransızca, İngilizce sayfa İngilizce arayüzü gösterir (Play listesindeki
 * ekran görüntüleri Türkçe; fr/en kareleri uygulamanın kendisinden çekildi —
 * bkz. ~/.claude/tools/bendiq-screens/). Görsel dekoratif DEĞİL: ürünün
 * kanıtı, gerçek alt metni var.
 *
 * Oran cihazın kendi oranı (384×832 CSS px → 720×1560), sabit olduğu için
 * CLS üretmez. srcset: telefonda 360 px'lik kare yeter (ekranda ≤ 302 px).
 *
 * Yükleme önceliği ölçüme göre: mobilde LCP öğesi başlık metnidir (görsel
 * ilk ekranın altında), masaüstünde görsel. `fetchpriority` verilmez —
 * mobilde yazı tipleriyle bant genişliği yarıştırıyordu; `loading="eager"`
 * masaüstünde geç başlamasını önler.
 */
export default function HeroVisual() {
  const { lang, t } = useLanguage()
  const src = (w) => `/bendiq/screen-${lang}-${w}.webp`

  return (
    <div className="hero-visual">
      <div className="hero-visual__glow" aria-hidden="true" />

      <a
        className="hero-visual__link"
        href={PLAY_BENDIQ}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.hero.visualLink}
        onClick={() => track('store_click', { topic: 'hero-visual' })}
      >
        <figure className="device">
          <img
            className="device__screen"
            src={src(720)}
            srcSet={`${src(360)} 360w, ${src(720)} 720w`}
            sizes="(min-width: 1024px) 282px, min(302px, calc(100vw - 72px))"
            alt={t.hero.visualAlt}
            width="720"
            height="1560"
            loading="eager"
            decoding="async"
          />
        </figure>

        <span className="device__caption">
          <i className="device__dot" aria-hidden="true" />
          {t.hero.visualCaption}
          <Icon name="arrow-up-right" size={14} />
        </span>
      </a>
    </div>
  )
}
