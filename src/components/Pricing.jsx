import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Pricing() {
  const { t } = useLanguage()

  return (
    <section id="fiyatlandirma" className="pricing">
      <div className="section-label">
        <span className="num">04</span>
        <h2>{t.sectionLabels.pricing}</h2>
        <div className="rule" />
      </div>

      <div className="pricing-grid">
        {t.pricing.tiers.map((tier, i) => (
          <Reveal delay={i * 100} key={tier.name} className="pricing-card">
            <span className="tag">{tier.tag}</span>
            <h3>{tier.name}</h3>
            <ul>
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#iletisim" className="btn-secondary">{tier.cta} →</a>
          </Reveal>
        ))}
      </div>

      <p className="pricing-note">{t.pricing.note}</p>
    </section>
  )
}
