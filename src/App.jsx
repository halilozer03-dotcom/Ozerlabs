import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext.jsx'

import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import TechStrip from './components/TechStrip.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Pricing from './components/Pricing.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BlogList from './components/BlogList.jsx'
import BlogPost from './components/BlogPost.jsx'

/**
 * Rota değişiminde konumlandırma:
 * hash varsa ilgili bölüme, yoksa sayfa başına.
 * Hedefin üstündeki boşluk CSS'teki scroll-margin-top ile verilir.
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
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior, block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash, pathname])

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
 * Ana sayfa yedi bölüm:
 * Hero (teknoloji şeridi gömülü) → Hizmetler → Projeler →
 * Çalışma biçimi (eski Hakkımızda + Süreç) → Kapsam →
 * İletişim (eski CTA bandı burada) → Footer (son yazılar burada).
 *
 * Blog önizlemesi ana sayfadan indi: ziyaretçiyi dönüşümden
 * uzaklaştıran tek bölümdü. Yazılar navigasyonda ve footer'da.
 */
function Home() {
  return (
    <main id="main">
      <Hero />
      <TechStrip />
      <Services />
      <Projects />
      <About />
      <Pricing />
      <Contact />
    </main>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollManager />
        <SkipLink />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          {/* Ürün adı BENDIQ olunca yazının adresi de değişti.
              Eski adres kalıcı olarak yenisine yönlendirilir:
              paylaşılmış bağlantılar ve arama sonuçları kırılmaz. */}
          <Route
            path="/blog/ozer-bend-pro-hikayesi"
            element={<Navigate to="/blog/bendiq-hikayesi" replace />}
          />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  )
}
