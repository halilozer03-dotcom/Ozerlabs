import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Sayfaların içeriği derlemede ön üretilir (scripts/prerender.mjs): sunucudan
 * gelen HTML başlığı, metni ve bağlantıları zaten taşır. Burada React o
 * HTML'i devralır (hydrate) — yeniden çizmez, içerik ilk boyamadan itibaren
 * yerinde durur.
 *
 * Kök, hangi adres için üretildiğini `data-ssr-path` ile söyler. Adres
 * eşleşmiyorsa (404.html her bilinmeyen adreste sunulur; vite dev'de kök
 * boştur) devralma yerine temiz çizim yapılır: yanlış HTML'i devralmaya
 * çalışmak hidrasyon hatası üretirdi.
 */
const root = document.getElementById('root')
const here = window.location.pathname.replace(/\/+$/, '') || '/'
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (root.dataset.ssrPath === here && root.firstElementChild) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
