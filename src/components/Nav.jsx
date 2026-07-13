import { useLanguage } from '../i18n/LanguageContext.jsx'
import { languages } from '../i18n/translations.js'
import { logoIcon } from '../assets/logo.js'

export default function Nav() {
  const { lang, setLang, t } = useLanguage()

  return (
    <nav>
      <a href="#" className="logo">
        <img src={logoIcon} alt="Ozer Labs" className="logo-img" />
      </a>
      <div className="nav-right">
        <div className="nav-links">
          <a href="#hakkimda">{t.nav.about}</a>
          <a href="#hizmetler">{t.nav.services}</a>
          <a href="#projeler">{t.nav.projects}</a>
          <a href="#iletisim">{t.nav.contact}</a>
        </div>
        <div className="lang-switch" role="group" aria-label="Language">
          {languages.map((l) => (
            <button
              key={l.code}
              className={l.code === lang ? 'lang-btn active' : 'lang-btn'}
              onClick={() => setLang(l.code)}
              aria-pressed={l.code === lang}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
