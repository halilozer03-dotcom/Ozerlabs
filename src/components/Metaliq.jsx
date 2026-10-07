import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { METALIQ_MEDIA } from '../content/metaliq.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'

/**
 * Tanıtım videosu: sessiz döngü, yalnız görünürken oynar.
 * preload="none" — sayfanın ilk yüklemesine tek bayt eklemez; ilk play()
 * çağrısında iner. Hareket azaltma tercihinde kendiliğinden oynamaz.
 * Ziyaretçi kendisi durdurursa bir daha otomatik başlatılmaz.
 */
function DemoVideo({ label }) {
  const ref = useRef(null)
  const { video } = METALIQ_MEDIA

  useEffect(() => {
    const v = ref.current
    if (!v) return
    // React `muted` özniteliğini DOM'a yazmıyor; sessiz otomatik oynatma
    // politikası özelliği okuduğu için elle verilir.
    v.muted = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return

    let ownPause = false
    let userStopped = false
    const onPause = () => {
      if (!ownPause) userStopped = true
      ownPause = false
    }
    v.addEventListener('pause', onPause)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (userStopped) return
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else if (!v.paused) {
          ownPause = true
          v.pause()
        }
      },
      { threshold: 0.5 }
    )
    io.observe(v)
    return () => {
      io.disconnect()
      v.removeEventListener('pause', onPause)
    }
  }, [])

  return (
    <video
      ref={ref}
      className="metaliq__video"
      src={video.src}
      poster={video.poster}
      width={video.width}
      height={video.height}
      aria-label={label}
      controls
      loop
      playsInline
      preload="none"
    />
  )
}

/**
 * METALIQ — kendi ürünümüz, ücretli verilecek. Canlı araca bağlantı YOK
 * (kullanıcı kararı); tanıtım burada, ana sayfanın üst kısmında yapılır.
 *
 * Ana mesaj: basit bir 3D görsel değil — atölyeye giden belgeler.
 * Sıra: video + çıktılar → gerçek kesim listesi + belge sayfaları →
 * 11 iş türü → denetimler ve sınırlar → tek eylem (demo iste).
 *
 * Sayılar aracın gerçek çıktısından ölçüldü (2000 mm korkuluk, 07.10.2026);
 * araç değişirse translations.js → metaliq.example üç dilde birlikte
 * güncellenir. "AutoCAD entegre" gibi test edilmemiş iddia yazılmaz:
 * yazılan, DXF'in biçimi (R12, mm, katmanlar).
 *
 * Birincil buton istisnası: sayfadaki ikisi (hero, iletişim) web işi
 * içindir; bu bölümün eylemi ayrı bir ürünün demosudur.
 */
export default function Metaliq() {
  const { t } = useLanguage()
  const m = t.metaliq
  const { tiles, docs } = METALIQ_MEDIA

  return (
    <section id="metaliq" className="section metaliq" data-surface="raise" aria-labelledby="metaliq-title">
      <div className="container">
        <SectionHead id="metaliq-title" eyebrow={m.eyebrow} title={m.title} sub={m.sub} />

        {/* ---------- Video + atölyeye giden belgeler ---------- */}
        <div className="metaliq__lead">
          <Reveal className="metaliq__stage">
            <DemoVideo label={m.video} />
          </Reveal>

          <Reveal className="metaliq__outputs" delay={90}>
            <h3 className="metaliq__h">{m.outputsTitle}</h3>
            <ul className="metaliq__output-list">
              {m.outputs.map((o) => (
                <li className="metaliq__output" key={o.icon}>
                  <span className="icon-badge icon-badge--sm">
                    <Icon name={o.icon} size={21} />
                  </span>
                  <div className="metaliq__output-body">
                    <h4 className="metaliq__output-title">
                      {o.title}
                      <span className="tag">{o.formats}</span>
                    </h4>
                    <p className="metaliq__output-text">{o.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------- Kanıt: gerçek kesim listesi + belge sayfaları ---------- */}
        <div className="metaliq__proof">
          <Reveal className="metaliq__example">
            <h3 className="metaliq__h">{m.example.title}</h3>
            {/* Dar ekranda tablo kendi içinde kayar; sayfa yatay taşmaz. */}
            <div className="metaliq__table-wrap" tabIndex={0} role="region" aria-label={m.example.caption}>
              <table className="cutlist">
                <caption>{m.example.caption}</caption>
                <thead>
                  <tr>
                    {m.example.cols.map((c, i) => (
                      <th scope="col" key={c} className={i >= 3 ? 'cutlist__num' : undefined}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {m.example.rows.map(([mark, part, profile, length, qty]) => (
                    <tr key={mark}>
                      <th scope="row" className="cutlist__mark">
                        {mark}
                      </th>
                      <td>{part}</td>
                      <td className="cutlist__mono">{profile}</td>
                      <td className="cutlist__num cutlist__data">{length}</td>
                      <td className="cutlist__num">{qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="metaliq__example-note">{m.example.note}</p>
          </Reveal>

          <Reveal className="metaliq__docs" delay={90}>
            <h3 className="metaliq__h">{m.docs.title}</h3>
            <ul className="metaliq__doc-grid">
              {m.docs.items.map((d) => {
                const media = docs[d.key]
                return (
                  <li key={d.key}>
                    {/* Tam sayfa yeni sekmede: ziyaretçi ölçüleri okuyabilsin. */}
                    <a className="metaliq__doc" href={media.full} target="_blank" rel="noopener noreferrer">
                      <img
                        src={media.src}
                        alt={d.alt}
                        width={media.width}
                        height={media.height}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="metaliq__doc-caption">
                        {d.caption}
                        <Icon name="arrow-up-right" size={15} />
                        <span className="sr-only"> ({m.docs.open})</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        {/* ---------- 11 iş türü ---------- */}
        <Reveal className="metaliq__types">
          <h3 className="metaliq__h">{m.types.title}</h3>
          <ul className="metaliq__type-grid">
            {tiles.map((tile) => (
              <li key={tile.key}>
                <figure className="metaliq__type">
                  <img
                    src={tile.src}
                    alt=""
                    width={tile.width}
                    height={tile.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{m.types.items[tile.key]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------- Denetimler, sınırlar ve tek eylem ---------- */}
        <div className="metaliq__close">
          <Reveal className="metaliq__checks">
            <h3 className="metaliq__h">{m.checks.title}</h3>
            <ul className="metaliq__check-list">
              {m.checks.items.map((c) => (
                <li key={c}>
                  <Icon name="check" size={18} className="metaliq__check" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="metaliq__cta" delay={90}>
            <Link to={{ pathname: '/', hash: '#iletisim' }} className="btn btn--primary btn--full">
              {m.cta}
              <Icon name="arrow-right" size={16} className="btn__icon" />
            </Link>
            <p className="metaliq__licence">{m.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
