import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'

const initialsOf = (title) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

function ProjectCard({ project, viewLabel, featured = false }) {
  // Logolar müşteri sitelerinden gelir; erişilemezse baş harflere düşülür.
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = project.logo && !logoFailed
  const linked = Boolean(project.url)

  const Tag = linked ? 'a' : 'div'
  const linkProps = linked
    ? {
        href: project.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${project.title} — ${viewLabel}`,
      }
    : {}

  return (
    <Tag
      className={`card project-card${linked ? ' card--interactive' : ''}${featured ? ' project-card--featured' : ''}`}
      {...linkProps}
    >
      <div className={`project-card__cover${project.cover ? ' project-card__cover--shot' : ''}`}>
        {/* Öne çıkan projede kapak, uygulamanın gerçek ekranından bir
            kesit: ölçü satırı ve büküm parametreleri. Logo plakası
            782×260'lık alanda boş duruyordu. */}
        {project.cover && (
          <img
            className="project-card__shot"
            src={project.cover}
            alt=""
            width="1020"
            height="350"
            loading="lazy"
            decoding="async"
          />
        )}

        {showLogo ? (
          <img
            className="project-card__logo"
            src={project.logo}
            alt=""
            width="62"
            height="62"
            loading="lazy"
            decoding="async"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="project-card__initials">{initialsOf(project.title)}</span>
        )}

        {linked && (
          <span className="project-card__overlay">
            <span>
              {viewLabel}
              <Icon name="arrow-up-right" size={16} />
            </span>
          </span>
        )}
      </div>

      <div className="project-card__body">
        <span className="tag tag--brand">{project.tag}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="card__text">{project.desc}</p>
        <div className="project-card__meta">
          {project.meta.map((m) => (
            <span className="tag" key={m}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </Tag>
  )
}

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section
      id="projeler"
      className="section"
      data-surface="raise"
      aria-labelledby="projeler-title"
    >
      <div className="container">
        <SectionHead
          id="projeler-title"
          eyebrow={t.sectionLabels.projects}
          title={t.sections.projects.title}
          sub={t.sections.projects.sub}
        />

        {/* Hiyerarşik ızgara: beş eşit kart yerine kendi ürünümüz büyük,
            müşteri işleri kompakt. En güçlü iş öne çıkıyor ve bölüm
            1.771 px'den yarıya iniyor. */}
        <ul className="projects__grid">
          {t.projects.map((p, i) => (
            <Reveal
              as="li"
              delay={(i % 3) * 90}
              className={i === 0 ? 'projects__lead' : undefined}
              key={p.title}
            >
              <ProjectCard project={p} viewLabel={t.sections.projects.view} featured={i === 0} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
