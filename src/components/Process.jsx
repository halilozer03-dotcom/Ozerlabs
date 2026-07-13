import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Process() {
  const { t } = useLanguage()

  return (
    <section id="surec" className="process">
      <div className="section-label">
        <span className="num">02</span>
        <h2>{t.sectionLabels.process}</h2>
        <div className="rule" />
      </div>

      <div className="process-line">
        {t.process.steps.map((step, i) => (
          <Reveal delay={i * 100} key={step.id} className="process-step">
            <span className="step-id">{step.id}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
