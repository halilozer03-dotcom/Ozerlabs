import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Beliren-içerik animasyonunun başlangıç (gizli) hâlini yalnızca JS
// gerçekten çalışıyorsa aç. Aksi hâlde bölümler opacity:0'da kalırdı.
if (typeof IntersectionObserver !== 'undefined') {
  document.documentElement.classList.add('js-reveal')
}

// Dil sağlayıcısı App içinde kuruluyor — burada ikinci kez sarmalamaya gerek yok.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
