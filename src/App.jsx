import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { LanguageProvider, useLanguage, readStoredLang } from './i18n/LanguageContext.jsx'
import { localizePath, stripLang } from './i18n/routes.js'
import { useSeo } from './hooks/useSeo.js'

import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import BendiqSection from './components/BendiqSection.jsx'
import MetaliqTeaser from './components/MetaliqTeaser.jsx'
import Projects from './components/Projects.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Pricing from './components/Pricing.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BlogList from './components/BlogList.jsx'
import BlogPost from './components/BlogPost.jsx'
import MetaliqPage from './components/MetaliqPage.jsx'
import NotFound from './components/NotFound.jsx'
import LangSuggest from './components/LangSuggest.jsx'

/**
 * Rota değişiminde konumlandırma: hash varsa ilgili bölüme, yoksa sayfa
 * başına. Hedefin üstündeki boşluk CSS'teki scroll-margin-top ile verilir
 * (sabit başlık hedefi kapatmasın).
 */
function ScrollManager() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduce ? 'auto' : 'smooth'

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    // Hedef bölüm henüz boyanmamış olabilir — bir kare bekle.
    const frame = window.requestAnimationFrame(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior, block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash, pathname])

  return null
}

/**
 * Kullanıcı daha önce dil seçicisiyle AÇIKÇA bir dil seçtiyse ve başka dilde
 * bir adrese geldiyse, aynı sayfanın kendi dilindeki adresine geçer. Yalnız
 * ilk yüklemede çalışır. Ülke/tarayıcı tahmini burada KULLANILMAZ (öneri
 * olarak LangSuggest'te gösterilir): IP'ye göre otomatik yönlendirme Google'ın
 * tek dil görmesine yol açar; açık seçim ise yalnız o tarayıcıda vardır.
 */
function StoredLangRedirect() {
  const { lang } = useLanguage()
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const stored = readStoredLang()
    if (stored && stored !== lang) {
      navigate({ pathname: localizePath(stripLang(pathname), stored), search, hash }, { replace: true })
    }
    // Yalnız ilk yükleme.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

function SkipLink() {
  const { t } = useLanguage()
  return (
    <a className="skip-link" href="#main">
      {t.nav.skip}
    </a>
  )
}

/**
 * Ana sayfa (kullanıcı kararı 08.10.2026): BENDIQ önde, METALIQ ikinci.
 * Hero (BENDIQ) → BENDIQ faydası → METALIQ kısa tanıtım → teslim edilmiş
 * müşteri projeleri → web/mobil hizmetler → çalışma biçimi → kapsam →
 * iletişim. Zemin ritmi: void → base → raise → base → raise → base → raise → base.
 */
function Home() {
  useSeo({ kind: 'home' })

  return (
    <main id="main">
      <Hero />
      <BendiqSection />
      <MetaliqTeaser />
      <Projects />
      <Services />
      <About />
      <Pricing />
      <Contact id="iletisim" surface="base" />
    </main>
  )
}

/* Her dil için aynı rota ağacı: fr öneksiz, en/tr önekli. */
const PREFIXES = ['', '/en', '/tr']

export function AppShell() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <StoredLangRedirect />
      <SkipLink />
      <Nav />
      <Routes>
        {PREFIXES.flatMap((p) => [
          <Route key={`${p}home`} path={p || '/'} element={<Home />} />,
          <Route key={`${p}metaliq`} path={`${p}/metaliq`} element={<MetaliqPage />} />,
          <Route key={`${p}blog`} path={`${p}/blog`} element={<BlogList />} />,
          <Route key={`${p}post`} path={`${p}/blog/:slug`} element={<BlogPost />} />,
        ])}
        {/* Bilinmeyen adres: sunucu da HTTP 404 döner (wrangler.toml →
            not_found_handling = "404-page"). Ana sayfaya 200 ile düşülmez. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <LangSuggest />
    </LanguageProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
