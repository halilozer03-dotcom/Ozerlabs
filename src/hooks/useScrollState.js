import { useEffect, useState } from 'react'

/** Sayfa belirli bir eşiği geçtiğinde true — navigasyonun camlaşması için. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}

/**
 * Verilen bölüm id'lerinden hangisinin ekranda olduğunu döner.
 * Sabit başlığın altında kalan kısım rootMargin ile dışlanır.
 */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setActive('')
      return
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        })

        // En çok görünen bölüm kazanır; hiçbiri yoksa vurgu kalkar.
        //
        // İç içe bölümlerde içteki önceliklidir: "Çözümler" bloğu
        // "Hizmetler" bölümünün içinde duruyor, dıştaki bölüm onun
        // vurgusunu çalmamalı. Kapsanan bölüme sabit bir öncelik payı
        // verilir, böylece oran karşılaştırması onu geçemez.
        const gorunurIdler = [...visible.keys()]
        let best = ''
        let bestScore = 0
        visible.forEach((ratio, id) => {
          const el = document.getElementById(id)
          const kapsanmis = gorunurIdler.some(
            (digeri) => digeri !== id && document.getElementById(digeri)?.contains(el)
          )
          const score = kapsanmis ? ratio + 1 : ratio
          if (score > bestScore) {
            bestScore = score
            best = id
          }
        })
        setActive(best)
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: [0.01, 0.25, 0.6] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}

/** Mobil çekmece açıkken arkadaki sayfanın kaymasını engeller. */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [locked])
}
