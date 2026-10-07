import { useCallback, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'
import ProjectShowcase from './ProjectShowcase.jsx'

const initialsOf = (title) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

function ProjectCard({ project, viewLabel, labels, featured = false, onOpen }) {
  // Logolar müşteri sitelerinden gelir; erişilemezse baş harflere düşülür.
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = project.logo && !logoFailed
  const linked = Boolean(project.url)
  // Bağlantısı verilmeyen ürün (ücretli): kart canlı adrese gitmez,
  // tanıtım penceresini açar. Kartın tamamı tek düğmedir.
  const showcase = !linked && Boolean(project.showcase && onOpen)

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
      className={`card project-card${linked || showcase ? ' card--interactive' : ''}${showcase ? ' project-card--showcase' : ''}${featured ? ' project-card--featured' : ''}`}
      {...linkProps}
    >
      {/* Durum çipi: "yayında, her gün kullanılıyor" başlığı altında
          henüz yayına girmemiş bir işin ayrımsız durması yanlış bilgi
          verir. Tasarım aşamasındaki iş açıkça öyle işaretlenir. */}
      <span
        className={`tag project-card__status${
          project.status === 'design' ? '' : ' tag--live'
        }`}
      >
        {project.status !== 'design' && <span className="tag__dot" />}
        {project.status === 'design' ? labels.statusDesign : labels.statusLive}
      </span>

      <div className={`project-card__cover${project.cover ? ' project-card__cover--shot' : ''}`}>
        {/* Öne çıkan projede kapak, uygulamanın gerçek çıktısı: A4 yatay
            teknik çizim (kesit + ölçüler + detay X + izometrik). Logo
            plakası 782×260'lık alanda boş duruyordu. */}
        {project.cover && (
          <img
            className="project-card__shot"
            src={project.cover}
            alt=""
            width="1020"
            height="600"
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

        {(linked || showcase) && (
          <span className="project-card__overlay">
            <span>
              {showcase ? labels.watch : viewLabel}
              <Icon name={showcase ? 'play' : 'arrow-up-right'} size={16} />
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

      {showcase && (
        <button
          type="button"
          className="project-card__open"
          aria-haspopup="dialog"
          aria-label={`${project.title} — ${labels.watch}`}
          onClick={onOpen}
        />
      )}
    </Tag>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  // Açık tanıtım penceresi başlıkla tutulur: dil değişince aynı ürünün
  // yeni dildeki kaydı bulunur, pencere kapanmaz.
  const [openTitle, setOpenTitle] = useState(null)
  const triggerRef = useRef(null)

  const openShowcase = (title) => (e) => {
    triggerRef.current = e.currentTarget
    setOpenTitle(title)
  }

  const closeShowcase = useCallback(({ returnFocus = true } = {}) => {
    setOpenTitle(null)
    if (returnFocus) triggerRef.current?.focus({ preventScroll: true })
  }, [])

  const openProject = openTitle ? t.projects.find((p) => p.title === openTitle && p.showcase) : null

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
              <ProjectCard
                project={p}
                viewLabel={t.sections.projects.view}
                labels={t.sections.projects}
                featured={i === 0}
                onOpen={p.showcase ? openShowcase(p.title) : undefined}
              />
            </Reveal>
          ))}
        </ul>
      </div>

      {openProject && (
        <ProjectShowcase project={openProject} labels={t.sections.projects} onClose={closeShowcase} />
      )}
    </section>
  )
}
