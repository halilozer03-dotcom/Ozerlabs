import { useLanguage } from '../i18n/LanguageContext.jsx'
import { logoMark } from '../assets/logo.js'

export default function Banner() {
  const { t } = useLanguage()

  return (
    <div className="brand-banner grid-bg">
      <img src={logoMark} alt="Ozer Labs" className="brand-banner-mark" />
      <div className="brand-banner-text">
        <h2>OZER<span className="accent">.</span>LABS</h2>
        <p>{t.banner.tagline}</p>
      </div>
    </div>
  )
}
