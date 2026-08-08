import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Öğe görünüme girdiğinde bir kez true döner.
 * rootMargin negatif alt değerle: kart ekranın dibinde belirmez,
 * biraz yukarı geldiğinde tetiklenir — daha doğal his.
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null)
  // Hareket azaltma açıksa animasyonu hiç kurma, doğrudan görünür başlat.
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, visible])

  return [ref, visible]
}
