import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="hakkimda" className="about">
      <div className="section-label">
        <span className="num">{t.about.eyebrow}</span>
        <h2>{t.sectionLabels.about}</h2>
        <div className="rule" />
      </div>

      <Reveal className="about-box">
        <h3>{t.about.heading}</h3>
        <p>{t.about.body1}</p>
        <p>{t.about.body2}</p>

        <div className="about-stats">
          {t.about.stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
