import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { languages } from '../i18n/translations.js'
import { useScrolled, useActiveSection, useBodyScrollLock } from '../hooks/useScrollState.js'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'

/** Menü tek kaynaktan üretilir: masaüstü ve çekmece aynı listeyi kullanır. */
export const NAV_ITEMS = [
  { key: 'services', section: 'hizmetler' },
  { key: 'solutions', section: 'cozumler' },
  { key: 'projects', section: 'projeler' },
  { key: 'about', section: 'hakkimda' },
  { key: 'pricing', section: 'fiyatlandirma' },
  { key: 'blog', path: '/blog' },
]

const SECTION_IDS = NAV_ITEMS.filter((i) => i.section).map((i) => i.section)

const toTarget = (item) =>
  item.path ? item.path : { pathname: '/', hash: `#${item.section}` }

export default function Nav() {
  const { lang, setLang, t } = useLanguage()
  const location = useLocation()
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)
  const closeRef = useRef(null)

  const isHome = location.pathname === '/'
  const activeSection = useActiveSection(SECTION_IDS, isHome && !open)

  useBodyScrollLock(open)

  // Rota değişince çekmece kapanır.
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  // Escape ile kapat; kapanınca odak hamburgere döner.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Şeffaf hâl yalnızca ana sayfanın en tepesinde (koyu hero üstünde) geçerli.
  const solid = !isHome || scrolled || open

  const isCurrent = (item) =>
    item.path ? location.pathname.startsWith(item.path) : isHome && activeSection === item.section

  const langSwitch = (
    <div className="lang" role="group" aria-label="Language">
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          className="lang__btn"
          onClick={() => setLang(l.code)}
          aria-pressed={l.code === lang}
        >
          {l.label}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <header className="nav" data-solid={String(solid)}>
        <div className="container nav__inner">
          <Link to="/" className="brand-link" aria-label={t.nav.home}>
            <Logo />
          </Link>

          <nav className="nav__links" aria-label={t.nav.menu}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={toTarget(item)}
                className="nav__link"
                aria-current={isCurrent(item) ? 'true' : undefined}
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="nav__right">
            {langSwitch}

            <Link
              to={{ pathname: '/', hash: '#iletisim' }}
              className="btn btn--primary btn--sm nav__cta"
            >
              {t.nav.cta}
              <Icon name="arrow-right" size={16} className="btn__icon" />
            </Link>

            <button
              ref={burgerRef}
              type="button"
              className="nav__burger"
              aria-expanded={open}
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label={t.nav.menu}>
          <div className="container drawer__head">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              className="nav__burger"
              aria-expanded="true"
              aria-label={t.nav.close}
              onClick={() => setOpen(false)}
            >
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>

          <div className="container drawer__body">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={toTarget(item)}
                className="drawer__link"
                aria-current={isCurrent(item) ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {t.nav[item.key]}
                <Icon name="chevron-right" size={18} />
              </Link>
            ))}

            <div className="drawer__foot">
              {langSwitch}
              <Link
                to={{ pathname: '/', hash: '#iletisim' }}
                className="btn btn--primary btn--full"
                onClick={() => setOpen(false)}
              >
                {t.nav.cta}
                <Icon name="arrow-right" size={16} className="btn__icon" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
