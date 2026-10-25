import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PLAY_BENDIQ } from '../content/links.js'
import { bendiqGuide, guideSrc, GUIDE_SHOT_W, GUIDE_SHOT_H } from '../content/bendiqGuide.js'
import { GUIDE_MARKERS } from '../content/bendiqGuideMarkers.js'
import { bendiqMeasure } from '../content/bendiqMeasure.js'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'

const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
const BLOG_CALIB = '/blog/perte-au-pli-pli-essai'

/** Gerçek uygulama karesi + numaralı işaretler (yerleri çekimde ölçüldü). */
function GuideShot({ lang, shot, alt, eager = false, plain = false }) {
  const marks = plain ? [] : GUIDE_MARKERS[lang]?.[shot] || []
  return (
    <figure className="bq-shotframe">
      <img
        src={guideSrc(lang, shot)}
        alt={alt}
        width={GUIDE_SHOT_W}
        height={GUIDE_SHOT_H}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      {marks.map(([x, y], i) => (
        <span className="bq-mark" style={{ left: `${x}%`, top: `${y}%` }} key={i} aria-hidden="true">
          {i + 1}
        </span>
      ))}
    </figure>
  )
}

/** Numaralı madde listesi: kare işaret taşıyorsa numara, taşımıyorsa madde imi. */
function Legend({ lang, shot, items }) {
  const numbered = (GUIDE_MARKERS[lang]?.[shot] || []).length > 0
  if (!items.length) return null
  return numbered ? (
    <ol className="bq-legend">
      {items.map((it, i) => (
        <li key={i}>
          <span className="bq-legend__n" aria-hidden="true">
            {i + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  ) : (
    <ul className="bq-points bq-legend--plain">
      {items.map((it, i) => (
        <li key={i}>
          <Icon name="check" size={16} className="bq-points__icon" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

/* Atölye adımlarının çizimi. Ölçü düzeni kılavuz metniyle aynı: L kesilen
   boy, a ve b dış köşeden; sayılar kalibrasyon örneğidir (100 / 51,7 / 51,8). */
function Diagram({ kind, labels, lang }) {
  const dec = (v) => (lang === 'en' ? v : v.replace('.', ','))
  const common = { className: 'bq-diagram', viewBox: '0 0 320 240', role: 'img' }
  if (kind === 'strip') {
    return (
      <svg {...common} aria-label={`L = 100 mm — ${labels.cut}`}>
        <rect x="30" y="100" width="260" height="24" className="bq-dg-sheet" />
        <line x1="160" y1="88" x2="160" y2="136" className="bq-dg-dash" />
        <text x="160" y="80" className="bq-dg-note">{labels.line}</text>
        <line x1="30" y1="160" x2="290" y2="160" className="bq-dg-dim" markerStart="url(#bqA)" markerEnd="url(#bqA)" />
        <line x1="30" y1="128" x2="30" y2="168" className="bq-dg-ext" />
        <line x1="290" y1="128" x2="290" y2="168" className="bq-dg-ext" />
        <text x="160" y="184" className="bq-dg-val">L = 100 mm</text>
        <text x="160" y="206" className="bq-dg-note">{labels.cut}</text>
        <Arrow />
      </svg>
    )
  }
  if (kind === 'bend') {
    return (
      <svg {...common} aria-label="90°">
        <path d="M60 200 L60 70 M60 200 L240 200" className="bq-dg-part" />
        <path d="M60 170 A30 30 0 0 0 90 200" className="bq-dg-angle" />
        <text x="104" y="178" className="bq-dg-val bq-dg-left">90°</text>
        <path d="M200 60 L240 20 L280 60 Z" className="bq-dg-tool" />
        <text x="240" y="84" className="bq-dg-note">1×</text>
      </svg>
    )
  }
  if (kind === 'measure') {
    return (
      <svg {...common} aria-label={`a, b — ${labels.outer}`}>
        <path d="M70 200 L70 60" className="bq-dg-part" />
        <path d="M70 200 L240 200" className="bq-dg-part" />
        <circle cx="66" cy="204" r="5" className="bq-dg-dot" />
        <text x="84" y="188" className="bq-dg-note bq-dg-left">{labels.outer}</text>
        <line x1="36" y1="60" x2="36" y2="204" className="bq-dg-dim bq-dg-a" markerStart="url(#bqA)" markerEnd="url(#bqA)" />
        <line x1="30" y1="60" x2="64" y2="60" className="bq-dg-ext" />
        <line x1="30" y1="204" x2="60" y2="204" className="bq-dg-ext" />
        <text x="22" y="136" className="bq-dg-val">a</text>
        <line x1="66" y1="226" x2="240" y2="226" className="bq-dg-dim bq-dg-b" markerStart="url(#bqA)" markerEnd="url(#bqA)" />
        <line x1="66" y1="210" x2="66" y2="234" className="bq-dg-ext" />
        <line x1="240" y1="206" x2="240" y2="234" className="bq-dg-ext" />
        <text x="153" y="218" className="bq-dg-val">b</text>
        <text x="210" y="110" className="bq-dg-note">a = {dec('51.7')}</text>
        <text x="210" y="132" className="bq-dg-note">b = {dec('51.8')}</text>
        <Arrow />
      </svg>
    )
  }
  return (
    <svg {...common} aria-label={`BD = a + b − L = ${dec('3.50')} mm`}>
      <text x="160" y="92" className="bq-dg-big">BD = a + b − L</text>
      <text x="160" y="140" className="bq-dg-note">{labels.example}</text>
      <text x="160" y="172" className="bq-dg-val">
        {dec('51.7')} + {dec('51.8')} − 100 = {dec('3.50')} mm
      </text>
    </svg>
  )
}

function Arrow() {
  return (
    <defs>
      <marker id="bqA" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" className="bq-dg-head" />
      </marker>
    </defs>
  )
}

/**
 * Tam ekran tur (kalibrasyon ve "Makineyi ölç" aynı bileşen) — adım adım.
 * Etiket `c.tags[s.tag]` varsa ondan, yoksa atölye / uygulama. role="dialog" + Escape + odak
 * dönüşü (çekmeceyle aynı sözleşme); ← / → ile adım değişir. Sayfa kaydırması
 * açıkken kilitlenir.
 */
function CalibTour({ lang, c, onClose }) {
  const [i, setI] = useState(0)
  const n = c.steps.length
  const s = c.steps[i]
  const closeRef = useRef(null)
  const bodyRef = useRef(null)

  const go = useCallback((d) => setI((v) => Math.min(n - 1, Math.max(0, v + d))), [n])

  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [go, onClose])

  // Yeni adım baştan okunur.
  useEffect(() => {
    bodyRef.current?.scrollTo?.(0, 0)
  }, [i])

  return (
    <div className="bq-tour" role="dialog" aria-modal="true" aria-labelledby="bq-tour-title">
      <div className="bq-tour__head">
        <div className="bq-tour__titles">
          <span className="bq-tour__title" id="bq-tour-title">
            {c.title}
          </span>
          <span className="bq-tour__count" aria-live="polite">
            {fill(c.step, { i: i + 1, n })}
          </span>
        </div>
        <button type="button" className="btn btn--ghost bq-tour__close" onClick={onClose} ref={closeRef}>
          <Icon name="close" size={18} />
          {c.close}
        </button>
      </div>
      <div className="bq-tour__bar" aria-hidden="true">
        <span style={{ width: `${((i + 1) / n) * 100}%` }} />
      </div>

      <div className="bq-tour__body" ref={bodyRef}>
        <div className="bq-tour__visual">
          {s.diagram ? (
            <Diagram kind={s.diagram} labels={c.labels} lang={lang} />
          ) : (
            <GuideShot lang={lang} shot={s.shot} alt={s.title} eager />
          )}
        </div>
        <div className="bq-tour__copy">
          <span className={`tag bq-tour__tag${s.tag === 'shop' ? ' bq-tour__tag--shop' : ''}`}>
            {c.tags?.[s.tag] ?? (s.tag === 'shop' ? c.shop : c.app)}
          </span>
          <h3 className="bq-tour__h">{s.title}</h3>
          <p className="bq-tour__text">{s.text}</p>
          {s.shot && <Legend lang={lang} shot={s.shot} items={s.items} />}
          {i === n - 1 && (
            <div className="bq-tour__tips">
              <h4>{c.tips.title}</h4>
              <ul className="bq-points">
                {c.tips.items.map((t) => (
                  <li key={t}>
                    <Icon name="check" size={16} className="bq-points__icon" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              {c.tips.more && (
                <Link to={BLOG_CALIB} className="bq-tour__more" onClick={onClose}>
                  {c.tips.more}
                  <Icon name="arrow-right" size={16} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bq-tour__foot">
        <button type="button" className="btn btn--secondary" onClick={() => go(-1)} disabled={i === 0}>
          <Icon name="chevron-right" size={18} className="bq-flip" />
          {c.prev}
        </button>
        {i < n - 1 ? (
          <button type="button" className="btn btn--secondary bq-tour__next" onClick={() => go(1)}>
            {c.next}
            <Icon name="chevron-right" size={18} />
          </button>
        ) : (
          <button type="button" className="btn btn--secondary bq-tour__next" onClick={onClose}>
            <Icon name="check" size={18} />
            {c.finish}
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Kullanım kılavuzu — /bendiq sayfasında "kanıt" halkası: gerçek ekranlar,
 * her tuşun işi. Bölümler sekme, bölüm içinde ekranlar tek tek. Kalibrasyon
 * ayrı, tam ekran tur olarak açılır (kullanıcı isteği 25.10.2026); "Makineyi
 * ölç" de öyle: uygulamanın 19 ölçüsü gerçek karelerle tek tek (25.10.2026).
 * Sayfanın birincil butonları değişmez; buradaki Play bağlantısı ikincildir.
 */
export default function BendiqGuide({ lang }) {
  const g = bendiqGuide[lang] || bendiqGuide.fr
  const mm = bendiqMeasure[lang] || bendiqMeasure.fr
  const [ch, setCh] = useState(0)
  const [sc, setSc] = useState(0)
  const [tour, setTour] = useState(null)
  const opener = useRef(null)
  const tabRefs = useRef([])

  const chapter = g.chapters[ch]
  const tourOf = (c) => (c.measure ? mm : g.calib)
  const screens = chapter.screens
  const screen = screens[Math.min(sc, screens.length - 1)]

  const pick = (k) => {
    setCh(k)
    setSc(0)
  }
  const onTabKey = (e) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const k = (ch + d + g.chapters.length) % g.chapters.length
    pick(k)
    tabRefs.current[k]?.focus()
  }
  const closeTour = useCallback(() => {
    setTour(null)
    opener.current?.focus()
  }, [])

  return (
    <section className="section" data-surface="base" aria-labelledby="bq-guide" id="kilavuz">
      <div className="container">
        <SectionHead id="bq-guide" eyebrow={g.head.eyebrow} title={g.head.title} sub={g.head.sub} />

        <div className="bq-tabs" role="tablist" aria-label={g.ui.tabs} onKeyDown={onTabKey}>
          {g.chapters.map((c, k) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`bq-tab-${c.id}`}
              aria-selected={k === ch}
              aria-controls="bq-guide-panel"
              tabIndex={k === ch ? 0 : -1}
              className={`bq-tab${k === ch ? ' is-active' : ''}${c.calib || c.measure ? ' bq-tab--calib' : ''}`}
              onClick={() => pick(k)}
              ref={(el) => (tabRefs.current[k] = el)}
            >
              <span className="bq-tab__n">{k + 1}</span>
              {c.tab}
            </button>
          ))}
        </div>

        <div className="bq-guide" role="tabpanel" id="bq-guide-panel" aria-labelledby={`bq-tab-${chapter.id}`}>
          {chapter.calib || chapter.measure ? (
            <div className="bq-guide__grid">
              <div className="bq-guide__visual">
                <GuideShot lang={lang} shot={tourOf(chapter).preview} alt={tourOf(chapter).title} plain />
              </div>
              <div className="bq-guide__lead">
                <h3 className="bq-guide__h">{chapter.tab}</h3>
                <p className="bq-guide__intro">{chapter.intro}</p>
                <button
                  type="button"
                  className="bq-calibcta"
                  onClick={() => setTour(chapter.measure ? 'measure' : 'calib')}
                  ref={opener}
                  aria-haspopup="dialog"
                >
                  <span className="bq-calibcta__icon">
                    <Icon name="play" size={20} />
                  </span>
                  <span className="bq-calibcta__txt">
                    <strong>{tourOf(chapter).cta}</strong>
                    <small>{tourOf(chapter).ctaSub}</small>
                  </span>
                </button>
              </div>
              <div className="bq-guide__copy">
                <ol className="bq-legend">
                  {tourOf(chapter).summary.map((it, i) => (
                    <li key={i}>
                      <span className="bq-legend__n bq-legend__n--soft" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div className="bq-guide__grid">
              <div className="bq-guide__visual">
                <GuideShot
                  lang={lang}
                  shot={screen.shot}
                  alt={fill(g.ui.shotAlt, { t: screen.title })}
                  key={`${lang}-${screen.shot}`}
                />
                {screens.length > 1 && (
                  <div className="bq-pager">
                    <button
                      type="button"
                      className="bq-pager__btn"
                      onClick={() => setSc((v) => Math.max(0, v - 1))}
                      disabled={sc === 0}
                      aria-label={g.ui.prev}
                    >
                      <Icon name="chevron-right" size={18} className="bq-flip" />
                    </button>
                    <span className="bq-pager__txt" aria-live="polite">
                      {fill(g.ui.screen, { i: sc + 1, n: screens.length })}
                    </span>
                    <button
                      type="button"
                      className="bq-pager__btn"
                      onClick={() => setSc((v) => Math.min(screens.length - 1, v + 1))}
                      disabled={sc === screens.length - 1}
                      aria-label={g.ui.next}
                    >
                      <Icon name="chevron-right" size={18} />
                    </button>
                  </div>
                )}
              </div>
              <div className="bq-guide__lead">
                <h3 className="bq-guide__h">{screen.title}</h3>
                {sc === 0 && <p className="bq-guide__intro">{chapter.intro}</p>}
              </div>
              <div className="bq-guide__copy">
                <Legend lang={lang} shot={screen.shot} items={screen.items} />
              </div>
            </div>
          )}
        </div>

        <div className="bq-guide__end">
          <p>{g.end.text}</p>
          <a className="btn btn--secondary" href={PLAY_BENDIQ} target="_blank" rel="noopener noreferrer">
            {g.end.cta}
            <Icon name="arrow-up-right" size={16} className="btn__icon" />
          </a>
        </div>
      </div>

      {tour && <CalibTour lang={lang} c={tour === 'measure' ? mm : g.calib} onClose={closeTour} key={tour} />}
    </section>
  )
}
