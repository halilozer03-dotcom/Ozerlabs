import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Icon from './Icon.jsx'

const CONTACT_EMAIL = 'ozer.labs@gmail.com'

/**
 * İletişim — eski CTA bandı buraya eridi: bandın başlığı artık bölümün
 * başlığı. Sayfadaki ikinci ve son birincil buton burada.
 *
 * Bütçe aralığı alanı, sayfada rakam olmamasının karşılığı: eleme burada
 * yapılır. Zorunlu değil ve "henüz bilmiyorum" ilk seçenek — zorunlu
 * bütçe alanı form terk oranını yükseltir.
 */
export default function Contact() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('')

  // Gönderim davranışı değişmedi: mailto ile kullanıcının kendi
  // posta uygulaması açılır, sunucuya veri gitmez.
  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const message = form.message.value
    const budget = form.budget.value

    const subject = encodeURIComponent(`Ozer Labs — ${name}`)
    const govde = [message, '', '—', name, email, `${t.contact.form.budget}: ${budget}`].join('\n')
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(govde)}`

    window.location.href = mailtoUrl
    setStatus(t.contact.status)
  }

  return (
    <section id="iletisim" className="section" data-surface="base" aria-labelledby="iletisim-title">
      <div className="container">
        <SectionHead
          id="iletisim-title"
          eyebrow={t.sectionLabels.contact}
          title={t.ctaBand.title}
          sub={t.ctaBand.text}
        />

        <div className="contact__layout">
          <Reveal>
            <p className="card__text" style={{ fontSize: 'var(--fs-lg)' }}>
              {t.contact.body}
            </p>

            <div className="contact__details">
              {t.contact.details.map((d) => {
                const isEmail = d.value.includes('@')
                const Tag = isEmail ? 'a' : 'div'
                const props = isEmail ? { href: `mailto:${d.value}` } : {}

                return (
                  <Tag className="contact-detail" key={d.label} {...props}>
                    <span className="contact-detail__icon">
                      <Icon name={d.icon} size={19} />
                    </span>
                    <span>
                      <span className="contact-detail__label">{d.label}</span>
                      <span className="contact-detail__value">{d.value}</span>
                    </span>
                  </Tag>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="field">
                <label className="field__label" htmlFor="name">
                  {t.contact.form.name}
                </label>
                <input
                  className="field__control"
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t.contact.form.namePlaceholder}
                  required
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="email">
                  {t.contact.form.email}
                </label>
                <input
                  className="field__control"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  required
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="budget">
                  {t.contact.form.budget}
                </label>
                <select className="field__control" id="budget" name="budget" defaultValue={t.contact.form.budgetOptions[0]}>
                  {t.contact.form.budgetOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="message">
                  {t.contact.form.message}
                </label>
                <textarea
                  className="field__control"
                  id="message"
                  name="message"
                  rows="5"
                  placeholder={t.contact.form.messagePlaceholder}
                  required
                />
              </div>

              <button type="submit" className="btn btn--primary btn--full">
                {t.contact.form.submit}
                <Icon name="arrow-right" size={16} className="btn__icon" />
              </button>

              <p className="form-status" role="status">
                {status}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
