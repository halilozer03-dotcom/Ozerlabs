import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage, storeLang } from '../i18n/LanguageContext.jsx'
import { languages } from '../i18n/translations.js'
import { localizePath, stripLang } from '../i18n/routes.js'
import { useScrolled, useActiveSection, useBodyScrollLock } from '../hooks/useScrollState.js'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'

/** Menü tek kaynaktan üretilir: masaüstü ve çekmece aynı listeyi kullanır.
    Sıra sayfadaki sıradır: BENDIQ önde, METALIQ kendi sayfasında. */
export const NAV_ITEMS = [
  { key: 'bendiq', section: 'bendiq' },
  { key: 'metaliq', path: '/metaliq' },
  { key: 'projects', section: 'projeler' },
  { key: 'services', section: 'hizmetler' },
  { key: 'about', section: 'hakkimda' },
  { key: 'blog', path: '/blog' },
]

const SECTION_IDS = NAV_ITEMS.filter((i) => i.section).map((i) => i.section)

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Dil seçici GERÇEK bağlantıdır: aynı sayfanın (ürün, yazı, bölüm) diğer
 * dildeki adresine gider; JS olmadan da çalışır, paylaşılabilir ve taranır.
 * Tıklama aynı zamanda açık seçim olarak saklanır.
 */
function LangSwitch({ label, onPick }) {
  const { lang } = useLanguage()
  const { pathname, hash } = useLocation()
  const base = stripLang(pathname)

  return (
    <div className="lang" role="group" aria-label={label}>
      {languages.map((l) => (
        <Link
          key={l.code}
          to={{ pathname: localizePath(base, l.code), hash }}
          className="lang__btn"
          hrefLang={l.code}
          lang={l.code}
          aria-label={l.name}
          aria-current={l.code === lang ? 'true' : undefined}
          onClick={() => {
            storeLang(l.code)
            onPick?.()
          }}
        >
          {l.label}
        </Link>
      ))}
    </div>
  )
}

export default function Nav() {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)
  const closeRef = useRef(null)
  const drawerRef = useRef(null)
  const restoreFocus = useRef(false)

  const base = stripLang(location.pathname)
  const isHome = base === '/'
  const activeSection = useActiveSection(SECTION_IDS, isHome && !open)

  useBodyScrollLock(open)

  // Rota değişince çekmece kapanır (odak hedef sayfada kalır).
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  const close = (refocus) => {
    restoreFocus.current = refocus
    setOpen(false)
  }

  /* Modal davranışı (WCAG 2.4.3 / 2.1.2):
     - açıkken arka plan (#root) `inert`: fare, dokunma, Tab ve ekran okuyucu
       arka plana ulaşamaz. Çekmece body'ye portal ile çizildiği için
       kendisi inert'in dışında kalır.
     - Tab / Shift+Tab çekmece içinde döner (inert tek başına odağı tarayıcı
       arayüzüne bırakırdı; 08.10 denetiminde Shift+Tab arka plandaki başlık
       düğmesine kaçıyordu).
     - Escape kapatır; kapanınca odak açan düğmeye döner. Önce inert kalkar,
       sonra odak verilir — inert öğe odak alamaz. */
  useEffect(() => {
    const root = document.getElementById('root')
    if (!open) {
      if (root) root.inert = false
      if (restoreFocus.current) burgerRef.current?.focus()
      restoreFocus.current = false
      return
    }
    if (root) root.inert = true
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close(true)
        return
      }
      if (e.key !== 'Tab' || !drawerRef.current) return
      const items = [...drawerRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const inside = drawerRef.current.contains(document.activeElement)
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (root) root.inert = false
    }
  }, [open])

  // Şeffaf hâl yalnızca ana sayfanın en tepesinde (koyu hero üstünde) geçerli.
  const solid = !isHome || scrolled || open

  const toTarget = (item) =>
    item.path ? localizePath(item.path, lang) : { pathname: localizePath('/', lang), hash: `#${item.section}` }

  const isCurrent = (item) =>
    item.path ? base.startsWith(item.path) : isHome && activeSection === item.section

  const contactTarget = { pathname: localizePath('/', lang), hash: '#iletisim' }

  const drawer = open
    ? createPortal(
        <div className="drawer" role="dialog" aria-modal="true" aria-label={t.nav.menu} ref={drawerRef}>
          <div className="container drawer__head">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              className="nav__burger"
              aria-expanded="true"
              aria-label={t.nav.close}
              onClick={() => close(true)}
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
                onClick={() => close(false)}
              >
                {t.nav[item.key]}
                <Icon name="chevron-right" size={18} />
              </Link>
            ))}

            <div className="drawer__foot">
              <LangSwitch label={t.nav.language} onPick={() => close(false)} />
              <Link to={contactTarget} className="btn btn--primary btn--full" onClick={() => close(false)}>
                {t.nav.cta}
                <Icon name="arrow-right" size={16} className="btn__icon" />
              </Link>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <header className="nav" data-solid={String(solid)}>
        <div className="container nav__inner">
          <Link to={localizePath('/', lang)} className="brand-link" aria-label={t.nav.home}>
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
            <LangSwitch label={t.nav.language} />

            <Link to={contactTarget} className="btn btn--primary btn--sm nav__cta">
              {t.nav.cta}
              <Icon name="arrow-right" size={16} className="btn__icon" />
            </Link>

            <button
              ref={burgerRef}
              type="button"
              className="nav__burger"
              aria-expanded={open}
              aria-haspopup="dialog"
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
      {drawer}
    </>
  )
}
