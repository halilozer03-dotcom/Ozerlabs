import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'

/**
 * Hero'nun altına oturan güven şeridi.
 * Listelenen teknolojiler uydurulmaz — portföydeki projelerin
 * `meta` alanlarından türetilir, böylece içerik hep gerçeği yansıtır.
 */
function techFrom(projects) {
  const seen = []
  projects.forEach((p) => {
    p.meta.forEach((entry) => {
      entry
        .split('·')
        .map((s) => s.trim())
        .filter((s) => s && !/^\d+$/.test(s))
        .forEach((name) => {
          if (!seen.includes(name)) seen.push(name)
        })
    })
  })
  return seen
}

export default function TechStrip() {
  const { t } = useLanguage()
  const tech = techFrom(t.projects)

  return (
    <div className="container">
      <Reveal className="techstrip">
        <span className="techstrip__title">{t.techstrip.title}</span>
        <ul className="techstrip__list">
          {tech.map((name) => (
            <li className="techstrip__item" key={name}>
              <Icon name="code" size={17} />
              {name}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
