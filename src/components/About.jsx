import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

/**
 * "Çalışma biçimi" — eski Hakkımızda ve Süreç bölümlerinin birleşimi.
 * Solda kim olduğu ve nasıl çalıştığı, sağda dört adımlı süreç.
 *
 * Eski dört "neden biz" kartı kaldırıldı: kart olmayı hak edecek kadar
 * farklı bilgi taşımıyorlardı, aynı iddiayı metin zaten söylüyor.
 * Numaralandırma burada haklı — adımlar gerçekten sıralı.
 */
export default function About() {
  const { t } = useLanguage()

  return (
    <section id="hakkimda" className="section" data-surface="base" aria-labelledby="hakkimda-title">
      <div className="container work__layout">
        <Reveal className="work__intro">
          <span className="eyebrow">{t.sectionLabels.about}</span>
          <h2 className="section-title" id="hakkimda-title">
            {t.sections.why.title}
          </h2>
          <p className="section-sub">{t.sections.why.sub}</p>

          <p>{t.about.body1}</p>
          <p>{t.about.body2}</p>

          <dl className="why__stats">
            {t.about.stats.map((s) => (
              <div key={s.label}>
                <dt className="stat__value">{s.value}</dt>
                <dd className="stat__label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ol className="work__steps">
          {t.process.steps.map((step, i) => (
            <Reveal as="li" delay={i * 80} className="work-step" key={step.id}>
              <span className="work-step__num" aria-hidden="true">
                {step.id}
              </span>
              <div className="work-step__body">
                <h3 className="work-step__title">{step.title}</h3>
                <p className="work-step__text">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
