import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Sunucuda useLayoutEffect uyarı verir; orada efekt zaten çalışmaz. */
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Görünüme girince beliren içerik — İLK EKRANI ASLA GİZLEMEZ.
 *
 * Eski düzen: main.jsx <html>'e `js-reveal` ekliyor, CSS her .reveal'ı
 * görünene kadar opacity:0 tutuyordu. İçerik artık sunucudan HTML olarak
 * geldiği için bu, ilk ekrandaki metni önce gösterip sonra gizleyip yeniden
 * açardı (yanıp sönme) ve LCP'yi animasyon süresine bağlardı.
 *
 * Yeni düzen: öğe varsayılan olarak GÖRÜNÜR çizilir (sunucu çıktısı da öyle).
 * İstemcide, boyamadan önce (layout effect) yalnızca ekranın ALTINDA kalan
 * öğeler "kurulur" (gizlenir) ve görünüme girince belirir. Ekranda zaten
 * görünen ya da hareket azaltma tercih edilen durumda hiçbir şey gizlenmez.
 *
 * Döner: [ref, durum] — 'static' | 'armed' | 'shown'
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null)
  const [state, setState] = useState('static')

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return
    if (el.getBoundingClientRect().top < window.innerHeight) return // ilk ekranda: dokunma

    setState('armed')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, state]
}
