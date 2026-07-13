import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="hizmetler" className="services">
      <div className="section-label">
        <span className="num">01</span>
        <h2>{t.sectionLabels.services}</h2>
        <div className="rule" />
      </div>
      <div className="spec-grid">
        {t.services.map((s, i) => (
          <Reveal delay={i * 100} key={s.id} className="spec-card">
            <span className="id">{s.id}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
