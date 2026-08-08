import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'

/**
 * "Kapsam" — eski Fiyatlandırma bölümü.
 *
 * Sayfada rakam yok, o yüzden başlık da fiyat vaat etmiyor. Bölümün işi
 * fiyat vermek değil belirsizliği azaltmak: her kart "ne alıyorum"
 * sorusunu yanıtlar ve teslim süresi verir. Rakam veremiyorsan en azından
 * süre ver — ikisi de yoksa kart boş vaat olur.
 *
 * Kart içi CTA'lar ve "en çok tercih edilen" rozeti kaldırıldı: üç
 * seçenekli solo stüdyoda popülerlik iddiası inandırıcı değil, ve
 * sayfada birincil butondan yalnızca iki tane var (hero + iletişim).
 */
export default function Pricing() {
  const { t } = useLanguage()

  return (
    <section id="fiyatlandirma" className="section" data-surface="raise" aria-labelledby="fiyatlandirma-title">
      <div className="container">
        <SectionHead
          id="fiyatlandirma-title"
          eyebrow={t.sectionLabels.pricing}
          title={t.sections.pricing.title}
          sub={t.sections.pricing.sub}
          center
        />

        <ul className="grid grid--3">
          {t.pricing.tiers.map((tier, i) => (
            <Reveal as="li" delay={i * 90} key={tier.name}>
              <article className="card scope-card">
                <span className="tag">{tier.tag}</span>
                <h3 className="card__title scope-card__name">{tier.name}</h3>

                {tier.delivery && (
                  <p className="scope-card__delivery">
                    <span className="scope-card__delivery-label">{t.pricing.deliveryLabel}</span>
                    <span className="scope-card__delivery-value">{tier.delivery}</span>
                  </p>
                )}

                <ul className="price-card__list">
                  {tier.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={17} className="price-card__check" strokeWidth={2.2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="pricing__note">{t.pricing.note}</p>
      </div>
    </section>
  )
}
