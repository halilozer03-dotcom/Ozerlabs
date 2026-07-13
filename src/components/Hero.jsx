import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLanguage()
  const [line1, line2, line3] = t.hero.titleLines

  return (
    <section className="hero grid-bg">
      <div className="crosshair c1" />
      <div className="crosshair c2" />
      <div className="crosshair c3" />
      <div className="crosshair c4" />

      <div className="hero-content">
        <div className="eyebrow-block">
          <div><span>{t.eyebrow.brand.label}</span>{t.eyebrow.brand.value}</div>
          <div><span>{t.eyebrow.location.label}</span>{t.eyebrow.location.value}</div>
          <div><span>{t.eyebrow.discipline.label}</span>{t.eyebrow.discipline.value}</div>
          <div><span>{t.eyebrow.status.label}</span>{t.eyebrow.status.value}</div>
        </div>

        <h1>
          {line1}<br />
          {line2}<br />
          <span className="accent">{line3}</span>
        </h1>

        <p className="hero-sub">{t.hero.sub}</p>

        <div className="cta-row">
          <a href="#projeler" className="btn-primary">{t.hero.ctaPrimary}</a>
          <a href="#iletisim" className="btn-secondary">{t.hero.ctaSecondary}</a>
        </div>
      </div>
    </section>
  )
}
