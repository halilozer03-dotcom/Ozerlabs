import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projeler" className="projects">
      <div className="section-label">
        <span className="num">03</span>
        <h2>{t.sectionLabels.projects}</h2>
        <div className="rule" />
      </div>

      {t.projects.map((p, i) => (
        <Reveal delay={i * 100} key={p.title}>
          <a className="project-row" href={p.url || '#'} target={p.url ? '_blank' : undefined} rel={p.url ? 'noopener noreferrer' : undefined}>
            <span className="tag">{p.tag}</span>
            <div>
              <h3>{p.logo && <img src={p.logo} alt="" style={{height:22,width:22,objectFit:"contain",verticalAlign:"middle",marginRight:10,borderRadius:4}} />}{p.title}</h3>
              <p>{p.desc}</p>
            </div>
            <div className="meta">
              {p.meta.map((m) => (
                <div key={m}>{m}</div>
              ))}
            </div>
          </a>
        </Reveal>
      ))}
    </section>
  )
}
