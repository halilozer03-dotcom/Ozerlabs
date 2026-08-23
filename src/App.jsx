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
import { LEGACY_SLUGS } from './content/redirects.js'
import { useDocumentMeta } from './hooks/useDocumentMeta.js'

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

/**
 * Hiçbir rota eşleşmediğinde devreye girer (bilinmeyen adres — Cloudflare SPA
 * fallback yüzünden uygulama yine de açılır). Ekrana hiçbir şey basmaz;
 * bilinmeyen adresin gövde davranışı bugünküyle birebir aynı kalır. Tek işi
 * sekmede bir önceki sayfanın başlığının kalmasını engellemek: sitenin
 * varsayılan başlığını ziyaretçinin dilinde yazar. Böylece HER rota durumunda
 * başlığın tek ve belirli bir sahibi olur.
 */
function DefaultMeta() {
  const { t } = useLanguage()
  useDocumentMeta(t.meta?.title, t.meta?.description)
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
  const { t } = useLanguage()

  /* Sunucudan gelen kabuk fr'dir (index.html). Ziyaretçi başka bir dildeyse
     sekmedeki başlık ve arama sonucu açıklaması da o dile geçmeli — bugüne
     kadar yalnızca <html lang> değişiyordu. Blog sayfaları da aynı hook'u
     kullanır; başlığı yazan tek yer odur. Optional chaining bilerek: eksik
     bir çeviri anahtarı en fazla başlığın güncellenmemesine yol açsın, ASLA
     uygulamayı düşürüp beyaz ekran vermesin. */
  useDocumentMeta(t.meta?.title, t.meta?.description)

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
          {/* Adresi değişmiş yazılar yenisine yönlendirilir: paylaşılmış
              bağlantılar ve arama sonuçları kırılmaz. Liste tek kaynaktan
              (src/content/redirects.js) gelir; aynı listeden derleme anında
              eski adres için kanonik hedefi doğru gösteren statik sayfa da
              üretilir. */}
          {Object.entries(LEGACY_SLUGS).map(([oldSlug, newSlug]) => (
            <Route
              key={oldSlug}
              path={`/blog/${oldSlug}`}
              element={<Navigate to={`/blog/${newSlug}`} replace />}
            />
          ))}
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Yalnızca <head> sahipliği için — gövde çıktısı yok, bkz. DefaultMeta.
              404 sayfası EKLEMEZ: bilinmeyen adresin görünen davranışı aynı kalır. */}
          <Route path="*" element={<DefaultMeta />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  )
}
