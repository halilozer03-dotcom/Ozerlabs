import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'

/**
 * Hizmetler + sektörel taslaklar.
 *
 * Üst şerit: ne yapıldığı (web, mobil, AI).
 * Alt şerit: hangi sektöre hazır taslağın olduğu. Bunlar müşteri işi
 * değil, elimizde çalışır hâlde duran temeller — o yüzden ayrı bir
 * "portföy" gibi değil, hizmetin devamı olarak sunuluyor.
 *
 * Kart içi CTA'lar kaldırıldı: aynı çağrı sayfada yedi kez geçiyordu.
 */
export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="hizmetler" className="section" data-surface="base" aria-labelledby="hizmetler-title">
      <div className="container">
        <SectionHead
          id="hizmetler-title"
          eyebrow={t.sectionLabels.services}
          title={t.sections.services.title}
          sub={t.sections.services.sub}
        />

        <ul className="grid grid--3">
          {t.services.map((s, i) => (
            <Reveal as="li" delay={i * 90} key={s.id}>
              <article className="card">
                <span className="icon-badge">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="card__title">{s.title}</h3>
                <p className="card__text">{s.desc}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* ---------- Sektörel taslaklar ---------- */}
        <div className="solutions" id="cozumler">
          <Reveal className="solutions__head">
            <span className="eyebrow">{t.solutions.eyebrow}</span>
            <h3 className="solutions__title">{t.solutions.title}</h3>
            <p className="solutions__sub">{t.solutions.sub}</p>
          </Reveal>

          <ul className="solutions__grid">
            {t.solutions.items.map((item, i) => (
              <Reveal as="li" delay={i * 90} key={item.id}>
                <article className="card solution-card">
                  <span className="icon-badge icon-badge--sm">
                    <Icon name={item.icon} size={21} />
                  </span>

                  <h4 className="solution-card__title">{item.title}</h4>
                  <p className="solution-card__lead">{item.lead}</p>

                  {/* Akış: sistemin nasıl çalıştığını tek bakışta verir */}
                  <ol className="solution-flow" aria-label={item.title}>
                    {item.flow.map((adim) => (
                      <li className="solution-flow__step" key={adim}>
                        {adim}
                      </li>
                    ))}
                  </ol>

                  <p className="solution-card__body">{item.body}</p>

                  <ul className="solution-points">
                    {item.points.map((nokta) => (
                      <li key={nokta}>
                        <Icon name="check" size={16} className="solution-points__check" strokeWidth={2.2} />
                        {nokta}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
