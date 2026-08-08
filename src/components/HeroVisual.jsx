import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Hero görseli: Google Play'de yayında olan BENDIQ uygulamasının
 * gerçek ekranı. Önceki sürümdeki maket pano (uydurma grafik ve
 * istatistikler) kaldırıldı — iddianın süsü değil kanıtı gösteriliyor.
 *
 * Görsel dekoratif DEĞİL: ürünün çalıştığının kanıtı olduğu için
 * gerçek alt metni var ve ekran okuyuculara açık.
 * Oran 9:16 sabit olduğu için CLS üretmez.
 */
export default function HeroVisual() {
  const { t } = useLanguage()

  return (
    <div className="hero-visual">
      <div className="hero-visual__glow" aria-hidden="true" />

      <figure className="device">
        <img
          className="device__screen"
          src="/bendiq-teknik-cizim.webp"
          alt={t.hero.visualAlt}
          width="720"
          height="1280"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </figure>

      <span className="device__caption">
        <i className="device__dot" aria-hidden="true" />
        {t.hero.visualCaption}
      </span>
    </div>
  )
}
