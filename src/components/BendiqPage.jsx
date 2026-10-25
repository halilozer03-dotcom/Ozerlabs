import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { PLAY_BENDIQ } from '../content/links.js'
import {
  bendiqPage,
  MS_STORE_BENDIQ,
  BENDIQ_SHOTS,
  shotSrc,
  SHOT_W,
  SHOT_H,
} from '../content/bendiqPage.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'
import BendiqGuide from './BendiqGuide.jsx'

/** Dışarı (mağazaya) giden bağlantı: yeni sekme, ok ikonu. */
function StoreLink({ href, className, children }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <Icon name="arrow-up-right" size={16} className="btn__icon" />
    </a>
  )
}

/**
 * BENDIQ tanıtım sayfası — /bendiq. Yalnız BENDIQ'i anlatır (kullanıcı
 * isteği 25.10.2026): ne olduğu, sahadaki faydası, ekranlar, Android /
 * Windows / web modu, 12 aylık yol haritası.
 *
 * Akış (karar sırası): ne yapar (hero) → kullanım kılavuzu (gerçek ekranlar,
 * her tuş; kullanıcı isteğiyle en üstte) → almazsa ne kaybeder (maliyet) →
 * nasıl çalışır → hangi ekranda → kim ne kazanır →
 * sınırlar (güven) → yol haritası → itirazlar (SSS) → tek eylem.
 *
 * Birincil buton sayfada iki kez ve aynı hedefe gider: Google Play denemesi.
 * Windows bağlantısı ikincil; web modu yayında olmadığı için bağlantısızdır.
 * Metin ve doğrulama notları: src/content/bendiqPage.js.
 */
