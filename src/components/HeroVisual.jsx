import { useLanguage } from '../i18n/LanguageContext.jsx'
import { PLAY_BENDIQ } from '../content/links.js'
import Icon from './Icon.jsx'

/**
 * Hero görseli: Google Play'de yayında olan BENDIQ uygulamasının
 * gerçek ekranı. Önceki sürümdeki maket pano (uydurma grafik ve
 * istatistikler) kaldırıldı — iddianın süsü değil kanıtı gösteriliyor.
 *
 * Görsel dekoratif DEĞİL: ürünün çalıştığının kanıtı olduğu için
 * gerçek alt metni var ve ekran okuyuculara açık.
 * Görsel uygulamanın ANA ekranı (kullanıcı kararı 12.10.2026; Play mağaza
 * karesi 01_calculation, kesit x188 y416 698×1289: başlık, telefon durum çubuğu,
 * çerçeve çizgisi ve alttaki beyaz 2D çizim dışarıda — kullanıcı "amatör
 * görünüyor" dedi; üstüne hazır marka bandı bendiq-banner-serit, 698 px
 * genişliğe — kullanıcı isteği). 4D pres karesi Projeler'deki BENDIQ kartına taşındı
 * (`screen`). Ekrandaki sayılar mağaza demosu: FL 306.8 · L 400 · 1.93 kg.
 * Oran 698×1557 ve sabit
 * olduğu için CLS üretmez. 9:16'ya sıkıştırmak kareyi kırpıyordu.
 *
 * Tamamı Play sayfasına giden tek bir bağlantı. Alt yazı zaten
 * "Google Play'de yayında" diyordu ama tıklanmıyordu; ziyaretçinin ilk
 * gördüğü kanıt, ürüne giden yolun da kendisi olmalı. Bağlantının
 * erişilebilir adı görsel alt metni değil ayrı bir eylem cümlesi
 * (visualLink) — "…1106,8 mm…" bir bağlantı adı olarak anlamsız kalıyor.
 */
export default function HeroVisual() {
  const { t } = useLanguage()

  return (
    <div className="hero-visual">
      <div className="hero-visual__glow" aria-hidden="true" />

      <a
        className="hero-visual__link"
        href={PLAY_BENDIQ}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.hero.visualLink}
      >
        <figure className="device">
          <img
            className="device__screen"
            src="/bendiq-ana-ekran.webp"
            alt={t.hero.visualAlt}
            width="698"
            height="1557"
            loading="eager"
            fetchpriority="high"
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
