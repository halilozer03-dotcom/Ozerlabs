import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useBodyScrollLock } from '../hooks/useScrollState.js'
import { SHOWCASE_MEDIA } from '../content/showcases.js'
import Icon from './Icon.jsx'

/**
 * Bağlantı verilmeyen (ücretli) ürünün tanıtım penceresi: gerçek ekrandan
 * video + görseller, kısa açıklama ve tek eylem (demo iste → iletişim).
 *
 * Erişilebilirlik çekmeceyle aynı sözleşmede: role="dialog", Escape ile
 * kapanır, açılınca odak Kapat düğmesine gider, Tab pencerenin içinde
 * döner, kapanınca odak kartın düğmesine geri döner (Projects.jsx).
 *
 * Video yalnızca pencere açıkken DOM'da durur — sayfanın ilk yüklemesine
 * tek bayt eklemez. Hareket azaltma tercihi varsa kendiliğinden oynamaz.
 */
export default function ProjectShowcase({ project, labels, onClose }) {
  const s = project.showcase
  const media = SHOWCASE_MEDIA[s.media]
  const [active, setActive] = useState(-1) // -1 = video, 0.. = görsel sırası
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const videoRef = useRef(null)
  // Kapatma işlevi ref'te: üst bileşen her çizimde yeni işlev verse de
  // aşağıdaki etki yeniden kurulmaz, odak Kapat düğmesine geri sıçramaz.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useBodyScrollLock(true)

  useEffect(() => {
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // React `muted` özniteliğini DOM'a yazmıyor; sessiz otomatik oynatma
  // tarayıcı politikası özelliği okuduğu için elle verilir.
  useEffect(() => {
    const v = videoRef.current
    if (!v || active !== -1) return
    v.muted = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) v.play().catch(() => {})
  }, [active])

  const goContact = () => {
    onClose({ returnFocus: false })
    // Adres zaten #iletisim ise rota değişmez ve kaydırma tetiklenmez.
    window.requestAnimationFrame(() => {
      document.getElementById('iletisim')?.scrollIntoView({ block: 'start' })
    })
  }

  const current = active === -1 ? null : media.images[active]

  // body'ye taşınır: bölümün içindeki bir dönüşüm (transform) fixed
  // konumlamayı o öğeye bağlayıp pencereyi kaydırırdı.
  return createPortal(
    <div className="showcase" role="dialog" aria-modal="true" aria-labelledby="showcase-title">
      <div className="showcase__backdrop" onClick={() => onClose()} aria-hidden="true" />

      <div className="showcase__panel" ref={panelRef}>
        <header className="showcase__head">
          <div className="showcase__heading">
            <span className="tag tag--brand">{project.tag}</span>
            <h2 id="showcase-title" className="showcase__title">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="showcase__close"
            aria-label={labels.close}
            onClick={() => onClose()}
          >
            <Icon name="close" size={22} />
          </button>
        </header>

        <div className="showcase__body">
          <div className="showcase__gallery">
            <div className="showcase__media">
              {current ? (
                <img
                  key={current.key}
                  src={current.src}
                  alt={s.alts[current.key]}
                  width={current.width}
                  height={current.height}
                  decoding="async"
                />
              ) : (
                <video
                  key="video"
                  ref={videoRef}
                  src={media.video.src}
                  poster={media.video.poster}
                  width={media.video.width}
                  height={media.video.height}
                  aria-label={s.video}
                  controls
                  loop
                  playsInline
                  preload="auto"
                />
              )}
            </div>

            <ul className="showcase__thumbs" aria-label={labels.media}>
              <li>
                <button
                  type="button"
                  className="showcase__thumb"
                  aria-pressed={active === -1}
                  aria-label={labels.videoTab}
                  onClick={() => setActive(-1)}
                >
                  <img src={media.video.poster} alt="" width="480" height="331" loading="lazy" decoding="async" />
                  <span className="showcase__thumb-play">
                    <Icon name="play" size={18} />
                  </span>
                </button>
              </li>
              {media.images.map((im, i) => (
                <li key={im.key}>
                  <button
                    type="button"
                    className="showcase__thumb"
                    aria-pressed={active === i}
                    aria-label={s.alts[im.key]}
                    onClick={() => setActive(i)}
                  >
                    <img
                      src={im.thumb}
                      alt=""
                      width="480"
                      height={Math.round((480 * im.height) / im.width)}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="showcase__text">
            <p className="showcase__lead">{s.lead}</p>
            <ul className="showcase__points">
              {s.points.map((p) => (
                <li key={p}>
                  <Icon name="check" size={18} className="showcase__check" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="showcase__action">
              <Link
                to={{ pathname: '/', hash: '#iletisim' }}
                className="btn btn--primary btn--full"
                onClick={goContact}
              >
                {labels.cta}
                <Icon name="arrow-right" size={16} className="btn__icon" />
              </Link>
              <p className="showcase__note">{s.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
