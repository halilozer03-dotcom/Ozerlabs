import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const CONTACT_EMAIL = 'ozer.labs@gmail.com'

export default function Contact() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const message = form.message.value

    const subject = encodeURIComponent(`Ozer Labs — ${name}`)
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`)
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    window.location.href = mailtoUrl
    setStatus(t.contact.status)
  }

  return (
    <section id="iletisim" className="contact">
      <div className="section-label">
        <span className="num">05</span>
        <h2>{t.sectionLabels.contact}</h2>
        <div className="rule" />
      </div>

      <div className="contact-box">
        <div className="contact-info">
          <h3>{t.contact.heading}</h3>
          <p>{t.contact.body}</p>
          {t.contact.details.map((d) => (
            <div className="detail" key={d.label}>
              <span>{d.label}</span>{d.value}
            </div>
          ))}
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">{t.contact.form.name}</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div>
            <label htmlFor="email">{t.contact.form.email}</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="message">{t.contact.form.message}</label>
            <textarea id="message" name="message" required />
          </div>
          <button type="submit" className="btn-primary">{t.contact.form.submit}</button>
          <div className="form-status" role="status">{status}</div>
        </form>
      </div>
    </section>
  )
}
