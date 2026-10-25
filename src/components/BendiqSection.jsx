import { useLanguage } from '../i18n/LanguageContext.jsx'
import { PLAY_BENDIQ, BENDIQ_PRIVACY } from '../content/links.js'
import { track } from '../lib/track.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'

/**
 * BENDIQ ürün faydası — hero'nun ikincil eyleminin hedefi (#bendiq).
 *
 * Dört adım mağaza listesinin kendi akışıdır (CALCULER → CONTRÔLER → VOIR →
 * EXPORTER, 08.10.2026'da okundu); özellik yazılmaz, kullanıcının işi
 * yazılır. Kanıt: uygulamanın gerçek 2D çizim çıktısı (dilden bağımsız,
 * yalnız ölçü ve harf).
 *
 * "Deneme ve satın alma" kutusu belirsizliği kaldırır: 30 gün tam deneme,
 * hesap yok, abonelik yok, deneme bitince uygulamanın satın alma istediği
 * açıkça yazılır (gizli maliyet yok). Fiyat sitede yazmaz — mağazadaki
 * güncel fiyata yönlendirilir.
 *
 * Birincil buton yok: sayfadaki birincil eylem hero'daki Google Play
 * düğmesidir; burada aynı hedef ikincil bağlantı olarak tekrar edilir.
 */
export default function BendiqSection() {
  const { t } = useLanguage()
  const b = t.bendiq

  return (
    <section id="bendiq" className="section bendiq" data-surface="base" aria-labelledby="bendiq-title">
      <div className="container">
        <SectionHead id="bendiq-title" eyebrow={b.eyebrow} title={b.title} sub={b.sub} />

        <div className="bendiq__layout">
          <ol className="bendiq__steps">
            {b.steps.map((s, i) => (
              <Reveal as="li" delay={(i % 2) * 90} key={s.title} className="bendiq__step">
                <span className="icon-badge icon-badge--sm">
                  <Icon name={s.icon} size={21} />
                </span>
                <h3 className="bendiq__step-title">{s.title}</h3>
                <p className="bendiq__step-text">{s.text}</p>
              </Reveal>
            ))}
          </ol>

          <div className="bendiq__aside">
            <Reveal as="figure" className="bendiq__drawing">
              <img
                src="/bendiq-kapak-1020.webp"
                srcSet="/bendiq-kapak-640.webp 640w, /bendiq-kapak-1020.webp 1020w"
                sizes="(min-width: 1024px) 460px, calc(100vw - 48px)"
                alt={b.drawingAlt}
                width="1020"
                height="600"
                loading="lazy"
                decoding="async"
              />
              <figcaption>{b.drawingCaption}</figcaption>
            </Reveal>

            <Reveal className="bendiq__model" delay={90}>
              <h3 className="bendiq__model-title">{b.modelTitle}</h3>
              <ul className="bendiq__model-list">
                {b.model.map((m) => (
                  <li key={m}>
                    <Icon name="check" size={17} className="bendiq__check" strokeWidth={2.2} />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <a
                href={PLAY_BENDIQ}
                className="btn btn--secondary btn--full"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('store_click', { topic: 'bendiq-section' })}
              >
                {b.playCta}
                <Icon name="arrow-up-right" size={16} />
              </a>
              <p className="bendiq__disclaimer">{b.disclaimer}</p>
              <a className="bendiq__privacy" href={BENDIQ_PRIVACY} target="_blank" rel="noopener noreferrer">
                {b.privacy}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