export default function BendiqPage() {
  const { lang } = useLanguage()
  const p = bendiqPage[lang] || bendiqPage.fr

  // Başlığın sahibi rota (bkz. hooks/useDocumentMeta.js).
  useDocumentMeta(p.meta?.title, p.meta?.description)

  const pf = p.platforms

  return (
    <main id="main" className="bq">
      {/* ---------- Hero ---------- */}
      <section className="hero bq-hero" data-surface="void" aria-labelledby="bq-title">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">{p.hero.eyebrow}</span>
            <h1 className="hero__title" id="bq-title">
              {p.hero.title} <span className="accent">{p.hero.accent}</span>
            </h1>
            <p className="hero__sub">{p.hero.sub}</p>

            <div className="hero__actions">
              <StoreLink href={PLAY_BENDIQ} className="btn btn--primary">
                {p.hero.ctaPlay}
              </StoreLink>
              <StoreLink href={MS_STORE_BENDIQ} className="btn btn--secondary">
                {p.hero.ctaWindows}
              </StoreLink>
            </div>

            <ul className="bq-trust">
              {p.hero.trust.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} className="bq-trust__icon" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual">
            <div className="hero-visual__glow" aria-hidden="true" />
            <figure className="device">
              <img
                className="device__screen bq-shot"
                src={shotSrc(lang, BENDIQ_SHOTS[0])}
                alt={p.hero.shotAlt}
                width={SHOT_W}
                height={SHOT_H}
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- Kullanım kılavuzu: hero'nun hemen altında (kullanıcı isteği 25.10) ---------- */}
      <BendiqGuide lang={lang} />

      {/* ---------- Almazsa ne kaybeder ---------- */}
      <section className="section" data-surface="raise" aria-labelledby="bq-cost">
        <div className="container">
          <SectionHead id="bq-cost" eyebrow={p.cost.eyebrow} title={p.cost.title} sub={p.cost.sub} />
          <ul className="grid grid--4">
            {p.cost.items.map((c, i) => (
              <Reveal as="li" key={c.title} delay={(i % 4) * 70}>
                <article className="card bq-cost">
                  <span className="bq-cost__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="card__title">{c.title}</h3>
                  <p className="card__text">{c.text}</p>
                </article>
              </Reveal>
            ))}
          </ul>
          <Reveal as="p" className="bq-anchor">
            {p.cost.anchor}
          </Reveal>
        </div>
      </section>

      {/* ---------- Nasıl çalışır ---------- */}
      <section className="section" data-surface="base" aria-labelledby="bq-flow">
        <div className="container">
          <SectionHead id="bq-flow" eyebrow={p.flow.eyebrow} title={p.flow.title} sub={p.flow.sub} />
          <ol className="bq-steps">
            {p.flow.steps.map((s, i) => (
              <Reveal as="li" className="bq-step" key={s.k} delay={i * 60}>
                <span className="bq-step__n">{i + 1}</span>
                <h3 className="bq-step__k">{s.k}</h3>
                <p className="bq-step__text">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Platformlar ---------- */}
      <section className="section" data-surface="raise" aria-labelledby="bq-platforms">
        <div className="container">
          <SectionHead id="bq-platforms" eyebrow={pf.eyebrow} title={pf.title} sub={pf.sub} />
          <div className="bq-platforms">
            <Reveal className="card bq-platform bq-platform--main">
              <span className="tag tag--live bq-platform__status">
                <span className="tag__dot" />
                {pf.available}
              </span>
              <span className="icon-badge icon-badge--sm">
                <Icon name="smartphone" size={21} />
              </span>
              <h3 className="card__title">{pf.android.title}</h3>
              <p className="card__text">{pf.android.lead}</p>
              <ul className="bq-points">
                {pf.android.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="check" size={16} className="bq-points__icon" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="card__foot">
                <StoreLink href={PLAY_BENDIQ} className="btn btn--secondary btn--full">
                  {pf.android.cta}
                </StoreLink>
              </div>
            </Reveal>

            <Reveal className="card bq-platform" delay={80}>
              <span className="tag tag--live bq-platform__status">
                <span className="tag__dot" />
                {pf.available}
              </span>
              <span className="icon-badge icon-badge--sm">
                <Icon name="layers" size={21} />
              </span>
              <h3 className="card__title">{pf.windows.title}</h3>
              <p className="card__text">{pf.windows.lead}</p>
              <img
                className="bq-platform__shot"
                src="/bendiq-windows.webp"
                alt={pf.windows.shotAlt}
                width="1200"
                height="675"
                loading="lazy"
                decoding="async"
              />
              <ul className="bq-points">
                {pf.windows.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="check" size={16} className="bq-points__icon" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="bq-platform__note">{pf.windows.note}</p>
              <div className="card__foot">
                <StoreLink href={MS_STORE_BENDIQ} className="btn btn--secondary btn--full">
                  {pf.windows.cta}
                </StoreLink>
              </div>
            </Reveal>

            <Reveal className="card bq-platform bq-platform--soon" delay={160}>
              <span className="tag bq-platform__status">{pf.preparing}</span>
              <span className="icon-badge icon-badge--sm">
                <Icon name="globe" size={21} />
              </span>
              <h3 className="card__title">{pf.web.title}</h3>
              <p className="card__text">{pf.web.lead}</p>
              <ul className="bq-points">
                {pf.web.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="clock" size={16} className="bq-points__icon bq-points__icon--soon" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="bq-platform__note">{pf.web.note}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Sahada kim ne kazanır + sınırlar ---------- */}
      <section className="section" data-surface="base" aria-labelledby="bq-field">
        <div className="container">
          <SectionHead id="bq-field" eyebrow={p.field.eyebrow} title={p.field.title} />
          <ul className="grid grid--3">
            {p.field.roles.map((r, i) => (
              <Reveal as="li" key={r.who} delay={i * 80}>
                <article className="card">
                  <span className="tag tag--brand bq-role">{r.who}</span>
                  <h3 className="card__title">{r.title}</h3>
                  <p className="card__text">{r.text}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="bq-limits">
            <h3 className="bq-limits__title">
              <Icon name="shield" size={20} />
              {p.limits.title}
            </h3>
            <ul className="bq-limits__list">
              {p.limits.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- 12 aylık yol haritası ---------- */}
      <section className="section" data-surface="raise" aria-labelledby="bq-roadmap">
        <div className="container">
          <SectionHead id="bq-roadmap" eyebrow={p.roadmap.eyebrow} title={p.roadmap.title} sub={p.roadmap.sub} />
          <ol className="bq-roadmap">
            {p.roadmap.phases.map((ph, i) => (
              <Reveal as="li" className={`bq-phase bq-phase--${i}`} key={ph.when} delay={i * 90}>
                <div className="bq-phase__head">
                  <span className="bq-phase__when">{ph.when}</span>
                  <span className={`tag bq-phase__status${i === 0 ? ' tag--live' : ''}`}>
                    {i === 0 && <span className="tag__dot" />}
                    {ph.status}
                  </span>
                </div>
                <ul className="bq-points">
                  {ph.items.map((it) => (
                    <li key={it}>
                      <Icon
                        name={i === 0 ? 'check' : 'clock'}
                        size={16}
                        className={`bq-points__icon${i === 0 ? '' : ' bq-points__icon--soon'}`}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
          <Reveal className="bq-roadmap__foot">
            <p className="bq-roadmap__origin">{p.roadmap.origin}</p>
            <p className="bq-roadmap__origin">{p.roadmap.testers}</p>
            <p className="bq-roadmap__note">{p.roadmap.note}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- SSS ---------- */}
      <section className="section" data-surface="base" aria-labelledby="bq-faq">
        <div className="container container-read">
          <SectionHead id="bq-faq" title={p.faq.title} />
          <div className="bq-faq">
            {p.faq.items.map((f) => (
              <details className="bq-faq__item" key={f.q}>
                <summary className="bq-faq__q">
                  {f.q}
                  <Icon name="chevron-right" size={18} className="bq-faq__chev" />
                </summary>
                <p className="bq-faq__a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Tek eylem ---------- */}
      <section className="section bq-final" data-surface="void" aria-labelledby="bq-final">
        <div className="container">
          <Reveal className="bq-final__inner">
            <h2 className="section-title" id="bq-final">
              {p.final.title}
            </h2>
            <p className="section-sub">{p.final.sub}</p>
            <div className="hero__actions bq-final__actions">
              <StoreLink href={PLAY_BENDIQ} className="btn btn--primary">
                {p.final.ctaPlay}
              </StoreLink>
              <StoreLink href={MS_STORE_BENDIQ} className="btn btn--secondary">
                {p.final.ctaWindows}
              </StoreLink>
            </div>
            <Link to={{ pathname: '/', hash: '#iletisim' }} className="btn btn--ghost">
              {p.final.contact}
              <Icon name="arrow-right" size={16} className="btn__icon" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
